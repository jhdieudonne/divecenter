import { Component, Inject, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ApiService } from '../../services/api/api.service';
import { AlertsService } from '../../services/alert/alert.service';

@Component({
  selector: 'blenderLog',
  templateUrl: './blenderLog.component.html',
  styleUrls: ['./blenderLog.component.scss']
})

export class BlenderLogComponent {
  url:string;
  blenderLog: any[];
  @ViewChild('blenderLogInsert') blenderLogInsert;
  creationOngoing: boolean = false;

  constructor(private api: ApiService, private alerts:AlertsService ) {
    api.list('blenderLog').subscribe((payload) => {
        this.blenderLog = payload._body;
    }, (err)=> {
      console.log('error',err)
    });
  }

  public createNewLog() {
    this.blenderLogInsert.show();
  }

  public createLog() {
    this.creationOngoing=true;
    setTimeout(()=> {this.blenderLogInsert.hide();     this.creationOngoing=false;
    },5000);
  }

}
