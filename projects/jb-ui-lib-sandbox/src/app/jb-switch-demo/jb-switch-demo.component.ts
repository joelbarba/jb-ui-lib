// jb-switch = 'jb-btn'
// jbSwitch = 'jbBtn'


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jb-switch-demo',
  templateUrl: './jb-switch-demo.component.html',
  styleUrls: ['./jb-switch-demo.component.scss']
})
export class JbSwitchDemoComponent implements OnInit {
  public name = jbSwitchDoc.name;
  public desc = jbSwitchDoc.desc;
  public api = jbSwitchDoc.api;
  public instance = jbSwitchDoc.instance;
  public myValue = true;
  public myVal = false;

  public instance2 =
`<jb-switch [(ngModel)]="myVal" [jbDisabled]="true"></jb-switch>`;

  public instance3 =
`<jb-switch [(ngModel)]="myVal" jbLabel="view.common.name" jbLabelPos="left"></jb-switch>`;

  public instance4 =
`<jb-switch [(ngModel)]="myVal" jbLabel="view.common.name"></jb-switch>`;

  public cssReset = `$switch-bar-bg: #fff !default;
$switch-bar-color: #ccc !default;
$switch-lever-bg: #f3f3f3 !default;
$switch-color-on: $valid-color !default;
$switch-color-off: $switch-lever-bg !default;`;

  public cssReset2 = `jb-switch .jb-switch {
  .switch-value {  // Text color (ON/OFF)
    .jb-switch-off-text { color: red; }
    .jb-switch-on-text  { color: green; }
  }
  .switch-lever { // Lever color
    &.is-on  { background: yellow; }
    &.is-off { background: purple; }
  }
}`;

  public brStr = `
`;
  public bsStr = `
           `;
  public swTooltipPos = [
    { id: 'top',        text: 'top'    },
    { id: 'right',      text: 'right'  },
    { id: 'bottom',     text: 'bottom' },
    { id: 'left',       text: 'left'   },
  ];
  public swTooltipBody = [
    { id: 'true',       text: 'true'   },
    { id: 'false',      text: 'false'  },
  ];
  public swCode = ``;
  public swConf = {
    hasLabel: false, labelText: 'view.common.field_name2', labelPosLeft: false,
    hasTooltip: false, btnTooltip: 'view.tooltip.message', btnTooltipPos: null, btnTooltipBody: false,
    isDisabled: false,
    hasOnText: false, hasOffText: false, onText: 'view.common.yes', offText: 'view.common.no'
  };

  public updateCustomSw = () => {
    this.swCode = `<jb-switch [(ngModel)]="myValue"`;

    if (this.swConf.hasLabel) {
      this.swCode += this.bsStr + ` jbLabel="${this.swConf.labelText}"`;

      if (this.swConf.labelPosLeft) {
        this.swCode += this.bsStr + ` jbLabelPos="left"`;
      }
    }

    if (this.swConf.hasOnText)  { this.swCode += this.bsStr + ` jbOnText="${this.swConf.onText}"`; }
    if (this.swConf.hasOffText) { this.swCode += this.bsStr + ` jbOffText="${this.swConf.offText}"`; }
    if (this.swConf.isDisabled) { this.swCode += this.bsStr + `[jbDisabled]="true"`; }

    if (this.swConf.hasTooltip) {
      this.swCode += this.bsStr + ` jbTooltip="${this.swConf.btnTooltip}"`;
      if (!!this.swConf.btnTooltipPos) {
        this.swCode += this.bsStr + ` jbTooltipPos="${this.swConf.btnTooltipPos}"`;
      }
      if (!!this.swConf.btnTooltipBody) {
        this.swCode += this.bsStr + ` jbTooltipBody="${this.swConf.btnTooltipBody}"`;
      }

    }

    this.swCode += (`>` + this.brStr + `</jb-switch>`);
  }


  constructor() { }

  ngOnInit() { }

}


export const jbSwitchDoc = {
  name    : `jb-switch`,
  uiType  : 'component',
  desc    : `Generates a switch.`,
  api     : `[(ngModel)]     : The ngModel directive is linked to the inner <input>, so that can be used as a form element with ngForm (status is propagated)
[jbDisabled]    : Whether the switch is disabled (true) or not (false).
[jbOnText]      : Text displayed when value is true. By default = ON.
[jbOffText]     : Text displayed when value is false. By default = OFF.
[jbLabel]       : If text provided, a label will be added.
[jbLabelPos]    : Position of the label (top | left). By default = top.
[jbTooltip]     : Tooltip on the label
[jbTooltipPos]  : Position of the tooltip on the label
[jbTooltipBody] : Whether the tooltip on the label is append on the body (true) or not (false)`,
  instance: `<jb-switch [(ngModel)]="myVal"></jb-switch>`,
  demoComp: JbSwitchDemoComponent
};
