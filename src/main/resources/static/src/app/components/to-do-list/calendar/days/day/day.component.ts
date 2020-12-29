import {Component, Input, OnInit} from '@angular/core';
import {Moment} from "moment";
import {MonthNotesService} from "../../../../../services/month-notes/month-notes.service";
import {DayNotesService} from "../../../../../services/day-notes/day-notes.service";


@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit{
  @Input()
  public day: Moment;
  public amount: number;

  constructor(public monthNotesService: MonthNotesService) { }

  ngOnInit(): void {
    this.amount = this.monthNotesService.countNotesByDay(this.day.toDate().getTime())
  }


}
