import { Component} from '@angular/core';
import {MonthNotesService} from "../../../services/month-notes/month-notes.service";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {Note} from "../../../models/note.model";
import {ChartNotesService} from "../../../services/chart/chart-notes.service";
import {StatusNotesService} from "../../../services/notes-status/status-notes.service";
import {CalendarDateService} from "../../../services/calendar-date/calendar-date.service";
import {DayNotesService} from "../../../services/day-notes/day-notes.service";



@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  public showAddNotePanel: string = 'none';
  public showChangeDatePanelFlag: boolean = false

  constructor(private authenticationService: AuthenticationService, public monthNotesService: MonthNotesService,
              public calendarDate: CalendarDateService, public dayNotesService: DayNotesService) {

  }

  public exit(){
    this.authenticationService.deleteToken();
    window.location.replace('/logIn')
  }
  public clickAddButtonListener(){
    this.showAddNotePanel === 'none' ? this.showAddNotePanel = 'block' : this.showAddNotePanel = 'none';
  }

  public showChangeDatePanel(){
    this.showChangeDatePanelFlag = true;
  }
  public closeChangeDatePanel(){
    this.showChangeDatePanelFlag = false;
  }

  public clickPreviousDateButtonListener() {
    this.calendarDate.setLastDay();
  }
  public clickNextDateButtonListener(){
    this.calendarDate.setNextDay();
  }


}
