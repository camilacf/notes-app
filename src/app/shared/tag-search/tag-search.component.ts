import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Tag } from '../tag.model';
import { Observable, map, startWith } from 'rxjs';
import { TagsService } from '../tags.service';
import { Note } from '../note.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgxColorsModule } from 'ngx-colors';

@Component({
  selector: 'app-tag-search',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    CommonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    NgxColorsModule
  ],
  templateUrl: './tag-search.component.html',
  styleUrl: './tag-search.component.scss'
})
export class TagSearchComponent implements OnInit, OnChanges {
  tagSearch = new FormControl<string | Tag>('');
  tags: Tag[];
  selectedTags: Tag[] = [];
  filteredTags: Observable<Tag[]>;
  @Input() canAdd: boolean = false;
  @Input() notes: Note[];
  @Output() tagsChanged = new EventEmitter<Tag[]>();

  constructor(private tagService: TagsService) { }

  ngOnInit() {
    this.filteredTags = this.tagSearch.valueChanges.pipe(
      startWith(''),
      map(value => {
        const title = typeof value === 'string' ? value : value?.title;
        return title ? this._filter(title) : this.tags.slice();
      }),
    );
  }

  ngOnChanges(): void {
    this.tags = this.tagService.getTags(this.notes);
  }

  remove(tag: Tag) {
    const tagInd = this.selectedTags.findIndex(t => t.title === tag.title);
    if (tagInd > -1) {
      this.selectedTags.splice(tagInd, 1);
      this.tags.push(tag);
    }
    this.selectionChange();
  }

  colorChanged() {
    this.tagsChanged.emit(this.selectedTags);
  }

  selected(event: MatAutocompleteSelectedEvent) {
    this.tags.splice(this.tags.findIndex(t => t.title === event.option.value.title), 1);
    this.tagSearch.setValue(null);
    this.selectedTags.push(event.option.value);
    this.selectionChange();
  }

  selectionChange() {
    this.tagSearch.setValue(null);
    this.tagsChanged.emit(this.selectedTags);
  }

  add(event: MatChipInputEvent): void {
    if (this.canAdd) {
      const value = (event.value || '').trim();

      // Add our fruit
      if (value) {
        this.selectedTags.push({ color: this.generateRandomColor(), title: value } as Tag)
      }
      this.selectionChange();

      // Clear the input value
      event.chipInput!.clear();
    }

  }

  private _filter(name: string): Tag[] {
    const filterValue = name?.toLowerCase() || '';

    return this.tags.filter(option => option.title.toLowerCase().includes(filterValue));
  }

  generateRandomColor(): string {
    return "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
  }
}
