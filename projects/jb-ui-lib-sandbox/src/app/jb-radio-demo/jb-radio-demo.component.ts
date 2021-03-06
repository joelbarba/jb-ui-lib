import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jb-radio-demo',
  templateUrl: './jb-radio-demo.component.html',
  styleUrls: ['./jb-radio-demo.component.scss']
})export class JbRadioDemoComponent implements OnInit {
  public name = jbRadioDoc.name;
  public desc = jbRadioDoc.desc;
  public api = jbRadioDoc.api;
  public instance = jbRadioDoc.instance;
  public myOp = '1';

  public instance2 = `<jb-radio [(ngModel)]="myVariable" jbLabel="Option 1" jbValue="1"></jb-radio>
<jb-radio [(ngModel)]="myVariable" jbLabel="Option 2" jbValue="2"></jb-radio>
<jb-radio [(ngModel)]="myVariable" jbLabel="Option 3" jbValue="3"></jb-radio>`;

  public instance3 = `<jb-radio [(ngModel)]="myVariable" jbLabel="Option 1" jbValue="1" jbRequired="true"></jb-radio>
<jb-radio [(ngModel)]="myVariable" jbLabel="Option 2" jbValue="2" jbRequired="true"></jb-radio>
<jb-radio [(ngModel)]="myVariable" jbLabel="Option 3" jbValue="3" jbRequired="true"></jb-radio>`;


  public cssReset = `$radio-color: $text-color !default;  // Default radio background color (when not required)
$radio-check-color: $white !default;`;

  public blockExample = `<jb-checkbox jbLabel="Inline check 1"></jb-checkbox>
<jb-checkbox jbLabel="Inline check 2"></jb-checkbox>
<jb-checkbox jbLabel="Inline check 3"></jb-checkbox>
<jb-checkbox class="block" jbLabel="Block check 4"></jb-checkbox>
<jb-checkbox class="block" jbLabel="Block check 5"></jb-checkbox>
<jb-checkbox class="block" jbLabel="Block check 6"></jb-checkbox>`;


  // ---- This is the logic to manage autogenerated code example ----
  public brStr = `\n`;
  public bsStr = `\n          `;
  public customCompCode = ``;
  public myVariable;
  public compConf = {
    value: '1',
    labelText: 'view.common.name',
    hasGroup: false, groupValue: 'radio-group-1',
    isRequired: false, isDisabled: true,
    hasTooltip: false, tooltipText: 'view.tooltip.message', tooltipPos: null, tooltipBody: 'true',
    isClassBlock: false,
  };
  public upComp = () => {
    this.customCompCode = `<jb-radio `;
    this.customCompCode += `[(ngModel)]="myVariable"`;
    this.customCompCode += this.bsStr + `jbValue="${this.compConf.value}"`;
    this.customCompCode += this.bsStr + `jbLabel="${this.compConf.labelText}"`;
    if (this.compConf.hasGroup) { this.customCompCode += this.bsStr + `jbRadioGroup="${this.compConf.groupValue}"`; }
    if (this.compConf.isRequired) { this.customCompCode += this.bsStr + `jbRequired="true"`; }
    if (this.compConf.isDisabled) { this.customCompCode += this.bsStr + `jbDisabled="true"`; }

    if (this.compConf.hasTooltip) {
      this.customCompCode += this.bsStr + `jbTooltip="${this.compConf.tooltipText}"`;
      if (!!this.compConf.tooltipPos)  { this.customCompCode += this.bsStr + `jbTooltipPos="${this.compConf.tooltipPos}"`; }
      if (!!this.compConf.tooltipBody) { this.customCompCode += this.bsStr + `jbTooltipBody="${this.compConf.tooltipBody}"`; }
    }

    this.customCompCode += (`>` + this.brStr + `</jb-radio>`);
  }

  constructor() { }

  ngOnInit() {
    this.upComp();
  }

}


export const jbRadioDoc = {
  name    : `jb-radio`,
  uiType  : 'component',
  desc    : `Generates a radio button input element.`,
  api     : `[(ngModel)]     : The ngModel directive is linked to the inner <input>, so that can be used as a form element with ngForm (status is propagated).
[jbValue]       : Value to set to the model when this radio is selected in the group
[jbLabel]       : Text of the label (optional)
[jbRadioGroup]  : (optional) Name of the group the radio belongs to. The selection is unique within this group.
[jbDisabled]    : Boolean value to disable (true) the input
[jbRequired]    : Turns the input required (the ngModel needs to be one of the values)
[jbTooltip]     : If set, an info bullet will be added before the label, with a tooltip of the text
[jbTooltipPos]  : Position of the tooltip (top by default)
[jbTooltipBody] : Whether the tooltip is append to the body (default true) or next the the html element (false). The parent contaniner may affect the visibility of the tooltip`,
  instance: `<jb-radio [(ngModel)]="myVariable" jbLabel="Option 1" jbValue="1"></jb-radio>`,
  demoComp: JbRadioDemoComponent
};
