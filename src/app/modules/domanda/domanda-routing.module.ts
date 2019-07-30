import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DomandaEditComponent} from './components';

export const routes: Routes = [
  {
    path: 'edit',
    component: DomandaEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomandaRoutingModule { }
