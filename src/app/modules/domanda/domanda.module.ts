import { NgModule } from '@angular/core';
import {DomandaRoutingModule} from './domanda-routing.module';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/modules/shared.module';

import {
  StepAnagraficaComponent,
  StepQualificaSedeComponent,
  StepTitoliDiStudioComponent,
  StepDichiarazoiniComponent,
  StepCorsiDiFormazioneComponent,
  AggiungiDatiComponent,
  AggiungiCorsiComponent } from './components';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import { VisualizzaDomandaComponent } from './components';
import { PaginaIntermediaComponent } from './components/pagina-intermedia/pagina-intermedia.component';
import {DomandaEditComponent} from "./components/domanda-edit/domanda-edit.component";



@NgModule({
  declarations: [
    DomandaEditComponent,
    StepAnagraficaComponent,
    StepQualificaSedeComponent,
    StepTitoliDiStudioComponent,
    StepDichiarazoiniComponent,
    AggiungiDatiComponent,
    StepCorsiDiFormazioneComponent,
    AggiungiCorsiComponent,
    VisualizzaDomandaComponent,
    PaginaIntermediaComponent,
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
