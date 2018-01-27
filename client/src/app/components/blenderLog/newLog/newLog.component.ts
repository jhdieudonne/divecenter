import { Component, Inject, ViewChild } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { AlertsService } from '../../../services/alert/alert.service';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'blenderLog-newLog',
  templateUrl: './newLog.component.html',
  styleUrls: ['./newLog.component.scss']
})

export class NewLogComponent {
  @ViewChild('signaturePad') signaturePad: SignaturePad;
  @ViewChild('blenderLogInsert') blenderLogInsert;

  options: FormGroup;

  creationOngoing: boolean = false;
  gaz: string;

  constructor(private api: ApiService, fb: FormBuilder) {
    this.options = fb.group({
        'o2': [32, Validators.compose([Validators.min(1),Validators.max(99)])],
        'gaz': ['air', Validators.required]
      });
  }
  

  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 2,
    'canvasHeight': 300,
    'canvasWidth': 500,
    'backgroundColor': '#efefef' 
  };



  private createLog() {
    this.creationOngoing=true;
    setTimeout(()=> {this.blenderLogInsert.hide();     this.creationOngoing=false;
    },5000);
  }

  public show() {
    this.gaz = 'air';
    this.signaturePad.clear();
    this.blenderLogInsert.show();
  }

}
