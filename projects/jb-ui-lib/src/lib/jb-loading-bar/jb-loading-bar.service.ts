import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JbPromise } from '../jb-promise/jb-promise';
import Debug from 'debug';
const debugBar = Debug('jbUiLib:jbLoadingBar');

/*******************************************************************************************************************
 * Initiate the loading by calling .run() and passing a native Promise.
 * The loading will be resolved automatically when that promise is finished
 *
 *    Example: this.loadingBar.run(new Promise(resolve => resolve()))
 *
 * It is possible to queue multiple promises.
 * Calling .run() multiple times stacks promises, and keeps the bar running until they are all completed
 *
 * As a second (optional) parameter in .run() there is a configuration object to define the loading options:
 *  - blockScreen  (true) - Displays an overlay on the screen to block all elements
 *  - delayTime    (1sec) - Delay time to trigger. If promises are completed before this time, loading it's not shown
 *  - showBar      (true) - Displays the loading bar below the navbar
 *  - showSpinner  (false) - Display a spinner on the middle of the screen
 *  - spinnerType  (string) - // The type of the spinner to display
 *
 * Every time .run() is called those options can be updated (override the current values if passed)
 *
 * It is also possible to stop the loading manually calling .stop()
 *
 * Example:
 *
 *    const myPromise = new Promise((resolve) => { setTimeout(resolve, 5000); });
 *    this.loadingBar.run(myPromise, { blockScreen: false }).then(() => {
 *      console.log('Ready');
 *    });
 *
 */

export enum ILoadingStatus { Off = 0, Running = 1, Displayed = 2 }
export interface ILoadingOptions {
  blockScreen: boolean;    // Whether the whole screen should be blocked
  delayTime: number;       // Time to wait to trigger the animation after the loading is started
  showBar: boolean;        // Whether the loading bar should be displayed
  showSpinner: boolean;    // Whether the show the center spinner
  spinnerType: 'circular' | 'boxes';  // The type of the spinner to display
  showLogs: boolean;       // Debug flag - If on, console logs will be prompted
}

@Injectable({ providedIn: 'root' })
export class JbLoadingBarService {
  public defaultOptions: Partial<ILoadingOptions> = {
    showBar     : true,
    blockScreen : true,
    showSpinner : false,
    delayTime   : 0,
    spinnerType : 'circular',
    showLogs    : false
  };
  public options: Partial<ILoadingOptions>;

  public status: ILoadingStatus = ILoadingStatus.Off;
  public status$: BehaviorSubject<ILoadingStatus> = new BehaviorSubject(ILoadingStatus.Off);

  public waitingQueue: Array<Promise<any>> = []; // Stack of waiting promises
  public delayPromise;  // This is to wait for the delay to prompt the loader

  constructor() {
    this.options = { ...this.defaultOptions };
  }

  // Set default configuration. It will be applied for every run, unless it comes with specific options
  public config = (options: Partial<ILoadingOptions>) => {
    this.defaultOptions = { ...this.defaultOptions, ...options };
  };

  public run = (waitingPromise?: Promise<any>, options?: Partial<ILoadingOptions>) => {
    this.options = { ...this.defaultOptions, ...options };

    // If a promise is passed as parameter, stack it to the automatic resolver
    if (!!waitingPromise) {
      this.waitingQueue.push(waitingPromise);
      waitingPromise.then(
        () => this.queueResolve(waitingPromise),  // Resolve
        () => this.queueResolve(waitingPromise)   // Reject
      );
    }

    // Turn it on, and defer the display
    if (this.status === ILoadingStatus.Off) {
      this.setStatus(ILoadingStatus.Running);

      this.delayPromise = new JbPromise();
      setTimeout(() => { this.delayPromise.resolve(); }, this.options.delayTime);
      this.delayPromise.then(() => { // Show loading after delay (if delayPromise not cancelled)
        if (this.status === ILoadingStatus.Running) { this.setStatus(ILoadingStatus.Displayed); }
      });
    }

    return waitingPromise;  // Return the same input promise
  };

  // Finish the loading process. If there's any promise waiting in the queue, clear it up
  public stop = () => {
    debugBar('LOADING BAR: Stopped', (new Date()).getSeconds(), (new Date()).getMilliseconds());
    this.waitingQueue = [];
    if (!!this.delayPromise) { this.delayPromise.cancel(); }
    this.setStatus(ILoadingStatus.Off);
  };


  // Update the status and push it
  private setStatus = (newStatus: ILoadingStatus) => {
    this.status = newStatus;
    this.status$.next(this.status);
    if (this.status === ILoadingStatus.Off) { debugBar('LOADING BAR: Off', (new Date()).getSeconds(), (new Date()).getMilliseconds()); }
    if (this.status === ILoadingStatus.Running) { debugBar('LOADING BAR: Running', (new Date()).getSeconds(), (new Date()).getMilliseconds()); }
    if (this.status === ILoadingStatus.Displayed) { debugBar('LOADING BAR: Displayed', (new Date()).getSeconds(), (new Date()).getMilliseconds()); }
  };

  // When a promise in the queue is resolve / reject
  private queueResolve = (queuePromise) => {
    if (this.status !== ILoadingStatus.Off) {

      // Remove the resolved promise from the queue
      const ind = this.waitingQueue.indexOf(queuePromise);
      if (ind >= 0) { // If the promise is not in the queue, ignore it
        this.waitingQueue.splice(ind, 1);

        if (!this.waitingQueue.length) {  // If no more promise to wait, finish
          if (!!this.delayPromise) { this.delayPromise.cancel(); }
          debugBar('LOADING BAR: Resolved', (new Date()).getSeconds(), (new Date()).getMilliseconds());
          this.setStatus(ILoadingStatus.Off);
        }
      }
    }
  };
}
