/**
 * This reproduces the native ES6 Promise object, extending its capabilities:
 * - Cancel option    --> It is possible to cancel a pending promise
 * - Exposed status   --> The status is readable at any time, to be checked out of the promise (IJbDeferStatus)
 * - Complete         --> It exposes a complete (like finally) subscription, available on the then() function too.
 * - Resolve / Reject --> It exposes the resolve() / reject() methods externally,
 *                        so they can be called out of the constructor
 *
 * It does not use a native promise internally, but reproduces the stack callback chain so it has full controll
 * on the ongoing subscriptions. It can also be chained.
 *
 * // Example (with constructor):
 *    let JbPromise = new JbPromise((resolve, reject, cancel) => {
 *      setTimeout(() => { cancel(1);  }, 2000);
 *      setTimeout(() => { resolve(2); }, 3000);
 *      setTimeout(() => { reject(3);  }, 4000);
 *    });
 *
 * // Example (no constructor):
 *    let JbPromise = new JbPromise();
 *    setTimeout(() => { JbPromise.cancel();  }, 2000);
 *    setTimeout(() => { JbPromise.resolve(); }, 3000);
 *    setTimeout(() => { JbPromise.reject();  }, 4000);
 *
 *    JbPromise.then(
 *      () => { console.log('Promise resolved'); },
 *      () => { console.log('Promise rejected'); },
 *      () => { console.log('Promise completed'); }
 *    );
 *
 *    JbPromise.then(() => { console.log('Promise resolved'); });
 *    JbPromise.fail(() => { console.log('Promise rejected'); });
 *    JbPromise.complete(() => { console.log('Promise completed'); });
 *
 */
export enum IJbDeferStatus { pending = 0, resolved = 1, rejected = 2, cancelled = 3 }
interface IChainStack { fn: Function; promise?: JbPromise; }

export class JbPromise {
  public status: IJbDeferStatus;
  public result: any;  // Catch the result param

  private thenStack     : Array<IChainStack>;
  private catchStack    : Array<IChainStack>;
  private completeStack : Array<IChainStack>;

  constructor(iniFn?: Function) {
    this.status = IJbDeferStatus.pending;
    this.resetStacks();

    // Extend the constructor out of the wrapper, if need be
    if (!!iniFn && typeof iniFn === 'function') {
      iniFn(this.resolve, this.reject, this.cancel);
    }
  }

  // Function wrapper to resolve. It runs all then + complete stack
  public resolve = (res?) => {
    if (this.status === IJbDeferStatus.pending) {
      this.status = IJbDeferStatus.resolved;
      this.result = res;

      this.thenStack.forEach(stackItem => {
        const result = stackItem.fn(res);
        stackItem.promise.resolve(result);  // Propagate chained promise
      });
      this.completeStack.forEach(stackItem => {
        const result = stackItem.fn(res);
        stackItem.promise.resolve(result);
      });
      this.resetStacks();
    }
  };

  // Function wrapper to reject. It runs all catch + complete stack
  public reject = (res?) => {
    if (this.status === IJbDeferStatus.pending) {
      this.status = IJbDeferStatus.rejected;
      this.result = res;

      this.catchStack.forEach(stackItem => {
        const result = stackItem.fn(res);
        stackItem.promise.reject(result);
      });
      this.completeStack.forEach(stackItem => {
        const result = stackItem.fn(res);
        stackItem.promise.reject(result);
      });
      this.resetStacks();
    }
  };

  // Cancel the pending stacks
  public cancel = () => {
    if (this.status === IJbDeferStatus.pending) {
      this.status = IJbDeferStatus.cancelled;
      this.resetStacks();
    }
  };


  // Subscribe to the promise resolve + reject + complete. It returns another promise to chain
  public then = (thenFn: Function, catchFn?: Function, completeFn?: Function): JbPromise => {
    const chainPromise = new JbPromise();
    if (!!thenFn && typeof thenFn === 'function') {
      this.thenStack.push({ fn: thenFn, promise: chainPromise });

      if (!!catchFn && typeof catchFn === 'function') {
        this.catchStack.push({fn: catchFn, promise: chainPromise });
      }

      if (!!completeFn && typeof completeFn === 'function') {
        this.completeStack.push({ fn: completeFn, promise: chainPromise });
      }

      this.immediateCall(); // If not pending, run it immediately
    }
    return chainPromise;
  };

  // Subscribe to the promise reject
  public fail = (catchFn: Function): JbPromise => {
    const chainPromise = new JbPromise();
    if (!!catchFn && typeof catchFn === 'function') {
      this.catchStack.push({ fn: catchFn, promise: chainPromise });
      this.immediateCall(); // If not pending, run it immediately
    }
    return chainPromise;
  };

  // Subscribe to the promise complete
  public complete = (completeFn: Function): JbPromise => {
    const chainPromise = new JbPromise();
    if (!!completeFn && typeof completeFn === 'function') {
      this.completeStack.push({ fn: completeFn, promise: chainPromise });
      this.immediateCall(); // If not pending, run it immediately
    }
    return chainPromise;
  };



  // Empty stacks
  private resetStacks = () => {
    this.thenStack = [];
    this.catchStack = [];
    this.completeStack = [];
  };

  // Check if the promise is completed and run the stacks
  private immediateCall = () => {
    if (this.status === IJbDeferStatus.resolved) {  // If resolved, run it immediately
      setTimeout(() => { this.resolve(this.result); });
    }
    if (this.status === IJbDeferStatus.rejected) {  // If rejected, run it immediately
      setTimeout(() => { this.reject(this.result); });
    }
  };


  // ---------- Static helpers --------------

  // // Convert a native promise to a JbPromise
  // static from = (nativePromise: Promise<any>) => {
  //   return new JbPromise((resolve, reject) => {
  //     nativePromise.then(resolve, reject);
  //   });
  // };
  //
  // // Returns a promise that resolves when all the given promises are resolved, or one is rejected (same as Promise.all)
  // static all = (stack: Array<JbPromise>) => {
  //   // TODO: Implement it
  // };
  //
  // // Returns a promise that resolves when all the given promises are completed
  // static allCompleted = (stack: Array<JbPromise>) => {
  //   // TODO: Implement it
  // };
  //
  // // Returns a promise that resolves when all are resolved, or one is rejected (same as Promise.all)
  // static allResolved = (stack: Array<JbPromise>) => {
  //   // TODO: Implement it
  // };


}










// ---------------- Those here below are just tests ---------------------- //
/*

export class RxPromise {
  public status: IJbDeferStatus;
  public result: any;  // Catch the result param
  public promise$;  // Observable that mocks the promise

  public resolve = (res) => {};
  public reject = (res) => {};
  public cancel = () => {};

  constructor(iniFn?: Function) {
    this.status = IJbDeferStatus.pending;

    this.promise$ = Rx.Observable.create(obs => {
      console.log('Generate observable');
      this.resolve = (res) => { obs.next(res); };
      this.reject  = (res) => { obs.error(res); };
      this.cancel  = () => {
        console.log('Cancel promise');
        this.subStack.forEach(sub => { sub.unsubscribe(); });
        this.subStack = [];
        this.status = IJbDeferStatus.cancelled;
        obs.complete();
      };
    }).pipe(RxOp.take(1));

    // Control Subscription.
    this.subStack.push(this.promise$.subscribe(
      (val) => { console.log('Resolve', val); this.status = IJbDeferStatus.resolved; },
      (err) => { console.log('Reject',  err); this.status = IJbDeferStatus.rejected; },
      ()    => { console.log('Complete'); },
    ));

    // Extend the constructor out of the wrapper, if need be
    if (!!iniFn && typeof iniFn === 'function') {
      iniFn(this.resolve, this.reject, this.cancel);
    }
  }

  public subStack = [];
  public then = (thenFn: Function, catchFn?: Function, completeFn?: Function) => {
    this.subStack.push(this.promise$.subscribe(
      (val) => { console.log('then - Resolve', val); },
      (err) => { console.log('then - Reject', err); },
      ()    => { console.log('then - Complete'); }
    ));
  };

  public fail = (catchFn: Function) => {
    this.subStack.push(this.promise$.subscribe(
      () => {}, (err) => { catchFn(err) }
    ));
  };


}




// Extended ES6 Promise (cancellable, exposed status, manual resolve/reject, completed)
// Inspired on: https://github.com/alkemics/CancelablePromise/blob/master/CancelablePromise.js
export class SuperPromise {
  public status: IJbDeferStatus;
  public promise: Promise<any>;
  public resolve;   // Function to manually resolve the internal promise
  public reject;    // Function to manually reject the internal promise

  constructor(public iniFunc?) {
    console.log('JbDefer constructor');

    this.promise = new Promise((resolve, reject) => {
      this.status = IJbDeferStatus.pending;
      this.resolve = () => { if (this.status === IJbDeferStatus.pending) { resolve(); } };
      this.reject  = () => { if (this.status === IJbDeferStatus.pending) { reject(); } };

      if (!!this.iniFunc && typeof this.iniFunc === 'function') {
        this.iniFunc(this.resolve, this.reject);
      }
    });

    // Change the exposed status when resolved/rejected, and handle complete
    this.promise.then(() => {
      if (this.status === IJbDeferStatus.pending) {
        this.status = IJbDeferStatus.resolved;
        this.onComplete();
      }
    }).catch(() => {
      if (this.status === IJbDeferStatus.pending) {
        this.status = IJbDeferStatus.rejected;
        this.onComplete();
      }
    });

  }


  // To cancel the ongoing promise
  public cancel = () => {
    if (this.status === IJbDeferStatus.pending) {
      console.log('Promise cancelled');
      this.status = IJbDeferStatus.cancelled;
    }
  };

  // Every then() generates a new JbPromise that will be resolve/reject only if the main promise is not cancelled
  public then = (thenFn, catchFn?) => {
    const JbPromise = new SuperPromise((cResolve, cReject) => {
      this.promise.then((res) => {
        if (this.status === IJbDeferStatus.cancelled) {
          JbPromise.cancel(); // Cancel child promise too

        } else {
          if (!!thenFn && typeof thenFn === 'function') {
            cResolve(thenFn(res));  // Resolve through the given callback function
            // TODO: If thenFn is rejected we should call cReject
          } else {
            cResolve(res);  // Just resolve
          }
        }

      }, (err) => {
        if (this.status === IJbDeferStatus.cancelled) {
          JbPromise.cancel(); // Cancel child promise too

        } else {
          if (!!catchFn && typeof catchFn === 'function') {
            cReject(catchFn(err));  // Reject through the given callback function
          } else {
            cReject(err);  // Just reject
          }
        }
      });
    });
    return JbPromise;
  };



  // Trigger a complete function whenever resolve or reject
  public onComplete = () => {};
  public complete = (fn) => {
    if (!!fn && typeof fn === 'function') {
      this.onComplete = fn;
    }
  };

}

*/
