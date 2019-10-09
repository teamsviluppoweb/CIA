import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
export class AggiungiDatiComponent implements OnInit, OnDestroy {

    @ViewChild('singleSelect', {static: true}) singleSelect: MatSelect;

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

    public provinceFilter: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
    // tslint:disable-next-line:variable-name
    province_lst: ProvinceLSt[];
    provinceNomi: string[];


    public comuniFitler: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
    // tslint:disable-next-line:variable-name
    comuni_lst: ComuniLSt[];
    comuniNomi: string[];


    test;
    private onDetroy = new Subject<void>();


    ngOnDestroy() {
        this.onDetroy.next();
        this.onDetroy.complete();

    }

    constructor(private fb: FormBuilder,
                public dialogRef: MatDialogRef<AggiungiDatiComponent>,
                private restApi: ApiService,
                @Inject(MAT_DIALOG_DATA) public dataDialog) {

        this.form = this.createForm();
        this.OnChangesForms();



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


    private createForm() {
        return this.fb.group({
            tipologia: ['', Validators.required],
            titoloDiStudio: ['', Validators.required],
            indirizzo: [''],
            dataDiConseguimento: ['', Validators.required],
            istituto: ['', Validators.required],
            luogo: ['', Validators.required],
            provincia: [''],
            comune: [''],
            periodoConseguimento: ['', Validators.required],

            tipologiaTitoliDropdown: [''],
            titoliStudioDropdown: [''],
            indirizzoStudioDropdown: [''],
            provinceDropdown: [''],
            comuniDropdown: [''],
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

        this.test = this.restApi.getTipologiaTitoliDiStudio().subscribe(
            (Titoli: TitoliDiStudioLSt[]) => {

                this.tipologiaTitoli_lst = Titoli;

                // Gli passo un array di stringhe contenente solo i nomi delle province
                this.tipologiaTitoliFilter.next(this.tipologiaTitoli_lst.map(nome => nome.desc).slice());
                this.setInitialValue(this.tipologiaTitoliFilter);

                this.descrizioneTipologiaTitoli = this.tipologiaTitoli_lst.map(nome => nome.desc).slice();

                if (this.dataDialog.data.isEditing) {
                    this.form.patchValue({
                        tipologia: this.dataDialog.data.tipologia.desc,
                        dataDiConseguimento: this.dataDialog.data.dataDiConseguimento,
                        istituto: this.dataDialog.data.istituto,
                        luogo: this.dataDialog.data.luogo,
                        periodoConseguimento: this.dataDialog.data.periodoConseguimento,
                    }, {emitEvent: true});
                }
            }
        );
        this.restApi.getProvince()
            .pipe(
                concatMap( (Province: ProvinceLSt[]) => {

                    this.province_lst = Province;
                    this.setInitialValue(this.provinceFilter);

                    // Gli passo un array di stringhe contenente solo i nomi delle province
                    this.provinceFilter.next(this.province_lst.map(nome => nome.nome).slice());
                    this.provinceNomi = this.province_lst.map(nome => nome.nome).slice();

                    return this.restApi.getDomanda();
                }),
            )
            .subscribe(
                (domanda) => {
                   // this.provincia.patchValue(this.dataDialog.data.provincia);
                }
            );

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    sendData() {

        this.dataDialog.data.tipologia = this.tipologiaTitoli_lst.
            filter(selected => selected.desc === this.tipologia.value)
            .map(selected => selected)
            .reduce(selected => selected);

        if (this.titoloDiStudio.value) {
            this.dataDialog.data.titoloDiStudio = this.titoliStudio_lst.filter(selected => selected.desc === this.titoloDiStudio.value)
                .map(selected => selected)
                .reduce(selected => selected);
        }

        if (this.indirizzo.value) {
            this.dataDialog.data.indirizzo = this.indirizzoStudio_lst.
            filter(selected => selected.desc === this.indirizzo.value)
                .map(selected => selected)
                .reduce(selected => selected);
        }


        this.dataDialog.data.isOkToInsert = true;
        this.dataDialog.data.isEditing = false;
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
            map(() => {

                return this.tipologiaTitoli_lst
                    .filter(selected => selected.desc === this.tipologia.value)
                    .map(selected => selected.id)
                    .reduce(selected => selected);
            }),
            // Mi ricavo i titoli di studio
            concatMap(id => this.restApi.getTitoli(id))
        ).subscribe((value: any[]) => {


            this.titoliStudio_lst = value;

            // Gli passo un array di stringhe contenente solo i nomi dei titoli

            this.titoliStudioFilter.next(this.titoliStudio_lst.map(nome => nome.desc).slice());
            this.setInitialValue(this.titoliStudioFilter);

            this.descrizioneTitoliStudio = this.titoliStudio_lst.map(nome => nome.desc).slice();


            if (this.dataDialog.data.isEditing) {
                this.titoloDiStudio.patchValue(this.dataDialog.data.titoloDiStudio.desc);
            }
        });

        this.titoloDiStudio.valueChanges.pipe(
            filter(() => this.indirizzo.valid),
            map(() => {

                return this.titoliStudio_lst
                    .filter(selected => selected.desc === this.titoloDiStudio.value)
                    .map(selected => selected.id)
                    .reduce(selected => selected);

            }),
            // Mi ricavo i titoli di studio
            concatMap(id => this.restApi.getIndirizzoTitoli(id))
        ).subscribe((value: any[]) => {


            this.indirizzoStudio_lst = value;

            // Gli passo un array di stringhe contenente solo i nomi dei titoli

            this.indirzzoStudioFilter.next(this.indirizzoStudio_lst.map(nome => nome.desc).slice());
            this.setInitialValue(this.indirzzoStudioFilter);

            this.descrizioneIndirizzoStudio = this.indirizzoStudio_lst.map(nome => nome.desc).slice();

            if (this.dataDialog.data.isEditing) {
                this.indirizzo.patchValue(this.dataDialog.data.indirizzo.desc);
                this.dataDialog.data.isEditing = false;
            }
        });


        this.provincia.valueChanges
            .pipe(
                // Mi assicuro che il valore nel form sia valido
                filter(() => this.provincia.valid),
                // Mi ricavo il codice provincia per ricavare i comuni
                map(() => {

                    return this.province_lst
                        .filter(selected => selected.nome === this.provincia.value)
                        .map(selected => selected.codice)
                        .reduce(selected => selected);
                }),
                // Mi ricavo i comuni
                concatMap(val => this.restApi.getComuni(val))
            )
            .subscribe((value: any[]) => {

                this.comuni_lst = value;


                this.comuniFitler.next(this.comuni_lst.map(nomes => nomes.nome).slice());
                this.setInitialValue(this.comuniFitler);

                this.comuniNomi = this.comuni_lst.map(nomes => nomes.nome).slice();


                if (this.dataDialog.data.isEditing) {
                    this.comune.patchValue(this.dataDialog.data.comune);
                }

            });

        this.tipologia.valueChanges.subscribe((x) => {
        });

        this.titoloDiStudio.valueChanges.subscribe((x) => {
        });

        this.indirizzo.valueChanges.subscribe((x) => {
        });

        this.dataDiConseguimento.valueChanges.subscribe((x) => {
            this.dataDialog.data.dataDiConseguimento = x;
        });

        this.istituto.valueChanges.subscribe((x) => {
            this.dataDialog.data.istituto = x;
        });

        this.luogo.valueChanges.subscribe((x) => {
            this.dataDialog.data.luogo = x;
        });

        this.provincia.valueChanges.subscribe((x) => {
            this.dataDialog.data.provincia = x;
        });

        this.comune.valueChanges.subscribe((x) => {
            this.dataDialog.data.comune = x;
        });

        this.periodoConseguimento.valueChanges.subscribe((x) => {
            this.dataDialog.data.periodoConseguimento = x;
        });

        // Analizza i cambiamenti del testo nel campo di ricerca del dropdown search dei comuni
        this.comuniDropdown.valueChanges
            .pipe(takeUntil(this.onDetroy))
            .subscribe(() => {
                this.filterList(this.comuniNomi, this.comuniDropdown, this.comuniFitler);
            });

        // Analizza i cambiamenti del testo nel campo di ricerca del dropdown search delle province
        this.provinceDropdown.valueChanges
            .pipe(takeUntil(this.onDetroy))
            .subscribe(() => {
                this.filterList(this.provinceNomi, this.provinceDropdown, this.provinceFilter);
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

    get provinceDropdown() {
        return this.form.get('provinceDropdown');
    }

    get comuniDropdown() {
        return this.form.get('comuniDropdown');
    }

}
