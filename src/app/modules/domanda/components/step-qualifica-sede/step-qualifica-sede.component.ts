import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {QualificaSede, QualificheApiLst, SediApiLSt} from '../../../../core/models/api.interface';
import {ApiService} from '../../../../core/services/api/api.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-step-qualifica-sede',
  templateUrl: './step-qualifica-sede.component.html',
  styleUrls: ['./step-qualifica-sede.component.scss']
})
export class StepQualificaSedeComponent implements OnInit {

  form: FormGroup;

  $sediLst: Observable<any[] | SediApiLSt>;
  $qualificheLst: Observable<any[] | QualificheApiLst>;

  constructor(private fb: FormBuilder, private restApi: ApiService) {

    this.$qualificheLst = this.restApi.getListaQualifiche();
    this.$sediLst = this.restApi.getListaSedi();

    this.form = this.fb.group({
      qualifica: [''],
      sedeGiuridica: [''],
    });

  }

  ngOnInit() {
    this.$qualificheLst = this.restApi.getListaQualifiche();
    this.$sediLst = this.restApi.getListaSedi();
  }

  get qualifica() {
    return this.form.get('qualifica');
  }

  get sedeGiuridica() {
    return this.form.get('sedeGiuridica');
  }


}
