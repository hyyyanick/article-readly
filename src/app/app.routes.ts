import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'articles',
    loadComponent: () => import('./articles/articles.page').then( m => m.ArticlesPage)
  },
  {
    path: 'articles/:articleId',
    loadComponent: () => import('./articles/article-detail/article-detail.page').then( m => m.ArticleDetailPage)
  },
  {
    path: '',
    redirectTo: 'articles',
    pathMatch: 'full',
  },
];
