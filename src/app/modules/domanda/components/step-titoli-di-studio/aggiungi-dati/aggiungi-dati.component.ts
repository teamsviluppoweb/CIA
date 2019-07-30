import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';




@Component({
  selector: 'app-aggiungi-dati',
  templateUrl: './aggiungi-dati.component.html',
  styleUrls: ['./aggiungi-dati.component.scss']
})
export class AggiungiDatiComponent implements OnInit {

  form: FormGroup;

  tipologieTitoliLst = ['tipo 1', 'tipo 2', 'tipe 3'];
  titoloDiStudioLst = ['tipo 1', 'tipo 2', 'tipe 3'];
  indirizzoDiTitoloLst = ['tipo 1', 'tipo 2', 'tipe 3'];

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<AggiungiDatiComponent>,
              @Inject(MAT_DIALOG_DATA) public dataDialog) {

    console.log(this.dataDialog);

    this.form = this.fb.group({
      tipologia: ['', Validators.required],
      titoloDiStudio: ['', Validators.required],
      indirizzo: ['', Validators.required],
      dataDiConseguimento: ['', Validators.required],
      istituto: ['', Validators.required],
      luogo: ['', Validators.required],
      periodoConseguimento: ['', Validators.required],
    });

  }

  ngOnInit() {
    this.OnChangesForms();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendData() {
    this.dataDialog.data.isOkToInsert = true;
  }

  isFormReady() {
    return this.form.valid;
  }

  OnChangesForms() {
    this.tipologia.valueChanges.subscribe( (x) => {
      this.dataDialog.data.tipologia = x;
    });

    this.titoloDiStudio.valueChanges.subscribe( (x) => {
      this.dataDialog.data.titoloDiStudio = x;
    });

    this.indirizzo.valueChanges.subscribe( (x) => {
      this.dataDialog.data.indirizzo = x;
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

  get tipologia() {
    return this.form.get('tipologia');
  }

  get titoloDiStudio() {
    return this.form.get('titoloDiStudio');
  }

  get indirizzo() {
    return this.form.get('indirizzo');
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
