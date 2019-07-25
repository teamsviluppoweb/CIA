import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
  {
    path: 'domanda',
    loadChildren: () => import('src/app/modules/domanda/domanda.module').then(m => m.DomandaModule)
  },
];
