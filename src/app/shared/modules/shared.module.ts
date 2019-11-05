import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CustomDatePipe} from "../pipe/custom-date.pipe";
import {StatoDomandaPipe} from "../pipe/stato-domanda.pipe";


@NgModule({
  declarations: [
      CustomDatePipe,
      StatoDomandaPipe
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    CustomDatePipe,
    StatoDomandaPipe
  ],
})
export class SharedModule { }
