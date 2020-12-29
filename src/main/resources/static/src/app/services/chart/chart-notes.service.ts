import { Injectable } from '@angular/core';
import {Chart} from 'node_modules/chart.js';
import {MonthNotesService} from "../month-notes/month-notes.service";
import {StatusNotesService} from "../notes-status/status-notes.service";
import {CalendarDateService} from "../calendar-date/calendar-date.service";

@Injectable({
  providedIn: 'root'
})
export class ChartNotesService {
  private monthNoteChart: Chart;
  private statusNotesChart: Chart;
  private statusNotesPie: Chart;

  constructor(private monthNotesService: MonthNotesService, private statusNotesService: StatusNotesService) {}

  public openAllCharts(calendarDate: CalendarDateService){
    this.openMonthNoteChart(calendarDate);
    this.openStatusNotesChart(calendarDate);
    this.openStatusNotesPie(calendarDate);
  }
  public openDayCharts(calendarDate: CalendarDateService){
    this.openStatusNotesChart(calendarDate);
    this.openStatusNotesPie(calendarDate);
  }

  private openMonthNoteChart(calendarDate: CalendarDateService): void{
    this.monthNoteChart = new Chart("monthNotes", {
      type: 'line',
      data: {
        labels: calendarDate.getMonthDays(),
        datasets: [{
          label: 'All notes',
          data: this.monthNotesService.getMonthNotesAmountByDays(calendarDate.getDaysInMonth()),
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)'],
          fill: false
        }]
      },
      tooltips: {
        mode: false,
        callbacks: {
          title: function() {},
          label: function() {}
        }
      },
      options: {
        tooltips: {
          mode: false,
          callbacks: {
            title: function() {},
            label: function() {}
          }
        },
        scales: {
          xAxes: [{
            display: true,
            beginAtZero: true,
            scaleLabel: {
              display: true,
              labelString: 'Days'
            }, ticks: {
              beginAtZero: true
            }
          }],
          yAxes: [{
            display: true,
            beginAtZero: true,
            scaleLabel: {
              display: true,
              labelString: 'Amount'
            },
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  private openStatusNotesChart(calendarDate: CalendarDateService): void{
    this.statusNotesChart = new Chart('statusNotes', {
      type: 'bar',
      data: {
        labels: [calendarDate.getFormatDate('D MMMM YYYY')],
        datasets: [
          {
            label: 'Pending notes',
            data: [this.statusNotesService.pendingNotes.length],
            backgroundColor: ['rgba(252, 69, 13, 0.6)'],
            borderColor: ['rgba(252, 69, 13, 1)'],
            fill: false
          },
          {
            label: 'Active notes',
            data: [this.statusNotesService.activeNotes.length],
            backgroundColor: ['rgba(255, 99, 132, 0.6)'],
            borderColor: ['rgba(255, 99, 132, 1)'],
            fill: false
          },
          {
            label: 'Done notes',
            data: [this.statusNotesService.doneNotes.length],
            backgroundColor: ['rgba(2, 99, 132, 0.6)'],
            borderColor: ['rgba(2, 99, 132, 1)'],
            fill: false
          }]
      },
      options: {
        tooltips: {
          mode: false,
          callbacks: {
            title: function() {},
            label: function() {}
          }
        },
        scales: {
          xAxes: [{
            display: true,
            beginAtZero: true,
            scaleLabel: {
              display: true,
            }, ticks: {
              beginAtZero: true
            }
          }],
          yAxes: [{
            display: true,
            beginAtZero: true,
            scaleLabel: {
              display: true,
              labelString: 'Amount'
            },
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  private openStatusNotesPie(calendarDate: CalendarDateService): void{
    this.statusNotesPie = new Chart('pieStatusNotes', {
      type: 'pie',
      data: {
        datasets: [
          {
            label: calendarDate.getFormatDate('D MMMM YYYY'),
            data: [this.statusNotesService.pendingNotes.length, this.statusNotesService.activeNotes.length, this.statusNotesService.doneNotes.length],
            backgroundColor: ['rgba(252, 69, 13, 0.6)', 'rgba(255, 99, 132, 0.6)' , 'rgba(2, 99, 132, 0.6)'],
            fill: false
          }],
        labels: ['Pending notes', 'Active notes', 'Done notes' ],
      },
      options: {
        tooltips: {
          mode: false,
          callbacks: {
            title: function() {},
            label: function() {}
          }
        },
      }
    });
  }
}
