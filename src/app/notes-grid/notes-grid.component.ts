import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LocalStorageService } from '../shared/local-storage.service';
import { Observable } from 'rxjs';
import { Note } from '../shared/note.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { EditService } from '../shared/edit.service';
import { SafeHtmlPipe } from '../shared/safe-html.pipe';
import { DeleteDialogComponent } from '../shared/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '../shared/date.pipe';

@Component({
  selector: 'app-notes-grid',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    SafeHtmlPipe,
    DatePipe
  ],
  templateUrl: './notes-grid.component.html',
  styleUrl: './notes-grid.component.scss'
})
export class NotesGridComponent {
  $notes: Observable<Note[]>;
  @Input() gridConfig: { row: number, size: string };

  constructor(private storageService: LocalStorageService, private editService: EditService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.$notes = this.storageService.notesSub;
  }

  editNote(note: Note) {
    this.editService.editNote(note);
  }

  deleteNote(note: Note) {
    const dialog = this.dialog.open(DeleteDialogComponent, {
      data: {
        noteTitle: note.title,
      },
    });
    dialog.afterClosed().subscribe(res => {
      if (res) {
        this.storageService.deleteNote(note.id);
      }
    })
  }
}
