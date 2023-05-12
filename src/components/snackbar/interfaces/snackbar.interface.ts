export interface ISnackbar extends SnackbarContentInterface {
  open: (data: SnackbarContentInterface) => void;
  close: Function;
}

export interface SnackbarContentInterface {
  text?: string;
  absolute?: boolean;
  bottom?: boolean;
  color?: string;
  buttonColor?: string;
  left?: boolean;
  multiLine?: boolean;
  right?: boolean;
  timeout?: number;
  top?: boolean;
  show?: any;
  vertical?: boolean;
  hideDefaultBtn?: boolean;
  callback?: {
    action: any;
    label: any;
  };
}
