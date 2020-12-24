import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jb-quantity-input-demo',
  templateUrl: './jb-quantity-input-demo.component.html',
  styleUrls: ['./jb-quantity-input-demo.component.scss']
})
export class JbQuantityInputDemoComponent implements OnInit {

  public myVar: any = 15;
  public myVar2 = 3;
  public lastMod = new Date();
  public name = jbQuantityInputDoc.name;
  public desc = jbQuantityInputDoc.desc;
  public api  = jbQuantityInputDoc.api;

  public instance1 = {
    template: `<jb-quantity-input
 [(ngModel)]="value"                       // 0 at begin
 [name]="instance1.object.name"            // instance1
 [jbDisabled]="instance1.object.disable"   // false
 [jbMinVal]="instance1.object.minValue"    // 3
 [jbMaxVal]="instance1.object.maxValue"    // 30
</jb-quantity-input>`,
    object: {
      name: 'instance1',
      value: 0,
      minValue: 3,
      maxValue: 30,
      mode: 'input-fit',
      disable: false,
      quantityOnChange: null,
      onChange: (item) => this.instance1.object.quantityOnChange = item.quantity
    }
  };

  public instance2 = {
    template: `<jb-quantity-input
 [(ngModel)]="value"                       // 2 at begin
 [name]="instance2.object.name"            // instance2
 [jbDisabled]="instance2.object.disable"   // false
 [jbMinVal]="instance2.object.minValue"    // null
 [jbMaxVal]="instance2.object.maxValue"    // 10 
</jb-quantity-input>`,
    object: {
      name: 'instance2',
      value: 2,
      minValue: null,
      maxValue: 10,
      mode: 'small',
      disable: false
    }
  };

  public cssReset = `$quantity-input-bg: $white !default;
$quantity-input-border: $valid-color !default;
$quantity-input-left-btn: $valid-color !default;
$quantity-input-right-btn: $valid-color !default;
$quantity-input-blocked-btn: darken($primary_color, 8%) !default;`;



  // ---- This is the logic to manage autogenerated code example ----
  public brStr = `\n`;
  public bsStr = `\n                   `;
  public code = ``;
  public conf = {
    value: 0,
    jbDisabled: false,
    hasMode: false, mode: null,
    modeOptions: [{ text: 'small' }, { text: 'large' }, { text: 'button-fit' }],

    hasLabel: false, jbLabel: 'view.common.username',
    hasTooltip: false, tooltipText: 'view.tooltip.message', tooltipPos: null, tooltipBody: false,
    hasMinValue: false, minValue: 0,
    hasMaxValue: false, maxValue: 20,
  };
  public upComp = () => {
    this.code = `<jb-quantity-input `;

    let compClasses = '';
    if (this.conf.hasMode && this.conf.mode) { compClasses += (!!compClasses.length ? ' ' : '') + this.conf.mode; }
    if (!!compClasses) { this.code += `class="${compClasses}"` + this.bsStr; }

    this.code += `[(ngModel)]="myVal"`;

    if (this.conf.hasLabel)    { this.code += this.bsStr + `jbLabel="${this.conf.jbLabel}"`; }
    if (this.conf.jbDisabled)  { this.code += this.bsStr + `[jbDisabled]="true"`; }
    if (this.conf.hasMinValue) { this.code += this.bsStr + `jbMinVal="${this.conf.minValue}"`; }
    if (this.conf.hasMaxValue) { this.code += this.bsStr + `jbMaxVal="${this.conf.maxValue}"`; }
    if (this.conf.hasTooltip)  {
      this.code += this.bsStr + `jbTooltip="${this.conf.tooltipText}"`;
      if (!!this.conf.tooltipPos)  { this.code += this.bsStr + `jbTooltipPos="${this.conf.tooltipPos}"`; }
      if (!!this.conf.tooltipBody) { this.code += this.bsStr + `jbTooltipBody="${this.conf.tooltipBody}"`; }
    }

    this.code += (`>` + this.brStr + `</jb-quantity-input>`);
  };



  constructor() { }

  ngOnInit() {
    this.upComp();
  }

  setLastMod = () => this.lastMod = new Date();

  myFunc($event) {
    console.log('change emited', $event);
  }
}

export const jbQuantityInputDoc = {
  name    : `jb-quantity-input`,
  uiType  : 'component',
  desc    : `Set quantity using the input or the side buttons`,
  api     : `* [(ngModel)]        : Model value
  [name]             : The input name used for control validations
  [class]            : Options: small, large, button-fit
  [jbDisabled]       : Disable input and buttons
  [jbMinVal]         : Minimum value permitted
  [jbMaxVal]         : Maximum value permitted`,
  demoComp: JbQuantityInputDemoComponent
};
