import { Component, Inject, ViewChild, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ApiService } from '../../services/api/api.service';
import { AlertsService } from '../../services/alert/alert.service';

@Component({
  selector: 'blenderLog',
  templateUrl: './blenderLog.component.html',
  styleUrls: ['./blenderLog.component.scss']
})

export class BlenderLogComponent {
  blenderLog: any[];

  constructor(private api: ApiService, private alerts:AlertsService ) {
    api.list('blenderLog').subscribe((payload) => {
      this.blenderLog = payload._body;
    }, (err)=> {
      console.log(err)
    });
  }
}
