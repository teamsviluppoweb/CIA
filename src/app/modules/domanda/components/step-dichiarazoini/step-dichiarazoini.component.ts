import {ChangeDetectionStrategy, Component, Input, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatStepper} from '@angular/material';

interface Dichiarazioni {
  formControl: string;
  testo: string;
}

@Component({
  selector: 'app-step-dichiarazoini',
  templateUrl: './step-dichiarazoini.component.html',
  styleUrls: ['./step-dichiarazoini.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepDichiarazoiniComponent {

  dichirazioni: Dichiarazioni[] = [
    {
      formControl: 'uno',
      testo: 'avere almeno 15 anni di anzianità nel proprio ruolo'
    },
    {
      formControl: 'due',
      testo: 'possedere un titolo di studio di secondo grado ad indirizzo tecnico professionale ...'
    },
    {
      formControl: 'tre',
      testo: 'non aver riportato sanzioni disciplinari'
    },
    {
      formControl: 'quattro',
      testo: 'non aver riporrtato sentenza irrevocabile di condanna ...'
    }
  ];

  @Input() parent: FormGroup;
  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;

  constructor() { }

}
