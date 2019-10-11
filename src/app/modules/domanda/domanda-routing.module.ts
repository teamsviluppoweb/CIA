import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DomandaEditComponent, VisualizzaDomandaComponent} from './components';
import {DomandaViewPermissionGuard} from '../../core/guards/domandaViewPermission/domandaViewPermission.guard';
import {DomandaEditPermissionGuard} from '../../core/guards/domandaEditPermission/domandaEditPermission.guard';
import {PaginaIntermediaComponent} from "./components/pagina-intermedia/pagina-intermedia.component";

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
  {
    path: 'info',
    component: PaginaIntermediaComponent,
    canActivate: [DomandaViewPermissionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomandaRoutingModule { }
