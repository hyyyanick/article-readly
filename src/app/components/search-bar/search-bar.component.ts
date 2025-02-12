import { Component, output } from '@angular/core';
import { IonSearchbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { searchCircle } from 'ionicons/icons';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  imports: [IonSearchbar]
})
export class SearchBarComponent {
  onSearchQueryChange = output<string>();

  constructor() {
    addIcons({ searchCircle });
  }
  
  onSearch(event: Event): void {
    const target = event.target as HTMLIonSearchbarElement;
    const searchQuery = target.value?.toLowerCase() || '';
    this.onSearchQueryChange.emit(searchQuery);
  }
}
