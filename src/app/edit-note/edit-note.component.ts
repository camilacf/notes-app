import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, } from '@angular/core';
import { Note } from '../shared/note.model';
import { v4 as uuidv4 } from 'uuid';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LocalStorageService } from '../shared/local-storage.service';
import { EditService } from '../shared/edit.service';
import { MatIconModule } from '@angular/material/icon';
import { Editor, NgxEditorModule, Toolbar, toHTML } from 'ngx-editor';

@Component({
  selector: 'app-edit-note',
  standalone: true,
  imports: [
    MatSidenavModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    NgxEditorModule
  ],
  templateUrl: './edit-note.component.html',
  styleUrl: './edit-note.component.scss'
})
export class EditNoteComponent implements OnInit {
  editingNote: Note | null;
  noteForm: FormGroup;

  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  @ViewChild('editDrawer') drawer: MatDrawer;
  constructor(private fb: FormBuilder, private storageService: LocalStorageService, private editService: EditService) { }

  ngOnInit() {
    this.editor = new Editor({ attributes: { 'placeholder': 'Content' } });

    this.noteForm = this.fb.group({
      title: this.fb.control('', Validators.required),
      content: this.fb.control('', Validators.required)
    });

    this.editService.triggerEdit.subscribe(noteToEdit => {
      this.editingNote = noteToEdit;
      this.noteForm.patchValue(this.editingNote)
      this.drawer.open();
    })
  }

  saveNote() {
    const note = {
      id: this.editingNote?.id || 'note-' + uuidv4(),
      title: this.noteForm.value.title,
      content: this.noteForm.value.content,
      createdAt: this.editingNote?.createdAt || Date(),
      lastUpdated: Date(),
    }
    this.storageService.setNote(note.id, JSON.stringify(note));
    this.noteForm.patchValue({ title: '', content: '' })
    this.editingNote = null;
    this.drawer.close();
  }

  close() {
    this.noteForm.patchValue({ title: '', content: '' })
    this.editingNote = null;
    this.drawer.close()
  }
}
