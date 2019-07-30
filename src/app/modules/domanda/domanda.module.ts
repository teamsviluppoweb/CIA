import { NgModule } from '@angular/core';
import {DomandaRoutingModule} from './domanda-routing.module';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/modules/shared.module';

import {
  DomandaEditComponent,
  StepAnagraficaComponent,
  StepQualificaSedeComponent,
  StepTitoliDiStudioComponent,
  StepDichiarazoiniComponent,
  StepQualificaProfessionaleComponent,
  StepCorsiDiFormazioneComponent,
  AggiungiDatiComponent,
  AggiungiCorsiComponent } from './components';



@NgModule({
  declarations: [
    DomandaEditComponent,
    StepAnagraficaComponent,
    StepQualificaSedeComponent,
    StepTitoliDiStudioComponent,
    StepDichiarazoiniComponent,
    AggiungiDatiComponent,
    StepQualificaProfessionaleComponent,
    StepCorsiDiFormazioneComponent,
    AggiungiCorsiComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DomandaRoutingModule
  ],
  entryComponents: [
    AggiungiDatiComponent, AggiungiCorsiComponent
  ]
})
export class DomandaModule {}
