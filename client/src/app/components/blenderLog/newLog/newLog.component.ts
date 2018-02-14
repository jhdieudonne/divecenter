import { Component, Inject, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSliderChange } from '@angular/material';



@Component({
  selector: 'blenderLog-newLog',
  templateUrl: './newLog.component.html',
  styleUrls: ['./newLog.component.scss']
})

export class NewLogComponent {
  @Output() refreshParent: EventEmitter<String> = new EventEmitter<String>(); //creating an output event
  @ViewChild('signaturePad') signaturePad: SignaturePad;
  log: FormGroup;
  @Input() structureBottle: any[];

  creationOngoing: boolean = false;
  signature: string = "";

  constructor(private api: ApiService, fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<NewLogComponent>) {
    this.log = fb.group({
        'o2_result': [32, Validators.compose([Validators.min(0),Validators.max(100)])],
        'he_result': [0, Validators.compose([Validators.min(0),Validators.max(100)])],
        'n2_result': [68, Validators.compose([Validators.min(0),Validators.max(100)])],
        'pressure_result': [300, Validators.compose([Validators.min(0),Validators.max(999)])],
        'o2_init': [32, Validators.compose([Validators.min(0),Validators.max(100)])],
        'he_init': [0, Validators.compose([Validators.min(0),Validators.max(100)])],
        'n2_init': [68, Validators.compose([Validators.min(0),Validators.max(100)])],
        'pressure_init': [100, Validators.compose([Validators.min(0),Validators.max(999)])],
        'gaz': ['air', Validators.required],
        'bottleId': [null, Validators.required],
        'destination': ['customer', Validators.required],
        'topoff': [false, Validators.required],
        'bank32': [true, Validators.required]
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
    this.api.create('blenderLog', 
      {
        gaz: this.log.get('gaz').value,
        o2: this.log.get('o2').value,
        topoff: this.log.get('topoff').value,
        bottleId: this.log.get('bottleId').value,
        createdt:new Date(),
        destination: this.log.get('destination').value,
        signature: this.signature?this.signature:null
      }).subscribe((payload)=> {
        this.creationOngoing=false;
        this.refreshParent.emit();
        this.dialogRef.close(); 
    });
  }

  public close() {
    this.dialogRef.close();
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    this.signature=this.signaturePad.toDataURL().substring(22);  // remove image/png;base64, => 22 chars
  }
}
