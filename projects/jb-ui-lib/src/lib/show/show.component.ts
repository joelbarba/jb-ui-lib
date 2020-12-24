import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

// This is supposed to be the opposite of `hidden`, no jb prefix needed
// tslint:disable-next-line:directive-selector
@Directive({ selector: '[show]' })
export class ShowDirective implements OnChanges {
  @Input() show = true;
  // @HostBinding('class.d-none') private isHidden = false;
  constructor(private el: ElementRef) { }
  ngOnChanges(changes) {
    this.el.nativeElement.style.display = this.show ? null : 'none';
    // this.isHidden = !this.show;
  }
}
