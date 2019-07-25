import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/guards';
import {UserComponent} from './layouts/user/user.component';
import {USER_ROUTES} from './shared/routes/user.routes';
import {GuestComponent} from './layouts/guest/guest.component';
import {NgModule} from '@angular/core';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    canActivate: [AuthGuard], // Should be replaced with actual auth guard
    children: USER_ROUTES
  },
  {
    path: 'auth',
    component: GuestComponent,
    loadChildren: './modules/auth/auth.module#AuthModule'
  },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '/domanda/edit', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
