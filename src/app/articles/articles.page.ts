import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLoading } from '@ionic/angular/standalone';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';
import { ArticleItemComponent } from './article-item/article-item.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
  standalone: true,
  imports: [IonLoading, IonList, IonContent, IonHeader, IonTitle, IonToolbar, ArticleItemComponent]
})
export class ArticlesPage implements OnInit, OnDestroy {
  private readonly articleService = inject(ArticleService);
  private subscription: Subscription = new Subscription();
  articles = signal<Article[]>([]);
  isLoading = signal<boolean>(false);

  constructor() { }

  ngOnInit() {
    this.getArticle();
  }

  getArticle(): void {
    this.isLoading.set(true);
    this.subscription = this.articleService.getArticles().subscribe({
      next: (articles: Article[] | null) => {
        if (articles?.length) this.articles.update((prev) => [...prev, ...articles]);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading articles:', err);
        this.isLoading.set(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
