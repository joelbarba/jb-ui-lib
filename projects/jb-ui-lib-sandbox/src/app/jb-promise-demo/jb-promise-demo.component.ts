import { Component, OnInit } from '@angular/core';
import {JbPromise} from '../../../../jb-ui-lib/src/lib/jb-promise/jb-promise';

@Component({
  selector: 'app-jb-promise-demo',
  templateUrl: './jb-promise-demo.component.html',
  styleUrls: ['./jb-promise-demo.component.scss']
})
export class JbPromiseDemoComponent implements OnInit {
  public name = jbPromiseDoc.name;
  public desc = jbPromiseDoc.desc;
  public api = jbPromiseDoc.api;
  public instance = jbPromiseDoc.instance;

  public example1 = `import { JbPromise } from 'jb-ui-lib';

const JbPromise = new JbPromise((resolve, reject, cancel) => {
  setTimeout(() => { cancel(1);  }, 2000);
  setTimeout(() => { resolve(2); }, 3000);
  setTimeout(() => { reject(3);  }, 4000);
});`;

  public example2 = `const JbPromise = new JbPromise();
setTimeout(() => { JbPromise.cancel();  }, 2000);
setTimeout(() => { JbPromise.resolve(); }, 3000);
setTimeout(() => { JbPromise.reject();  }, 4000);

JbPromise.then(
  () => { console.log('Promise resolved'); },
  () => { console.log('Promise rejected'); },
  () => { console.log('Promise completed'); }
);

JbPromise.then(() => { console.log('Promise resolved'); });
JbPromise.fail(() => { console.log('Promise rejected'); });
JbPromise.complete(() => { console.log('Promise completed'); });`;

  public staticHelpers = `from(promise: Promise<any>): JbPromise ------------> Convert a native promise to a JbPromise
all(stack: Array<JbPromise>): JbPromise -----------> (NOT IMPLEMENTED YET) Returns a promise that resolves when all the given promises are resolved, or one is rejected (same as Promise.all)
allCompleted(stack: Array<JbPromise>): JbPromise --> (NOT IMPLEMENTED YET) Returns a promise that resolves when all the given promises are completed
allResolved(stack: Array<JbPromise>): JbPromise ---> (NOT IMPLEMENTED YET) Returns a promise that resolves when all are resolved, or one is rejected (same as Promise.all)
`;

  public myPromise: JbPromise;
  public resolveTime = 5;
  public rejectTime = 7;
  public testLog = '';
  public elapsedTime = 0;
  public cancelInt;
  public cancelRes;
  public cancelRej;

  constructor() { }

  ngOnInit() {
    this.renderLog();
  }


  initTest = () => {
    this.myPromise = new JbPromise();
    this.elapsedTime = 0;
    this.cancelInt = setInterval(() => { this.elapsedTime++; this.renderLog(); }, 1000);

    this.cancelRes = setTimeout(() => {
      this.myPromise.resolve();
      clearInterval(this.cancelInt);
      clearTimeout(this.cancelRes);
      clearTimeout(this.cancelRej);
      this.renderLog();
    }, this.resolveTime * 1000);

    this.cancelRej = setTimeout(() => {
      this.myPromise.reject();
      clearInterval(this.cancelInt);
      clearTimeout(this.cancelRes);
      clearTimeout(this.cancelRej);
      this.renderLog();
    }, this.rejectTime * 1000);

    this.renderLog();
  }
  renderLog = () => {
    if (!this.myPromise) { this.testLog = 'No Promise'; return false; }
    let statusName = '-';
    if (this.myPromise.status === 0) { statusName = 'Pending'; }
    if (this.myPromise.status === 1) { statusName = 'Resolved'; }
    if (this.myPromise.status === 2) { statusName = 'Rejected'; }
    if (this.myPromise.status === 3) { statusName = 'Cancelled'; }
    this.testLog = `${this.elapsedTime} seg --> Status = ${this.myPromise.status} (${statusName})`;
  }
  testCancel = () => {
    this.myPromise.cancel();
    clearInterval(this.cancelInt);
    clearTimeout(this.cancelRes);
    clearTimeout(this.cancelRej);
    this.renderLog();
  }

}


export const jbPromiseDoc = {
  name    : `JbPromise`,
  uiType  : 'class',
  desc    : `(Class) Custom Promise Generator (promise with asteroids)`,
  api     : `resolve(result?) --> It resolves the current promise (shortcut to the inner resolver)
reject(result?)  --> It rejects the current promise (shortcut to the inner rejector)
cancel()         --> It cancels the promise if it is still not resolved/rejected. Every listener (then/catch/complete) set
                     on this promise will be ignored after cancel.

status: IJbDeferStatus --> Current status of the promise (internally exposed). pending = 0, resolved = 1, rejected = 2, cancelled = 3
result: any            --> If resolved/rejected the result with which it was resolved/rejected

then(thenFn, catchFn?, completeFn?)  --> Subscriber to the promise (same as native promise)
fail(catchFn)                        --> Subscriber to the rejection of the promise (same as native catch)
complete(completeFn)                 --> Subscriber to any resolution of the promise (same as native finally)
                                         The complete is not executed is the promise is canceled.
`,
  instance: `new JbPromise()`,
  demoComp: JbPromiseDemoComponent
};
