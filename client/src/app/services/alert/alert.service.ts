import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface Alert {
  display:boolean,
  confirm:boolean,
  answer?:boolean
}

@Injectable()
export class AlertsService {

  private alertCanal:Subject<Alert> = new Subject<Alert>();
  public alertObservable:Observable<Alert> = this.alertCanal.asObservable();

  public title:string;
  public message:string;

  constructor() { }

  /**
   * Displays an alert with a message
   * @param message
   * @param title
   * @returns {Promise<boolean>} Returned on click of user
   */
  public alert(message:string, title:string = null):Promise<boolean> {
    this.message = message;
    this.title = title;
    this.alertCanal.next({
      display: true,
      confirm: false
    });

    return new Promise((resolve) => {
      this.alertObservable.subscribe(() => {
          resolve();
      });
    }).then(() => {
      return true;
    }, () => {
      return false;
    });
  }

  /**
   * Displays a confirm with a message
   * @param message
   * @param title
   * @returns {Promise<boolean>} Returned on click of user
   */
  public confirm(message:string, title:string = null):Promise<boolean> {
    this.message = message;
    this.title = title;
    this.alertCanal.next({
      display: true,
      confirm: true
    });

    return new Promise((resolve, reject) => {
      this.alertObservable.subscribe((data:Alert) => {
        if (data.answer === true) {
          resolve();
        } else if (data.answer === false) {
          reject();
        } else {
          reject();
        }
      });
    }).then(() => {
      return true;
    }, () => {
      return false;
    });
  }

  /**
   * Closes alert/confirm with result for confirm
   * @param answer
   */
  public close(answer?:boolean):void {
    this.alertCanal.next({
      display: false,
      confirm: false,
      answer: answer
    });
  }
}
