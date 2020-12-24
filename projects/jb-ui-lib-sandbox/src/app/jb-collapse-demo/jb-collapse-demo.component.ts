// jb-collapse = 'jb-btn'
// jbCollapse = 'jbBtn'


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jb-collapse-demo',
  templateUrl: './jb-collapse-demo.component.html',
  styleUrls: ['./jb-collapse-demo.component.scss']
})
export class JbCollapseDemoComponent implements OnInit {
  public name = jbCollapseDoc.name;
  public desc = jbCollapseDoc.desc;
  public api = jbCollapseDoc.api;
  public instance = jbCollapseDoc.instance;
  public isColl = true;

  public ex1 = `<jb-btn class="toggle" [(jbToggle)]="isCol"></jb-btn>
<div [jb-collapse]="isCol">
  My dynamic content
</div>`;

  public ex2 = `<jb-btn (jbClick)="myBox.toggle()"></jb-btn>
<div class="marT15" jb-collapse #myBox="jbCollapse">
  My dynamic content
</div>`;

  constructor() { }
  ngOnInit() { }
}


export const jbCollapseDoc = {
  name    : `jb-collapse`,
  uiType  : 'component',
  desc    : `Generates a collapsible element`,
  api     : `[jb-collapse]: boolean with the status (collapsed=true, expanded=false)`,
  instance: `<jb-collapse></jb-collapse>`,
  demoComp: JbCollapseDemoComponent
};
