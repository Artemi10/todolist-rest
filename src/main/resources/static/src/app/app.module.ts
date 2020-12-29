import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import { LogInComponent } from './components/authorization/log-in/log-in.component';
import { SignUpComponent } from './components/authorization/sign-up/sign-up.component';
import {AuthorizationGuard} from "./guards/authorization/authorization.guard";
import {AuthenticationGuard} from "./guards/authentication/authentication.guard";
import {AuthHeaderInterceptor} from "./services/authentication/auth-header.interceptor";
import {AuthErrorHandler} from "./services/authentication/auth-error.handler";
import {APP_BASE_HREF} from "@angular/common";
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import {AddNotePanelComponent} from "./components/to-do-list/events/add-note-panel/add-note-panel.component";
import { EventsComponent } from './components/to-do-list/events/events.component';
import {CalendarComponent} from "./components/to-do-list/calendar/calendar.component";
import { DaysComponent } from './components/to-do-list/calendar/days/days.component';
import { NoteComponent } from './components/to-do-list/events/note/note.component';
import { ChartComponent } from './components/to-do-list/calendar/charts/chart/chart.component';
import { DayComponent } from './components/to-do-list/calendar/days/day/day.component';
import { NoteStatusPanelComponent } from './components/to-do-list/calendar/note-status-panel/note-status-panel.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { StatusNoteComponent } from './components/to-do-list/calendar/note-status-panel/status-note/status-note.component';
import { ChartsComponent } from './components/to-do-list/calendar/charts/charts.component';


const routes: Routes = [
  {path:'todolist', component: ToDoListComponent, canActivate: [AuthenticationGuard] },
  {path:'logIn', component: LogInComponent, canActivate: [AuthorizationGuard]},
  {path:'signUp', component: SignUpComponent, canActivate: [AuthorizationGuard]}
  ];
@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    LogInComponent,
    SignUpComponent,
    ToDoListComponent,
    AddNotePanelComponent,
    EventsComponent,
    DaysComponent,
    NoteComponent,
    ChartComponent,
    DayComponent,
    NoteStatusPanelComponent,
    StatusNoteComponent,
    ChartsComponent,
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
        DragDropModule
    ],
  exports: [
    AddNotePanelComponent,
    ToDoListComponent
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthHeaderInterceptor, multi: true},
    {provide:ErrorHandler, useClass:AuthErrorHandler},
    {provide: APP_BASE_HREF, useValue:'/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
