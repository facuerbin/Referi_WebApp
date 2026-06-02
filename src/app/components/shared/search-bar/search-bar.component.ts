import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: false,
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Input() placeholder: string = 'Buscar...';
  @Output() searched = new EventEmitter<string>();

  searchIcon = faSearch;
  value: string = '';

  onSearch() {
    this.searched.emit(this.value);
  }
}
