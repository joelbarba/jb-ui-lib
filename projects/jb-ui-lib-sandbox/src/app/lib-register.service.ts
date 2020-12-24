import { jbLazyDropdownDoc } from './jb-lazy-dropdown-demo/jb-lazy-dropdown-demo.component';
import { Injectable } from '@angular/core';
import * as docs from './doc-demos-list';
export const compList = [
  docs.jbBtnDoc,
  docs.jbLabelDoc,
  docs.jbInputDoc,
  docs.jbTextareaDoc,
  docs.jbDropdownDoc,
  docs.jbAutocompleteDoc,
  docs.jbMultiSelectorDoc,
  jbLazyDropdownDoc,
  docs.jbSwitchDoc,
  docs.jbCheckboxDoc,
  docs.jbDualCheckboxDoc,
  docs.jbRadioDoc,
  docs.jbQuantityInputDoc,
  docs.jbDatePickerDoc,
  docs.jbTimePickerDoc,
  docs.jbSliderDoc,
  docs.jbRangeSliderDoc,
  docs.jbStatusBadgeDoc,
  docs.jbProgressBarDoc,
  docs.jbListHeaderColDoc,
  docs.jbListPaginatorDoc,
  docs.jbListCheckboxDoc,
  docs.jbListPlaceholderDoc,
  docs.jbPagePlaceholderDoc,
  docs.jbNoDataDoc,
  docs.jbLoadingSpinnerDoc,
  docs.jbSectionHeaderDoc,
  docs.jbModalHeaderDoc,
  docs.jbColorPickerDoc,
  docs.jbExpandableListDoc,
  docs.jbCollapseDoc,
  docs.ShowDoc,
  docs.jbGrowlDoc,
  docs.jbLoadingBarDoc,
  docs.jbDndDemoDoc,
  docs.jbConfirmDoc,
  docs.jbPrototypesDoc,
  docs.jbListHandlerDoc,
  docs.jbListSelectionDoc,
  docs.jbPromiseDoc,
  docs.jbDeferDoc,
];


/* {
  name     : 'jb-list-header-col',
  api      : '...',
  instance : '<jb-list-header-col></jb-list-header-col>',
  demoComp : JbBtnDemoComponent
} */

@Injectable({ providedIn: 'root' })
export class LibRegisterService {
  public compList = compList;
  constructor() {  }
}
