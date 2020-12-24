import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jb-section-header-demo',
  templateUrl: './jb-section-header-demo.component.html',
  styleUrls: ['./jb-section-header-demo.component.sass']
})
export class JbSectionHeaderDemoComponent implements OnInit {
  public name = jbSectionHeaderDoc.name;
  public desc = jbSectionHeaderDoc.desc;
  public api = jbSectionHeaderDoc.api;

  public compConf = {
    title: 'view.common.title',
    description: 'view.common.description',
    hasDescription: false
  };

  public brStr = `\n`;
  public customCompCode = ``;

  public cssReset = `.section-header .section-header--description {
    color: $primary-color;
}`;

  constructor() { }

  ngOnInit() {
    this.upComp();
  }

  public upComp = () => {
    this.customCompCode = `<jb-section-header ` + this.brStr;

    if (this.compConf.title) { this.customCompCode += ` [jbTitle]="${this.compConf.title}"` + this.brStr; }
    if (this.compConf.hasDescription) { this.customCompCode += ` [jbDescription]="${this.compConf.description}"`; }

    this.customCompCode += (`>` + this.brStr + `</jb-section-header>`);
  }

}

export const jbSectionHeaderDoc = {
  name    : `jb-section-header`,
  desc    : `Generates a header to title a section.`,
  uiType  : 'component',
  api     : `[jbTitle]        : Text to display as title
[jbDescription]  : Text to display as description (optional).`,
  instance: `<jb-section-header></jb-section-header>`,
  demoComp: JbSectionHeaderDemoComponent
};
