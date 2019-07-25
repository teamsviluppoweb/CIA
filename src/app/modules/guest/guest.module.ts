import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { GuestRouting} from './guest.routing';
import {SharedModule} from '../../shared/modules/shared.module';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    GuestRouting,
    SharedModule
  ]
})
export class GuestModule { }
