import { NgModule } from '@angular/core';
import {DomandaRoutingModule} from './domanda-routing.module';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/modules/shared.module';
import {DomandaEditComponent} from './components/domanda-edit/domanda-edit.component';




@NgModule({
  declarations: [
      DomandaEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DomandaRoutingModule
  ],

})

export class DomandaModule {}
