import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private readonly baseUrl: string = "https://jsonplaceholder.typicode.com";
  private readonly http = inject(HttpClient);
  
  getArticles(startArticleNum: number, limit: number, searchQuery: string = ''): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/posts?title_like=${searchQuery}&_start=${startArticleNum}&_limit=${limit}`);
  }

  getArticle(articleId: string): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/posts/${articleId}`);
  }
}
