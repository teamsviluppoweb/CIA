import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ApiService} from '../../../../core/services/api/api.service';
import {MatStepper} from '@angular/material';
import * as moment from 'moment';
import {AnagCandidatoModel} from '../../../../core/models';


@Component({
  selector: 'app-step-anagrafica',
  templateUrl: './step-anagrafica.component.html',
  styleUrls: ['./step-anagrafica.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepAnagraficaComponent implements OnInit{

  @Input() parent: FormGroup;
  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;


  constructor(private restApi: ApiService) {

  }

  ngOnInit(): void {
    this.onChangesForm();

    const anagrafica: AnagCandidatoModel = this.restApi.domanda.anagCandidato;
    this.anagrafica.patchValue({
      nome: anagrafica.nome,
      cognome: anagrafica.cognome,
      dataNascita: [moment(anagrafica.dataNascita).format('DD-MM-YYYY')],
      comuneNascita: anagrafica.comuneNascita.nome + ' ' + anagrafica.comuneNascita.codiceProvincia,
      domicilio: anagrafica.domicilio,
      codiceFiscale: anagrafica.codiceFiscale,
      telefono: anagrafica.telefono,
      email: anagrafica.email,
    });
  }


  /*  Osservo i cambiamenti del form e li applico alla classe domanda */

  onChangesForm() {
    this.telefono.valueChanges
        .subscribe((input) => {
          this.restApi.domanda.anagCandidato.telefono = input;
        }
    );

    this.email.valueChanges
        .subscribe((input) => {
          this.restApi.domanda.anagCandidato.email = input;
        }
    );

    this.domicilio.valueChanges
        .subscribe((input) => {
          this.restApi.domanda.anagCandidato.domicilio = input;
        }
    );
  }


  get anagrafica() {
    return this.parent.get('anagrafica');
  }

  get domicilio() {
    return this.parent.get('anagrafica.domicilio');
  }

  get telefono() {
    return this.parent.get('anagrafica.telefono');
  }

  get email() {
    return this.parent.get('anagrafica.email');
  }


}
