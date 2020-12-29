import { TestBed } from '@angular/core/testing';

import { StatusNotesService } from './status-notes.service';

describe('StatusNotesService', () => {
  let service: StatusNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
