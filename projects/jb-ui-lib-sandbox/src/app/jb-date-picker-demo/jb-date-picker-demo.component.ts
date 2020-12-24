import {Component, OnInit} from '@angular/core';
import {JbUiLibTransService} from 'projects/jb-ui-lib/src/public_api';

@Component({
  selector: 'app-jb-date-picker-demo',
  templateUrl: './jb-date-picker-demo.component.html',
  styleUrls: ['./jb-date-picker-demo.component.scss']
})
export class JbDatePickerDemoComponent implements OnInit {
  public name = jbDatePickerDoc.name;
  public desc = jbDatePickerDoc.desc;
  public api = jbDatePickerDoc.api;
  public instance = jbDatePickerDoc.instance;
  public model = '';
  public instance3 = '';

  public myDate2 = '2015-10-08T08:41:03.868793+00:00';
  public myDate = null;
  // public myDate = '2020-01-19';
  public myDate3;
  public jbTranslate = { currentLocale: 'en-US' };

  public instance2 = `<jb-date-picker [(ngModel)]="myDate"
                jbLabel="view.common.field_name3"
                [jbRequired]="true"
                [jbLocale]="jbTranslate.currentLocale"
                jbMinDate="2020-01-14"
                jbMaxDate="2020-02-09">
</jb-date-picker>`;

  public locale = 'en-IE';

  public cssReset = `$date-picker-modal-day-color: #212529 !default; // default bootstrap $dropdown-color ;

$date-picker-optional-color  : $optional-color !default;
$date-picker-disabled-color  : $disabled-color !default;
$date-picker-required-color  : $required-color !default;
$date-picker-invalid-color   : $invalid-color !default;
$date-picker-valid-color     : $valid-color !default;`;

  public localesList = [
    { code: 'zh-CN',  name: 'zh-CN' },
    { code: 'zh-TW',  name: 'zh-TW' },
    { code: 'da',     name: 'da' },
    { code: 'nl',     name: 'nl' },
    { code: 'en-CA',  name: 'English CA (en-CA)' },
    { code: 'en-GB',  name: 'English GB (en-GB)' },
    { code: 'en-IE',  name: 'English IE (en-IE)' },
    { code: 'en-US',  name: 'English US (en-US)' },
    { code: 'fi',     name: 'fi' },
    { code: 'fr',     name: 'fr' },
    { code: 'de',     name: 'de' },
    { code: 'el',     name: 'el' },
    { code: 'it',     name: 'it' },
    { code: 'ja',     name: 'ja' },
    { code: 'no',     name: 'no' },
    { code: 'pl',     name: 'pl' },
    { code: 'sv',     name: 'sv' },
    { code: 'es-ES',  name: 'es-ES' },
    { code: 'es-MX',  name: 'es-MX' },
    { code: 'pt-PT',  name: 'pt-PT' },
    { code: 'pt-BR',  name: 'pt-BR' },
    { code: 'in',     name: 'in' },
    { code: 'ar',     name: 'ar' },
    { code: 'ru',     name: 'ru' },
    { code: 'ms-SG',  name: 'ms-SG' },
    { code: 'ms-MY',  name: 'ms-MY' },
    { code: 'ms-ID',  name: 'ms-ID' },
    { code: 'tr',     name: 'tr' },
    { code: 'kr',     name: 'kr' }
  ];

  public formatsList = [
    // { code: 'short',      name: `'M/d/yy, h:mm a' (6/15/15, 9:03 AM)` },
    // { code: 'medium',     name: `'MMM d, y, h:mm:ss a' (Jun 15, 2015, 9:03:01 AM)` },
    // { code: 'long',       name: `'MMMM d, y, h:mm:ss a z' (June 15, 2015 at 9:03:01 AM GMT+1)` },
    // { code: 'full',       name: `'EEEE, MMMM d, y, h:mm:ss a zzzz' (Monday, June 15, 2015 at 9:03:01 AM GMT+01:00)` },
    { code: 'shortDate',  name: `shortDate:  'M/d/yy' (6/15/15)` },
    { code: 'mediumDate', name: `mediumDate: 'MMM d, y' (Jun 15, 2015)` },
    { code: 'longDate',   name: `longDate:   'MMMM d, y' (June 15, 2015)` },
    { code: 'fullDate',   name: `fullDate:   'EEEE, MMMM d, y' (Monday, June 15, 2015)` },
    // { code: 'shortTime',  name: `'h:mm a' (9:03 AM)` },
    // { code: 'mediumTime', name: `'h:mm:ss a' (9:03:01 AM)` },
    // { code: 'longTime',   name: `'h:mm:ss a z' (9:03:01 AM GMT+1)` },
    // { code: 'fullTime',   name: `'h:mm:ss a zzzz' (9:03:01 AM GMT+01:00)` },
  ];

  public tooltipPosList = [
    { id: 'top',        text: 'top'    },
    { id: 'right',      text: 'right'  },
    { id: 'bottom',     text: 'bottom' },
    { id: 'left',       text: 'left'   },
  ];
  public tooltipBodyList = [
    { id: 'true',       text: 'true'   },
    { id: 'false',      text: 'false'  },
  ];



  // ---- This is the logic to manage autogenerated code example ----
  public brStr = `\n`;
  public bsStr = `\n                `;
  public customCompCode = null;
  public isCompLinked = true;
  public compConf: any = {
    isRequired: true,
    isDisabled: false,
    hasClearBtn: false,
    hasLabel: false, labelText: 'view.common.field_name3',
    hasTooltip: false, tooltipText: 'Hello World', tooltipPos: null, tooltipBody: false,
    hasErrorText: false, jbErrorText: 'view.common.custom_error',
    errorPos: '', errorPosOpts : [
      { id: 'top-right',    text: 'top-right',  },
      { id: 'bottom-left',  text: 'bottom-left',   },
      { id: 'bottom-right', text: 'bottom-right',  },
    ],
    hasCustomFormat: false,
    jbFormat: 'shortDate',
    jbLocale: null,
    jbMinDate: null,
    jbMaxDate: null,
    hasFlat: false, hasModalRight: false, hasNoMinWidth: false,
  };
  public upComp = () => {
    this.customCompCode = `<jb-date-picker `;

    let compClasses = '';
    if (this.compConf.hasFlat)       { compClasses += (!!compClasses.length ? ' ' : '') + 'flat'; }
    if (this.compConf.hasModalRight) { compClasses += (!!compClasses.length ? ' ' : '') + 'modal-right'; }
    if (this.compConf.hasNoMinWidth) { compClasses += (!!compClasses.length ? ' ' : '') + 'no-min-width'; }
    if (!!compClasses) { this.customCompCode += `class="${compClasses}"` + this.bsStr; }

    this.customCompCode += `[(ngModel)]="myVal"` + this.bsStr;
    this.customCompCode += `(ngModelChange)="doSomething($event)"`;

    if (this.compConf.hasLabel)   { this.customCompCode += this.bsStr + `jbLabel="${this.compConf.labelText}"`; }
    if (this.compConf.isRequired) { this.customCompCode += this.bsStr + `[jbRequired]="true"`; }
    if (this.compConf.isDisabled) { this.customCompCode += this.bsStr + `[isDisabled]="true"`; }
    if (this.compConf.jbHasClearBtn) { this.customCompCode += this.bsStr + `[jbHasClearBtn]="true"`; }

    if (this.compConf.hasCustomFormat) {
      this.customCompCode += this.bsStr + `jbFormat="${this.compConf.jbFormat}"`;
    }
    if (!this.compConf.jbLocale) {
      this.customCompCode += this.bsStr + `[jbLocale]="jbTranslate.currentLocale"`;
    } else {
      this.customCompCode += this.bsStr + `jbLocale="${this.compConf.jbLocale}"`;
    }

    if (!!this.compConf.jbMinDate) {
      this.customCompCode += this.bsStr + `jbMinDate="${this.compConf.jbMinDate}"`;
    }
    if (!!this.compConf.jbMaxDate) {
      this.customCompCode += this.bsStr + `jbMaxDate="${this.compConf.jbMaxDate}"`;
    }

    if (this.compConf.hasTooltip) {
      this.customCompCode += this.bsStr + `jbTooltip="${this.compConf.tooltipText}"`;
      if (!!this.compConf.tooltipPos)  { this.customCompCode += this.bsStr + `jbTooltipPos="${this.compConf.tooltipPos}"`; }
      if (!!this.compConf.tooltipBody) { this.customCompCode += this.bsStr + `jbTooltipBody="${this.compConf.tooltipBody}"`; }
    }
    if (this.compConf.hasErrorText)    { this.customCompCode += this.bsStr + `jbErrorText="${this.compConf.jbErrorText}"`; }
    if (this.compConf.errorPos)        { this.customCompCode += this.bsStr + `jbErrorPos="${this.compConf.errorPos}"`; }

    this.customCompCode += (`>` + this.brStr + `</jb-date-picker>`);
  };
  public relink = () => {
    this.isCompLinked = false;
    setTimeout(() => this.isCompLinked = true);
  };

  constructor(private translateService: JbUiLibTransService) {
  }

  ngOnInit() { }

  public checkNewModel = (model) => {
    console.log('Selected date =', model);
  }

  public updateLocale(locale) {
    this.translateService.locale$.next(locale);
    this.upComp();
  }

}


export const jbDatePickerDoc = {
  name    : `jb-date-picker`,
  uiType  : 'component',
  desc    : `Date component for forms`,
  api     : `[(ngModel)]     : The ngModel linked. It's a string with the default date format 'yyyy-mm-dd'
[jbLabel]       : Label of the input (automatically translated). If not provided, no label is displayed.
[jbRequired]    : Whether the value is required
[jbDisabled]    : Whether the value can be changed
[jbLocale]      : In case of using a localized format, the locale to be used. It overrides the translations.locale$ value.
[jbFormat]      : Format to display the date in the input. By default 'shortDate' (see https://angular.io/api/common/DatePipe#pre-defined-format-options)
[jbHasClearBtn] : (true/false) Whether to add a clear button on the input to reset the value
[jbMinDate]     : Minimum date. String with standard format 'yyyy-mm-dd'.
[jbMaxDate]     : Maximum date. String with standard format 'yyyy-mm-dd'.
[jbTooltip]     : If label provided, adds a info badge with a tooltip (automatically translated)
[jbTooltipPos]  : Position of the tooltip (top by default)
[jbTooltipBody] : Whether the tooltip is append to the body (default true) or not (false)
[jbErrorText]   : Custom error text (label) to display when invalid value
[jbErrorPos]    : Custom position where to display the error text. Values = ['top-right', 'bottom-left', 'bottom-right', 'none']. None will hide the error text.`,
  instance: `<jb-date-picker jbLabel="My Date" [(ngModel)]="myDate"
                [jbLocale]="jbTranslate.currentLocale">
</jb-date-picker>`,
  demoComp: JbDatePickerDemoComponent
};