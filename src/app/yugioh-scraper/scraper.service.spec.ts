import { TestBed } from '@angular/core/testing';

import { ScraperServiceService } from './scraper.service';

describe('ScraperServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScraperServiceService = TestBed.get(ScraperServiceService);
    expect(service).toBeTruthy();
  });
});
