import { TestBed, inject } from '@angular/core/testing';

import { SlotProcessService } from './slot-process.service';

describe('SlotProcessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlotProcessService]
    });
  });

  it('should be created', inject([SlotProcessService], (service: SlotProcessService) => {
    expect(service).toBeTruthy();
  }));
});
