import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'jb-expandable-list',
  templateUrl: './jb-expandable-list.component.html',
})
export class JbExpandableListComponent implements OnInit, OnChanges {
  @Input() jbList = [];
  public isCollapsed = true;
  public firstItem;
  public expList = [];

  constructor() { }

  ngOnChanges(): void {
    this.firstItem = undefined;
    this.expList = [];
    if (this.jbList && this.jbList.length > 0) {
      this.firstItem = this.jbList[0];
      this.expList = this.jbList.slice(1);
    }
  }

  ngOnInit(): void {}

}
