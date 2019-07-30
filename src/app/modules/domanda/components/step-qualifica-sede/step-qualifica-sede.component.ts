import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {QualificaSede} from '../../../../core/models/api.interface';
import {ApiService} from "../../../../core/services/api/api.service";

@Component({
  selector: 'app-step-qualifica-sede',
  templateUrl: './step-qualifica-sede.component.html',
  styleUrls: ['./step-qualifica-sede.component.scss']
})
export class StepQualificaSedeComponent implements OnInit {

  form: FormGroup;

  sediLst = ['roma', 'milano', 'lazio'];
  qualificheLst = ['vigile', 'caposquadra', 'test'];

  constructor(private fb: FormBuilder, private restApi: ApiService) {
    this.form = this.fb.group({
      qualifica: [''],
      sedeGiuridica: [''],

      qualificaDichiarata: [''],
      sedeGiuriridicaDichiarata: [''],
    });

    this.qualifica.disable();
    this.sedeGiuridica.disable();

  }

  ngOnInit() {
   this.restApi.getQualificaSede().subscribe(
     (data: QualificaSede) => {
       this.form.patchValue({
         qualifica: data.qualifica,
         sedeGiuridica: data.sede,

       });
     }
   );
  }

  get qualifica() {
    return this.form.get('qualifica');
  }

  get sedeGiuridica() {
    return this.form.get('sedeGiuridica');
  }


}
