import { Injectable } from '@angular/core';
import { Note } from './note.model';
import { BehaviorSubject } from 'rxjs';
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'secret_key';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  storedNotes = new BehaviorSubject<Note[]>(this.getAllNotes());
  notesSub = new BehaviorSubject<Note[]>(this.getAllNotes());

  constructor() { }

  updateList() {
    this.notesSub.next(this.getAllNotes());
    this.storedNotes.next(this.getAllNotes());
  }

  setNote(key: string, value: string): void {
    localStorage.setItem(key, this.encrypt(value));
    this.updateList();
  }

  getNote(key: string): string | null {
    return localStorage.getItem(key);
  }

  getAllNotes(): Note[] {
    let notes = [];
    for (let key of Object.keys(localStorage)) {
      if (key.startsWith('note-')) {
        const json = localStorage.getItem(key) || '';
        const details = JSON.parse(this.decrypt(json));
        notes.push(details as Note);
      }
    }
    return notes;
  }

  deleteNote(key: string): void {
    localStorage.removeItem(key);
    this.updateList();
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, SECRET_KEY).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, SECRET_KEY).toString(CryptoJS.enc.Utf8);
  }
}
