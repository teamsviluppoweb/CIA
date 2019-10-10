import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MatStepper} from "@angular/material";

@Component({
  selector: 'app-step-dichiarazoini',
  templateUrl: './step-dichiarazoini.component.html',
  styleUrls: ['./step-dichiarazoini.component.scss']
})
export class StepDichiarazoiniComponent implements OnInit {

  @Input() parent: FormGroup;
  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;

  constructor() { }

  ngOnInit() {
  }

  get dichiarazione() {
    return this.parent.get('dichiarazione');
  }

  get uno() {
    return this.parent.get('dichiarazione.uno');
  }

  get due() {
    return this.parent.get('dichiarazione.due');
  }

  get tre() {
    return this.parent.get('dichiarazione.tre');
  }

  get quattro() {
    return this.parent.get('dichiarazione.quattro');
  }

}
