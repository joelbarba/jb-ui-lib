import {AfterViewInit, Component, OnInit} from '@angular/core';
import {JbGrowlService} from '../../../../../jb-ui-lib/src/lib/jb-growl/jb-growl.service';
import {IjbInputCtrl} from '../../../../../jb-ui-lib/src/lib/jb-input/jb-input.component';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-jb-input-controls-demo',
  templateUrl: './jb-input-controls-demo.component.html',
  styleUrls: ['./jb-input-controls-demo.component.scss']
})
export class JbInputControlsDemoComponent implements OnInit, AfterViewInit {

  constructor(
    public growl: JbGrowlService,
    public router: Router,
  ) {}

  public val1;

  public ctrl: IjbInputCtrl = {};
  public extCtrlExample1 = `public ctrl: IjbInputCtrl = {};

<jb-input [(ngModel)]="val" (jbOnLoaded)="ctrl = $event"></jb-input>

<jb-btn jbText="setFocus"    (jbClick)="ctrl.setFocus()" ></jb-btn>
<jb-btn jbText="setBlur"     (jbClick)="ctrl.setBlur()" ></jb-btn>
<jb-btn jbText="setDirty"    (jbClick)="ctrl.setDirty()" ></jb-btn>
<jb-btn jbText="setPristine" (jbClick)="ctrl.setPristine()" ></jb-btn>
<jb-btn jbText="addError"    (jbClick)="ctrl.addError({ label: 'Oh no!' })" ></jb-btn>
<jb-btn jbText="removeError" (jbClick)="ctrl.removeError()" ></jb-btn>`;


  public extCtrl$ = new Subject();
  public ctrlActions = [
    `{ action: 'setFocus' } ................. Sets the focus on the input`,
    `{ action: 'setBlur' } .................. Forces focus lose`,
    `{ action: 'setDirty' } ................. Turns the input dirty`,
    `{ action: 'setPristine' } .............. Turns the input pristine`,
    `{ action: 'addError', label: text } .... Adds an manual error`,
    `{ action: 'removeError' } .............. Removes the manual error`,
    `{ action: 'refresh' } .................. Forces internal refresh`,
  ];
  public extCtrlExample2 = `<jb-input [(ngModel)]="val" [extCtrl$]="extCtrl$"></jb-input>

public extCtrl$ = new Subject();

<jb-btn jbText="setFocus"    (jbClick)="extCtrl$.next({ action: 'setFocus' })"></jb-btn>
<jb-btn jbText="setDirty"    (jbClick)="extCtrl$.next({ action: 'setDirty' })"></jb-btn>
<jb-btn jbText="setPristine" (jbClick)="extCtrl$.next({ action: 'setPristine' })"></jb-btn>
<jb-btn jbText="addError"    (jbClick)="extCtrl$.next({ action: 'addError', label: 'Oh oh!' })"></jb-btn>
<jb-btn jbText="removeError" (jbClick)="extCtrl$.next({ action: 'removeError' })"></jb-btn>
<jb-btn jbText="refresh"     (jbClick)="extCtrl$.next({ action: 'refresh' })"></jb-btn>`;


  ngOnInit() {}
  ngAfterViewInit() {}

}



