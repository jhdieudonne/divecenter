import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-blenderMix',
  templateUrl: './blenderMix.component.html',
  styleUrls: ['./blenderMix.component.css']
})
export class BlenderMixComponent implements OnInit {
  @Input() log:FormGroup;
  @Input() type:string;
  @Output() cascade = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

    
  cascadeChange(event:[string,string,number]) {
    const destName = event[0]+"_"+event[1];
    let oldValue = this.log.get(destName).value;
    let delta = event[2]-oldValue;

    const ref={'o2': ['he','n2'],'n2': ['he','o2'],'he': ['n2','o2']};
    const mirror = ref[event[0]][0]+"_"+event[1];
    const extra = ref[event[0]][1]+"_"+event[1];

    if (delta>0) {
      if (this.log.get(mirror).value-delta>0) {
        this.log.get(mirror).setValue(this.log.get(mirror).value-delta, {emitEvent: false});
      } else {
        this.log.get(mirror).setValue(0, {emitEvent: false});
        this.log.get(extra).setValue(100-event[2], {emitEvent: false});
      }
    } else {
      this.log.get(extra).setValue(100-event[2]-this.log.get(mirror).value, {emitEvent: false});
    }
    this.log.get(destName).setValue(event[2], {emitEvent: false}); 
    this.cascade.emit();
  }

}
