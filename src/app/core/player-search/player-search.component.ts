import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-search',
  standalone: true,
  imports:[CommonModule,FormsModule],
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.scss']
})
export class PlayerSearchComponent {
  @Output() searchTermChange = new EventEmitter<string>();
  searchTerm: string = '';

  onSearchTermChange() {
    this.searchTermChange.emit(this.searchTerm);
  }
}
