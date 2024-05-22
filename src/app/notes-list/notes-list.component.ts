import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../shared/local-storage.service';
import { Note } from '../shared/note.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { EditService } from '../shared/edit.service';
import { SafeHtmlPipe } from '../shared/safe-html.pipe';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../shared/delete-dialog/delete-dialog.component';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    SafeHtmlPipe,
    MatSortModule,
    MatPaginatorModule
  ],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss'
})
export class NotesListComponent implements OnInit {
  notes: Note[];

  constructor(private storageService: LocalStorageService, private editService: EditService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.storageService.notesSub.subscribe(n => {
      this.notes = n;
    });
  }

  formatDate(date: string): string {
    const d = new Date(date)
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
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

  sortData(sort: Sort) {
    const data = this.notes.slice();
    if (!sort.active || sort.direction === '') {
      this.notes = data;
      return;
    }

    let sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title':
          return compare(a.title.toLowerCase(), b.title.toLowerCase(), isAsc);
        case 'created':
          return compare(new Date(a.createdAt).valueOf(), new Date(b.createdAt).valueOf(), isAsc);
        case 'updated':
          return compare(new Date(a.lastUpdated).valueOf(), new Date(b.lastUpdated).valueOf(), isAsc);
        default:
          return 0;
      }
    });
    this.storageService.notesSub.next(sortedData);
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
