import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {QualificheApiLst, SediApiLSt} from '../../../../core/models/api.interface';
import {ApiService} from '../../../../core/services/api/api.service';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {MatSelect, MatStepper} from '@angular/material';
import {take, takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-step-qualifica-sede',
  templateUrl: './step-qualifica-sede.component.html',
  styleUrls: ['./step-qualifica-sede.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepQualificaSedeComponent implements OnInit, OnDestroy {

  @Input() parent: FormGroup;
  @ViewChild('sediSelect', { static: true }) sediSelect: MatSelect;
  @ViewChild('qualificheSelect', { static: true }) qualificheSelect: MatSelect;

  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;

  filtroSedi: ReplaySubject<SediApiLSt[]> = new ReplaySubject<SediApiLSt[]>(1);
  listaSedi: SediApiLSt[];

  filtroQualifiche: ReplaySubject<QualificheApiLst[]> = new ReplaySubject<QualificheApiLst[]>(1);
  listaQualifiche: QualificheApiLst[];

  isQualificaMismatched: boolean;
  qualificainvalida: QualificheApiLst;


  private onDetroy = new Subject<void>();


  constructor(private restApi: ApiService) {
      this.isQualificaMismatched = false;
  }

  ngOnInit() {

    this.onChangesForm();


    this.restApi.getListaSedi().subscribe(
        (Sedi: SediApiLSt[]) => {

            this.listaSedi = Sedi;

            this.filtroSedi.next(this.listaSedi.slice());
            this.setInitialSediValue(this.filtroSedi);

            this.sedeGiuridica.patchValue( this.listaSedi
                      .filter(x => x.desc === this.restApi.domanda.anagCandidato.sedeAttuale.desc)
                      .map(x => x)
                      .reduce(x => x)
                  ,  { emitEvent: false });

        }
    );

    this.restApi.getListaQualifiche().subscribe(
        (Qualifiche: QualificheApiLst[]) => {


            this.listaQualifiche = Qualifiche;

            /*
            * Controllo se la qualifica del candidato esiste nella lista attuale delle qualifiche, se non esiste allora
            * la salvo e la inserisco nel lista delle qualifche per tenerla sempre d'occhio nel onChange del form e
            * avverto il candidato che la sua qualifica non è valida per il concorso attuale
            * */

            this.isQualificaMismatched = (this.listaQualifiche
                .filter(x => this.restApi.domanda.anagCandidato.qualificaAttuale.desc === x.desc).length < 1);

            if (this.isQualificaMismatched) {
                this.qualificainvalida = this.restApi.domanda.anagCandidato.qualificaAttuale;
                this.listaQualifiche.push(this.restApi.domanda.anagCandidato.qualificaAttuale);
                this.listaQualifiche.slice();
                this.qualificheSelect._onFocus();
            }

            this.filtroQualifiche.next(this.listaQualifiche.slice());
            this.setInitialQualificheValue(this.filtroQualifiche);


            this.qualifica.patchValue( this.listaQualifiche
                        .filter(x => x.desc === this.restApi.domanda.anagCandidato.qualificaAttuale.desc)
                        .map(x => x)
                        .reduce(x => x)
                    ,  { emitEvent: false });




        }
    );

  }


  ngOnDestroy() {
    this.filtroSedi.unsubscribe();
    this.filtroQualifiche.unsubscribe();

    this.onDetroy.next();
    this.onDetroy.complete();
  }




    private setInitialSediValue(data: Observable<SediApiLSt[]>) {
    data
        .pipe(take(1), takeUntil(this.onDetroy))
        .subscribe(() => {
          // setting the compareWith property to a comparison function
          // triggers initializing the selection according to the initial value of
          // the form control (i.e. _initializeSelection())
          // this needs to be done after the filteredBanks are loaded initially
          // and after the mat-option elements are available


          this.sediSelect.compareWith = (a: string, b: string) => a && b && a === b;
        });
    }

    private setInitialQualificheValue(data: Observable<SediApiLSt[]>) {
        data
            .pipe(take(1), takeUntil(this.onDetroy))
            .subscribe(() => {
                // setting the compareWith property to a comparison function
                // triggers initializing the selection according to the initial value of
                // the form control (i.e. _initializeSelection())
                // this needs to be done after the filteredBanks are loaded initially
                // and after the mat-option elements are available


                this.sediSelect.compareWith = (a: string, b: string) => a && b && a === b;
            });
    }




    private filtraRicerca(qualifica: (QualificheApiLst[] | SediApiLSt[]), form, filters) {
        if (!qualifica) {
            return;
        }
        // ottiene la keyword di ricerca
        let search = form.value;
        if (!search) {
            filters.next(qualifica.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        // Filtra le province
        filters.next(
            qualifica.filter(nm => nm.desc.toLocaleLowerCase().indexOf(search) > -1)
        );
    }


    onChangesForm() {

      this.sedeGiuridica.valueChanges.subscribe((input) => {
          console.log(this.sedeGiuridica.value);
          this.restApi.domanda.anagCandidato.sedeAttuale = input;
      });

      this.qualifica.valueChanges.subscribe((input: QualificheApiLst) => {
          this.isQualificaMismatched = input.desc === this.qualificainvalida.desc;
          this.restApi.domanda.anagCandidato.qualificaAttuale = input;
      });

      this.sedeDropdown.valueChanges
        .pipe(takeUntil(this.onDetroy))
        .subscribe(() => {
          this.filtraRicerca(this.listaSedi, this.sedeDropdown, this.filtroSedi);
        });

      this.qualificaDropdown.valueChanges
        .pipe(takeUntil(this.onDetroy))
        .subscribe(() => {
          this.filtraRicerca(this.listaQualifiche, this.qualificaDropdown, this.filtroQualifiche);
        });

  }


  get sediQualifiche() {
      return this.parent.get('sediQualifiche');
  }

  get qualifica() {
    return this.parent.get('sediQualifiche.qualifica');
  }

  get sedeGiuridica() {
    return this.parent.get('sediQualifiche.sedeGiuridica');
  }

  get sedeDropdown() {
    return this.parent.get('sediQualifiche.sedeDropdown');
  }

  get qualificaDropdown() {
    return this.parent.get('sediQualifiche.qualificaDropdown');
  }

}
