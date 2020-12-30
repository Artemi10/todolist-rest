import { Injectable } from '@angular/core';
import {Note} from "../../models/note.model";
import {MonthNotesService} from "../month-notes/month-notes.service";


@Injectable({
  providedIn: 'root'
})
export class DayNotesService {
  public dayNotes: Note[] = [];

  constructor(private monthNotesService: MonthNotesService) {}

  public findAllNotesByDay(day: number): void{
    let dayNotes: Note[] = [];
    this.monthNotesService.allNotes?.filter(note => note.expirationDate===day).forEach(note => dayNotes.push(note));
    this.dayNotes = dayNotes;
  }


}
