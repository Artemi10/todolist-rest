import { Injectable } from '@angular/core';
import {Note} from "../../models/note.model";
import {HttpClient} from "@angular/common/http";
import {Moment} from "moment";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MonthNotesService {
  public allNotes: Note[];

  constructor(private http: HttpClient) {}

  public findAllNotesByTimeline(firstDay: number, lastDate: number): Promise<Object>{
    return this.http.get(environment.apiUrl +`/api/notes/date/${firstDay}/${lastDate}`).toPromise();
  }

  public addNote(note: Note): Promise<Object>{
    return this.http.post(environment.apiUrl +'/api/notes', note)
        .toPromise()
  }

  public deleteNote(noteId: number): Promise<Object>{
    return this.http.delete(environment.apiUrl +`/api/notes/${noteId}`)
        .toPromise()
  }


  public updateNote(note: Note): Promise<Object>{
    return this.http.patch(environment.apiUrl +`/api/notes`, note)
        .toPromise()
  }

  public getMonthNotesAmountByDays(monthDays: Moment[]): number[]{
    let monthDaysNotesAmount: number[] = [];
    monthDays.forEach(day => {
      monthDaysNotesAmount.push(this.countNotesByDay(day.toDate().getTime()));
    })
    return monthDaysNotesAmount;
  }

  public countNotesByDay(day: number): number{
    return this.getAllNotesByDay(day).length;
  }

  private getAllNotesByDay(day: number): Note[]{
    let dayNotes: Note[] = [];
    this.allNotes?.filter(note => note.expirationDate===day).forEach(note => dayNotes.push(note));
    return dayNotes;
  }


}
