import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VisualizzaDomandaComponent} from './components';
import {DomandaViewPermissionGuard} from '../../core/guards/domandaViewPermission/domandaViewPermission.guard';
import {DomandaEditPermissionGuard} from '../../core/guards/domandaEditPermission/domandaEditPermission.guard';
import {PaginaIntermediaComponent} from "./components/pagina-intermedia/pagina-intermedia.component";
import {DomandaEditComponent} from "./components/domanda-edit/domanda-edit.component";

export const routes: Routes = [
  { path: '', redirectTo: 'info', pathMatch: 'full' },
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
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomandaRoutingModule { }
