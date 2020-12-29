import { Component } from '@angular/core';
import {MonthNotesService} from "../../../services/month-notes/month-notes.service";
import {Note} from "../../../models/note.model";
import {ChartNotesService} from "../../../services/chart/chart-notes.service";
import {StatusNotesService} from "../../../services/notes-status/status-notes.service";
import {CalendarDateService} from "../../../services/calendar-date/calendar-date.service";
import {DayNotesService} from "../../../services/day-notes/day-notes.service";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  public months = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public showDayNotesStatusesFlag: boolean = false;
  public showChartFlag: boolean = false;
  public showCalendarFlag: boolean = true;


  constructor(public calendarDate: CalendarDateService) {
    calendarDate.setTme(new Date());
  }


  public isSelectedAttribute(monthPosition: number): boolean {
    return monthPosition === this.calendarDate.getMonthPosition();
  }


  public changeYearListener(value: any): void {
    this.calendarDate.setYear(value);
  }

  public changeMonthListener(value: any): void {
    this.calendarDate.setMonth(value);
  }

  public clickShowChartsButtonListener(): void{
    this.showChartFlag = true;
    this.showCalendarFlag =false;
    this.showDayNotesStatusesFlag = false;
  }

  public clickShowCalendarButtonListener(): void{
    this.showChartFlag = false;
    this.showCalendarFlag = true;
    this.showDayNotesStatusesFlag = false;
  }

  public clickShowNotesStatusesButtonListener(): void{
    this.showChartFlag = false;
    this.showCalendarFlag = false;
    this.showDayNotesStatusesFlag = true;
  }

}
