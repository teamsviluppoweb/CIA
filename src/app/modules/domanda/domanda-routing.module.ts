import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DomandaEditComponent, VisualizzaDomandaComponent} from './components';
import {DomandaViewPermissionGuard} from '../../core/guards/domandaViewPermission/domandaViewPermission.guard';
import {DomandaEditPermissionGuard} from '../../core/guards/domandaEditPermission/domandaEditPermission.guard';

export const routes: Routes = [
  {
    path: 'edit',
    component: DomandaEditComponent,
    canActivate: [DomandaEditPermissionGuard],
  },
  {
    path: 'visualizza',
    component: VisualizzaDomandaComponent,
    canActivate: [DomandaViewPermissionGuard],

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomandaRoutingModule { }
