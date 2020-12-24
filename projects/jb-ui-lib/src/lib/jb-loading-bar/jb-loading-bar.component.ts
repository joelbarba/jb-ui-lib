import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { JbLoadingBarService } from './jb-loading-bar.service';

@Component({
  selector: 'jb-loading-bar',
  templateUrl: './jb-loading-bar.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JbLoadingBarComponent implements OnInit, OnDestroy {
  public showBlockScreen = false;
  public aniBack = false; // To trigger the background show up animation
  public showBar = false;
  public showCircularSpinner = false;
  public showJbSpinner = false;
  public prevStatus = 0;
  public statusSubs;  // Subscription to the status observable

  constructor(
    public loadingBar: JbLoadingBarService,
    private cdr: ChangeDetectorRef,
  ) {

    this.statusSubs = this.loadingBar.status$.subscribe(status => {
      const opts = this.loadingBar.options;
      this.showBar = (status === 2 && opts.showBar);
      this.showCircularSpinner = (status === 2 && opts.showSpinner && opts.spinnerType === 'circular');
      this.showJbSpinner = (status === 2 && opts.showSpinner && opts.spinnerType === 'boxes');

      // this.showBlockScreen = (status === 2 && opts.blockScreen);

      // Set flags to animate transitions
      // Instead of turning on/off the background blocker, delay it so we can play an animation
      if (opts.blockScreen) {
        if (this.prevStatus !== 2 && status === 2) { // Turn it on
          // console.log('jbLoading - COMP - ON', (new Date()).getSeconds(), (new Date()).getMilliseconds());
          this.showBlockScreen = true;
          setTimeout(() => {
            this.aniBack = true;
            this.cdr.detectChanges();
          });
        }
        if (this.prevStatus === 2 && status !== 2) { // Turn it off
          this.aniBack = false; setTimeout(() => {
            // console.log('jbLoading - COMP - OFF 2', (new Date()).getSeconds(), (new Date()).getMilliseconds());
            this.showBlockScreen = false;
            this.cdr.detectChanges();
          }, 150);
        }
      }

      this.prevStatus = status;
    });

  }

  ngOnInit() { }

  ngOnDestroy() {
    this.statusSubs.unsubscribe();
  }

}
