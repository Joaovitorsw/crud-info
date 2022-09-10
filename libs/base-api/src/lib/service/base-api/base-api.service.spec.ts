import { TestBed } from '@angular/core/testing';
import { UtilsBaseApiService } from './base-api.service';

describe('UtilsBaseApiService', () => {
  let service: UtilsBaseApiService<boolean>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsBaseApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
