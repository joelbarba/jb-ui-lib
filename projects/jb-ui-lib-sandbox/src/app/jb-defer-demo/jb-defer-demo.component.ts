import { Component, OnInit } from '@angular/core';
import {JbDefer} from '../../../../jb-ui-lib/src/lib/jb-defer/jb-defer';
import {JbPromise} from '../../../../jb-ui-lib/src/lib/jb-promise/jb-promise';
import {JbGrowlService} from '../../../../jb-ui-lib/src/lib/jb-growl/jb-growl.service';

@Component({
  selector: 'app-jb-defer-demo',
  templateUrl: './jb-defer-demo.component.html',
  styleUrls: ['./jb-defer-demo.component.scss']
})
export class JbDeferDemoComponent implements OnInit {
  public name = jbDeferDoc.name;
  public desc = jbDeferDoc.desc;
  public api = jbDeferDoc.api;
  public instance = jbDeferDoc.instance;

  public example1 = `import { JbDefer } from 'jb-ui-lib';

const def = new JbDefer();
console.log(def.status); // <-- This will be 0 (pending)
setTimeout(() => { def.resolve(true); }, 4000);
setTimeout(() => { def.reject(false); }, 3000);

def.promise.then(
  res => { console.log('Promise resolved', res, def.status); },
  res => { console.log('Promise rejected', res, def.status); }
);
`;

  public myDef: JbDefer;
  public resolveTime = 5;
  public rejectTime = 7;
  public testLog = '';
  public elapsedTime = 0;
  public cancelInt;
  public cancelRes;
  public cancelRej;


  constructor(private growl: JbGrowlService) { }

  ngOnInit() {
    // console.log('Promise Init');
    // const def = new JbDefer();
    // def.promise.then(
    //   () => { console.log('Promise resolved'); },
    //   () => { console.log('Promise rejected'); }
    // );
    // console.log(def.status);
    // setTimeout(() => { def.resolve(true); }, 4000);
    // setTimeout(() => { def.reject(false);  }, 3000);
  }


  initTest = () => {
    this.myDef = new JbDefer();
    this.elapsedTime = 0;
    this.cancelInt = setInterval(() => { this.elapsedTime++; this.renderLog(); }, 1000);

    this.myDef.promise.then(res => {
      this.growl.success('Promise resolved: ' + res);
      this.clearAll();
    }, res => {
      this.growl.error('Promise rejected: ' + res);
      this.clearAll();
    });

    this.cancelRes = setTimeout(() => this.myDef.resolve('Timout'), this.resolveTime * 1000);
    this.cancelRej = setTimeout(() => this.myDef.reject('Timout'), this.rejectTime * 1000);
    this.renderLog();
  }
  renderLog = () => {
    if (!this.myDef) { this.testLog = '-'; return false; }
    let statusName = '-';
    if (this.myDef.status === 0) { statusName = 'Pending'; }
    if (this.myDef.status === 1) { statusName = 'Resolved'; }
    if (this.myDef.status === 2) { statusName = 'Rejected'; }
    this.testLog = `${this.elapsedTime} seg --> Status = ${this.myDef.status} (${statusName})`;
  }
  clearAll = () => {
    clearInterval(this.cancelInt);
    clearTimeout(this.cancelRes);
    clearTimeout(this.cancelRej);
    this.renderLog();
  }


}


export const jbDeferDoc = {
  name    : `JbDefer`,
  uiType  : 'class',
  desc    : `(Class) Native Promise wrapper`,
  api     : `promise: Promise<any>  --> The native promise
status: number         --> Status of the promise: pending = 0, resolved = 1, rejected = 2
resolve(): Function    --> Pointer to the native promise's resolve() function
reject(): Function     --> Pointer to the native promise's reject() function
`,
  instance: `<jb-defer></jb-defer>`,
  demoComp: JbDeferDemoComponent
};
