import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {JbTranslateService} from '../translate.service';
import {JbGrowlService} from '../../../../jb-ui-lib/src/lib/jb-growl/jb-growl.service';
import {IjbDropdownCtrl} from '../../../../jb-ui-lib/src/lib/jb-dropdown/jb-dropdown.component';

@Component({
  selector: 'app-jb-dropdown-demo',
  templateUrl: './jb-dropdown-demo.component.html',
  styleUrls: ['./jb-dropdown-demo.component.scss']
})
export class JbDropdownDemoComponent implements OnInit {
  public name = jbDropdownDoc.name;
  public desc = jbDropdownDoc.desc;
  public api = jbDropdownDoc.api;
  public instance = jbDropdownDoc.instance;


  constructor(
    private jbTranslate: JbTranslateService,
    public growl: JbGrowlService,
  ) {
    // Make the list without "img" and "icon" fields
    this.myList = this.myList3.dCopy().map(el => {
      delete el.img;
      delete el.icon;
      return el;
    });
    this.dList = this.myList;
  }

  public isLinked = true;

  public myList;
  public myList2 = [
    { id:  1, username: 'view.common.name' },
    { id:  2, username: 'view.common.username' },
    { id:  3, username: 'view.common.yes' },
    { id:  4, username: 'view.common.no' },
  ];
  public myList3 = [
    { id:  0, username: 'joel.barba',   email: 'joel@barba.com', first_name: 'Joel', last_name: 'Barba', icon: 'icon-smile2', img: 'assets/language-flags/ca.png' },
    { id:  2, username: 'syrax',        email: 'syrax@targaryen.com',        first_name: 'Syrax',        last_name: 'Targaryen', icon: 'icon-home',          size: 'Medium', img: 'assets/language-flags/de.png' },
    { id:  3, username: 'vermithor',    email: 'vermithor@targaryen.com',    first_name: 'Vermithor',    last_name: 'Targaryen', icon: 'icon-office',        size: 'Large',  img: 'assets/language-flags/ja.png' },
    { id:  4, username: 'caraxes',      email: 'caraxes@targaryen.com',      first_name: 'Caraxes',      last_name: 'Targaryen', icon: 'icon-thumbs-up',     size: 'Medium', img3: 'assets/language-flags/cn.png' },
    { id:  5, username: 'silverwing',   email: 'silverwing@targaryen.com',   first_name: 'Silverwing',   last_name: 'Targaryen', icon: 'icon-phone2',        size: 'Medium', img: 'assets/language-flags/da.png' },
    { id:  6, username: 'sunfyre',      email: 'sunfyre@targaryen.com',      first_name: 'Sunfyre',      last_name: 'Targaryen', icon: 'icon-bell2',         size: 'Medium', img: 'assets/language-flags/cat.png' },
    { id:  7, username: 'vhagar',       email: 'vhagar@targaryen.com',       first_name: 'Vhagar',       last_name: 'Targaryen', icon: 'icon-user',          size: 'Large',  img: 'assets/language-flags/el.png' },
    { id:  8, username: 'tessarion',    email: 'tessarion@targaryen.com',    first_name: 'Tessarion',    last_name: 'Targaryen', icon: 'icon-users',         size: 'Medium', img: 'assets/language-flags/es.png' },
    { id:  9, username: 'cannibal',     email: 'cannibal@targaryen.com',     first_name: 'Cannibal',     last_name: 'Targaryen', icon: 'icon-lock',          size: 'Medium', img: 'assets/language-flags/fi.png' },
    { id: 10, username: 'meraxes',      email: 'meraxes@targaryen.com',      first_name: 'Meraxes',      last_name: 'Targaryen', icon: 'icon-teapot',        size: 'Large',  img: 'assets/language-flags/fr.png' },
    { id: 11, username: 'balerion',     email: 'balerion@targaryen.com',     first_name: 'Balerion',     last_name: 'Targaryen', icon: 'icon-plus',          size: 'Large',  img: 'assets/language-flags/gb.png' },
    { id: 12, username: 'quicksilver',  email: 'quicksilver@targaryen.com',  first_name: 'Quicksilver',  last_name: 'Targaryen', icon: 'icon-minus',         size: 'Medium', img: 'assets/language-flags/ie.png' },
    { id: 13, username: 'dreamfyre',    email: 'dreamfyre@targaryen.com',    first_name: 'Dreamfyre',    last_name: 'Targaryen', icon: 'icon-notification2', size: 'Large',  img: 'assets/language-flags/it.png' },
    { id: 14, username: 'meleys',       email: 'meleys@targaryen.com',       first_name: 'Meleys',       last_name: 'Targaryen', icon: 'icon-warning2',      size: 'Medium', img: 'assets/language-flags/ja.png' },
    { id: 15, username: 'seasmoke',     email: 'seasmoke@targaryen.com',     first_name: 'Seasmoke',     last_name: 'Targaryen', icon: 'icon-checkmark',     size: 'Medium', img: 'assets/language-flags/nl.png' },
    { id: 16, username: 'vermax',       email: 'vermax@targaryen.com',       first_name: 'Vermax',       last_name: 'Targaryen', icon: 'icon-rocket',        size: 'Medium', img: 'assets/language-flags/no.png' },
    { id: 17, username: 'arrax',        email: 'arrax@targaryen.com',        first_name: 'Arrax',        last_name: 'Targaryen', icon: 'icon-bin',           size: 'Small',  img: 'assets/language-flags/pl.png' },
    { id: 18, username: 'tyraxes',      email: 'tyraxes@targaryen.com',      first_name: 'Tyraxes',      last_name: 'Targaryen', icon: 'icon-shield',        size: 'Medium', img: 'assets/language-flags/pt.png' },
    { id: 19, username: 'moondancer',   email: 'moondancer@targaryen.com',   first_name: 'Moondancer',   last_name: 'Targaryen', icon: 'icon-switch',        size: 'Small',  img: 'assets/language-flags/sv.png' },
    { id: 20, username: 'stormcloud',   email: 'stormcloud@targaryen.com',   first_name: 'Stormcloud',   last_name: 'Targaryen', icon: 'icon-list',          size: 'Medium', img: 'assets/language-flags/tw.png' },
    { id: 21, username: 'morghul',      email: 'morghul@targaryen.com',      first_name: 'Morghul',      last_name: 'Targaryen', icon: 'icon-tree6',         size: 'Small',  img: 'assets/language-flags/us.png' },
    { id: 22, username: 'shrykos',      email: 'shrykos@targaryen.com',      first_name: 'Shrykos',      last_name: 'Targaryen', icon: 'icon-earth2',        size: 'Small',  img: 'assets/language-flags/zh.png' },
    { id: 23, username: 'greyghost',    email: 'greyghost@targaryen.com',    first_name: 'Greyghost',    last_name: 'Targaryen', icon2: 'icon-menu3',        size: 'Medium', img2: 'assets/language-flags/ca.png' },
    { id: 24, username: 'sheepstealer', email: 'sheepstealer@targaryen.com', first_name: 'Sheepstealer', last_name: 'Targaryen', icon: 'icon-link',          size: 'Medium', img: 'assets/language-flags/de.png' },
    { id: 25, username: 'test 1',       email: 'views.test_label' },
    { id: 26, username: 'test 2',       email: 'views.xss_test' },
    { id: 27, username: 'test 3',       email: 'views.green_thing' },
    { id: 28, username: 'test 4',       email: 'This is <not> a bb code' },
  ];
  public myList4 = [
    { id:  1, name: 'first',  },
    { id:  2, name: 'second', },
    { id:  3, name: 'third',  },
    { id:  4, name: 'fourth', },
    { id:  5, name: 'fifth',  },
  ];
  public dList;

  public selObj = { id: 2, username: 'syrax', email: 'syrax@targaryen.com', first_name: 'Syrax', last_name: 'Targaryen' };
  public selObj2 = 2;
  public selObj3;
  public selObj4;
  public selObj5;
  public selObj6;
  public selObj7;
  public selObj8;
  public selObj9;
  public selObj10;

  public asyncList1 = [];
  public asyncList2 = [];
  public asyncList3 = [];
  public isLoading = false;
  public isDisabled = false;
  public loadingPromise;
  public isLoading$: Subject<boolean> = new Subject();


  public cssReset = `$dropdown-selection-bg: $quaternary_color !default;
$dropdown-selection-hover: $primary_color !default;
$dropdown-valid-color: $valid-color !default;`;


  public myCtrl: IjbDropdownCtrl;
  public myCtrl2: IjbDropdownCtrl;
  public extCtrl$ = new Subject();
  public ctrlActions1 = [
    `expand()............... Expands the selection list`,
    `collapse()............. Collapses the selection list`,
    `toggle()............... Expands/Collapses the selection list`,
    `type(text) ............ Sets the value in the search input`,
    `setPristine().......... Resets the pristine state`,
    `addError() ............ Adds a manual error`,
    `removeError(text)...... Removes the manual error`,
  ];
  public ctrlActions2 = [
    `{ action: 'expand' } ................. Expands the selection list`,
    `{ action: 'collapse' } ............... Collapses the selection list`,
    `{ action: 'toggle' } ................. Expands/Collapses the selection list`,
    `{ action: 'type', value: text } ...... Sets the value in the search input`,
    `{ action: 'setPristine' } ............ Resets the pristine state`,
    `{ action: 'addError', value: err } ... Adds a manual error`,
    `{ action: 'removeError' } ............ Removes the manual error`,
  ];
  public extCtrlExample1 = `<jb-dropdown .... (jbOnLoaded)="myCtrl = $event"></jb-dropdown>

public myCtrl: IjbDropdownCtrl;

myCtrl.expand()
myCtrl.collapse()
myCtrl.toggle()
myCtrl.type('ax')
myCtrl.setPristine()
myCtrl.addError('wrong')
myCtrl.removeError()`;

  public extCtrlExample2 = `<jb-dropdown .... [extCtrl$]="extCtrl$"></jb-dropdown>

public extCtrl$ = new Subject();

extCtrl$.next({ action: 'expand' })
extCtrl$.next({ action: 'collapse' })
extCtrl$.next({ action: 'toggle' })
extCtrl$.next({ action: 'type', value: 'ax' })
extCtrl$.next({ action: 'setPristine' })
extCtrl$.next({ action: 'addError' })
extCtrl$.next({ action: 'removeError', value: 'wrong' })`;

  renderFnStr = `renderFn = (item, ind) => jbTranslate.doTranslate('view.common.field_name') + ' ' + ind;`;
  renderInfo = `'views.item_number': 'Item number {{id}} - {{name}}'`;

  public brStr = `
`;
  public bsStr = `
             `;
  public code = ``;

  public conf = {
    isRequired: false,
    isDisabled: false, disabledTip: '',
    isLoading: false, isLoadingWithPromise: false, jbLoadingPromise: null,
    isErrorOnPristine: false,
    hasSelect: true,  selectField: 'username',
    hasOrder: false, jbOrderBy: 'last_name, -username', hasGroupBy: false,
    hasRender: true,  hasRenderFn: false, renderExp: `email`, renderLabel: false,

    hasLabel: true,   labelText: 'view.common.field_name',
    hasTooltip: false, tooltipText: 'view.tooltip.message', tooltipPos: 'top', tooltipBody: true,
    hasPlaceholder: true, jbPlaceholder: 'views.dropdown.placeholder',
    hasEmptyLabel: false, customEmptyLabel: 'view.common.all',
    hasEmptyValue: false, customEmptyValue: 'everything',
    hasImages: false, hasIcons: false, jbAutoCollapse: true,

    hasErrorText: false, jbErrorText: `this ain't good`, errorPos: null,
    jbKeepSearch: false, jbHtmlRender: false, hasFilterFn: false, jbFilterFn: (list) => list.filter(item => item.id > 3),
    hasControls: false, jbCustomPlacementList: '',

    hasFullWidth: true, hasFlat: false, extraBtn: false,
  };
  public upComp = () => {
    if (this.conf.isLoading) { this.conf.isLoadingWithPromise = false; }

    this.code = `<jb-dropdown `;
    let compClasses = '';
    if (this.conf.hasFullWidth) { compClasses = 'full-width'; }
    if (this.conf.hasFlat) { compClasses += (compClasses ? ' ' : '') + 'flat'; }
    if (this.conf.extraBtn) { compClasses += (compClasses ? ' ' : '') + 'extra-btn'; }
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

    if (this.conf.hasOrder)   { this.code += this.bsStr + `jbOrderBy="${this.conf.jbOrderBy}"`; }
    if (this.conf.hasGroupBy) { this.code += this.bsStr + `jbGroupBy="size"`; }
    if (this.conf.isLoading) {
      if (this.conf.isLoadingWithPromise) {
        this.code += this.bsStr + `jbLoading="myPromise"`;
      } else {
        this.code += this.bsStr + `jbLoading="${this.conf.isLoading}"`;
      }
    }

    if (this.conf.hasSelect && !!this.conf.selectField) {
      this.code += this.bsStr + `jbSelect="${this.conf.selectField}"`;
    }
    if (this.conf.hasRender)   { this.code += this.bsStr + `jbRender="${this.conf.renderExp}"`; }  // this.reLink(0); }
    if (this.conf.hasRenderFn) { this.code += this.bsStr + `[jbRenderFn]="renderFn"`; } // this.reLink(0); }

    if (this.conf.hasPlaceholder) { this.code += this.bsStr + `jbPlaceholder="${this.conf.jbPlaceholder}"`; }
    if (this.conf.hasEmptyLabel)  { this.code += this.bsStr + `jbEmptyLabel="${this.conf.customEmptyLabel}"`; }
    if (this.conf.hasEmptyValue)  { this.code += this.bsStr + `jbEmptyValue="${this.conf.customEmptyValue}"`; }
    if (this.conf.hasErrorText)   { this.code += this.bsStr + `jbErrorText="${this.conf.jbErrorText}"`; }
    if (this.conf.errorPos)       { this.code += this.bsStr + `jbErrorPos="${this.conf.errorPos}"`; }

    if (this.conf.jbCustomPlacementList === 'top' || this.conf.jbCustomPlacementList === 'bottom') {
      this.code += this.bsStr + `jbCustomPlacementList="${this.conf.jbCustomPlacementList}"`;
    }

    if (this.conf.jbKeepSearch) { this.code += this.bsStr + `[jbKeepSearch]="true"`; }
    if (this.conf.jbHtmlRender) { this.code += this.bsStr + `[jbHtmlRender]="true"`; }

    if (this.conf.hasControls) { this.code += this.bsStr + `(jbOnLoaded)="myCtrl = $event"`; }

    this.code += (`>` + this.brStr + `</jb-dropdown>`);

    if (this.conf.extraBtn) { this.code += this.brStr + `<jb-btn jbType="add-icon"></jb-btn>`; }

    if (this.conf.hasControls) {
      this.code += this.brStr + this.brStr + `public myCtrl: IjbDropdownCtrl;`;
      this.code += this.brStr + `myCtrl.toggle(); myCtrl.type('aaa');`;
    }
  };


  ngOnInit() {
    this.upComp();
    this.reloadPromise();
    this.isLoading$.subscribe(
      val => !val && (this.asyncList3 = this.myList),
      err => {},
      () => this.asyncList3 = this.myList
    );
  }

  public switchList = () => {
    this.dList = this.myList3.dCopy().map(el => {
      if (!this.conf.hasImages) { delete el.img; }
      if (!this.conf.hasIcons)  { delete el.icon; }
      return el;
    });
    if (!!this.selObj10) { this.selObj10 = this.dList.getById(this.selObj10.id); }
  };

  public loadWithPromise = () => {
    this.conf.isLoading = false;
    this.conf.isLoadingWithPromise = true;
    this.conf.jbLoadingPromise = new Promise(resolve => setTimeout(resolve, 4000));
    this.growl.success('4 second Promise set as jbLoading');
  };



  public mockAutoSelect = () => {
    this.selObj10 = {...this.myList.getById(13)};
  };


  reLink = (time = 500) => {
    this.isLinked = false;
    setTimeout(() => this.isLinked = true, time);
  };


  renderFn = (item, ind) => {
    return this.jbTranslate.doTranslate('view.common.field_name') + ' ' + ind;
  };


  public reloadPromise = () => {
    this.loadingPromise = new Promise(resolve => {
      setTimeout(() => { this.asyncList2 = this.myList; resolve(); }, 5000);
    });
  };
}


export const jbDropdownDoc = {
  name    : `jb-dropdown`,
  uiType  : 'component',
  desc    : `Generates a dropdown selector list.`,
  api     : `*[(ngModel)]         : The model holding the value of the selected item.
*[jbList]            : Array of objects with representing the list to be displayed when expanded.
[jbSelect]           : Field to be set to the ngModel once selected (property from jbList items). If empty, the full object is set.
                       You can also select multiple properties with a keyMap list 'prop1, prop2, ...'
[jbRender]           : Field to display on the list (property from jbList items).
                         If empty, a row with all properties will be displayed.
                         If a translation label is provided, that will be translated applying the object of the list as translation parameters
[jbRenderFn]         : Function to determine how to render the items of list. Called for every item and should return the string that will be displayed.
                       It overrides [jbRender]. The function is passed 'item' and 'index' parameters.
[jbRenderImg]        : Name of the field containing the url of the image to display on the item ("img" by default)
[jbRenderIcon]       : Name of the field containing the css class of the (icomoon) icon to display on the item ("icon" by default)
[jbOrderBy]          : Field (or fields separated by ,). If prefixed by '-', desc order is applied for the field.
[jbLabel]            : If provided, a <jb-label> is added above the selector with the given text
[jbTooltip]          : If label provided, adds a info badge with a tooltip (automatically translated)
[jbTooltipPos]       : Position of the tooltip (top by default)
[jbTooltipBody]      : Whether the tooltip is append to the body (default true) or next the the html element (false). The parent container may affect the visibility of the tooltip
[jbRequired]         : Whether the value is required. If not, and "Empty" option will be added a the top of the list
[jbDisabled]         : Whether the selector is disabled or not
[jbDisabledTip]      : Text with the tooltip to display on hover when the input is disabled

[jbPlaceholder]      : Placeholder to show when no value is selected. If jbEmptyLabel has a custom label, this is never shown.
[jbEmptyLabel]       : By default the empty option shows the "view.common.empty" label. To display a different label, add it here.
[jbEmptyValue]       : By default the empty option sets "null" value to the ngModel. To set a different value, add it here.
[jbErrorOnPristine]  : If true, errors will be shown in pristine state too (by default pristine shows always as valid, even if it's not).
[jbErrorText]        : Custom error text (label) to display when invalid value.
[jbErrorPos]         : Custom position where to display the error text. Values = ['top-right', 'bottom-left', 'bottom-right', 'none']. None will hide the error text.
[jbKeepSearch]       : If false (default) resets the search string every time the list is expanded, removing the previous filter. If true, it keeps it.
[jbHtmlRender]       : False by default. When true, displayed values can be rendered as html on the list (but not in the input)
[jbAutoCollapse]     : True by default. When false, the list does not collapse automatically on focus out (only on button click).
[jbFilterFn]         : Custom function to perform the list filtering. It should return a sub-array with the filtered items.
[jbLoading]          : To show a loading spinner on the left button.
                       Either a boolean (true=show, false=hide), or a promise that will automatically show the spinner while not resolved,
                       or an observable that emits a boolean (true=loading, false=loaded)
[jbCustomPlacementList] : By default the list expands up/down depending on its position on the screen. To force it: 'top' | 'bottom'.

[extCtrl$]           : Observable to trigger actions. Its .next() should emit an object with "action"/"value"
(jbOnLoaded)         : Emitter to catch the moment when the component is ready. It also emits the control object.
(jbBeforeChange)     : Emitter to catch the next value before it is set. It returns both (currentValue, nextValue)
(jbOnListExpanded)   : Emitter to catch the moment when the list expands (focus in)
(jbOnListCollapsed)  : Emitter to catch the moment when the list collapses (select or blur)
(jbOnTyping)         : Emitter to catch when typing into the input`,
  instance: `<jb-dropdown [(ngModel)]="selObj" [jbList]="myList"></jb-dropdown>`,
  demoComp: JbDropdownDemoComponent
};
