import { TestBed } from '@angular/core/testing';

import { JbUiLibService } from './jb-ui-lib.service';

describe('JbUiLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JbUiLibService = TestBed.inject(JbUiLibService);
    expect(service).toBeTruthy();
  });
});
