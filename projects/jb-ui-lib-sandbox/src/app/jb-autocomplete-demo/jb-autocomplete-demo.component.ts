// jb-autocomplete = 'jb-btn'
// jbAutocomplete = 'jbBtn'


import { Component, OnInit, ViewChild } from '@angular/core';
import { JbGrowlService } from '../../../../jb-ui-lib/src/lib/jb-growl/jb-growl.service';

@Component({
  selector: 'app-jb-autocomplete-demo',
  templateUrl: './jb-autocomplete-demo.component.html',
  styleUrls: ['./jb-autocomplete-demo.component.scss']
})
export class JbAutocompleteDemoComponent implements OnInit {
  name = jbAutocompleteDoc.name;
  desc = jbAutocompleteDoc.desc;
  api = jbAutocompleteDoc.api;
  instance = jbAutocompleteDoc.instance;
  cssReset = jbAutocompleteDoc.cssReset;

  myVar = 'hello';
  myTestOptions1 = [
    'option first',
    'second stuff',
    'the third of my his name',
    'may the force be with you',
    'the fifth of my his name',
    'may the force be with you',
    'may the force be with you',
    'may the force be with you',
    'may the force be with you',
    'may the force be with you',
    'the sixth of my his name',
    'may the force be with you',
  ];

  // jb-autocomplete customization parameters
  stringSelected;
  stringList: Array<string> = [
    'Pinot Grigio Zagalia',
    'Domaine de Tariquet, Cotes de Gascogne',
    'Mancura Etnia, Sauvignon Blanc',
    'Macon Lugny Burgundy',
    'Pulpo Albarino',
    'Prova Reiga Arinto',
    'Domaine La Combette, Granache Rose',
    'Zagalia Montepulciano D\'Abruzzo',
    'Mancura Etnia, Cabernet Sauvignon',
    'Bouchard, Pinot Noir',
    'Masseria del Fauno, Puglia, Primitivo',
    'Cote du Ventoux, Delas Freres',
    'Lurton Bodega, Malbec',
    'Four Sisters, Shiraz',
    'Fattoria di Basciano, Chianti Rufina',
  ];
  validTypes = [
    { id: 'integer',  text: 'integer',  },
    { id: 'number',   text: 'number',   },
    { id: 'decimal',  text: 'decimal',  },
    { id: 'email',    text: 'email',    },
  ];
  compConf = {
    isRequired: false,
    isDisabled: false,
    rows: null,
    hasLabel: false,
    labelText: 'My Description',
    hasPlaceholder: false,
    placeholderText: 'My Placeholder',
    hasFullWidth: false,
    hasMinLength: false,
    hasSquash: false,
    hasTooltip: false,
    minLength: undefined as number,
    tooltipText: 'Hello World',
    tooltipPos: null,
    tooltipBody: false,
    validType: null
  };
  customCompCode = `<jb-dropdown [(ngModel)]="stringSelected" [jbList]="stringList"></jb-dropdown>`;
  // Invitee attendee parameters
  emailList;
  userList = [
    { id:  0, username: 'joel.barba',   email: 'joel@barba.com', first_name: 'Joel', last_name: 'Barba', icon: 'icon-smile2', img: 'assets/language-flags/ca.png' },
    { id:  2, username: 'syrax',        email: 'syrax@targaryen.com',        first_name: 'Syrax',        last_name: 'Targaryen', icon: 'icon-home',          img: 'assets/language-flags/de.png' },
    { id:  3, username: 'vermithor',    email: 'vermithor@targaryen.com',    first_name: 'Vermithor',    last_name: 'Targaryen', icon: 'icon-office',        img: 'assets/language-flags/ja.png' },
    { id:  4, username: 'caraxes',      email: 'caraxes@targaryen.com',      first_name: 'Caraxes',      last_name: 'Targaryen', icon: 'icon-thumbs-up',     img3: 'assets/language-flags/cn.png' },
    { id:  5, username: 'silverwing',   email: 'silverwing@targaryen.com',   first_name: 'Silverwing',   last_name: 'Targaryen', icon: 'icon-phone2',        img: 'assets/language-flags/da.png' },
    { id:  6, username: 'sunfyre',      email: 'sunfyre@targaryen.com',      first_name: 'Sunfyre',      last_name: 'Targaryen', icon: 'icon-bell2',         img: 'assets/language-flags/cat.png' },
    { id:  7, username: 'vhagar',       email: 'vhagar@targaryen.com',       first_name: 'Vhagar',       last_name: 'Targaryen', icon: 'icon-user',          img: 'assets/language-flags/el.png' },
    { id:  8, username: 'tessarion',    email: 'tessarion@targaryen.com',    first_name: 'Tessarion',    last_name: 'Targaryen', icon: 'icon-users',         img: 'assets/language-flags/es.png' },
    { id:  9, username: 'cannibal',     email: 'cannibal@targaryen.com',     first_name: 'Cannibal',     last_name: 'Targaryen', icon: 'icon-lock',          img: 'assets/language-flags/fi.png' },
    { id: 10, username: 'meraxes',      email: 'meraxes@targaryen.com',      first_name: 'Meraxes',      last_name: 'Targaryen', icon: 'icon-teapot',        img: 'assets/language-flags/fr.png' },
    { id: 11, username: 'balerion',     email: 'balerion@targaryen.com',     first_name: 'Balerion',     last_name: 'Targaryen', icon: 'icon-plus',          img: 'assets/language-flags/gb.png' },
    { id: 12, username: 'quicksilver',  email: 'quicksilver@targaryen.com',  first_name: 'Quicksilver',  last_name: 'Targaryen', icon: 'icon-minus',         img: 'assets/language-flags/ie.png' },
    { id: 13, username: 'dreamfyre',    email: 'dreamfyre@targaryen.com',    first_name: 'Dreamfyre',    last_name: 'Targaryen', icon: 'icon-notification2', img: 'assets/language-flags/it.png' },
    { id: 14, username: 'meleys',       email: 'meleys@targaryen.com',       first_name: 'Meleys',       last_name: 'Targaryen', icon: 'icon-warning2',      img: 'assets/language-flags/ja.png' },
    { id: 15, username: 'seasmoke',     email: 'seasmoke@targaryen.com',     first_name: 'Seasmoke',     last_name: 'Targaryen', icon: 'icon-checkmark',     img: 'assets/language-flags/nl.png' },
    { id: 16, username: 'vermax',       email: 'vermax@targaryen.com',       first_name: 'Vermax',       last_name: 'Targaryen', icon: 'icon-rocket',        img: 'assets/language-flags/no.png' },
    { id: 17, username: 'arrax',        email: 'arrax@targaryen.com',        first_name: 'Arrax',        last_name: 'Targaryen', icon: 'icon-bin',           img: 'assets/language-flags/pl.png' },
    { id: 18, username: 'tyraxes',      email: 'tyraxes@targaryen.com',      first_name: 'Tyraxes',      last_name: 'Targaryen', icon: 'icon-shield',        img: 'assets/language-flags/pt.png' },
    { id: 19, username: 'moondancer',   email: 'moondancer@targaryen.com',   first_name: 'Moondancer',   last_name: 'Targaryen', icon: 'icon-switch',        img: 'assets/language-flags/sv.png' },
    { id: 20, username: 'stormcloud',   email: 'stormcloud@targaryen.com',   first_name: 'Stormcloud',   last_name: 'Targaryen', icon: 'icon-list',          img: 'assets/language-flags/tw.png' },
    { id: 21, username: 'morghul',      email: 'morghul@targaryen.com',      first_name: 'Morghul',      last_name: 'Targaryen', icon: 'icon-tree6',         img: 'assets/language-flags/us.png' },
    { id: 22, username: 'shrykos',      email: 'shrykos@targaryen.com',      first_name: 'Shrykos',      last_name: 'Targaryen', icon: 'icon-earth2',        img: 'assets/language-flags/zh.png' },
    { id: 23, username: 'greyghost',    email: 'greyghost@targaryen.com',    first_name: 'Greyghost',    last_name: 'Targaryen', icon2: 'icon-menu3',        img2: 'assets/language-flags/ca.png' },
    { id: 24, username: 'sheepstealer', email: 'sheepstealer@targaryen.com', first_name: 'Sheepstealer', last_name: 'Targaryen', icon: 'icon-link',          img: 'assets/language-flags/de.png' },
  ];
  mapUnmapExample;
  @ViewChild('emailAutocomplete', { static: true }) emailAutocomplete;
  selection;
  attendees = [];
  instanceEmail = `<jb-autocomplete #emailAutocomplete
  [(ngModel)]="selection"
  [jbList]="emailList"
  jbValidType="email"
  jbPlaceholder="Select/Type email"
  (jbSelect)="submit(selection, emailAutocomplete.isInvalid)"
></jb-autocomplete>

<jb-btn jbText="submit" jbType="secondary"
    [jbDisabled]="emailAutocomplete.isInvalid"
    (jbClick)="submit(selection, emailAutocomplete.isInvalid)">
</jb-btn>`;
// All the rest
  mapUnmapExampleUpdate(item?) { return `How to get the original object from the ngModel?

  mapUserList() {
    this.emailList = this.userList
    .map(item => (\`${item.username} <${item.email}>\`));
  }

  unmapUser(value) {
    const user = this.userList
    .find(item => value === \`${item.username} <${item.email}>\`);
    return !!user ? user : value;
  }`; }

  upComp() {
    const brStr = `\n`;
    const bsStr = `\n             `;
    this.customCompCode = `<jb-autocomplete `;

    let compClasses = '';
    if (this.compConf.hasFullWidth) { compClasses += (!!compClasses.length ? ' ' : '') + 'full-width'; }
    if (this.compConf.hasSquash)    { compClasses += (!!compClasses.length ? ' ' : '') + 'squash'; }
    if (!!compClasses) {
      this.customCompCode += `class="${compClasses}"` + bsStr;
    }
    this.customCompCode += `[(ngModel)]="stringSelected"` + bsStr;
    this.customCompCode += `[jbList]="stringList"`;

    if (this.compConf.hasLabel)   { this.customCompCode += bsStr + `jbLabel="${this.compConf.labelText}"`; }
    if (this.compConf.hasPlaceholder)   { this.customCompCode += bsStr + `jbPlaceholder="${this.compConf.placeholderText}"`; }
    if (this.compConf.isRequired) { this.customCompCode += bsStr + `[jbRequired]="true"`; }
    if (this.compConf.isDisabled) { this.customCompCode += bsStr + `[jbDisabled]="true"`; }

    if (this.compConf.hasTooltip) {
      this.customCompCode += bsStr + `jbTooltip="${this.compConf.tooltipText}"`;
      if (!!this.compConf.tooltipPos)  { this.customCompCode += bsStr + `jbTooltipPos="${this.compConf.tooltipPos}"`; }
      if (!!this.compConf.tooltipBody) { this.customCompCode += bsStr + `jbTooltipBody="${this.compConf.tooltipBody}"`; }
    }

    if (this.compConf.validType)    { this.customCompCode += bsStr + `jbValidType="${this.compConf.validType}"`; }

    if (this.compConf.minLength) {
      this.customCompCode += bsStr + `[jbMinLength]="${this.compConf.minLength}"`;
    }

    this.customCompCode += (`>` + brStr + `</jb-autocomplete>`);
  }

  mapUserList() {
    this.emailList = this.userList.map(item => (`${item.username} <${item.email}>`));
    this.mapUnmapExample = this.mapUnmapExampleUpdate({ username: '${item.username}', email: '${item.email}'});
  }

  unmapUser(value?) {
    const user = this.userList.find(item => value === `${item.username} <${item.email}>`);
    return !!user ? user : value;
  }

  submit(value, isInvalid) {
    if (isInvalid) {
      this.growl.error(`Comon! ${value} is not an email and you know it!`);
      setTimeout(() => {
        this.emailAutocomplete.focus();
      });
    } else {
      this.growl.success('Emitted value: ' + value);
      this.attendees.push(this.unmapUser(value));
      setTimeout(() => {
        this.selection = '';
        this.emailAutocomplete.focus();
      });
    }
  }

  constructor(private growl: JbGrowlService) { }

  ngOnInit() {
    this.mapUserList();
  }

}

export const jbAutocompleteDoc = {
  name    : `jb-autocomplete`,
  uiType  : 'component',
  desc    : `Generates a text input with an autocomplete helping layer`,
  api     : `[(ngModel)]: Where the selected string of the list is held
[jbList]: The list of the options (array of string)
[jbRequired]: Whether the input is required or not
[jbDisabled]: Disable the input
[jbDisabledTip]: If autocomplete is disabled, tooltip to display on hover (label)
[jbLabel]: If present it adds a label above the input
[jbPlaceholder]: The placeholder of the input field
[jbTooltip]: Add a badge next to the label with the tooltip to give more info
[jbTooltipPos]: If tooltip on the label, specific position (top by default)
[jbTooltipBody]: If tooltip on the label, whether it is appended on the body
[jbEmptyText]: When no suggestion are matched display a text (default: 'No results found')
[jbValidType]: Sets a default pattern: 'integer' | 'number' | 'decimal' | 'email'
[jbPattern]: custom jbPattern
[jbErrorOnPristine]: If true, validate on pristine,
(jbOnSelect): on selection or enter, emit value`,
  cssReset: `The scss variables are the same used for the jbDropdown because they must be aligned:
$dropdown-selection-bg: $quaternary_color !default;
$dropdown-selection-hover: $primary_color !default;
$dropdown-valid-color: $valid-color !default;`,
  instance: `<jb-autocomplete
 [(ngModel)]="selectedEmail"
 (ngModelChange)="onSelectEmail(selectedEmail)"
 (jbOnEnter)="onEnterEmail(selectedEmail)"
 [jbList]="emailList"
 jbValidType="email"
 jbLabel="Select/Type email"
 jbPlaceholder="Select/Type email"
></jb-autocomplete>`,
  demoComp: JbAutocompleteDemoComponent
};
