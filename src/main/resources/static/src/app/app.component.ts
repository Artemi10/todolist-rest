import { Component } from '@angular/core';
import {Note} from "./models/note.model";
import {StatusNotesService} from "./services/notes-status/status-notes.service";
import {MonthNotesService} from "./services/month-notes/month-notes.service";
import {ChartNotesService} from "./services/chart/chart-notes.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  public title = 'todoList';


}
