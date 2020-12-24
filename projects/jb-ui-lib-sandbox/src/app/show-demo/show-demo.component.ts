import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-demo',
  templateUrl: './show-demo.component.html',
  styleUrls: ['./show-demo.component.scss']
})
export class ShowDemoComponent implements OnInit {
  public name = ShowDoc.name;
  public desc = ShowDoc.desc;
  public api = ShowDoc.api;
  public instance = ShowDoc.instance;

  public isShowing = true;

  constructor() { }

  ngOnInit() { }

}


export const ShowDoc = {
  name    : `show`,
  uiType  : 'directive',
  desc    : `Same as native [hidden] with reversed logic`,
  api     : `[show]: Boolean with the value`,
  instance: `<div [show]="myBoolVar"></div>`,
  demoComp: ShowDemoComponent
};
