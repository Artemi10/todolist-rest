import {Injectable} from '@angular/core';
import {Note} from "../../models/note.model";
import {MonthNotesService} from "../month-notes/month-notes.service";
import {CalendarDateService} from "../calendar-date/calendar-date.service";
import {DayNotesService} from "../day-notes/day-notes.service";

;



@Injectable({
  providedIn: 'root'
})
export class StatusNotesService {
  public doneNotes: Note[] = [];
  public activeNotes: Note[] = [];
  public pendingNotes: Note[] = [];

  constructor(private noteService: MonthNotesService, private dayNoteService: DayNotesService) {
    this.sortNotesByStatus();
  }

  public sortNotesByStatus(){
    let dayNotes: Note[] = this.dayNoteService.dayNotes;
    this.doneNotes = this.findNotesByStatus(dayNotes, 'DONE');
    this.activeNotes = this.findNotesByStatus(dayNotes, 'ACTIVE');
    this.pendingNotes = this.findNotesByStatus(dayNotes, 'PENDING');
  }

  private findNotesByStatus(dayNotes: Note[], status: string): Note[]{
    let resultNotes: Note[] = [];
    dayNotes.filter(note => note.status === status)
      .forEach(note => resultNotes.push(note))
    return resultNotes;
  }

}
