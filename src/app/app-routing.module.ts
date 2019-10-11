import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/guards';
import {UserComponent} from './layouts/user/user.component';
import {USER_ROUTES} from './shared/routes/user.routes';
import {GuestComponent} from './layouts/guest/guest.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  { path: '',
    redirectTo: 'domanda',
    canActivate: [AuthGuard], // Should be replaced with actual auth guard
    pathMatch: 'full' },
  {
    path: '',
    component: UserComponent,
    canActivate: [AuthGuard], // Should be replaced with actual auth guard
    children: USER_ROUTES
  },
  {
    path: 'guest',
    component: GuestComponent,
    loadChildren: () => import('src/app/modules/guest/guest.module').then(m => m.GuestModule)
  },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '/guest/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
