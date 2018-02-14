import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-blenderTool',
  templateUrl: './blenderTool.component.html',
  styleUrls: ['./blenderTool.component.scss']
})
export class BlenderToolComponent implements OnInit {
  @Input() log:FormGroup;
  melangeGas: number[]=[0,0,0,0,0,0];


  constructor() {
   }

  ngOnInit() {
    this.calculateMelangeGas();
  }

  calculateMelangeGas() {
    this.melangeGas[1]=(this.log.get('pressure_result').value*this.log.get('n2_result').value/100 - this.log.get('pressure_init').value*this.log.get('n2_init').value/100)/0.79;
    this.melangeGas[0]=this.log.get('pressure_result').value*this.log.get('o2_result').value/100 - this.log.get('pressure_init').value*this.log.get('o2_init').value/100 - this.melangeGas[1]*0.21;
    this.melangeGas[2]=(this.log.get('pressure_result').value*this.log.get('he_result').value/100 - this.log.get('pressure_init').value*this.log.get('he_init').value/100);

    this.melangeGas[3]=(1.4/(+this.log.get('o2_result').value/100)-1)*10;
    this.melangeGas[4]=(1.6/(+this.log.get('o2_result').value/100)-1)*10;
    this.melangeGas[5]=(this.log.get('pressure_result').value*this.log.get('he_result').value/100 - this.log.get('pressure_init').value*this.log.get('he_init').value/100);
  }
}
