from __future__ import annotations

import os
import pickle
from abc import ABC, abstractmethod
from pathlib import Path
from shutil import rmtree
from typing import Any
from zipfile import BadZipFile

import onnxruntime as ort
from onnxruntime.capi.onnxruntime_pybind11_state import InvalidProtobuf  # type: ignore

from ..config import get_cache_dir, log, settings
from ..schemas import ModelType


class InferenceModel(ABC):
    _model_type: ModelType

    def __init__(
        self,
        model_name: str,
        cache_dir: Path | str | None = None,
        eager: bool = True,
        inter_op_num_threads: int = settings.model_inter_op_threads,
        intra_op_num_threads: int = settings.model_intra_op_threads,
        **model_kwargs: Any,
    ) -> None:
        self.model_name = model_name
        self._loaded = False
        self._cache_dir = Path(cache_dir) if cache_dir is not None else get_cache_dir(model_name, self.model_type)
        loader = self.load if eager else self.download

        self.providers = model_kwargs.pop("providers", ["CPUExecutionProvider"])
        #  don't pre-allocate more memory than needed
        self.provider_options = model_kwargs.pop(
            "provider_options", [{"arena_extend_strategy": "kSameAsRequested"}] * len(self.providers)
        )
        log.debug(
            (f"[{self.model_type.upper()}] Setting '{self.model_name}' execution providers to {self.providers}"
            "in descending order of preference"),
        )
        log.debug(f"[{self.model_type.upper()}] Setting execution provider options to {self.provider_options}")
        self.sess_options = PicklableSessionOptions()
        # avoid thread contention between models
        if inter_op_num_threads > 1:
            self.sess_options.execution_mode = ort.ExecutionMode.ORT_PARALLEL

        log.debug(f"[{self.model_type.upper()}] Setting execution_mode to {self.sess_options.execution_mode.name}")
        log.debug(f"[{self.model_type.upper()}] Setting inter_op_num_threads to {inter_op_num_threads}")
        log.debug(f"[{self.model_type.upper()}] Setting intra_op_num_threads to {intra_op_num_threads}")
        self.sess_options.inter_op_num_threads = inter_op_num_threads
        self.sess_options.intra_op_num_threads = intra_op_num_threads

        try:
            loader(**model_kwargs)
        except (OSError, InvalidProtobuf, BadZipFile):
            log.warn(
                f"[{self.model_type.upper()}] Failed to load model '{self.model_name}'. Clearing cache and retrying."
            )
            self.clear_cache()
            loader(**model_kwargs)

    def download(self, **model_kwargs: Any) -> None:
        if not self.cached:
            log.info(f"[{self.model_type.upper()}] Downloading model '{self.model_name}'. This may take a while.")
            self._download(**model_kwargs)

    def load(self, **model_kwargs: Any) -> None:
        self.download(**model_kwargs)
        self._load(**model_kwargs)
        self._loaded = True

    def predict(self, inputs: Any, **model_kwargs: Any) -> Any:
        if not self._loaded:
            log.info(f"[{self.model_type.upper()}] Loading model '{self.model_name}'")
            self.load()
        if model_kwargs:
            self.configure(**model_kwargs)
        return self._predict(inputs)

    @abstractmethod
    def _predict(self, inputs: Any) -> Any:
        ...

    def configure(self, **model_kwargs: Any) -> None:
        pass

    @abstractmethod
    def _download(self, **model_kwargs: Any) -> None:
        ...

    @abstractmethod
    def _load(self, **model_kwargs: Any) -> None:
        ...

    @property
    def model_type(self) -> ModelType:
        return self._model_type

    @property
    def cache_dir(self) -> Path:
        return self._cache_dir

    @cache_dir.setter
    def cache_dir(self, cache_dir: Path) -> None:
        self._cache_dir = cache_dir

    @property
    def cached(self) -> bool:
        return self.cache_dir.exists() and any(self.cache_dir.iterdir())

    @classmethod
    def from_model_type(cls, model_type: ModelType, model_name: str, **model_kwargs: Any) -> InferenceModel:
        subclasses = {subclass._model_type: subclass for subclass in cls.__subclasses__()}
        if model_type not in subclasses:
            raise ValueError(f"Unsupported model type: {model_type}")

        return subclasses[model_type](model_name, **model_kwargs)

    def clear_cache(self) -> None:
        if not self.cache_dir.exists():
            log.warn(
                (f"[{self.model_type.upper()}] Attempted to clear cache for model '{self.model_name}'"
                "but cache directory does not exist."),
            )
            return
        if not rmtree.avoids_symlink_attacks:
            raise RuntimeError("Attempted to clear cache, but rmtree is not safe on this platform.")

        if self.cache_dir.is_dir():
            log.info(f"[{self.model_type.upper()}] Cleared cache directory for model '{self.model_name}'.")
            rmtree(self.cache_dir)
        else:
            log.warn(
                (f"[{self.model_type.upper()}] Encountered file instead of directory at cache path "
                f"for '{self.model_name}'. Removing file and replacing with a directory."),
            )
            self.cache_dir.unlink()
        self.cache_dir.mkdir(parents=True, exist_ok=True)


# HF deep copies configs, so we need to make session options picklable
class PicklableSessionOptions(ort.SessionOptions):
    def __getstate__(self) -> bytes:
        return pickle.dumps([(attr, getattr(self, attr)) for attr in dir(self) if not callable(getattr(self, attr))])

    def __setstate__(self, state: Any) -> None:
        self.__init__()  # type: ignore
        for attr, val in pickle.loads(state):
            setattr(self, attr, val)
