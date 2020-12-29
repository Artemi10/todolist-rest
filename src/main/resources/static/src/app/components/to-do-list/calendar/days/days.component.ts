import {Component, Input} from '@angular/core';
import {Moment} from "moment";
import {CalendarDateService} from "../../../../services/calendar-date/calendar-date.service";

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.css']
})
export class DaysComponent {
  @Input() monthDaysInWeeks: Moment[][];

  constructor(public calendarDate: CalendarDateService) {}

  public isWeekend(date: Moment): boolean {
    return date.weekday() === 0 || date.weekday() === 6;
  }

  public clickDayListener(timeNumber: number): void {
    this.calendarDate.setTme(new Date(timeNumber));
  }

  public leftButtonClickListener(): void {
    this.calendarDate.getPreviousMonth();
  }

  public rightButtonClickListener(): void {
    this.calendarDate.getNextMonth();
  }

  public isCurrentDay(day: Moment){
    if(day===null) {
      return false;
    }
    return day.date() === this.calendarDate.getDate();
  }


}
