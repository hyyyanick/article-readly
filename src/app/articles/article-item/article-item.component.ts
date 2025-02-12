import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonItem, IonLabel } from '@ionic/angular/standalone';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, RouterLink]
})
export class ArticleItemComponent {
  articleItem = input<Article>();
}
