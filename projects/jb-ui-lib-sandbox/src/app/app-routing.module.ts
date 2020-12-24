import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IndexPageComponent } from './index-page/index-page.component';
import * as docs from './doc-demos-list';
import {JbListHandlerTestComponent} from './jb-list-handler-demo/tests/jb-list-handler-test.component';
import {JbDndDemo1Component} from './jb-dnd-demo/example1/jb-dnd-demo-1.component';
import {JbDndDemo2Component} from './jb-dnd-demo/example2/jb-dnd-demo-2.component';
import {JbDndDemo3Component} from './jb-dnd-demo/example3/jb-dnd-demo-3.component';
import {JbDndDemo4Component} from './jb-dnd-demo/example4/jb-dnd-demo-4.component';
import {JbDndDemo5Component} from './jb-dnd-demo/example5/jb-dnd-demo-5.component';
import {JbDndDemo6Component} from './jb-dnd-demo/example6/jb-dnd-demo-6.component';
import {JbInputValidatorsDemoComponent} from './jb-input-demo/ex1-validators/jb-input-validators-demo.component';
import {JbInputAsyncValidatorDemoComponent} from './jb-input-demo/ex2-async-validation/jb-input-async-validator-demo.component';
import {JbInputControlsDemoComponent} from './jb-input-demo/ex3-controls/jb-input-controls-demo.component';
import {JbInputAutofillDemoComponent} from './jb-input-demo/ex4-autofill/jb-input-autofill-demo.component';
import {IcomoonPageComponent} from './icomoon-page/icomoon-page.component';


const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index',  component: IndexPageComponent },
  { path: 'icomoon',  component: IcomoonPageComponent },
  { path: docs.jbBtnDoc.name,               component: docs.jbBtnDoc.demoComp              },
  { path: docs.jbLabelDoc.name,             component: docs.jbLabelDoc.demoComp            },
  { path: docs.jbInputDoc.name,             component: docs.jbInputDoc.demoComp            },
  { path: 'jb-input/validators',      component: JbInputValidatorsDemoComponent      },
  { path: 'jb-input/async-validator', component: JbInputAsyncValidatorDemoComponent  },
  { path: 'jb-input/controls',        component: JbInputControlsDemoComponent  },
  { path: 'jb-input/autofill',        component: JbInputAutofillDemoComponent  },

  { path: docs.jbTextareaDoc.name,          component: docs.jbTextareaDoc.demoComp         },
  { path: docs.jbDropdownDoc.name,          component: docs.jbDropdownDoc.demoComp         },
  { path: docs.jbLazyDropdownDoc.name,      component: docs.jbLazyDropdownDoc.demoComp     },
  { path: docs.jbAutocompleteDoc.name,      component: docs.jbAutocompleteDoc.demoComp     },
  { path: docs.jbMultiSelectorDoc.name,     component: docs.jbMultiSelectorDoc.demoComp    },
  { path: docs.jbSwitchDoc.name,            component: docs.jbSwitchDoc.demoComp           },
  { path: docs.jbCheckboxDoc.name,          component: docs.jbCheckboxDoc.demoComp         },
  { path: docs.jbDualCheckboxDoc.name,      component: docs.jbDualCheckboxDoc.demoComp     },
  { path: docs.jbRadioDoc.name,             component: docs.jbRadioDoc.demoComp            },
  { path: docs.jbQuantityInputDoc.name,     component: docs.jbQuantityInputDoc.demoComp    },
  { path: docs.jbDatePickerDoc.name,        component: docs.jbDatePickerDoc.demoComp       },
  { path: docs.jbTimePickerDoc.name,        component: docs.jbTimePickerDoc.demoComp       },
  { path: docs.jbSliderDoc.name,            component: docs.jbSliderDoc.demoComp           },
  { path: docs.jbRangeSliderDoc.name,       component: docs.jbRangeSliderDoc.demoComp      },
  { path: docs.jbColorPickerDoc.name,       component: docs.jbColorPickerDoc.demoComp      },
  { path: docs.jbStatusBadgeDoc.name,       component: docs.jbStatusBadgeDoc.demoComp      },
  { path: docs.jbProgressBarDoc.name,       component: docs.jbProgressBarDoc.demoComp      },
  { path: docs.jbListHeaderColDoc.name,     component: docs.jbListHeaderColDoc.demoComp    },
  { path: docs.jbListPlaceholderDoc.name,   component: docs.jbListPlaceholderDoc.demoComp  },
  { path: docs.jbPagePlaceholderDoc.name,   component: docs.jbPagePlaceholderDoc.demoComp  },
  { path: docs.jbListPaginatorDoc.name,     component: docs.jbListPaginatorDoc.demoComp    },
  { path: docs.jbListCheckboxDoc.name,      component: docs.jbListCheckboxDoc.demoComp     },
  { path: docs.jbNoDataDoc.name,            component: docs.jbNoDataDoc.demoComp           },
  { path: docs.jbModalHeaderDoc.name,       component: docs.jbModalHeaderDoc.demoComp      },
  { path: docs.jbLoadingSpinnerDoc.name,    component: docs.jbLoadingSpinnerDoc.demoComp   },
  { path: docs.jbSectionHeaderDoc.name,     component: docs.jbSectionHeaderDoc.demoComp    },
  { path: docs.ShowDoc.name,                component: docs.ShowDoc.demoComp               },
  { path: docs.jbGrowlDoc.name,             component: docs.jbGrowlDoc.demoComp            },
  { path: docs.jbLoadingBarDoc.name,        component: docs.jbLoadingBarDoc.demoComp       },
  { path: docs.jbConfirmDoc.name,           component: docs.jbConfirmDoc.demoComp          },
  { path: docs.jbPrototypesDoc.name,        component: docs.jbPrototypesDoc.demoComp       },
  { path: docs.jbListSelectionDoc.name,     component: docs.jbListSelectionDoc.demoComp    },
  { path: docs.jbPromiseDoc.name,           component: docs.jbPromiseDoc.demoComp          },
  { path: docs.jbDeferDoc.name,             component: docs.jbDeferDoc.demoComp            },
  { path: docs.jbCollapseDoc.name,          component: docs.jbCollapseDoc.demoComp         },
  { path: docs.jbExpandableListDoc.name,    component: docs.jbExpandableListDoc.demoComp   },

  { path: docs.jbDndDemoDoc.name,           component: docs.jbDndDemoDoc.demoComp          },
  { path: 'jbDnD/example1',                 component: JbDndDemo1Component                 },
  { path: 'jbDnD/example2',                 component: JbDndDemo2Component                 },
  { path: 'jbDnD/example3',                 component: JbDndDemo3Component                 },
  { path: 'jbDnD/example4',                 component: JbDndDemo4Component                 },
  { path: 'jbDnD/example5',                 component: JbDndDemo5Component                 },
  { path: 'jbDnD/example6',                 component: JbDndDemo6Component                 },

  { path: docs.jbListHandlerDoc.name,       component: docs.jbListHandlerDoc.demoComp      },
  { path: 'list-test',                      component: JbListHandlerTestComponent          },

  { path: 'lazy-loading-test',
    loadChildren: () => import('projects/jb-ui-lib-sandbox/src/app/jb-lazy-loaded-module/jb-lazy-loaded.module')
      .then(mod => {
        return mod.JbLazyLoadedModule;
      }),
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
