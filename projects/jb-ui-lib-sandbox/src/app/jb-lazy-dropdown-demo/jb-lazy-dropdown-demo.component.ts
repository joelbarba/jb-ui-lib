// jb-lazy-dropdown = 'jb-btn'
// jbLazyDropdown = 'jbBtn'


import { Component, OnInit } from '@angular/core';
import {JbTranslateService} from '../translate.service';
import {JbGrowlService} from '../../../../jb-ui-lib/src/lib/jb-growl/jb-growl.service';

// The control object (jbOnLoaded) emits
export interface IjbLazyDropdownCtrl {
  expand      ?: { () };
  collapse    ?: { () };
  toggle      ?: { () };
  type        ?: { (value: string) };
  setPristine ?: { () };
  removeError ?: { () };
  addError    ?: { (err) };
}

@Component({
  selector: 'app-jb-lazy-dropdown-demo',
  templateUrl: './jb-lazy-dropdown-demo.component.html',
  styleUrls: ['./jb-lazy-dropdown-demo.component.scss']
})
export class JbLazyDropdownDemoComponent implements OnInit {
  public name = jbLazyDropdownDoc.name;
  public desc = jbLazyDropdownDoc.desc;
  public api = jbLazyDropdownDoc.api;
  public instance = jbLazyDropdownDoc.instance;
  public fakeList = [
    { id:  0, username: 'joel.barba',   email: 'joel@barba.com', first_name: 'Joel', last_name: 'Barba' },
    { id:  2, username: 'syrax',        email: 'syrax@targaryen.com',        first_name: 'Syrax',        last_name: 'Targaryen' },
    { id:  3, username: 'vermithor',    email: 'vermithor@targaryen.com',    first_name: 'Vermithor',    last_name: 'Targaryen' },
    { id:  4, username: 'caraxes',      email: 'caraxes@targaryen.com',      first_name: 'Caraxes',      last_name: 'Targaryen' },
    { id:  5, username: 'silverwing',   email: 'silverwing@targaryen.com',   first_name: 'Silverwing',   last_name: 'Targaryen' },
    { id:  6, username: 'sunfyre',      email: 'sunfyre@targaryen.com',      first_name: 'Sunfyre',      last_name: 'Targaryen' },
    { id:  7, username: 'vhagar',       email: 'vhagar@targaryen.com',       first_name: 'Vhagar',       last_name: 'Targaryen' },
    { id:  8, username: 'tessarion',    email: 'tessarion@targaryen.com',    first_name: 'Tessarion',    last_name: 'Targaryen' },
    { id:  9, username: 'cannibal',     email: 'cannibal@targaryen.com',     first_name: 'Cannibal',     last_name: 'Targaryen' },
    { id: 10, username: 'meraxes',      email: 'meraxes@targaryen.com',      first_name: 'Meraxes',      last_name: 'Targaryen' },
    { id: 11, username: 'balerion',     email: 'balerion@targaryen.com',     first_name: 'Balerion',     last_name: 'Targaryen' },
    { id: 12, username: 'quicksilver',  email: 'quicksilver@targaryen.com',  first_name: 'Quicksilver',  last_name: 'Targaryen' },
    { id: 13, username: 'dreamfyre',    email: 'dreamfyre@targaryen.com',    first_name: 'Dreamfyre',    last_name: 'Targaryen' },
    { id: 14, username: 'meleys',       email: 'meleys@targaryen.com',       first_name: 'Meleys',       last_name: 'Targaryen' },
    { id: 15, username: 'seasmoke',     email: 'seasmoke@targaryen.com',     first_name: 'Seasmoke',     last_name: 'Targaryen' },
    { id: 16, username: 'vermax',       email: 'vermax@targaryen.com',       first_name: 'Vermax',       last_name: 'Targaryen' },
    { id: 17, username: 'arrax',        email: 'arrax@targaryen.com',        first_name: 'Arrax',        last_name: 'Targaryen' },
    { id: 18, username: 'tyraxes',      email: 'tyraxes@targaryen.com',      first_name: 'Tyraxes',      last_name: 'Targaryen' },
    { id: 19, username: 'moondancer',   email: 'moondancer@targaryen.com',   first_name: 'Moondancer',   last_name: 'Targaryen' },
    { id: 20, username: 'stormcloud',   email: 'stormcloud@targaryen.com',   first_name: 'Stormcloud',   last_name: 'Targaryen' },
    { id: 21, username: 'morghul',      email: 'morghul@targaryen.com',      first_name: 'Morghul',      last_name: 'Targaryen' },
    { id: 22, username: 'shrykos',      email: 'shrykos@targaryen.com',      first_name: 'Shrykos',      last_name: 'Targaryen' },
    { id: 23, username: 'greyghost',    email: 'greyghost@targaryen.com',    first_name: 'Greyghost',    last_name: 'Targaryen' },
    { id: 24, username: 'sheepstealer', email: 'sheepstealer@targaryen.com', first_name: 'Sheepstealer', last_name: 'Targaryen' },
  ];
  public isLinked = true;
  public selObj;
  public selObjExample1;
  public lazyItemExample1;
  public myCtrl: IjbLazyDropdownCtrl;
  public jbSelectOptions = [
    { value: 'id' },
    { value: 'username' },
    { value: 'email' },
    { value: 'first_name' },
    { value: 'last_name' },
  ];
  public jbCustomPlacementList = [
    { value: 'auto'},
    { value: 'top'},
    { value: 'bottom'},
  ];
    constructor(
    private jbTranslate: JbTranslateService,
    public growl: JbGrowlService,
  ) {}

  renderFnStr = `renderFn = (item, ind) => jbTranslate.doTranslate('view.common.field_name') + ' ' + ind;`;
  renderInfo = `'views.item_number_lazy': 'Item number {{id}} - {{first_name}}'`;

  public cssReset = `$optional_input_color : $optional-color;
$focused_input_color  : $focused-color;
$required_input_color : $primary_color;
$invalid_input_color  : $invalid-color;
$valid_input_color    : $primary_color;
$disabled_input_color : $disabled-color;

.jb-lazy-dropdown-form-group {
  ...
}`;

  public brStr = `
`;
  public bsStr = `
             `;
  public code = ``;

  public conf = {
    isRequired: false,
    isDisabled: false, disabledTip: '',
    isLoading: false, isLoadingWithPromise: false,
    isErrorOnPristine: false,
    hasSelect: true,  selectField: 'username',
    hasRender: true,  hasRenderFn: false, renderExp: `email`, renderLabel: false,

    hasLabel: true,   labelText: 'views.lazy_dropdown.label',
    hasTooltip: false, tooltipText: 'view.tooltip.message', tooltipPos: 'top', tooltipBody: true,
    hasPlaceholder: true, jbPlaceholder: 'views.lazy_dropdown.placeholder',
    hasImages: false, hasIcons: false,
    hasErrorText: false, jbErrorText: `this ain't good`, errorPos: null,
    hasControls: false, jbCustomPlacementList: 'bottom',

    hasFullWidth: true, hasFlat: false,
  };
  public upComp = () => {
    if (this.conf.isLoading) { this.conf.isLoadingWithPromise = false; }

    this.code = `<jb-lazy-dropdown `;
    let compClasses = '';
    if (this.conf.hasFullWidth) { compClasses = 'full-width'; }
    if (this.conf.hasFlat) { compClasses += (compClasses ? ', ' : '') + 'flat'; }
    if (!!compClasses) { this.code += `class="${compClasses}"` + this.bsStr; }
    this.code += `[(ngModel)]="val"` + this.bsStr;
    this.code += `[jbList]="myList"`;

    if (this.conf.hasLabel)   { this.code += this.bsStr + `jbLabel="${this.conf.labelText}"`; }
    if (this.conf.isErrorOnPristine) { this.code += this.bsStr + `[jbErrorOnPristine]="true"`; }
    if (this.conf.isRequired) { this.code += this.bsStr + `[jbRequired]="true"`; }
    if (this.conf.isDisabled) { this.code += this.bsStr + `[jbDisabled]="true"`; }
    if (this.conf.disabledTip) { this.code += this.bsStr + `jbDisabledTip="${this.conf.disabledTip}"`; }
    if (this.conf.hasTooltip) {
      this.code += this.bsStr + `jbTooltip="${this.conf.tooltipText}"`;
      if (!!this.conf.tooltipPos)  { this.code += this.bsStr + `jbTooltipPos="${this.conf.tooltipPos}"`; }
      if (!!this.conf.tooltipBody) { this.code += this.bsStr + `jbTooltipBody="${this.conf.tooltipBody}"`; }
    }

    if (this.conf.hasSelect && !!this.conf.selectField) {
      this.code += this.bsStr + `jbSelect="${this.conf.selectField}"`;
    }
    if (this.conf.hasRender)   { this.code += this.bsStr + `jbRender="${this.conf.renderExp}"`; }  // this.reLink(0); }
    if (this.conf.hasRenderFn) { this.code += this.bsStr + `[jbRenderFn]="renderFn"`; } // this.reLink(0); }

    if (this.conf.hasPlaceholder) { this.code += this.bsStr + `jbPlaceholder="${this.conf.jbPlaceholder}"`; }
    if (this.conf.hasErrorText)   { this.code += this.bsStr + `jbErrorText="${this.conf.jbErrorText}"`; }
    if (this.conf.errorPos)       { this.code += this.bsStr + `jbErrorPos="${this.conf.errorPos}"`; }

    if (this.conf.jbCustomPlacementList === 'top' || this.conf.jbCustomPlacementList === 'bottom') {
      this.code += this.bsStr + `jbCustomPlacementList="${this.conf.jbCustomPlacementList}"`;
    }

    if (this.conf.hasControls) { this.code += this.bsStr + `(jbOnLoaded)="myCtrl = $event"`; }

    this.code += (`>` + this.brStr + `</jb-lazy-dropdown>`);

    if (this.conf.hasControls) {
      this.code += this.brStr + this.brStr + `public myCtrl: IjbDropdownCtrl;`;
      this.code += this.brStr + `myCtrl.toggle(); myCtrl.type('aaa');`;
    }
  };

  fakeLoadData = (filter) =>  {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = this.fakeList.filter(item => JSON.stringify(item).toLowerCase().includes(filter));
        resolve(data);
      }, 4000);
    });
  }

  fakeObservableData = () => {

  }

  ngOnInit() {
    this.lazyItemExample1 = this.fakeList[3];
    this.upComp();
  }

  public renderFn = (item, ind) => {
    return this.jbTranslate.doTranslate('view.common.field_name') + ' ' + ind;
  };

}


export const jbLazyDropdownDoc = {
  name    : `jb-lazy-dropdown`,
  uiType  : 'component',
  desc    : `Generates a dropdown which by searching will call a function to retrieve a list`,
  api     : `*[(ngModel)]         : The model holding the value of the selected item.
*[jbLazyLoad]        : Promise that will return the list of item to display
[jbLazyLoadItem]     : it contains the item for which will be executed the first jbLazyLoad and it will be selected once retrieved
[jbDebounce]         : Time to wait until execution of jbLazyLoad. Default: 300
[jbMinSearchLength]  : Minimum length of text string to execute jbLazyLoad. Default: 3
[jbSelect]           : Field to be set to the ngModel once selected (property from loaded items). If empty, the full object is set.
[jbRender]           : Field to display on the list (property from loaded items).
                         It is the param sent to the jbLazyLoad to search the list.
                         If empty, a row with all properties will be displayed.
[jbRenderFn]         : Function to determine how to render the items of list. Called for every item and should return the string that will be displayed.
                       It overrides [jbRender]. The function is passed 'item' and 'index' parameters.
[jbLabel]            : If provided, a <jb-label> is added above the selector with the given text
[jbTooltip]          : If label provided, adds a info badge with a tooltip (automatically translated)
[jbTooltipPos]       : Position of the tooltip (top by default)
[jbTooltipBody]      : Whether the tooltip is append to the body (default true) or next the the html element (false). The parent container may affect the visibility of the tooltip
[jbRequired]         : Whether the value is required. If not, and "Empty" option will be added a the top of the list
[jbDisabled]         : Whether the selector is disabled or not
[jbDisabledTip]      : Text with the tooltip to display on hover when the input is disabled

[jbPlaceholder]      : Placeholder to show when no value is selected. If jbEmptyLabel has a custom label, this is never shown.
[jbErrorOnPristine]  : If true, errors will be shown in pristine state too (by default pristine shows always as valid, even if it's not).
[jbErrorText]        : Custom error text (label) to display when invalid value.
[jbErrorPos]         : Custom position where to display the error text. Values = ['top-right', 'bottom-left', 'bottom-right', 'none']. None will hide the error text.
[jbCustomPlacementList] : By default the list expands up/down depending on its position on the screen. To force it: 'top' | 'bottom'.

[extCtrl$]           : Observable to trigger actions. Its .next() should emit an object with "action"/"value"
(jbOnLoaded)         : Emitter to catch the moment when the component is ready. It also emits the control object.
(jbBeforeChange)     : Emitter to catch the next value before it is set. It returns both (currentValue, nextValue)
(jbOnListExpanded)   : Emitter to catch the moment when the list expands (focus in)
(jbOnListCollapsed)  : Emitter to catch the moment when the list collapses (select or blur)`,
  instance: `<jb-lazy-dropdown [(ngModel)]="selObjExample1"
                        [jbLazyLoad]="fakeLoadData"
                        [jbLazyLoadItem]="lazyItemExample1"
                        jbRender="email"
></jb-lazy-dropdown>`,
  demoComp: JbLazyDropdownDemoComponent,
};
