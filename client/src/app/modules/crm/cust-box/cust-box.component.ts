import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cust-box',
  templateUrl: './cust-box.component.html',
  styleUrls: ['./cust-box.component.css']
})
export class CustBoxComponent implements OnInit {
  custBox: FormGroup;

  constructor(private fb:FormBuilder) {
    this.custBox = fb.group({
      'custId': [''],
      'telNbr': [''],
      'lastName': [''],
      'zip': [''],
      'birthdate': ['']
    });
   }

  ngOnInit() {
  }

}
