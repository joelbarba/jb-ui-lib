import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class JbUiLibService {
  // public isBtnLoading = false;   // Global flag to disable all buttons while async
  // public loadingPromise: Promise<any>;  // Current loading promise

  public loadingGroup = {
    // group1: new Promise(resolve)
  };

  constructor() {

  }
}
