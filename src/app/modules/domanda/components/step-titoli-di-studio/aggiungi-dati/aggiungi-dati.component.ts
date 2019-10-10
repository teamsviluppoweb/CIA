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


    private onDetroy = new Subject<void>();

    displayIndirizzi = false;

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
            titolo: ['', Validators.required],
            indirizzo: [''],
            dataConseguimento: ['', Validators.required],
            istituto: ['', Validators.required],
            provincia: [''],
            comune: [''],
            durataAnni: ['', Validators.required],

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

        this.restApi.getTipologiaTitoliDiStudio().subscribe(
            (Titoli: TitoliDiStudioLSt[]) => {

                this.tipologiaTitoli_lst = Titoli;

                // Gli passo un array di stringhe contenente solo i nomi delle province
                this.tipologiaTitoliFilter.next(this.tipologiaTitoli_lst.map(nome => nome.desc).slice());
                this.setInitialValue(this.tipologiaTitoliFilter);

                this.descrizioneTipologiaTitoli = this.tipologiaTitoli_lst.map(nome => nome.desc).slice();

                if (this.dataDialog.data.isEditing) {
                    this.form.patchValue({
                        tipologia: this.dataDialog.data.tipologia.desc,
                        dataConseguimento: this.dataDialog.data.dataConseguimento,
                        istituto: this.dataDialog.data.istituto,
                        durataAnni: this.dataDialog.data.durataAnni,
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
                   if (this.dataDialog.data.isEditing) {
                       const nomeProvincia = this.province_lst.
                       filter(selected => selected.codice === this.dataDialog.data.luogoIstituto.codiceProvincia)
                           .map(selected => selected.nome)
                           .reduce(selected => selected);

                       this.provincia.patchValue(nomeProvincia);
                   }
                }
            );

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    sendData() {

        // Patch data conseguimento

        this.dataDialog.data.dataConseguimento = this.dataConseguimento.value;

        // Patch durata anni

        this.dataDialog.data.durataAnni = this.durataAnni.value;

        // Patch istituto

        this.dataDialog.data.istituto = this.istituto.value;

        // Patch tipologia

        this.dataDialog.data.tipologia = this.tipologiaTitoli_lst.
            filter(selected => selected.desc === this.tipologia.value)
            .map(selected => selected)
            .reduce(selected => selected);

        // Patch titoli


        this.dataDialog.data.titolo = this.titoliStudio_lst.
        filter(selected => selected.desc === this.titolo.value)
            .map(selected => selected)
            .reduce(selected => selected);


        /*
        Visto che gli indirizzi possono essere vuoti, mi controllo che l'array non sia vuoto altrimenti
        mi triggera un errore in console
         */


        const hasIndirizzoValue = this.indirizzoStudio_lst.
        filter(selected => selected.desc === this.indirizzo.value)
            .map(selected => selected).length > 0;


        if (hasIndirizzoValue) {
            this.dataDialog.data.indirizzo = this.indirizzoStudio_lst.
            filter(selected => selected.desc === this.indirizzo.value)
                .map(selected => selected)
                .reduce(selected => selected);
        } else {
            this.dataDialog.data.indirizzo.desc = '';
            this.dataDialog.data.indirizzo.id = '';
        }


        // PATCH LUOGO

        this.dataDialog.data.luogoIstituto = this.comuni_lst.
            filter(selected => selected.nome === this.comune.value)
            .map(selected => selected)
            .reduce(selected => selected);

        this.dataDialog.data.isOkToInsert = true;
        this.dataDialog.data.isEditing = false;

        console.log(this.dataDialog.data);
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
            map((x) => {



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


            if (this.dataDialog.data.isTitoloE) {
                this.titolo.patchValue(this.dataDialog.data.titolo.desc);
                this.dataDialog.data.isTitoloE = false;
            }
        });

        this.titolo.valueChanges.pipe(
            filter(() => this.titolo.valid),
            map(() => {



                    return this.titoliStudio_lst
                        .filter(selected => selected.desc === this.titolo.value)
                        .map(selected => selected.id)
                        .reduce(selected => selected);

            }),
            // Mi ricavo i titoli di studio
            concatMap(id => this.restApi.getIndirizzoTitoli(id))
        ).subscribe((value: any[]) => {

            if (value.length > 0) {
                this.displayIndirizzi = true;
            } else {
                this.displayIndirizzi = false;
            }

            this.indirizzoStudio_lst = value;

            // Gli passo un array di stringhe contenente solo i nomi dei titoli

            this.indirzzoStudioFilter.next(this.indirizzoStudio_lst.map(nome => nome.desc).slice());
            this.setInitialValue(this.indirzzoStudioFilter);

            this.descrizioneIndirizzoStudio = this.indirizzoStudio_lst.map(nome => nome.desc).slice();

            if (this.dataDialog.data.isIndirizzoE) {
                this.indirizzo.patchValue(this.dataDialog.data.indirizzo.desc);
                this.dataDialog.data.isIndirizzoE = false;
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


                if (this.dataDialog.data.isComuneE) {
                    this.comune.patchValue(this.dataDialog.data.luogoIstituto.nome);
                }

            });

        this.tipologia.valueChanges.subscribe((x) => {
        });

        this.titolo.valueChanges.subscribe((x) => {
        });

        this.indirizzo.valueChanges.subscribe((x) => {
        });

        this.dataConseguimento.valueChanges.subscribe((x) => {
        });

        this.istituto.valueChanges.subscribe((x) => {
        });

        this.provincia.valueChanges.subscribe((x) => {
        });

        this.comune.valueChanges.subscribe((x) => {
        });

        this.durataAnni.valueChanges.subscribe((x) => {
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

    get titolo() {
        return this.form.get('titolo');
    }

    get indirizzo() {
        return this.form.get('indirizzo');
    }

    get dataConseguimento() {
        return this.form.get('dataConseguimento');
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


    get durataAnni() {
        return this.form.get('durataAnni');
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
