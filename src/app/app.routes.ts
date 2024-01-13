import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',loadChildren: () => import('./meteo/meteo.module').then(m => m.MeteoModule) },
];
