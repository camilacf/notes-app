import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotesGridComponent } from './notes-grid/notes-grid.component';
import { LocalStorageService } from './shared/local-storage.service';
import { Note } from './shared/note.model';

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
    NotesGridComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'notes-app';
  apperance: 'grid' | 'list' = 'list';
  storedNotes: Note[];
  @ViewChild('input') filterInput: ElementRef<HTMLInputElement>;
  constructor(private storageService: LocalStorageService) { }

  ngOnInit() {
    this.storageService.storedNotes.subscribe(notes => {
      this.storedNotes = notes;
      this.filterInput.nativeElement.value = '';
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    let filteredList = this.storedNotes.filter(note => {
      console.log(note, JSON.stringify(note), filterValue)
      return filterValue !== '' ? JSON.stringify(note).includes(filterValue) : true;
    })
    this.storageService.notesSub.next(filteredList);
  }
}
