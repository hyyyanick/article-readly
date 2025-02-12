import { Component, computed, inject } from '@angular/core';
import { rxResource } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.page.html',
  styleUrls: ['./article-detail.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar]
})
export class ArticleDetailPage {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly articleService = inject(ArticleService);
  private readonly articleResource = rxResource({
    request: () => ({ articleId: this.activatedRoute.snapshot.params['articleId'] }),
    loader: ({ request }) => this.articleService.getArticle(request.articleId)
  });

  article = computed(() => this.articleResource.value());
}


