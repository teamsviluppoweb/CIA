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
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import { VisualizzaDomandaComponent } from './components/visualizza-domanda/visualizza-domanda.component';



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
    VisualizzaDomandaComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DomandaRoutingModule,
    NgxMatSelectSearchModule
  ],
  entryComponents: [
    AggiungiDatiComponent, AggiungiCorsiComponent
  ]
})
export class DomandaModule {}
