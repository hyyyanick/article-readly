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
  
  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/posts`)
  }
}
