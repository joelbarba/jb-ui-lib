import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jb-list-checkbox-demo',
  templateUrl: './jb-list-checkbox-demo.component.html',
  styleUrls: ['./jb-list-checkbox-demo.component.scss']
})
export class JbListCheckboxDemoComponent implements OnInit {
  public name = jbListCheckboxDoc.name;
  public desc = jbListCheckboxDoc.desc;
  public api = jbListCheckboxDoc.api;
  public instance = jbListCheckboxDoc.instance;
  public sel;
  public isCheckboxDisabled = false;


  public instance1 = `<li class="list-header">
  <jb-list-header-col class="mobile" ...

  <jb-list-checkbox [selection]="mySel"></jb-list-checkbox>

  <jb-list-header-col class="col-2" ...
  <jb-list-header-col class="col-2" ...
</li>`;


  public instance2 = `<li class="list-row">
  <jb-mobile-list-row ...

  <jb-list-checkbox [selection]="mySel" [id]="item.id"></jb-list-checkbox>

  <div class="col-2">...</div>
  <div class="col-2">...</div>
</li>`;


  constructor() { }

  ngOnInit() {

  }

}


export const jbListCheckboxDoc = {
  name    : `jb-list-checkbox`,
  uiType  : 'component',
  desc    : `Generates a checkbox to be placed inside a list row for multiple item selection.`,
  api     : `[selection]   : The JbListSelection object to control the multi selection
[id]          : If provided, the identification of the row element to select. If not, it behaves as a full page selector.
[actions]     : In case of a header checkbox (no id), you can pass an array of actions to generate an expandable list. The action object has:
                    label     : string  --> Translate label to display the name of the action
                    disabled ?: boolean --> To disable the action
                    fn       ?: (sel?: JbListSelection) => void }]  --> Callback function when the action is clicked

[jbDisabled]  : Boolean value to disable (true) the checkbox
(change)      : Emits the value on change
(actionClick) : Apart from the callback function, you can also use this emitter to react to action clicks.
`,
  instance: `<jb-list-checkbox></jb-list-checkbox>`,
  demoComp: JbListCheckboxDemoComponent
};
