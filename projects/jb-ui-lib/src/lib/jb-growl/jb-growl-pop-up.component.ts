import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { JbGrowlService } from './jb-growl.service';

@Component({
  selector: 'jb-growl-pop-up',
  templateUrl: './jb-growl-pop-up.component.html',
  encapsulation: ViewEncapsulation.None
})
export class JbGrowlPopUpComponent implements OnInit {
  constructor(public growl: JbGrowlService) { }

  ngOnInit() { }

  toggleTimeout = (msg) => {
    if (!!msg.cancelTimeout) {
      msg.cancelTimeout();
    } else {
      msg.remove();
    }
  }

}
