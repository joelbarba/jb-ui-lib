import {IJbDeferStatus} from '../jb-promise/jb-promise';


export class JbDefer {
  public promise: Promise<any>;   // Native Promise
  public resolve: Function;       // Promise resolver function
  public reject: Function;        // Promise rejector function
  public status: IJbDeferStatus;

  constructor() {
    this.status = 0;
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });

    // Set status once resolve/rejected
    this.promise.then(
      () => { if (this.status === 0) { this.status = 1; }},
      () => { if (this.status === 0) { this.status = 2; }}
    );
  }
}
