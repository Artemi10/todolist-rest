import {AfterViewInit, Component, OnChanges, SimpleChanges} from '@angular/core';
import {Note} from "../../../../models/note.model";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {StatusNotesService} from "../../../../services/notes-status/status-notes.service";
import {MonthNotesService} from "../../../../services/month-notes/month-notes.service";
import {ChartNotesService} from "../../../../services/chart/chart-notes.service";
import {CalendarDateService} from "../../../../services/calendar-date/calendar-date.service";

@Component({
  selector: 'app-note-status-panel',
  templateUrl: './note-status-panel.component.html',
  styleUrls: ['./note-status-panel.component.css']
})
export class NoteStatusPanelComponent{
  constructor(public statusNotesService: StatusNotesService, private noteService: MonthNotesService,
              private chartNotesService: ChartNotesService, private calendarDate: CalendarDateService) {}

  public drop(event: CdkDragDrop<Note[]>): void {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)
      let currentNote: Note = event.container.data[event.currentIndex];
      if(event.container.id === 'cdk-drop-list-0'){
        this.updateCurrentNote(currentNote,  'PENDING')
      }
      else if(event.container.id === 'cdk-drop-list-1'){
        this.updateCurrentNote(currentNote, 'ACTIVE')
      }
      else if(event.container.id === 'cdk-drop-list-2'){
        this.updateCurrentNote(currentNote, 'DONE')
      }
    }
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  public updateCurrentNote(currentNote: Note, newStatusValue: string):void{
    currentNote.status = newStatusValue;
    this.noteService.updateNote(currentNote)
      .then((notes:Note[]) =>{
        this.noteService.allNotes = notes;
        this.statusNotesService.sortNotesByStatus();
        this.chartNotesService.openDayCharts(this.calendarDate);
      })
  }





}
