import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs';
import {
  ComuniLSt,
  ProvinceLSt,
  TipologiaTitoliDiStudioLSt,
  TitoliDiStudioIndirizzoLSt,
  TitoliDiStudioLSt
} from '../../../../../core/models/api.interface';
import {ApiService} from '../../../../../core/services/api/api.service';
import {concatMap, map} from 'rxjs/operators';




@Component({
  selector: 'app-aggiungi-dati',
  templateUrl: './aggiungi-dati.component.html',
  styleUrls: ['./aggiungi-dati.component.scss']
})
export class AggiungiDatiComponent implements OnInit {

  form: FormGroup;

  $tipologiaDiStudioLst: Observable<any[] | TipologiaTitoliDiStudioLSt>;
  $titoloDiStudioLst: Observable<any[] | TitoliDiStudioLSt>;
  $indirizzoDiTitoloLst: Observable<any[] | TitoliDiStudioIndirizzoLSt>;
  $province: Observable<any[] | ProvinceLSt>;
  $comuni: Observable<any[] | ComuniLSt>;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<AggiungiDatiComponent>,
              private restApi: ApiService,
              @Inject(MAT_DIALOG_DATA) public dataDialog) {


    this.$tipologiaDiStudioLst = this.restApi.getTipologiaTitoliDiStudio();
    this.$province = this.restApi.getProvince();

    this.form = this.fb.group({
      tipologia: ['', Validators.required],
      titoloDiStudio: ['', Validators.required],
      indirizzo: ['', Validators.required],
      dataDiConseguimento: ['', Validators.required],
      istituto: ['', Validators.required],
      luogo: ['', Validators.required],
      provincia: ['', Validators.required],
      comune: ['', Validators.required],
      periodoConseguimento: ['', Validators.required],
    });

    this.titoloDiStudio.disable();
    this.indirizzo.disable();
    this.comune.disable();
  }

  ngOnInit() {
    this.OnChangesForms();
    this.DropDownLogic();
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

  DropDownLogic() {
    this.$titoloDiStudioLst = this.tipologia.valueChanges.pipe(
        map( (x) => x.id),
        concatMap((x) => {
              this.titoloDiStudio.enable();
              return this.restApi.getTitoli(x);
            }
        ));

    this.$indirizzoDiTitoloLst = this.titoloDiStudio.valueChanges.pipe(
        map( (x) => x.id),
        concatMap((x) => {
              this.indirizzo.enable();
              return this.restApi.getIndirizzoTitoli(x);
            }
        ));

    this.$comuni = this.provincia.valueChanges.pipe(
        map( (x: ProvinceLSt) => x.codProvincia),
        concatMap((x) => {
          this.comune.enable();
          return this.restApi.getComuni(x);
        }
    ));

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
      this.dataDialog.data.provincia = x;
    });

    this.provincia.valueChanges.subscribe( (x) => {
      this.dataDialog.data.provincia = x;
    });

    this.comune.valueChanges.subscribe( (x) => {
      this.dataDialog.data.comune = x;
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

  get provincia() {
    return this.form.get('provincia');
  }

  get comune() {
    return this.form.get('comune');
  }

  get luogo() {
    return this.form.get('luogo');
  }

  get periodoConseguimento() {
    return this.form.get('periodoConseguimento');
  }



}
