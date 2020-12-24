import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'jb-list-placeholder',
  templateUrl: './jb-list-placeholder.component.html',
  styleUrls: []
})
export class JbListPlaceholderComponent implements OnInit {
  @Input() jbType = 'list';
  @Input() jbColumns = [];
  @Input() jbRows = 8;

  public fakeRows = [];

  constructor() { }

  ngOnInit() {
    // Get an array with the sizes of the cols form the input jbColumns
    // Calculate the grid left to set the last button column (lastSize)
    let colSizes = []; let lastSize = 12;
    if (!!this.jbColumns.length) {
      colSizes = [ ...this.jbColumns ];
      this.jbColumns.forEach((colSize) => { lastSize = lastSize - colSize; });
    } else {
      colSizes = [4, 3, 3]; lastSize = 2;
    }


    this.fakeRows = [];
    for (let id = 0; id < this.jbRows; id++) {
      const newRow = { id, fakeCols: [] };
      for (let ind = 0; ind < colSizes.length; ind++) {
        const randWidth = Math.floor((Math.random() * 5) + 5);
        newRow.fakeCols.push({ ind, colClass: 'col-' + colSizes[ind] + ' line-' + randWidth });
      }
      // Right button
      if (lastSize > 0) { newRow.fakeCols.push({ colClass: 'col-' + lastSize + ' fake-button-template' }); }

      this.fakeRows.push(newRow);
    }
  }

}
