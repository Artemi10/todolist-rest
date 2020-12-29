import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Note} from "../../../../models/note.model";
import {MonthNotesService} from "../../../../services/month-notes/month-notes.service";
import {ChartNotesService} from "../../../../services/chart/chart-notes.service";
import {StatusNotesService} from "../../../../services/notes-status/status-notes.service";
import {CalendarDateService} from "../../../../services/calendar-date/calendar-date.service";
import {DayNotesService} from "../../../../services/day-notes/day-notes.service";


@Component({
  selector: 'app-add-note-panel',
  templateUrl: './add-note-panel.component.html',
  styleUrls: ['./add-note-panel.component.css']
})
export class AddNotePanelComponent {
  @Input('currentDateNumber') currentDateNumber: number;
  @ViewChild('inputTittleElement')
  public inputTittleElement: ElementRef;
  @ViewChild('inputContentElement')
  public inputContentElement: ElementRef;

  constructor(private monthNotesService: MonthNotesService, private calendarDate: CalendarDateService,
              private chartNotesService: ChartNotesService, private statusNotesService: StatusNotesService, private dayNoteService: DayNotesService) { }


  public addButtonClickListener(){
    let note: Note = new Note(null, this.inputContentElement.nativeElement.value, this.currentDateNumber, 'ACTIVE')
    this.monthNotesService.addNote(note)
      .then((data:Note)=>{
        this.monthNotesService.allNotes.push(data);
        this.dayNoteService.dayNotes.push(data)
        this.statusNotesService.sortNotesByStatus();
        this.chartNotesService.openAllCharts(this.calendarDate);
      });
  }

}
