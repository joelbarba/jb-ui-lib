import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { JbGrowlService } from 'projects/jb-ui-lib/src/lib/jb-growl/jb-growl.service';

@Component({
  selector: 'app-jb-btn-demo',
  templateUrl: './jb-btn-demo.component.html',
  styleUrls: ['./jb-btn-demo.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JbBtnDemoComponent implements OnInit {
  public name = jbBtnDoc.name;
  public desc = jbBtnDoc.desc;
  public blockPr;
  public api = jbBtnDoc.api;
  public instance = jbBtnDoc.instance;

  public instance2 = `<jb-btn jbText="Add User"  (jbClick)="myFunc($event)" [jbDisabled]="false"></jb-btn>
<jb-btn jbText="Save User" (jbClick)="myFunc($event)" [jbDisabled]="true"></jb-btn>`;

  public instance3 = `<jb-btn jbText="Add User" jbIcon="icon-eye" (jbClick)="myFunc($event)"></jb-btn>
<jb-btn jbText="Add Item" jbIcon="icon-plus" jbType="quaternary"></jb-btn>`;

  public instance4 = `<jb-btn jbType="save"    jbText="Save User"   (jbClick)="myFunc($event)"></jb-btn>
<jb-btn jbType="add"     jbText="Add User"    (jbClick)="myFunc($event)"></jb-btn>
<jb-btn jbType="delete"  jbText="Delete User" (jbClick)="myFunc($event)"></jb-btn>
<jb-btn jbType="cancel"  jbText="Cancel"      (jbClick)="myFunc($event)"></jb-btn>
<jb-btn class="squash" jbType="expand"></jb-btn>
<jb-btn class="squash" jbType="collapse"></jb-btn>
`;
  public instance5 = `<jb-btn jbText="Primary"    jbType="primary"    jbIcon="icon-arrow-right3"> </jb-btn>
<jb-btn jbText="Secondary"  jbType="secondary"  jbIcon="icon-plus">         </jb-btn>
<jb-btn jbText="Tertiary"   jbType="tertiary"   jbIcon="icon-pencil">       </jb-btn>
<jb-btn jbText="Quaternary" jbType="quaternary" jbIcon="icon-blocked">      </jb-btn>
<jb-btn jbText="Warning"    jbType="warning"    jbIcon="icon-cross">        </jb-btn>
<jb-btn jbText="Extra"      jbType="extra"      jbIcon="icon-arrow-down3">  </jb-btn>`;

public instance6 = `<jb-btn jbText="Simple Tooltip" jbTooltip="Hello World"></jb-btn>
<jb-btn jbText="Better tooltip" jbTooltip="Hey" jbTooltipPos="left" [jbTooltipBody]="true"></jb-btn>`;

public asyncExample1 = `<jb-btn jbText="Async Click Option 1"
        [jbAsyncPromise]="blockPr"
        (jbClick)="blockPr = asyncClickFunc('myValue', desc)">
</jb-btn>`;

public asyncExample2 = `<jb-btn jbText="Async Click Option 2"
        [jbAsyncClick]="asyncClickFunc.bind(this, 'myValue2', desc)">
</jb-btn>`;


public cssReset = `@import 'jb-ui-lib/scss/jb-btn';
jb-btn.yellow-btn { @include custom-btn-color(green, black); }`;

public squashExample = `<jb-btn class="squash" jbType="expand"></jb-btn>`;
public fullWidthExample = `<jb-btn class="full-width" jbText="Full Width Button"></jb-btn>`;


public toggleExample = `<jb-btn class="toggle" [(jbToggle)]="isExp"></jb-btn>`;

  public brStr = `
`;
  public bsStr = `
        `;
  public count = '';
  public customBtnCode = '<jb-btn (jbClick)="myFunc($event)"></jb-btn>';
  public btnTypes = [
    { id: 'search',       text: 'search',       icon: 'icon-search' },
    { id: 'add',          text: 'add',          icon: 'icon-plus' },
    { id: 'edit',         text: 'edit',         icon: 'icon-pencil' },
    { id: 'save',         text: 'save',         icon: 'icon-arrow-right3' },

    { id: 'delete',       text: 'delete',       icon: 'icon-bin' },
    { id: 'view',         text: 'view',         icon: 'icon-eye' },
    { id: 'update',       text: 'update',       icon: 'icon-arrow-right3' },
    { id: 'cancel',       text: 'cancel',       icon: 'icon-blocked' },

    { id: 'upload',       text: 'upload',       icon: 'icon-upload5' },
    { id: 'download',     text: 'download',     icon: 'icon-download52' },
    { id: 'reset',        text: 'reset',        icon: 'icon-blocked' },
    { id: 'refresh',      text: 'refresh',      icon: 'icon-loop2' },

    { id: 'next',         text: 'next',         icon: 'icon-arrow-right3' },
    { id: 'prev',         text: 'prev',         icon: 'icon-arrow-left6' },
    { id: 'expand',       text: 'expand',       icon: 'icon-arrow-down3' },
    { id: 'collapse',     text: 'collapse',     icon: 'icon-arrow-up3' },

    { id: 'back',         text: 'back',         icon: 'icon-undo2' },
    { id: 'copy',         text: 'copy',         icon: 'icon-files-empty' },
    { id: 'menu',         text: 'menu',         icon: 'icon-menu5' },

    { id: 'primary',      text: 'primary',    },
    { id: 'secondary',    text: 'secondary',  },
    { id: 'tertiary',     text: 'tertiary',   },
    { id: 'quaternary',   text: 'quaternary', },
    { id: 'warning',      text: 'warning',    },
    { id: 'extra',        text: 'extra',      },
  ];

  public btnIcons = [
    { icon: 'icon-pencil'        },
    { icon: 'icon-eye'           },
    { icon: 'icon-arrow-right3'  },
    { icon: 'icon-arrow-left6'   },
    { icon: 'icon-plus'          },
    { icon: 'icon-minus'         },
    { icon: 'icon-cross'         },
    { icon: 'icon-blocked'       },
    { icon: 'icon-arrow-down3'   },
    { icon: 'icon-arrow-up3'     },
    { icon: 'icon-users4'        },
    { icon: 'icon-undo2'         },
    { icon: 'icon-volume-high'   },
    { icon: 'icon-first2'        },
    { icon: 'icon-last2'         },
    { icon: 'icon-download5'     },
    { icon: 'icon-upload5'       },
    { icon: 'icon-home'          },
    { icon: 'icon-office'        },
    { icon: 'icon-phone2'        },
    { icon: 'icon-bell2'         },
    { icon: 'icon-user'          },
    { icon: 'icon-users'         },
    { icon: 'icon-lock'          },
    { icon: 'icon-cog'           },
    { icon: 'icon-bin'           },
    { icon: 'icon-shield'        },
    { icon: 'icon-switch'        },
    { icon: 'icon-list'          },
    { icon: 'icon-tree6'         },
    { icon: 'icon-menu3'         },
    { icon: 'icon-earth2'        },
    { icon: 'icon-link'          },
    { icon: 'icon-star-full'     },
    { icon: 'icon-thumbs-up'     },
    { icon: 'icon-notification2' },
    { icon: 'icon-warning2'      },
    { icon: 'icon-checkmark'     },
    { icon: 'icon-square'        },
    { icon: 'icon-circle2'       },
    { icon: 'icon-loop3'         },
    { icon: 'icon-spell-check'   },
    { icon: 'icon-spinner11'     },
  ];
  public btnTooltipPoss = [
    { id: 'top',        text: 'top'    },
    { id: 'right',      text: 'right'  },
    { id: 'bottom',     text: 'bottom' },
    { id: 'left',       text: 'left'   },
  ];
  public btnTooltipBody = [
    { id: 'true',       text: 'true'   },
    { id: 'false',      text: 'false'  },
  ];
  public btnConf: any = {
    hasText: false, btnText: 'Click Me',
    hasType: false, btnType: 'primary',
    hasIcon: false, btnIcon: 'icon-plus',
    isDisabled: false,
    iconPos: 'right',
    hasTooltip: false, btnTooltip: 'Hello World', btnTooltipPos: null, btnTooltipBody: false,
    btnDisabledTip: '',
    hasToggle: false, toggleValue: undefined,
    cssPrimary: false, cssSecondary: false, cssTertiary: false, cssQuaternary: false, cssExtra: false, cssWarning: false,
  };
  public res;
  public asyncClickFunc(param1, param2) {
    return new Promise((resolve) => {
      setTimeout(resolve, 4000);
    });
  }
  public customBtnFunc() { this.res = ('Click at ' + new Date()); }
  public upBtn() {
    this.customBtnCode = `<jb-btn `;

    let btnClasses = '';
    if (this.btnConf.hasFullWidth) { btnClasses = 'full-width'; }
    if (this.btnConf.hasSquash)     { if (!!btnClasses) { btnClasses += ' '; } btnClasses += 'squash'; }
    if (this.btnConf.hasEllipsis)   { if (!!btnClasses) { btnClasses += ' '; } btnClasses += 'ellipsis'; }
    if (this.btnConf.cssPrimary)    { if (!!btnClasses) { btnClasses += ' '; } btnClasses += 'Primary'; }
    if (this.btnConf.cssSecondary)  { if (!!btnClasses) { btnClasses += ' '; } btnClasses += 'Secondary'; }
    if (this.btnConf.cssTertiary)   { if (!!btnClasses) { btnClasses += ' '; } btnClasses += 'Tertiary'; }
    if (this.btnConf.cssQuaternary) { if (!!btnClasses) { btnClasses += ' '; } btnClasses += 'Quaternary'; }
    if (this.btnConf.cssExtra)      { if (!!btnClasses) { btnClasses += ' '; } btnClasses += 'Extra'; }
    if (this.btnConf.cssWarning)    { if (!!btnClasses) { btnClasses += ' '; } btnClasses += 'Warning'; }
    if (!!btnClasses) {
      this.customBtnCode += `class="${btnClasses}"` + this.bsStr;
    }

    if (this.btnConf.hasAsync1) {
      this.customBtnCode += `[jbAsyncClick]="myFunc.bind(this, 'myValue2', desc)"`;
    } else {
      if (this.btnConf.hasAsync2) {
        this.customBtnCode += `[jbAsyncPromise]="blockPr"` + this.bsStr;
        this.customBtnCode += `(jbClick)="blockPr = myFunc('myValue', desc)"`;
      } else {
        this.customBtnCode += `(jbClick)="myFunc($event)"`;
      }
    }

    if (this.btnConf.hasText) { this.customBtnCode += this.bsStr + ` jbText="${this.btnConf.btnText}"`; }
    if (this.btnConf.hasType) { this.customBtnCode += this.bsStr + ` jbType="${this.btnConf.btnType}"`; }
    if (this.btnConf.hasIcon) {
      if (!!this.btnConf.btnIcon) {
               this.customBtnCode += this.bsStr + ` jbIcon="${this.btnConf.btnIcon}"`;
      } else { this.customBtnCode += this.bsStr + ` jbIcon=""`; }
    }
    if (this.btnConf.iconPos !== 'right') { this.customBtnCode += this.bsStr + ` jbIconPos="${this.btnConf.iconPos}"`; }
    if (this.btnConf.isDisabled) { this.customBtnCode += this.bsStr + `[jbDisabled]="true"`; }

    if (!!this.btnConf.btnDisabledTip) { this.customBtnCode += this.bsStr + ` jbDisabledTip="${this.btnConf.btnDisabledTip}"`; }

    if (this.btnConf.hasTooltip) {
      this.customBtnCode += this.bsStr + ` jbTooltip="${this.btnConf.btnTooltip}"`;
      if (!!this.btnConf.btnTooltipPos) {
        this.customBtnCode += this.bsStr + ` jbTooltipPos="${this.btnConf.btnTooltipPos}"`;
      }
      if (!!this.btnConf.btnTooltipBody) {
        this.customBtnCode += this.bsStr + ` jbTooltipBody="${this.btnConf.btnTooltipBody}"`;
      }

    }

    this.customBtnCode += (`>` + this.brStr + `</jb-btn>`);
  }


  constructor(public growl: JbGrowlService) { }
  ngOnInit() {
    this.upBtn();
  }

  public getBtnInst = (jbType) => `<jb-btn jbType="${jbType}"></jb-btn>`;

  public asyncClick() {
    return this.blockPr = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 5000);
    });
  }
}





export const jbBtnDoc = {
  name    : `jb-btn`,
  desc    : `Generates a button.`,
  uiType  : 'component',
  api     : `(jbClick) : Click event handler
[jbAsyncPromise] : For async tasks, promise to block all buttons until the task is completed.
[jbAsyncClick]   : Click callback function. Instead of using the (jbClick) output, it is also possible to pass a callback function. The return promise is automatically caught.
[jbText]         : Text of the button
[jbType]         : Customized type for the button. It predefines the color, icon and text (for some). In case of using just the icon version, suffix it with '-icon'.
[jbIcon]         : Icon of the button (icomoon class)
[jbIconPos]      : Position of the icon (left / right)
[jbDisabled]     : True=Button is disabled, False=Enabled
[jbTooltip]      : If label provided, adds a tooltip on the button (automatically translated)
[jbTooltipPos]   : Position of the tooltip (top by default)
[jbTooltipBody]  : Whether the tooltip is append to the body (default true) or next the the html element (false). The parent container may affect the visibility of the tooltip
[jbDisabledTip]  : Tooltip text to be displayed when the button is disabled (useful to give tips about why it's disabled)
[(jbToggle)]     : Boolean flag to use the button as a toggle. Logic is held internally (also default arrow icons)
`,
  instance: `<jb-btn jbType="edit" (jbClick)="myFunc($event)"></jb-btn>`,
  demoComp: JbBtnDemoComponent
};
