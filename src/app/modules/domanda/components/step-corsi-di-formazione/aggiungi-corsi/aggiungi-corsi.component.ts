import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ApiService} from '../../../../../core/services/api/api.service';
import {Observable} from 'rxjs';
import {CorsiApiLst} from '../../../../../core/models/api.interface';
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-aggiungi-corsi',
  templateUrl: './aggiungi-corsi.component.html',
  styleUrls: ['./aggiungi-corsi.component.scss']
})
export class AggiungiCorsiComponent implements OnInit {


  form: FormGroup;

  $nomiCorsiLst: Observable<any[] | CorsiApiLst>;


  constructor(private fb: FormBuilder,
              private restApi: ApiService,
              public dialogRef: MatDialogRef<AggiungiCorsiComponent>,
              @Inject(MAT_DIALOG_DATA) public dataDialog) {

    console.log(this.dataDialog);

    this.$nomiCorsiLst = this.restApi.getListaCorsi().pipe(
        tap((x) => console.log('corsi have been called', x))
    );

    this.form = this.fb.group({
      nomeCorso: ['', Validators.required],
      durataCorso: ['', Validators.required],
      dataDiConseguimento: ['', Validators.required],
      istituto: ['', Validators.required],
      luogo: ['', Validators.required],
      periodoConseguimento: ['', Validators.required],
    });

    this.OnChangesForms();


  }

  ngOnInit() {
    this.form.patchValue({
      nomeCorso: this.dataDialog.data.nomeCorso,
      durataCorso: this.dataDialog.data.durataCorso,
      dataDiConseguimento: this.dataDialog.data.dataDiConseguimento,
      istituto: this.dataDialog.data.istituto,
      luogo: this.dataDialog.data.luogo,
      periodoConseguimento: this.dataDialog.data.periodoConseguimento
    });
  }

  onNoClick(): void {
    this.dialogRef.close(this.dataDialog);
  }

  sendData() {
    this.dataDialog.data.isOkToInsert = true;
  }

  isFormReady() {
    return this.form.valid;
  }

  OnChangesForms() {
    this.nomeCorso.valueChanges.subscribe( (x) => {
      this.dataDialog.data.nomeCorso = x;
    });

    this.durataCorso.valueChanges.subscribe( (x) => {
      this.dataDialog.data.durataCorso = x;
    });

    this.dataDiConseguimento.valueChanges.subscribe( (x) => {
      this.dataDialog.data.dataDiConseguimento = x;
    });

    this.istituto.valueChanges.subscribe( (x) => {
      this.dataDialog.data.istituto = x;
    });

    this.luogo.valueChanges.subscribe( (x) => {
      this.dataDialog.data.luogo = x;
    });

    this.periodoConseguimento.valueChanges.subscribe( (x) => {
      this.dataDialog.data.periodoConseguimento = x;
    });

  }

  get nomeCorso() {
    return this.form.get('nomeCorso');
  }

  get durataCorso() {
    return this.form.get('durataCorso');
  }

  get dataDiConseguimento() {
    return this.form.get('dataDiConseguimento');
  }

  get istituto() {
    return this.form.get('istituto');
  }

  get luogo() {
    return this.form.get('luogo');
  }

  get periodoConseguimento() {
    return this.form.get('periodoConseguimento');
  }



}
