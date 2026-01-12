import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'osa',
    loadComponent: () => import('./osa/osa.component').then(m => m.OsaComponent)
  }
];
