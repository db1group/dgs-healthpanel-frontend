import {
  SnackbarInterface,
  SnackbarContentInterface,
} from '../interfaces/snackbar.interface';

class SnackbarService implements SnackbarInterface {
  public text = '';

  public absolute = false;

  public bottom = false;

  public color = '#333';

  public buttonColor = 'info';

  public left = false;

  public multiLine = false;

  public right = false;

  public timeout = 4000;

  public top = false;

  public show = false;

  public vertical = false;

  public hideDefaultBtn = false;

  public callback?: { action: any; label: any } | undefined;

  public open(data: SnackbarContentInterface) {
    this.text = data.text || '';
    this.absolute = data.absolute || false;
    this.bottom = data.bottom || true;
    this.color = data.color || '#333';
    this.buttonColor = data.buttonColor || 'primary';
    this.left = data.left || false;
    this.multiLine = data.multiLine || false;
    this.right = data.right || false;
    this.timeout = data.timeout || 4000;
    this.top = data.top || false;
    this.show = true;
    this.vertical = data.vertical || false;
    this.callback = data.callback;
    this.hideDefaultBtn = data.hideDefaultBtn || false;
  }

  public close() {
    this.text = '';
    this.absolute = false;
    this.bottom = false;
    this.color = '#333';
    this.buttonColor = 'primary';
    this.left = false;
    this.multiLine = false;
    this.right = false;
    this.timeout = 4000;
    this.top = false;
    this.show = false;
    this.vertical = false;
    this.hideDefaultBtn = false;
    this.callback = { action: '', label: '' };
  }
}

export default new SnackbarService();
