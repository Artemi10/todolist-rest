import { TestBed } from '@angular/core/testing';

import { CalendarDateService } from './calendar-date.service';

describe('CalendarDateService', () => {
  let service: CalendarDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
