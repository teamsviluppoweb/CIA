import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {QualificaSede, QualificheApiLst, SediApiLSt} from '../../../../core/models/api.interface';
import {ApiService} from '../../../../core/services/api/api.service';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {MatSelect} from '@angular/material';
import {concatMap, filter, map, take, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-step-qualifica-sede',
  templateUrl: './step-qualifica-sede.component.html',
  styleUrls: ['./step-qualifica-sede.component.scss']
})
export class StepQualificaSedeComponent implements OnInit, OnDestroy {

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  form: FormGroup;

  // Lista delle qualifiche filtrate dalle parole chiavi nel campo
  $sediLst: Observable<any[] | SediApiLSt>;

  public filtroSedi: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  public filtroQualifiche: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);

  // Lista oggetto sedi
  listaSedi: SediApiLSt[];
  listaQualifiche: QualificheApiLst[];

  // Lista descrizione sedi
  listaDescrizioneSedi: string[];
  listaDescrizioneQualifiche: string[];

  $qualificheLst: Observable<any[] | QualificheApiLst>;

  private onDetroy = new Subject<void>();


  constructor(private fb: FormBuilder, private restApi: ApiService) {

    this.$qualificheLst = this.restApi.getListaQualifiche();
    this.$sediLst = this.restApi.getListaSedi();

    this.form = this.fb.group({
      sedeGiuridica: [''],
      qualifica: [''],

      sedeDropdown: [''],
      qualificaDropdown: [''],
    });

    this.onChanges();

  }

  ngOnInit() {

    this.restApi.getListaSedi().subscribe(
        (Sedi: SediApiLSt[]) => {

            console.log(Sedi);

            this.listaSedi = Sedi;

            // Gli passo un array di stringhe contenente solo i nomi delle province
            this.filtroSedi.next(this.listaSedi.map(nome => nome.desc).slice());
            this.listaDescrizioneSedi = this.listaSedi.map(nome => nome.desc).slice();
            this.setInitialValue(this.filtroSedi);

            if (this.restApi.domanda.stato === 1) {
              this.sedeGiuridica.patchValue(this.restApi.domanda.anagCandidato.sedeAttuale.desc,  { emitEvent: false });
            }
        }
    );

    this.restApi.getListaQualifiche().subscribe(
        (Qualifiche: QualificheApiLst[]) => {

            this.listaQualifiche = Qualifiche;

            // Gli passo un array di stringhe contenente solo i nomi delle province
            this.filtroQualifiche.next(this.listaQualifiche.map(nome => nome.desc).slice());
            this.setInitialValue(this.filtroQualifiche);

            this.listaDescrizioneQualifiche = this.listaQualifiche.map(nome => nome.desc).slice();

            if (this.restApi.domanda.stato === 1) {
            this.qualifica.patchValue(this.restApi.domanda.anagCandidato.qualificaAttuale.desc,  { emitEvent: false });
          }
        }
    );

    this.onChanges();
  }


  ngOnDestroy() {
    this.filtroSedi.unsubscribe();
    this.filtroQualifiche.unsubscribe();

    this.onDetroy.next();
    this.onDetroy.complete();
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


  onChanges() {

      this.sedeGiuridica.valueChanges.subscribe((x) => {
      });

    // Analizza i cambiamenti del testo nel campo di ricerca del dropdown search dei comuni
      this.sedeDropdown.valueChanges
        .pipe(takeUntil(this.onDetroy))
        .subscribe(() => {
          this.filterList(this.listaDescrizioneSedi, this.sedeDropdown, this.filtroSedi);
        });

    // Analizza i cambiamenti del testo nel campo di ricerca del dropdown search dei comuni
      this.qualificaDropdown.valueChanges
        .pipe(takeUntil(this.onDetroy))
        .subscribe(() => {
          this.filterList(this.listaDescrizioneQualifiche, this.qualificaDropdown, this.filtroQualifiche);
        });

  }


    SerializeData() {
        this.restApi.domanda.anagCandidato.qualificaAttuale = this.listaQualifiche.
            filter(selected => selected.desc === this.qualifica.value)
            .map(selected => selected)
            .reduce(selected => selected);

        this.restApi.domanda.anagCandidato.sedeAttuale = this.listaSedi.
        filter(selected => selected.desc === this.sedeGiuridica.value)
            .map(selected => selected)
            .reduce(selected => selected);


        console.log(
            this.restApi.domanda
        );
    }

  get qualifica() {
    return this.form.get('qualifica');
  }

  get sedeGiuridica() {
    return this.form.get('sedeGiuridica');
  }

  get sedeDropdown() {
    return this.form.get('sedeDropdown');
  }

  get qualificaDropdown() {
    return this.form.get('qualificaDropdown');
  }

}
