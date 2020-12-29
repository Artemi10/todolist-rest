import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteStatusPanelComponent } from './note-status-panel.component';

describe('NoteStatusPanelComponent', () => {
  let component: NoteStatusPanelComponent;
  let fixture: ComponentFixture<NoteStatusPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteStatusPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteStatusPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
