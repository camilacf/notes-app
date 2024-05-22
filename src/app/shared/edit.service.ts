import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  triggerEdit = new Subject<Note>;
  constructor() { }

  editNote(note: Note) {
    this.triggerEdit.next(note);
  }
}
