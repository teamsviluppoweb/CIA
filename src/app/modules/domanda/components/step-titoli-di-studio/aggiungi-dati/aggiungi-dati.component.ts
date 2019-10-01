import {ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSelect} from '@angular/material';
import {Observable, of, ReplaySubject, Subject} from 'rxjs';
import {
    ComuniLSt,
    ProvinceLSt, QualificheApiLst, SediApiLSt,
    TipologiaTitoliDiStudioLSt,
    TitoliDiStudioIndirizzoLSt,
    TitoliDiStudioLSt
} from '../../../../../core/models/api.interface';
import {ApiService} from '../../../../../core/services/api/api.service';
import {concatMap, filter, map, take, takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-aggiungi-dati',
  templateUrl: './aggiungi-dati.component.html',
  styleUrls: ['./aggiungi-dati.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AggiungiDatiComponent implements OnInit {

    @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  form: FormGroup;

  public tipologiaTitoliFilter: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
    // tslint:disable-next-line:variable-name
  tipologiaTitoli_lst: TitoliDiStudioLSt[];
  descrizioneTipologiaTitoli: string[];


  public titoliStudioFilter: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
    // tslint:disable-next-line:variable-name
  titoliStudio_lst: TitoliDiStudioLSt[];
  descrizioneTitoliStudio: string[];

  public indirzzoStudioFilter: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
    // tslint:disable-next-line:variable-name
  indirizzoStudio_lst: TitoliDiStudioLSt[];
  descrizioneIndirizzoStudio: string[];

    private onDetroy = new Subject<void>();


    constructor(private fb: FormBuilder,
                public dialogRef: MatDialogRef<AggiungiDatiComponent>,
                private restApi: ApiService,
                @Inject(MAT_DIALOG_DATA) public dataDialog) {



    this.form = this.fb.group({
      tipologia: ['', Validators.required],
      titoloDiStudio: ['', Validators.required],
      indirizzo: [''],
      dataDiConseguimento: ['', Validators.required],
      istituto: ['', Validators.required],
      luogo: ['', Validators.required],
      provincia: ['', Validators.required],
      comune: ['', Validators.required],
      periodoConseguimento: ['', Validators.required],

      tipologiaTitoliDropdown: [''],
      titoliStudioDropdown: [''],
      indirizzoStudioDropdown: [''],
    });



    this.restApi.getTipologiaTitoliDiStudio().pipe(
            concatMap( (Titoli: TitoliDiStudioLSt[]) => {

                this.tipologiaTitoli_lst = Titoli;
                this.setInitialValue(this.tipologiaTitoliFilter);

                // Gli passo un array di stringhe contenente solo i nomi delle province
                this.tipologiaTitoliFilter.next(this.tipologiaTitoli_lst.map(nome => nome.desc).slice());
                this.descrizioneTipologiaTitoli = this.tipologiaTitoli_lst.map(nome => nome.desc).slice();

                return this.restApi.getDomanda();
            })
        )  .subscribe(
            (x) => {
                console.log(x);
            }
        );


    }


    private setInitialValue(value) {
        value
            .pipe(take(1), takeUntil(this.onDetroy))
            .subscribe(() => {
                // setting the compareWith property to a comparison function
                // triggers initializing the selection according to the initial value of
                // the form control (i.e. _initializeSelection())
                // this needs to be done after the filteredBanks are loaded initially
                // and after the mat-option elements are available
                this.singleSelect.compareWith = (a: string, b: string) => a && b && a === b;
            });
    }




    private filterList(value, form, filters) {
        if (!value) {
            return;
        }
        // ottiene la keyword di ricerca
        let search = form.value;
        if (!search) {
            filters.next(value.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        // Filtra le province
        filters.next(
            value.filter(prov => prov.toLocaleLowerCase().indexOf(search) > -1)
        );
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

      this.tipologiaTitoliDropdown.valueChanges
          .pipe(takeUntil(this.onDetroy))
          .subscribe(() => {
              this.filterList(this.descrizioneTipologiaTitoli, this.tipologiaTitoliDropdown, this.tipologiaTitoliFilter);
          });

      this.titoliStudioDropdown.valueChanges
          .pipe(takeUntil(this.onDetroy))
          .subscribe(() => {
              this.filterList(this.descrizioneTitoliStudio, this.titoliStudioDropdown, this.titoliStudioFilter);
          });

      this.indirizzoStudioDropdown.valueChanges
          .pipe(takeUntil(this.onDetroy))
          .subscribe(() => {
              this.filterList(this.descrizioneIndirizzoStudio, this.indirizzoStudioDropdown, this.indirzzoStudioFilter);
          });


      this.tipologia.valueChanges.pipe(
          filter(() => this.tipologia.valid),
          map( () => {
              return this.tipologiaTitoli_lst
                  .filter(selected => selected.desc === this.tipologia.value)
                  .map(selected => selected.id)
                  .reduce(selected => selected);
          }),
          // Mi ricavo i titoli di studio
          concatMap(id => this.restApi.getTitoli(id))
      ).subscribe( (value: any[]) => {


          this.titoliStudio_lst = value;
          this.setInitialValue(this.titoliStudioFilter);

          // Gli passo un array di stringhe contenente solo i nomi dei titoli

          this.titoliStudioFilter.next(this.titoliStudio_lst.map(nome => nome.desc).slice());
          this.descrizioneTitoliStudio = this.titoliStudio_lst.map(nome => nome.desc).slice();
      });

      this.titoloDiStudio.valueChanges.pipe(
          filter(() => this.indirizzo.valid),
          map( () => {
              return this.titoliStudio_lst
                  .filter(selected => selected.desc === this.titoloDiStudio.value)
                  .map(selected => selected.id)
                  .reduce(selected => selected);
          }),
          // Mi ricavo i titoli di studio
          concatMap(id => this.restApi.getIndirizzoTitoli(id))
      ).subscribe( (value: any[]) => {


          this.indirizzoStudio_lst = value;
          this.setInitialValue(this.indirzzoStudioFilter);

          // Gli passo un array di stringhe contenente solo i nomi dei titoli

          this.indirzzoStudioFilter.next(this.indirizzoStudio_lst.map(nome => nome.desc).slice());
          this.descrizioneIndirizzoStudio = this.indirizzoStudio_lst.map(nome => nome.desc).slice();
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

  get tipologiaTitoliDropdown() {
    return this.form.get('tipologiaTitoliDropdown');
  }

  get titoliStudioDropdown() {
    return this.form.get('titoliStudioDropdown');
  }

  get indirizzoStudioDropdown() {
    return this.form.get('indirizzoStudioDropdown');
  }

}
