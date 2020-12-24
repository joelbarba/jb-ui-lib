// jb-status-badge = 'jb-btn'
// jbStatusBadge = 'jbBtn'


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jb-status-badge-demo',
  templateUrl: './jb-status-badge-demo.component.html',
  styleUrls: ['./jb-status-badge-demo.component.scss']
})
export class JbStatusBadgeDemoComponent implements OnInit {
  public name = jbStatusBadgeDoc.name;
  public desc = jbStatusBadgeDoc.desc;
  public api = jbStatusBadgeDoc.api;
  public instance = jbStatusBadgeDoc.instance;

  public instance2 = `<jb-status-badge [jbStatus]="item.status"
                 [jbLabel]="item.label">
</jb-status-badge>`;
  public instance3 = `<jb-status-badge [jbStatus]="item.status = true"
                 [jbLabel]="['yes','no']">
</jb-status-badge>
<jb-status-badge [jbStatus]="item.status = false"
                 [jbLabel]="['yes','no']">
</jb-status-badge>`;
  public instance4 = `<jb-status-badge [jbStatus]="item.status = 2"
                 jbLabel="Circle Example"
                 [jbCircle]="true">
</jb-status-badge>`;
  public instance5 = `<jb-status-badge [jbStatus]="item.status" [jbColor]="'7f3fc0'">
</jb-status-badge>`;

  public cssReset = `$jb-status-badge-text-color : $white !default;
$jb-status-badge-border     : #f8f8f8 !default;
$jb-status-font-size        : 12px !default;
$jb-status-font-weight      : 600 !default;

$jb-status-active   : $primary_color !default;
$jb-status-inactive : $warning_color !default;
$jb-status-pending  : $quaternary_color !default;
$jb-status-other    : $secondary_color !default;
$jb-status-other2   : $extra_color !default;
$jb-status-other3   : darken($secondary_color, 15) !default;
$jb-status-other4   : darken(#E99FB7, 20%) !default;
$jb-status-submitted: darken($tertiary_color, 15) !default;`;





  // ---- This is the logic to manage autogenerated code example ----
  public brStr = `\n`;
  public bsStr = `\n                 `;
  public customCompCode = `<jb-dropdown [(ngModel)]="selObj" [jbList]="myList"></jb-dropdown>`;
  public customModCode   = `<jb-status-badge [jbStatus]="0" [jbLabel]="Module default"></jb-status-badge>`;
  public compConf: any = {
    status: 0,
    hasLabel: false,
    isSingleLabel: true,
    labelText: 'My label',
    isCircle: false,
    hasColor: false,
    colorCode: '',
    rows: null,
    hasTooltip: false, tooltipText: 'Hello World', tooltipPos: null, tooltipBody: false
  };
  public modConf: any = {
    status: 0,
    labelText: 'Module default',
    defaultList: [
      { id: 0, name: 'Not Paid' },
      { id: 1, name: 'Partially' },
      { id: 2, name: 'Paid' },
      { id: 3, name: 'Cancelled' },
      { id: 4, name: 'Waiting' },
      { id: 5, name: 'Refunded' },
      { id: 6, name: 'Submitted'}
    ],
    orderColorSet: {
      0: 'jb-color-third',
      1: 'jb-color-fourth',
      2: 'jb-color-first',
      3: 'jb-color-second',
      4: 'jb-color-fifth',
      5: 'jb-color-sixth',
      6: 'jb-color-eighth'
    }
  };
  public statusList = [
    { id: 0, name: 'Active' },
    { id: 1, name: 'Inactive' },
    { id: 2, name: 'Pending' },
    { id: 3, name: 'Other 1' },
    { id: 4, name: 'Other 2' },
    { id: 5, name: 'Other 3' },
    { id: 6, name: 'Other 4' }
  ];

  public setList = () => {
    if (this.compConf.isSingleLabel) {
      this.compConf.labelText = 'My label';
      this.statusList = [
        { id: 0, name: 'Active' },
        { id: 1, name: 'Inactive' },
        { id: 2, name: 'Pending' },
        { id: 3, name: 'Other 1' },
        { id: 4, name: 'Other 2' },
        { id: 5, name: 'Other 3' },
        { id: 6, name: 'Other 4' }
      ];
    } else {
      this.compConf.status = 0;
      this.compConf.labelText = ['None', 'Low', 'Medium', 'High', 'Max'];
      this.statusList = [
        { id: 0, name: 'None' },
        { id: 1, name: 'Low' },
        { id: 2, name: 'Medium' },
        { id: 3, name: 'High' },
        { id: 4, name: 'Max' }
        ];
    }
  }

  public setColor = () => {
    if (this.compConf.hasColor) {
      this.compConf.colorCode = '#00B6F1';
    } else {
      this.compConf.colorCode = '';
    }
  }

  public upComp = () => {
    this.customCompCode = `<jb-status-badge `;


    this.customCompCode += `[jbStatus]="${this.compConf.status}"`;

    if (this.compConf.hasLabel)   { this.customCompCode += this.bsStr + `[jbLabel]="${this.compConf.labelText}"`; }
    if (this.compConf.hasColor)   { this.customCompCode += this.bsStr + `[jbColor]="${this.compConf.colorCode}"`; }
    if (this.compConf.isCircle)   { this.customCompCode += this.bsStr + `[jbCircle]="true"`; }

    if (this.compConf.hasTooltip) {
      this.customCompCode += this.bsStr + `jbTooltip="${this.compConf.tooltipText}"`;
      if (!!this.compConf.tooltipPos)  { this.customCompCode += this.bsStr + `jbTooltipPos="${this.compConf.tooltipPos}"`; }
      if (!!this.compConf.tooltipBody) { this.customCompCode += this.bsStr + `jbTooltipBody="${this.compConf.tooltipBody}"`; }
    }

    this.customCompCode += (`>` + this.brStr + `</jb-status-badge>`);
  }

  public upMod = () => {
    this.customModCode = `<jb-status-badge `;
    this.customModCode += `[jbStatus]="${this.modConf.status}"`;
    this.customModCode += this.bsStr + `[jbLabel]="${this.modConf.labelText}"`;
    this.customModCode += this.bsStr + `[jbColorSet]="modConf.orderColorSet"`;
    this.customModCode += (`>` + this.brStr + `</jb-status-badge>`);
  }

  public updateModStatus = () => {
    this.modConf.labelText = this.modConf.defaultList[this.modConf.status].name;
  }

  constructor() { }

  ngOnInit() { }

}


export const jbStatusBadgeDoc = {
  name    : `jb-status-badge`,
  uiType  : 'component',
  desc    : `Generate a status badge`,
  api     : `[jbStatus]  : Button text
[jbLabel]   : (String) Display the label translated on the status, (Array) list of labels
[jbColor]   : Background Color of the staus
[jbCircle]  : Condition that display the badge in a circle
[jbColorSet]: (ColorSet) array the color set of the status`,
  instance: `<jb-status-badge [jbStatus]="myStatus=0">
</jb-status-badge>
<jb-status-badge [jbStatus]="myStatus=1">
</jb-status-badge>
<jb-status-badge [jbStatus]="myStatus=2">
</jb-status-badge>`,
  demoComp: JbStatusBadgeDemoComponent
};
