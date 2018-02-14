import { Component, Inject, ViewChild, Input } from '@angular/core';
import { MatDialog, MatExpansionPanel } from '@angular/material';
import { ApiService } from '../../services/api/api.service';
import { AlertsService } from '../../services/alert/alert.service';
import { NewLogComponent } from './newLog/newLog.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'blenderLog',
  providers: [DatePipe],
  templateUrl: './blenderLog.component.html',
  styleUrls: ['./blenderLog.component.scss']
})

export class BlenderLogComponent {
  blenderLog: any[];
  bottle: any[];
  bottleStruct: any[];
  sortedLog: any[];
  loading: boolean=false;

  constructor(private api: ApiService, public dialog: MatDialog, private datePipe:DatePipe) {
    this.loading=true;
    api.list('blenderLog').subscribe((payload) => {
      this.blenderLog = payload;
      this.parseLogByDate();
      api.list('bottle').subscribe((payload) => {
        this.bottle = payload;
        this.prepareKeys();
        this.loading=false;
      }, (err)=> {
        console.log(err);
      });
    }, (err)=> {
      console.log(err)
    });
  }

  openDialog() {
    let dialogRef=this.dialog.open(NewLogComponent , 
      { data: { bottle: this.bottleStruct }, 
      disableClose: true,
      minWidth: '80vw',
      maxWidth: '100vw',
      panelClass: 'dialogWithoutPadding'
    });
  }

  deleteLog(logId: number, pos: number, subpos: number) {
    this.api.delete('blenderLog',logId).subscribe((payload)=> {
      this.sortedLog[pos].splice(subpos,1);
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

  // Structure 0=>today, 1=> yesterday, 2=>this month, 3=> previous month, 4=> other months
  parseLogByDate() {
    let yesterday:Date=new Date();
    let prevMonth:Date=new Date();
    this.sortedLog=[[],[],[],[],[]];
    yesterday.setDate(yesterday.getDate() - 1);
    prevMonth.setDate(prevMonth.getMonth() - 1);
    this.blenderLog.forEach((el)=> {
      if (this.datePipe.transform(el.createdt, 'yyyy-MM-dd')===this.datePipe.transform(new Date(), 'yyyy-MM-dd')) {
        this.sortedLog[0].push(el);
      } else if (this.datePipe.transform(el.createdt, 'yyyy-MM-dd')===this.datePipe.transform(yesterday, 'yyyy-MM-dd')) {
        this.sortedLog[1].push(el);
      } else if (this.datePipe.transform(el.createdt, 'yyyy-MM')===this.datePipe.transform(new Date(), 'yyyy-MM')) {
        this.sortedLog[2].push(el);
      } else if (this.datePipe.transform(el.createdt, 'yyyy-MM')===this.datePipe.transform(prevMonth, 'yyyy-MM')) {
        this.sortedLog[3].push(el);
      }
    });
  }
}
