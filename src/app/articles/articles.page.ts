import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { InfiniteScrollCustomEvent, IonContent, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonList, IonLoading, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { catchError, finalize, map, Observable, Subscription, tap, throwError } from 'rxjs';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { Article } from '../models/article.model';
import { ArticleService } from '../services/article.service';
import { ArticleItemComponent } from './article-item/article-item.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
  standalone: true,
  imports: [ IonInfiniteScrollContent, IonInfiniteScroll, IonLoading, IonList, IonContent, IonHeader, IonTitle, IonToolbar, ArticleItemComponent, SearchBarComponent]
})
export class ArticlesPage implements OnInit, OnDestroy {
  private readonly articleService = inject(ArticleService);
  private subscription: Subscription = new Subscription();
  private startArticleNum = signal<number>(0);
  private readonly limit: number = 10;

  articles = signal<Article[]>([]);
  isLoading = signal<boolean>(false);
  searchQuery = signal<string>('');
  fetchedArticles = signal<Article[]>([]);
  noMoreArticles = computed(() => this.fetchedArticles().length === 0);

  constructor() { }

  ngOnInit() {
    this.getArticles();
  }

  getArticles(): void {
    this.isLoading.set(true);
    this.subscription = this.articleService.getArticles(this.startArticleNum(), this.limit, this.searchQuery()).subscribe({
      next: (articles: Article[] | null) => {
        if (articles?.length) {
          this.fetchedArticles.set(articles);
          this.articles.update((prev) => [...prev, ...articles]);
        } else {
          this.fetchedArticles.set([]);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading articles:', err);
        this.isLoading.set(false);
      }
    });
  }

  onIonInfinite(event: InfiniteScrollCustomEvent): void {
    this.startArticleNum.update((value) => value + this.limit);
    this.getArticles();
    event.target.complete();
  }

  searchArticles(searchQuery: string): void {
    this.searchQuery.set(searchQuery);
    this.articles.set([]);
    this.startArticleNum.update((value) => value = 0);
    this.getArticles();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
