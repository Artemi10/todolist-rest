import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Note} from "../../../../models/note.model";
import {MonthNotesService} from "../../../../services/month-notes/month-notes.service";
import {ChartNotesService} from "../../../../services/chart/chart-notes.service";
import {StatusNotesService} from "../../../../services/notes-status/status-notes.service";
import {CalendarDateService} from "../../../../services/calendar-date/calendar-date.service";


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  public showDeleteAndEditButtons: string = 'none';
  public showSaveEditButton: string = 'none';
  public disableInputAttr: boolean = true;
  @Input()
  public note: Note;
  @ViewChild('noteContentElement')
  public noteContentElement: ElementRef;

  constructor(private monthNoteService: MonthNotesService, private chartNotesService: ChartNotesService,
              private statusNotesService: StatusNotesService, private calendarDate: CalendarDateService) {}

  public clickDeleteButtonListener(note: Note){
    this.monthNoteService.deleteNote(note.id)
      .then(() => {
        let mothNoteIndex: number =  this.monthNoteService.allNotes.indexOf(note);
        this.monthNoteService.allNotes.splice( mothNoteIndex, 1);
        this.statusNotesService.sortNotesByStatus();
        this.chartNotesService.openAllCharts(this.calendarDate);
      })
  }

  public clickEditButtonListener(){
    this.disableInputAttr = false;
    this.showSaveEditButton = 'block';
    this.showDeleteAndEditButtons = 'none';
  }
  public clickSaveEditButtonListener(noteId: number, expirationDate: number){
    this.disableInputAttr = true;
    this.showSaveEditButton = 'none';
    this.updateNote(noteId, expirationDate, 'ACTIVE');
  }

  private updateNote(noteId: number, expirationDate: number, status: string){
    let content: string = this.noteContentElement.nativeElement.value;
    let noteDTO: Note = new Note(noteId, content, expirationDate, status);
    this.monthNoteService.updateNote(noteDTO).then((notes: Note[]) => {
      this.monthNoteService.allNotes = notes;
      this.statusNotesService.sortNotesByStatus();
    })
  }

  public noteMouseEnterListener(): void{
    if(this.showSaveEditButton == 'none') {
      this.showDeleteAndEditButtons = 'block';
    }
  }
  public noteMouseLeaveListener(): void{
    this.showDeleteAndEditButtons = 'none';
  }

}
