import { writable } from 'svelte/store';

export enum DialogType {
  Confirm,
  Delete,
}

type DialogActions = {
  onConfirm: () => void;
  onCancel: () => void;
};

type DialogOptions = {
  type: DialogType;
  title?: string;
  prompt?: string;
  confirmText?: string;
  cancelText?: string;
  hideCancelButton?: boolean;
  disable?: boolean;
  width?: 'wide' | 'narrow' | undefined;
};

export type Dialog = DialogOptions & DialogActions;

function createDialogWrapper() {
  const dialog = writable<Dialog | undefined>();

  async function show(options: DialogOptions) {
    return new Promise((resolve) => {
      const newDialog: Dialog = {
        ...options,
        onConfirm: () => {
          dialog.set(undefined);
          resolve(true);
        },
        onCancel: () => {
          dialog.set(undefined);
          resolve(false);
        },
      };

      dialog.set(newDialog);
    });
  }

  return {
    dialog,
    show,
  };
}

export const dialogController = createDialogWrapper();
