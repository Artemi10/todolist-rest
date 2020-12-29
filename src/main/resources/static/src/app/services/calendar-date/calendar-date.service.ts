import { Injectable } from '@angular/core';
import {Moment} from "moment";
import * as moment from "moment";
import {ChartNotesService} from "../chart/chart-notes.service";
import {MonthNotesService} from "../month-notes/month-notes.service";
import {StatusNotesService} from "../notes-status/status-notes.service";
import {Note} from "../../models/note.model";
import {DayNotesService} from "../day-notes/day-notes.service";

@Injectable({
  providedIn: 'root'
})
export class CalendarDateService {
  private date: Moment;

  constructor(private chartService: ChartNotesService, private monthNoteService: MonthNotesService, private notesStatusService: StatusNotesService, private dayNotesService: DayNotesService) {
    this.date = moment();
    this.monthNoteService.findAllNotesByTimeline(this.getFirstDayInMonth(), this.getLastDayInMonth())
      .then((notesDTO: Note[])=>{
        this.monthNoteService.allNotes = notesDTO;
        this.dayNotesService.findAllNotesByDay(this.getTime());
        this.notesStatusService.sortNotesByStatus();
        this.chartService.openAllCharts(this);
      })
  }

  public setTme(day: Date): void{
    let newDate: Moment = moment(day)
    if(newDate.month() != this.date.month()){
      this.date = newDate;
      this.monthNoteService.findAllNotesByTimeline(this.getFirstDayInMonth(), this.getLastDayInMonth())
        .then((notesDTO: Note[])=>{
          this.monthNoteService.allNotes = notesDTO;
          this.dayNotesService.findAllNotesByDay(this.getTime());
          this.notesStatusService.sortNotesByStatus();
          this.chartService.openAllCharts(this);
        })
    }
    else{
      this.date = newDate;
      this.dayNotesService.findAllNotesByDay(this.getTime())
      this.notesStatusService.sortNotesByStatus();
      this.chartService.openDayCharts(this);
    }
  }

  public getTime(): number{
    return new Date(this.getYear(), this.getMonthPosition(), this.getDate()).getTime();
  }
  public getFormatDate(format: string): string{
    return this.date.format(format);
  }

  public getMonthPosition():number{
    return this.date.month();
  }

  public getMonthDays(): number[]{
    let mothDays: number[] = []
    for(let i =1; i <= this.date.daysInMonth(); i++){
      mothDays.push(i)
    }
    return mothDays;
  }

  public getDate():number{
    return this.date.date();
  }

  public getYear():number{
    return this.date.year();
  }

  public getWeeksInMonth(): Moment[][]{
    let mothDays: Moment[] = this.getDaysInMonthWithWeek();
    let firstWeek: Moment[] = mothDays.slice(0, 7);
    let secondWeek: Moment[] = mothDays.slice(7, 14);
    let thirdWeek: Moment[] = mothDays.slice(14, 21);
    let fourthWeek: Moment[] = mothDays.slice(21, 28);
    let fifthWeek: Moment[] = mothDays.slice(28, 35);
    let sixthWeek: Moment[] = mothDays.slice(35, 42);
    return [firstWeek, secondWeek, thirdWeek, fourthWeek, fifthWeek, sixthWeek];
  }

  private getDaysInMonthWithWeek(): Moment[]{
    let monthDays: Moment[] = this.getDaysInMonth();
    let firstDayInMonth: Moment = monthDays[0];
    let firstDayInMonthPosition: number = firstDayInMonth.day();

    if(firstDayInMonthPosition===0) {
      firstDayInMonthPosition = 7;
    }

    while(firstDayInMonthPosition!=1){
      monthDays.unshift(null);
      firstDayInMonthPosition--;
    }

    while(monthDays.length<42){
      monthDays.push(null);
    }
    return monthDays;
  }

  public getDaysInMonth(): Moment[]{
    let daysInMonth: number = this.date.daysInMonth();
    let days: Moment[] = [];

    while(daysInMonth) {
      let current: Moment = moment([this.date.year(), this.date.month(), daysInMonth]);
      days.push(current);
      daysInMonth--;
    }
    return days.reverse();
  }
  public getPreviousMonth(): void{
    let month: number = this.date.month();
    if(month===0){
      let date: Moment = moment([this.date.year()-1, 11, 1]);
      this.setTme(new Date(date.year(), date.month(), date.date()))
    }
    else {
      let date: Moment = moment([this.date.year(), this.date.month() - 1, 1]);
      this.setTme(new Date(date.year(), date.month(), date.date()))
    }
  }
  public getNextMonth(): void{
    let month: number = this.date.month();
    if(month===11){
      let date: Moment = moment([this.date.year()+1, 0, 1]);
      this.setTme(new Date(date.year(), date.month(), date.date()))
    }
    else {
      let date: Moment = moment([this.date.year(), this.date.month() + 1, 1]);
      this.setTme(new Date(date.year(), date.month(), date.date()))
    }
  }
  public getFirstDayInMonth(): number{
    let daysInMonth: Moment[] = this.getDaysInMonth();
    return daysInMonth.shift().toDate().getTime();
  }
  public getLastDayInMonth(): number{
    let daysInMonth: Moment[] = this.getDaysInMonth();
    return daysInMonth.pop().toDate().getTime();
  }

  public setMonth(month: number): void{
    let date = moment([this.date.year(), month, 1]);
    this.setTme(new Date(date.year(), date.month(), date.date()))
  }
  public setYear(year: number): void{
    let date = moment([year, this.date.month(), 1]);
    this.setTme(new Date(date.year(), date.month(), date.date()))
  }

  public setNextDay(): void{
    let date: number = this.date.date();
    let month: number = this.date.month();
    let year: number = this.date.year();
    date++;
    if(date > moment(this.getLastDayInMonth()).date()||isNaN(date)){
      month++;
      date=1;
    }
    if(month>11){
      year++;
      month=0;
    }
    let newDate: Moment = moment([year, month, date])
    this.setTme(new Date(newDate.year(), newDate.month(), newDate.date()))
  }

  public setLastDay(): void{
    let date: number = this.date.date();
    let month: number = this.date.month();
    let year: number = this.date.year();
    date--;
    if(date < 1){
      month--;
      if(month<0){
        month=11;
        year--;
      }
      date = moment([year, month, 1]).daysInMonth();
    }
    let newDate: Moment = moment([year, month, date])
    this.setTme(new Date(newDate.year(), newDate.month(), newDate.date()))
  }


}
