import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DomandaEditComponent, VisualizzaDomandaComponent} from './components';

export const routes: Routes = [
  {
    path: 'edit',
    component: DomandaEditComponent,
  },
  {
    path: 'visualizza',
    component: VisualizzaDomandaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomandaRoutingModule { }
