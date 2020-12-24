import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jb-expandable-list-demo',
  templateUrl: './jb-expandable-list-demo.component.html',
  styleUrls: ['./jb-expandable-list-demo.component.scss']
})
export class JbExpandableListDemoComponent implements OnInit {
  public name = jbExpandableListDoc.name;
  public desc = jbExpandableListDoc.desc;
  public api = jbExpandableListDoc.api;
  public instance = jbExpandableListDoc.instance;

  data = [{id:'1', name:'Lagavulin 16'},{id:'2', name:'Dalwhinnie'},{id:'3', name:'Laphroaig 10'},{id:'4', name:'Glenmorange 12'},{id:'5', name:'Oban'},];
  // data = [{id:'1', name:'Lagavulin'},{id:'2', name:'Dalwhinnie'}];
  // data = [{id:'1', name:'Lagavulin'}];
  // data = [];
  myList = this.data.map(u => `<a href='/billing/rates' class='pointer'>${u.name}</a>`);


  constructor() { }

  ngOnInit() { }

}


export const jbExpandableListDoc = {
  name    : `jb-expandable-list`,
  uiType  : 'component',
  desc    : `Generates an expandable list`,
  api     : `[jbList]: Array of strings to be displayed as a list. It can be html.`,
  instance: `<jb-expandable-list [jbList]="myList"></jb-expandable-list>`,
  demoComp: JbExpandableListDemoComponent
};
