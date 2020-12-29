import { TestBed } from '@angular/core/testing';

import { MonthNotesService } from './month-notes.service';

describe('MonthNotesService', () => {
  let service: MonthNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
