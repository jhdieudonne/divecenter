import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-blenderGauge',
  templateUrl: './blenderGauge.component.html',
  styleUrls: ['./blenderGauge.component.scss']
})
export class BlenderGaugeComponent implements OnInit {

  @Input() log: FormControl;
  @Output() cascadeChange = new EventEmitter<[string, number]>();
  @Input() name: String;
  @Input() type: String;


  constructor() { 
  }

  ngOnInit() {
  }

}
