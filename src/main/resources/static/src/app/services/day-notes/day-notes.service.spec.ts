import { TestBed } from '@angular/core/testing';

import { DayNotesService } from './day-notes.service';

describe('DayNotesService', () => {
  let service: DayNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
