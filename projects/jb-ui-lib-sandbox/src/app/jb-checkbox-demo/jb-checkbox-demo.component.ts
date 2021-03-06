import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jb-checkbox-demo',
  templateUrl: './jb-checkbox-demo.component.html',
  styleUrls: ['./jb-checkbox-demo.component.scss']
})
export class JbCheckboxDemoComponent implements OnInit {
  public name = jbCheckboxDoc.name;
  public desc = jbCheckboxDoc.desc;
  public api = jbCheckboxDoc.api;
  public instance = jbCheckboxDoc.instance;
  public myValue = true;
  public textValue = '';
  public isBg = false;

  public instance2 = `<jb-label class="block">
<jb-checkbox class="pad-input">
<jb-checkbox class="pad-input">`;

  public bootstrapHtmlStructure = `<div class="form-check">
  <input class="form-check-input" type="checkbox" value="">
  <label class="form-check-label" for="defaultCheck1">My Text</label>
</div>`;

  public jbHtmlStructure = `<div class="checkbox">
  <label>
    <input type="checkbox" [disabled]="jbDisabled"
           [ngModel]="ngModel" (ngModelChange)="onChange($event)">
    <span class="check-box icon-checkmark3"></span>
    <span class="check-text" [class.has-text]="!!jbLabel">{{jbLabel}}</span>
  </label>
</div>`;
  public inputCheckboxHtml = `<input type="checkbox">`;

  public blockExample = `<jb-checkbox jbLabel="Inline check 1"></jb-checkbox>
<jb-checkbox jbLabel="Inline check 2"></jb-checkbox>
<jb-checkbox jbLabel="Inline check 3"></jb-checkbox>
<jb-checkbox class="block" jbLabel="Block check 4"></jb-checkbox>
<jb-checkbox class="block" jbLabel="Block check 5"></jb-checkbox>
<jb-checkbox class="block" jbLabel="Block check 6"></jb-checkbox>`;

  public cssReset = `$checkbox-uncheck-bg: $white !default;
$checkbox-uncheck-border: $primary_color !default;
$checkbox-check-bg: $primary_color !default;
$checkbox-check-border: darken($primary_color, 3%) !default;
$checkbox-check-color: $white !default;
$checkbox-disabled-bg: $disabled-color !default;
$checkbox-disabled-border: darken($disabled-color, 3%) !default;`;


  // ---- This is the logic to manage autogenerated code example ----
  public brStr = `\n`;
  public bsStr = `\n             `;
  public customCompCode = ``;
  public compConf = {
    jbLabel: 'view.common.username',
    isDisabled: false,
    hasTooltip: false, tooltipText: 'view.tooltip.message', tooltipPos: null, tooltipBody: 'true',
    isClassBlock: false,
    isClassFlat: false,
    isClassRevert: false,
    isClassPadInput: false,
    isClassPadBtn: false,
    isClassPadForm: false,
  };
  public upComp = () => {
    this.customCompCode = `<jb-checkbox `;

    let compClasses = '';
    if (this.compConf.isClassBlock)    { compClasses += (!!compClasses.length ? ' ' : '') + 'block'; }
    if (this.compConf.isClassFlat)     { compClasses += (!!compClasses.length ? ' ' : '') + 'flat'; }
    if (this.compConf.isClassRevert)   { compClasses += (!!compClasses.length ? ' ' : '') + 'revert'; }
    if (this.compConf.isClassPadInput) { compClasses += (!!compClasses.length ? ' ' : '') + 'pad-input'; }
    if (this.compConf.isClassPadBtn)   { compClasses += (!!compClasses.length ? ' ' : '') + 'pad-btn'; }
    if (this.compConf.isClassPadForm)  { compClasses += (!!compClasses.length ? ' ' : '') + 'pad-form'; }
    if (!!compClasses) {
      this.customCompCode += `class="${compClasses}"` + this.bsStr;
    }


    if (this.compConf.jbLabel) { this.customCompCode += `jbLabel="${this.compConf.jbLabel}"`; }

    if (this.compConf.isDisabled) { this.customCompCode += this.bsStr + `[isDisabled]="true"`; }

    if (this.compConf.hasTooltip) {
      this.customCompCode += this.bsStr + `jbTooltip="${this.compConf.tooltipText}"`;
      if (!!this.compConf.tooltipPos)  { this.customCompCode += this.bsStr + `jbTooltipPos="${this.compConf.tooltipPos}"`; }
      if (!!this.compConf.tooltipBody) { this.customCompCode += this.bsStr + `jbTooltipBody="${this.compConf.tooltipBody}"`; }
    }

    this.customCompCode += (`>` + this.brStr + `</jb-checkbox>`);
  }


  constructor() { }

  ngOnInit() {
    this.upComp();
  }

}


export const jbCheckboxDoc = {
  name    : `jb-checkbox`,
  uiType  : 'component',
  desc    : `Generates a button.`,
  api     : `[(ngModel)]     : The ngModel directive is linked to the inner <input>, so that can be used as a form element with ngForm (status is propagated).
[jbLabel]       : Text of the label (optional)
[jbDisabled]    : Boolean value to disable (true) the input
[jbTooltip]     : If set, an info bullet will be added before the label, with a tooltip of the text
[jbTooltipPos]  : Position of the tooltip (top by default)
[jbTooltipBody] : Whether the tooltip is append to the body (default true) or next the the html element (false). The parent contaniner may affect the visibility of the tooltip`,
  instance: `<jb-checkbox [(ngModel)]="myValue" jbLabel="Check me"></jb-checkbox>`,
  demoComp: JbCheckboxDemoComponent
};
