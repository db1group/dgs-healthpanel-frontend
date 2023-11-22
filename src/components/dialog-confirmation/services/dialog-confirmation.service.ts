import {
  IDialogConfirmation,
  DialogContentInterface,
} from '../interfaces/dialog-confirmation.interface';

class DialogConfirmationService implements IDialogConfirmation {
  public text = '';

  public show = false;

  public open(data: DialogContentInterface) {
    this.text = data.text || '';
    this.show = true;
  }

  public close() {
    this.show = false;
  }
}

export default new DialogConfirmationService();
