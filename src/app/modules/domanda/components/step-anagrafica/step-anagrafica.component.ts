import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiService} from "../../../../core/services/api/api.service";
import {AnagCandidatoInterface, DomandaInterface} from "../../../../core/models/domanda.interface";
import {HttpResponse} from "@angular/common/http";
import {DomandaModel} from "../../../../core/models";

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
  }


  ngOnInit() {

    this.restApi.getDomanda().subscribe(
        (data) => {


          let ang = data['domanda'];
          ang =  ang['anagCandidato'];
          this.form.patchValue({
            nome: ang.nome,
            cognome: ang.cognome,
            dataNascita: ang.dataNascita,
            comuneNascita: ang.comuneNascita,
            domicilio: ang.domicilio,
            codiceFiscale: ang.codiceFiscale,
            telefono: ang.telefono,
            email: ang.email,
            sedeServizio: ang.descSede,
          });

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
