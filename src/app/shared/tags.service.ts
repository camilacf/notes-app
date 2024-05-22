import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Tag } from './tag.model';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  getTags(notes: Note[]) {
    const notesTags = notes.map(note => {
      return note.tags;
    })
    return notesTags.flat().reduce<Tag[]>((uniqueTags, tag) => {
      if (tag && !uniqueTags.find(t => t.title === tag.title)) {
        uniqueTags.push(tag);
      }
      return uniqueTags;
    }, [])
  }

}
