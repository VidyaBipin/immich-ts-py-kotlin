import json
from typing import Any, Iterator
from unittest import mock

import numpy as np
import pytest
from fastapi.testclient import TestClient
from PIL import Image

from .main import app, init_state
from .schemas import ndarray


@pytest.fixture
def pil_image() -> Image.Image:
    return Image.new("RGB", (600, 800))


@pytest.fixture
def cv_image(pil_image: Image.Image) -> ndarray:
    return np.asarray(pil_image)[:, :, ::-1]  # PIL uses RGB while cv2 uses BGR


@pytest.fixture
def mock_get_model() -> Iterator[mock.Mock]:
    with mock.patch("app.models.cache.InferenceModel.from_model_type", autospec=True) as mocked:
        yield mocked


@pytest.fixture(scope="session")
def deployed_app() -> TestClient:
    init_state()
    return TestClient(app)


@pytest.fixture(scope="session")
def responses() -> dict[str, Any]:
    return json.load(open("responses.json", "r"))
