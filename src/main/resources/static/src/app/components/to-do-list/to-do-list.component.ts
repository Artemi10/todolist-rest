import { Component} from '@angular/core';
import {CalendarDateService} from "../../services/calendar-date/calendar-date.service";

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent {

  constructor(private calendarDate: CalendarDateService) {
    calendarDate.setTme(new Date());
  }
}
