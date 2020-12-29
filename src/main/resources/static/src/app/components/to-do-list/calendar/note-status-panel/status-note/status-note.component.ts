import {Component, Input, OnInit} from '@angular/core';
import {Note} from "../../../../../models/note.model";

@Component({
  selector: 'app-status-note',
  templateUrl: './status-note.component.html',
  styleUrls: ['./status-note.component.css']
})
export class StatusNoteComponent implements OnInit {
  @Input()
  public notes: Note[];
  constructor() { }

  ngOnInit(): void {
  }

}
