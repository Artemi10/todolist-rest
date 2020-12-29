import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNotePanelComponent } from './add-note-panel.component';

describe('AddNotePanelComponent', () => {
  let component: AddNotePanelComponent;
  let fixture: ComponentFixture<AddNotePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNotePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNotePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
