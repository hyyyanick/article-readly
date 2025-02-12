import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'articles',
    loadComponent: () => import('./articles/articles.page').then( m => m.ArticlesPage)
  },
  {
    path: '',
    redirectTo: 'articles',
    pathMatch: 'full',
  },
];
