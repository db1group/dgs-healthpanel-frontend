export interface IDialogConfirmation extends DialogContentInterface {
  open: (data: DialogContentInterface) => void;
  close: Function;
}

export interface DialogContentInterface {
  text?: string;
  show?: boolean;
}
