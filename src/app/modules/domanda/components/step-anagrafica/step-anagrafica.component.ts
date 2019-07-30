import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-step-anagrafica',
  templateUrl: './step-anagrafica.component.html',
  styleUrls: ['./step-anagrafica.component.scss']
})
export class StepAnagraficaComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) { }


  ngOnInit() {
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

    this.form.patchValue({
      nome: 'Robert Alexandru',
      cognome: 'Turturica',
      dataNascita: '02/12/1995',
      comuneNascita: 'Roma',
      domicilio: 'Via dei carraresi 14 00164',
      codiceFiscale: 'TRTZRS98DALS97SH',
      telefono: '+39 3202635017',
      email: 'roberturturica@gmail.com',
      sedeServizio: 'Via dei cosimi '
    });
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
