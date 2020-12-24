import {Injectable, NgZone} from '@angular/core';
import { JbUiLibTransService} from '../abstract-translate.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JbGrowlService {
  public msgList = [];

  constructor(
    private ngZone: NgZone,
    private translate: JbUiLibTransService,
  ) { }

  public success(text: string, labelParams = {}, timeOut = 2000) {
    this.pushMsg({ text, timeOut, labelParams, msgType: 'success', msgIcon: 'icon-checkmark' });
  }

  public error(text: string, labelParams = {}, timeOut = 2000) {
    this.pushMsg({ text, timeOut, labelParams, msgType: 'error', msgIcon: 'icon-warning2' });
  }

  // Push a message into the queue
  public pushMsg(msg) {
    const newMsg = { labelParams: {}, ...msg };
    newMsg.iniTime = new Date();
    newMsg.status = 'active';

    if (!!this.translate.getLabel$) {
      newMsg.text$ = this.translate.getLabel$(newMsg.text, newMsg.labelParams);
    } else {
      newMsg.text$ = new BehaviorSubject(newMsg.text);
    }

    this.msgList.unshift(newMsg);

    newMsg.remove = () => {
      newMsg.status = 'fading'; // Start the animation of fading out

      // Remove the message after the vanishing animation
      this.setTimeoutNoZone(() => {
        const ind = this.msgList.indexOf(newMsg);
        this.msgList.splice(ind, 1);
      }, 600);
    };

    // Set the timeout to remove the message automatically after a while
    if (newMsg.timeOut > 0) {
      const timer = this.setTimeoutNoZone(newMsg.remove, newMsg.timeOut);
      newMsg.cancelTimeout = () => {
        newMsg.status = 'stuck';
        newMsg.cancelTimeout = null;
        clearTimeout(timer);
      };
    }

  }


  // This is like "setTimeout()" but running outside ngZone
  setTimeoutNoZone = (callback, time) => {
    return this.ngZone.runOutsideAngular(() => {
      return setTimeout(() => {
        this.ngZone.run(callback);
      }, time);
    });
  }

}
