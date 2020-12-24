import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jb-list-placeholder-demo',
  templateUrl: './jb-list-placeholder-demo.component.html',
  styleUrls: ['./jb-list-placeholder-demo.component.scss']
})
export class JbListPlaceholderDemoComponent implements OnInit {
  public name = jbListPlaceholderDoc.name;
  public desc = jbListPlaceholderDoc.desc;
  public api = jbListPlaceholderDoc.api;
  public instance = jbListPlaceholderDoc.instance;
  public link = true;

  public instance2 =
`<ul class="list-unstyled table-list">
  <li class="list-header">
    <div class="row">
      <jb-list-header-col class="col-5" ...>
      <jb-list-header-col class="col-3" ...>
      <jb-list-header-col class="col-2" ...>
    </div>
  </li>
  <jb-list-placeholder [jbColumns]="[5, 3, 2]" jbRows="4"></jb-list-placeholder>
</ul>
`;
  public instance3 = `<jb-list-placeholder jbType="tile"></jb-list-placeholder>`;

  public brStr = `
`;
  public bsStr = `
                    `;
  public code = ``;
  public conf = {
    jbRows: 8, cssClass: 'four-columns',
    rowOps: Array.from(Array(23).keys()).map(i => ({id: i+1}))
  };

  public upCode = () => {
    this.code = `<jb-list-placeholder jbType="cards"`;

    if (this.conf.cssClass !== 'four-columns') {
      this.code += ` class="${this.conf.cssClass}"`;
    }
    if (this.conf.jbRows !== 8) {
      this.code += this.bsStr + ` jbRows="${this.conf.jbRows}"`;
    }

    this.code += (`>` + this.brStr + `</jb-list-placeholder>`);
    this.link = false;
    setTimeout(() => this.link = true);
  }

  constructor() { }

  ngOnInit() {
    this.upCode();
  }

}


export const jbListPlaceholderDoc = {
  name    : `jb-list-placeholder`,
  uiType  : 'component',
  desc    : `Generates an animation to display a fake list while loading`,
  api     : `[jbType]  : 'list' - (default) Displays the fake loading rows into a <ul> table
            'table' - Displays a whole table (header + rows)

[jbRows]   : Number of fake rows to display (default = 8)
[jbColumns]: Array with the sizes of the columns (up to 12)`,
  instance: `<jb-list-placeholder jbType="table"></jb-list-placeholder>`,
  demoComp: JbListPlaceholderDemoComponent
};
