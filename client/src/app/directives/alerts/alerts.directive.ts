import {Component, OnInit, ViewChild} from '@angular/core';
import {Alert, AlertsService} from '../../services/alert/alert.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.directive.html',
  styleUrls: ['./alerts.directive.scss'],
  host: {
    '(document:keydown.escape)': 'displayAlerts.confirm && alertSrv.close(false)',
    '(document:keydown.enter)': 'alertSrv.close(displayAlerts.confirm ? true : null)'
  }
})
export class AlertsDirective implements OnInit {

  @ViewChild('content') public showModal;
  public displayAlerts: Alert = {
    display: false,
    confirm: false
  };

  /**
   * Injections
   * @param alertSrv
   */
  constructor(public alertSrv: AlertsService) {
  }

  /**
   * Listen to service on init
   */
  ngOnInit() {
    this.alertSrv.alertObservable.subscribe((data: Alert) => {
      this.displayAlerts = data;
      if (this.displayAlerts.display) {
        this.showModal.show();
      }

    });
  }
}
