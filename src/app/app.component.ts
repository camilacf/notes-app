import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotesGridComponent } from './notes-grid/notes-grid.component';
import { LocalStorageService } from './shared/local-storage.service';
import { Note } from './shared/note.model';
import { Pref, PreferencesService } from './side-bar/preferences.service';
import { FiltersComponent } from './filters/filters.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    EditNoteComponent,
    SideBarComponent,
    NotesListComponent,
    NotesGridComponent,
    MatAutocompleteModule,
    FiltersComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'notes-app';
  apperance: 'grid' | 'list' = 'list';
  config: Pref;
  constructor(private preferenceService: PreferencesService) { }

  ngOnInit() {
    this.preferenceService.preferences.subscribe(pref => {
      this.config = pref;
    });
  }

}
