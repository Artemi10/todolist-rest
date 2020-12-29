import { TestBed } from '@angular/core/testing';

import { ChartNotesService } from './chart-notes.service';

describe('ChartNotesService', () => {
  let service: ChartNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
