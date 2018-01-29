import { Component, Inject, ViewChild, Input } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';



@Component({
  selector: 'blenderLog-newLog',
  templateUrl: './newLog.component.html',
  styleUrls: ['./newLog.component.scss']
})

export class NewLogComponent {
  @ViewChild('signaturePad') signaturePad: SignaturePad;

  log: FormGroup;
  @Input() structureBottle: any[];

  creationOngoing: boolean = false;

  constructor(private api: ApiService, fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<NewLogComponent>) {
    this.log = fb.group({
        'o2': [32, Validators.compose([Validators.min(1),Validators.max(99)])],
        'gaz': ['air', Validators.required],
        'bottleId': [null, Validators.required],
        'destination': ['customer', Validators.required]
      });
  }
  
  public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 2,
    'canvasHeight': 300,
    'canvasWidth': 500,
    'backgroundColor': '#efefef',
  };

  private createLog() {
    this.creationOngoing=true;
  }

  public close() {
    this.dialogRef.close();
  }
}
