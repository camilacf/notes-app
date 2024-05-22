import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LocalStorageService } from '../shared/local-storage.service';
import { Note } from '../shared/note.model';
import { TagSearchComponent } from '../shared/tag-search/tag-search.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Tag } from '../shared/tag.model';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    CommonModule,
    TagSearchComponent,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements OnInit {
  @Input() searchType: 'text' | 'tag';
  storedNotes: Note[];
  @ViewChild('input') filterInput: ElementRef<HTMLInputElement>;

  constructor(private storageService: LocalStorageService) { }

  ngOnInit(): void {
    this.storageService.storedNotes.subscribe(notes => {
      this.storedNotes = notes;
      if (this.filterInput) {
        this.filterInput.nativeElement.value = '';
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    let filteredList = this.storedNotes.filter(note => {
      return filterValue !== '' ? JSON.stringify(note).includes(filterValue) : true;
    })
    this.storageService.notesSub.next(filteredList);
  }

  filterByTag(tags: Tag[]) {
    let filteredList = this.storedNotes.filter(note => {
      return note.tags?.some(tag => !!tags.find(t => t.title === tag.title));
    })
    this.storageService.notesSub.next(filteredList);
  }
}
