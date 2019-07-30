import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiService} from '../../../../core/services/api/api.service';



@Component({
  selector: 'app-step-qualifica-professionale',
  templateUrl: './step-qualifica-professionale.component.html',
  styleUrls: ['./step-qualifica-professionale.component.scss']
})
export class StepQualificaProfessionaleComponent implements OnInit {

  form: FormGroup;
  qualificheProfessionaliLst = ['vigile', 'caposquadra', 'test'];


  constructor(private fb: FormBuilder, private restApi: ApiService) {
    this.form = this.fb.group({
      qualificaProfessionale: [''],
    });
  }

  ngOnInit() {
  }

}
