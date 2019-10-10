import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
import {ApiService} from '../../../../core/services/api/api.service';
import {ErrorStateMatcher, MatStepper} from "@angular/material";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-step-anagrafica',
  templateUrl: './step-anagrafica.component.html',
  styleUrls: ['./step-anagrafica.component.scss']
})
export class StepAnagraficaComponent implements OnInit {

  @Input() parent: FormGroup;
  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;


  constructor(private fb: FormBuilder, private restApi: ApiService) {
  }


  ngOnInit() {
    this.onChangesForm();

    this.restApi.getDomanda().subscribe(
        (data) => {

          this.anagrafica.patchValue({
            nome: this.restApi.domanda.anagCandidato.nome,
            cognome: this.restApi.domanda.anagCandidato.cognome,
            dataNascita: this.restApi.domanda.anagCandidato.dataNascita,
            comuneNascita: this.restApi.domanda.anagCandidato.comuneNascita.nome + ' ' + this.restApi.domanda.anagCandidato.comuneNascita.codiceProvincia,
            domicilio: this.restApi.domanda.anagCandidato.domicilio,
            codiceFiscale: this.restApi.domanda.anagCandidato.codiceFiscale,
            telefono: this.restApi.domanda.anagCandidato.telefono,
            email: this.restApi.domanda.anagCandidato.email,
          });



        }


    );

  }


  onChangesForm() {
    this.telefono.valueChanges.subscribe(
        (x) => {
          this.restApi.domanda.anagCandidato.telefono = x;
        }
    );

    this.email.valueChanges.subscribe(
        (x) => {
          this.restApi.domanda.anagCandidato.email = x;
        }
    );
  }

  get anagrafica() {
    return this.parent.get('anagrafica');
  }

  get nome() {
    return this.parent.get('anagrafica.nome');
  }

  get cognome() {
    return this.parent.get('anagrafica.cognome');
  }

  get dataNascita() {
    return this.parent.get('anagrafica.dataNascita');
  }

  get comuneNascita() {
    return this.parent.get('anagrafica.comuneNascita');
  }

  get domicilio() {
    return this.parent.get('anagrafica.domicilio');
  }

  get codiceFiscale() {
    return this.parent.get('anagrafica.codiceFiscale');
  }

  get telefono() {
    return this.parent.get('anagrafica.telefono');
  }

  get email() {
    return this.parent.get('anagrafica.email');
  }

  get sedeServizio() {
    return this.parent.get('anagrafica.sedeServizio');
  }


}
