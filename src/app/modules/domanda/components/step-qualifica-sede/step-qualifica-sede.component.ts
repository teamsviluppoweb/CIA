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
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;

  filtroSedi: ReplaySubject<SediApiLSt[]> = new ReplaySubject<SediApiLSt[]>(1);
  listaSedi: SediApiLSt[];

  filtroQualifiche: ReplaySubject<QualificheApiLst[]> = new ReplaySubject<QualificheApiLst[]>(1);
  listaQualifiche: QualificheApiLst[];



  private onDetroy = new Subject<void>();


  constructor(private restApi: ApiService) {}

  ngOnInit() {

    this.onChangesForm();

    this.restApi.getListaSedi().subscribe(
        (Sedi: SediApiLSt[]) => {

            this.listaSedi = Sedi;

            this.filtroSedi.next(this.listaSedi.slice());

            this.setInitialValue(this.filtroSedi);

            if (this.restApi.operazione === 1) {
              this.sedeGiuridica.patchValue(this.restApi.domanda.anagCandidato.sedeAttuale.desc,  { emitEvent: false });
            }
        }
    );

    this.restApi.getListaQualifiche().subscribe(
        (Qualifiche: QualificheApiLst[]) => {

            this.listaQualifiche = Qualifiche;

            this.filtroQualifiche.next(this.listaQualifiche.slice());
            this.setInitialValue(this.filtroQualifiche);


            if (this.restApi.operazione === 1) {
            this.qualifica.patchValue(this.restApi.domanda.anagCandidato.qualificaAttuale.desc,  { emitEvent: false });
          }
        }
    );

  }


  ngOnDestroy() {
    this.filtroSedi.unsubscribe();
    this.filtroQualifiche.unsubscribe();

    this.onDetroy.next();
    this.onDetroy.complete();
  }

  private setInitialValue(data: (Observable<SediApiLSt[]> | Observable<QualificheApiLst[]>)) {
    data
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
          this.restApi.domanda.anagCandidato.sedeAttuale = input;
      });

      this.qualifica.valueChanges.subscribe((input) => {
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
