import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiService} from '../../../../core/services/api/api.service';


@Component({
  selector: 'app-step-anagrafica',
  templateUrl: './step-anagrafica.component.html',
  styleUrls: ['./step-anagrafica.component.scss']
})
export class StepAnagraficaComponent implements OnInit {

  form: FormGroup;


  constructor(private fb: FormBuilder, private restApi: ApiService) {
    this.form = this.fb.group({
      nome: [''],
      cognome: [''],
      dataNascita: [''],
      comuneNascita: [''],
      domicilio: [''],
      codiceFiscale: [''],
      telefono: [''],
      email: [''],
      sedeServizio: ['']
    });

    this.nome.disable();
    this.cognome.disable();
    this.dataNascita.disable();
    this.comuneNascita.disable();
    this.domicilio.disable();
    this.codiceFiscale.disable();
    this.sedeServizio.disable();

    this.onChangesForm();
  }


  ngOnInit() {

    this.restApi.getDomanda().subscribe(
        (data) => {
          this.form.patchValue({
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

  get nome() {
    return this.form.get('nome');
  }

  get cognome() {
    return this.form.get('cognome');
  }

  get dataNascita() {
    return this.form.get('dataNascita');
  }

  get comuneNascita() {
    return this.form.get('comuneNascita');
  }

  get domicilio() {
    return this.form.get('domicilio');
  }

  get codiceFiscale() {
    return this.form.get('codiceFiscale');
  }

  get telefono() {
    return this.form.get('telefono');
  }

  get email() {
    return this.form.get('email');
  }

  get sedeServizio() {
    return this.form.get('sedeServizio');
  }


}
