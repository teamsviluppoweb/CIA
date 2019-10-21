import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../core/services/api/api.service';
import {Router} from '@angular/router';
import {StepAnagraficaComponent, StepDichiarazoiniComponent, StepQualificaSedeComponent} from "..";

@Component({
  selector: 'app-domanda-edit',
  templateUrl: './domanda-edit.component.html',
  styleUrls: ['./domanda-edit.component.scss'],
})
export class DomandaEditComponent implements OnInit {

  public moduloDomanda: FormGroup;

  @ViewChild(StepAnagraficaComponent, { static: false }) StepAnagraficaComponent: StepAnagraficaComponent;
  @ViewChild(StepQualificaSedeComponent, { static: false }) StepQualificaSedeComponent: StepQualificaSedeComponent;
  @ViewChild(StepDichiarazoiniComponent, { static: false }) StepDichiarazoiniComponent: StepDichiarazoiniComponent;

  anagraficaValidity;
  qualificaSedeValidity;
  dichiarazioneValidity;

  displayDichiarazioni = true;

  constructor(private fb: FormBuilder, private restApi: ApiService, private router: Router) {

    this.displayDichiarazioni = (this.restApi.domanda.stato === 0);

    this.moduloDomanda = this.fb.group({
      anagrafica: this.fb.group({
        nome: [''],
        cognome: [''],
        dataNascita: [''],
        comuneNascita: [''],
        domicilio: ['', Validators.required],
        codiceFiscale: [''],
        telefono: ['', Validators.required],
        email: ['', Validators.required],
        sedeServizio: ['']
      }),
      sediQualifiche: this.fb.group({
        sedeGiuridica: ['',  Validators.required],
        qualifica: ['', Validators.required],

        sedeDropdown: [''],
        qualificaDropdown: [''],
      }),
      dichiarazione: this.fb.group({
        uno: ['', [(control) => {
          return !control.value ? { 'required': true } : null;
        }]],
        due: ['', [(control) => {
          return !control.value ? { 'required': true } : null;
        }]],
        tre: ['', [(control) => {
          return !control.value ? { 'required': true } : null;
        }]],
        quattro: ['', [(control) => {
          return !control.value ? { 'required': true } : null;
        }]],
      }),
    });

    this.anagraficaValidity =  this.moduloDomanda.controls.anagrafica;
    this.qualificaSedeValidity =  this.moduloDomanda.controls.sediQualifiche;
    this.dichiarazioneValidity =  this.moduloDomanda.controls.dichiarazione;

  }

  ngOnInit(): void {}

  inviaDomanda() {
    console.log(this.restApi.domanda);
    this.restApi.salvaDomanda().subscribe(
        (x) => {
          this.router.navigate(['/domanda/visualizza']);
          console.log('inviata con successo');
          console.log(x);
        }
    );
  }

  DisplayValue() {
    console.log(this.moduloDomanda.value);
  }


}
