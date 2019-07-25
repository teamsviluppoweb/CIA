import { NgModule } from '@angular/core';
import {DomandaRoutingModule} from './domanda-routing.module';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/modules/shared.module';




@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    DomandaRoutingModule
  ],

})

export class DomandaModule {}
