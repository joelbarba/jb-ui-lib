import { Component, Directive, HostBinding, Input, OnChanges, OnInit } from '@angular/core';
import { isObservable } from 'rxjs';

@Component({
  selector: 'jb-loading-spinner',
  template: '<span class="jb-spin"></span>'
})
export class JbLoadingSpinnerComponent implements OnInit {
  constructor() { }
  ngOnInit() { }
}


@Directive({ selector: '[jbLoadingSpinner]' })
export class JbLoadingSpinnerDirective implements OnChanges {
  @Input('jbLoadingSpinner') trigger;
  @HostBinding('class.jb-spin-over') isLoading = false;
  public lastSubscription; // To unsubscribe in case a new obs needs be linked
  constructor() {}
  ngOnChanges(changes) {
    if (changes.hasOwnProperty('trigger') && this.trigger !== null && this.trigger !== undefined) {

      // If 'jb-loading-spinner' comes as a promise
      if (!!this.trigger['then']) {
        this.isLoading = true;
        this.trigger.then(() => this.isLoading = false, () => this.isLoading = false);
      }

      // If 'jb-loading-spinner' comes as a boolean
      if (typeof this.trigger === 'boolean') {
        this.isLoading = !!this.trigger;
      }

      // If 'jb-loading-spinner' comes as an observable
      if (isObservable(this.trigger)) {
        this.isLoading = true;
        if (!!this.lastSubscription) { this.lastSubscription.unsubscribe(); }
        this.lastSubscription = this.trigger.subscribe({
          next     : (val) => this.isLoading = !!val,
          error    : () => this.isLoading = false,
          complete : () => this.isLoading = false
        });
      }

    }
  }
}



