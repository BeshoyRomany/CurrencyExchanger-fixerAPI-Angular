import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class InfoMessagesService {
  displayTime = 8000;
  constructor(private snackBar: MatSnackBar) {}

  //Handle Error Message
  handleErrorMessage(message: string, displayTime: number = this.displayTime) {
    this.displayMessage(message, 'error-message', displayTime);
  }

  //Handle success Message
  handleSuccessMessage(
    message: string,
    displayTime: number = this.displayTime
  ) {
    this.displayMessage(message, 'success-message', displayTime);
  }

  //Handle Warning Message
  handleWarningMessage(
    message: string,
    displayTime: number = this.displayTime
  ) {
    this.displayMessage(message, 'warning-message', displayTime);
  }

  //Display the message
  displayMessage(message: string, action: string, displayTime: number) {
    this.snackBar.open(message, '', {
        duration: displayTime,
        panelClass: [action]
      });
  }
}
