import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'jb-section-header',
  templateUrl: './jb-section-header.component.html'
})
export class JbSectionHeaderComponent implements OnInit {
  @Input() jbTitle: string;
  @Input() jbDescription: string = null;

  constructor() { }

  ngOnInit() {
  }

}
