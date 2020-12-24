import {
  Component,
  OnChanges,
  HostBinding,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef, OnInit
} from '@angular/core';
import { state, style, trigger, transition, animate } from '@angular/animations';

// Based on MDBCollapse:
// https://github.com/mdbootstrap/Angular-Bootstrap-with-Material-Design/blob/master/projects/angular-bootstrap-md/src/lib/free/collapse/collapse.component.ts
// https://mdbootstrap.com/docs/angular/advanced/collapse/

/**
 * @ngdoc directive
 * @description It applies an animated collapse to a block element
 * @Example:
 *    <jb-btn (jbClick)="myBox.toggle()"></jb-btn>
 *    <div jb-collapse #myBox="jbCollapse">
 *       <div style="min-height: 300px;">Here the content</div>
 *    </div>
 *
 *    Or:
 *    <jb-btn class="toggle" [(jbToggle)]="isColl"></jb-btn>
 *    <div [jb-collapse]="isColl" #test="jbCollapse">
 *      <div style="min-height: 300px;">Here the content</div>
 *    </div>
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: '[jb-collapse]',
  exportAs: 'jbCollapse',
  template: '<ng-content></ng-content>',
  animations: [
    trigger('expandBody', [
      state('collapsed', style({ height: '0px' })),
      state('expanded', style({ height: '*' })),
      state('resetAni', style({ height: '0px' })),
      transition('expanded <=> collapsed', animate('300ms ease')),
      transition('expanded => resetAni', animate('0ms')),
      transition('collapsed => resetAni', animate('0ms')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JbCollapseComponent implements OnChanges, OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('jb-collapse') isCollapsed = true;
  // On show -> Turn to false at the beginning of the expanding animation
  // On hide -> Turn to true at the beginning of the collapsing animation

  private isMoving = false; // True when animation in progress

  @Output() collapsed: EventEmitter<any> = new EventEmitter();
  @Output() expanded: EventEmitter<any> = new EventEmitter();

  constructor(private _cdRef: ChangeDetectorRef, private el: ElementRef) {}

  @HostBinding('@expandBody') expandAnimationState: string;
  @HostBinding('style.overflow') overflow = 'hidden';
  @HostBinding('style.height') height;

  @HostListener('@expandBody.done', ['$event']) onExpandBodyDone(event: any) {
    setTimeout(() => {
      if (event.toState === 'expanded') {
        this.expanded.emit(this);
        this.overflow = 'visible';
      } else {
        this.collapsed.emit(this);
        this.overflow = 'hidden';
      }
      this.isMoving = false;
    });
  }

  toggle() {
    this.isCollapsed ? this.show() : this.hide();
  }

  show() {
    if (this.isMoving) {
      if (this.expandAnimationState === 'expanded') { return false; } // If currently expanding, ignore it
      this.reset(); // If currently collapsing, reset animation
    }
    setTimeout(() => {
      this.isMoving = (this.expandAnimationState !== 'expanded'); // Mark animation start
      this.expandAnimationState = 'expanded';
      this.isCollapsed = false;
      this._cdRef.markForCheck();
    });
  }

  hide() {
    if (this.isMoving) {
      if (this.expandAnimationState === 'collapsed') { return false; } // If currently collapsing, ignore it
      this.reset(); // If currently expanding, reset animation
    }
    setTimeout(() => {
      this.isMoving = (this.expandAnimationState === 'expanded'); // Mark animation start
      this.expandAnimationState = 'collapsed';
      this.overflow = 'hidden';
      this.isCollapsed = true;
      this._cdRef.markForCheck();
    });
  }

  // Immediately collapsed (resetAni)
  reset() {
    this.overflow = 'hidden';
    this.expandAnimationState = 'resetAni';
    this._cdRef.markForCheck();
  }

  ngOnChanges(changes) {
    this.isCollapsed ? this.hide() : this.show();
  }
  ngOnInit() {
    if (this.isCollapsed) { this.height = '0px'; }
  }
}
