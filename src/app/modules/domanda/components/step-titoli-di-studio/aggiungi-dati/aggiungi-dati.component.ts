import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Observable, of} from 'rxjs';
import {
  ComuniLSt,
  ProvinceLSt,
  TipologiaTitoliDiStudioLSt,
  TitoliDiStudioIndirizzoLSt,
  TitoliDiStudioLSt
} from '../../../../../core/models/api.interface';
import {ApiService} from '../../../../../core/services/api/api.service';
import {catchError, concatMap, filter, map, switchMap} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';


@Component({
  selector: 'app-aggiungi-dati',
  templateUrl: './aggiungi-dati.component.html',
  styleUrls: ['./aggiungi-dati.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AggiungiDatiComponent implements OnInit {

  form: FormGroup;

  $tipologiaDiStudioLst: Observable<any[] | TipologiaTitoliDiStudioLSt>;
  $titoloDiStudioLst: Observable<any[] | TitoliDiStudioLSt>;
  $indirizzoDiTitoloLst: Observable<any[] | HttpResponse<TitoliDiStudioIndirizzoLSt | Response>>;
  $province: Observable<any[] | ProvinceLSt>;
  $comuni: Observable<any[] | ComuniLSt>;

  isIndirizziValid = false;

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
              this.indirizzo.reset();
              this.indirizzo.disable();
              return this.restApi.getTitoli(x);
            }
        ));

    this.$indirizzoDiTitoloLst = this.titoloDiStudio.valueChanges.pipe(
        map( (x) => x.id),
        filter((x) => {
          if (x) {
            return true;
          }
          this.indirizzo.reset();
          this.indirizzo.disable();
          return false;
        }),
        switchMap((x) => {

              this.indirizzo.enable();
              console.log('dsds', x);
              x = x.replace('/', '%2F');
              console.log('dsds', x);
              return this.restApi.getIndirizzoTitoli(x).pipe(
                  map((y: HttpResponse<TitoliDiStudioIndirizzoLSt[]> ) => {

                    // Se la lista è vuota allora non è obbligatoria
                    console.log(y.body.length, 'size', y.body.length);


                    if (y.body.length < 1) {
                        this.isIndirizziValid = false;
                        this.indirizzo.reset();
                        this.indirizzo.disable();
                        console.clear();
                        console.log(this.$indirizzoDiTitoloLst, 'yey');
                        return null;
                    }

                    this.isIndirizziValid = true;
                    console.log('ma ci arriva dio');
                    return y.body;
                  }),
              );
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
