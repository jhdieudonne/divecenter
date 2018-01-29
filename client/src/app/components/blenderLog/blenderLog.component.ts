import { Component, Inject, ViewChild, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ApiService } from '../../services/api/api.service';
import { AlertsService } from '../../services/alert/alert.service';
import { NewLogComponent } from './newLog/newLog.component';

@Component({
  selector: 'blenderLog',
  templateUrl: './blenderLog.component.html',
  styleUrls: ['./blenderLog.component.scss']
})

export class BlenderLogComponent {
  blenderLog: any[];
  bottle: any[];
  bottleStruct: any[];

  constructor(private api: ApiService, public dialog: MatDialog) {
    api.list('blenderLog').subscribe((payload) => {
      this.blenderLog = payload._body;
    }, (err)=> {
      console.log(err)
    });

    api.list('bottle').subscribe((payload) => {
      this.bottle = JSON.parse(payload._body);
      this.prepareKeys();
    }, (err)=> {
      console.log(err)
    });
  }

  openDialog() {
    this.dialog.open(NewLogComponent , 
      { data: { bottle: this.bottleStruct }, 
      width: '800px', 
      disableClose: true,
      panelClass: 'dialgWithoutPadding'
    });
  }

  prepareKeys() {
    this.bottleStruct=[ [],[],[],[] ];
    this.bottle.forEach((el) => {
      if (el.pressure=='200' && el.twin=='false') {
        this.bottleStruct[0].push({'size': el.size, 'id': el.id});
      } else if (el.pressure=='200' && el.twin=='true') {
        this.bottleStruct[1].push({'size': el.size, 'id': el.id});
      } else if (el.pressure=='300' && el.twin=='false') {
        this.bottleStruct[2].push({'size': el.size, 'id': el.id});
      } else {
        this.bottleStruct[3].push({'size': el.size, 'id': el.id});
      }
    });
  }
}
