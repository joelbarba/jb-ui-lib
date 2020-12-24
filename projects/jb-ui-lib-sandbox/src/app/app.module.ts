import { BrowserModule } from '@angular/platform-browser';
import {InjectionToken, NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IndexPageComponent } from './index-page/index-page.component';
import {NgbPopoverModule, NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { JbUiLibModule } from '../../../jb-ui-lib/src/lib/jb-ui-lib.module';
import { JbBtnDemoComponent } from './jb-btn-demo/jb-btn-demo.component';
import { JbListHeaderColDemoComponent } from './jb-list-header-col-demo/jb-list-header-col-demo.component';
import { MenuComponent } from './menu/menu.component';
import { JbLabelDemoComponent } from './jb-label-demo/jb-label-demo.component';
import { JbListPlaceholderDemoComponent } from './jb-list-placeholder-demo/jb-list-placeholder-demo.component';
import { JbCheckboxDemoComponent } from './jb-checkbox-demo/jb-checkbox-demo.component';
import {JbTranslateLoader, JbTranslateService } from './translate.service';
import { JbInputDemoComponent } from './jb-input-demo/jb-input-demo.component';
import { JbDropdownDemoComponent } from './jb-dropdown-demo/jb-dropdown-demo.component';
import { JbSwitchDemoComponent } from './jb-switch-demo/jb-switch-demo.component';
import { JbQuantityInputDemoComponent } from './jb-quantity-input-demo/jb-quantity-input-demo.component';
import { JbGrowlDemoComponent } from './jb-growl-demo/jb-growl-demo.component';
import { JbConfirmDemoComponent } from './jb-confirm-demo/jb-confirm-demo.component';
import { JbTextareaDemoComponent } from './jb-textarea-demo/jb-textarea-demo.component';
import { JbRadioDemoComponent } from './jb-radio-demo/jb-radio-demo.component';
import { JbDatePickerDemoComponent } from './jb-date-picker-demo/jb-date-picker-demo.component';
import { JbListPaginatorDemoComponent } from './jb-list-paginator-demo/jb-list-paginator-demo.component';
import { JbPrototypesDemoComponent } from './jb-prototypes-demo/jb-prototypes-demo.component';
import { JbLoadingBarDemoComponent } from './jb-loading-bar-demo/jb-loading-bar-demo.component';
import { JbPromiseDemoComponent } from './jb-promise-demo/jb-promise-demo.component';
import { JbDeferDemoComponent } from './jb-defer-demo/jb-defer-demo.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { JbTimePickerDemoComponent } from './jb-time-picker-demo/jb-time-picker-demo.component';
import { JbAutocompleteDemoComponent } from './jb-autocomplete-demo/jb-autocomplete-demo.component';
import { JbMultiSelectorDemoComponent } from './jb-multi-selector-demo/jb-multi-selector-demo.component';
import { JbProgressBarDemoComponent } from './jb-progress-bar-demo/jb-progress-bar-demo.component';
import { JbStatusBadgeDemoComponent } from './jb-status-badge-demo/jb-status-badge-demo.component';
import { JbColorPickerDemoComponent } from './jb-color-picker-demo/jb-color-picker-demo.component';
import { JbSliderDemoComponent } from './jb-slider-demo/jb-slider-demo.component';
import { JbPagePlaceholderDemoComponent } from './jb-page-placeholder-demo/jb-page-placeholder-demo.component';
import {JbListHandlerDemoComponent} from './jb-list-handler-demo/jb-list-handler-demo.component';
import { JbLoadingSpinnerDemoComponent } from './jb-loading-spinner-demo/jb-loading-spinner-demo.component';
import { ShowDemoComponent } from './show-demo/show-demo.component';
import { JbNoDataDemoComponent } from './jb-no-data-demo/jb-no-data-demo.component';
import { JbDualCheckboxDemoComponent } from './jb-dual-checkbox-demo/jb-dual-checkbox-demo.component';
import { JbSectionHeaderDemoComponent } from './jb-section-header-demo/jb-section-header-demo.component';
import { JbRangeSliderDemoComponent } from './jb-range-slider-demo/jb-range-slider-demo.component';
import { JbModalHeaderDemoComponent } from './jb-modal-header-demo/jb-modal-header-demo.component';
import { JbModalDemoComponent } from './jb-modal-header-demo/jb-modal-demo/jb-modal-demo.component';
import {JbListHandlerTestComponent} from './jb-list-handler-demo/tests/jb-list-handler-test.component';
import { JbDndDemoComponent } from './jb-dnd-demo/jb-dnd-demo.component';
import {JbNoDataComponent} from '../../../jb-ui-lib/src/lib/jb-no-data/jb-no-data.component';
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
import { JbListCheckboxDemoComponent } from './jb-list-checkbox-demo/jb-list-checkbox-demo.component';
import {JbListSelectionDemoComponent} from './jb-list-selection-demo/jb-list-selection-demo.component';
import { JbLazyDropdownDemoComponent } from './jb-lazy-dropdown-demo/jb-lazy-dropdown-demo.component';
import { JbCollapseDemoComponent } from './jb-collapse-demo/jb-collapse-demo.component';
import { JbExpandableListDemoComponent } from './jb-expandable-list-demo/jb-expandable-list-demo.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IcomoonPageComponent} from './icomoon-page/icomoon-page.component';


@NgModule({
  declarations: [
    AppComponent,
    JbBtnDemoComponent,
    IndexPageComponent,
    IcomoonPageComponent,
    JbListHeaderColDemoComponent,
    MenuComponent,
    // TranslateDirective,
    JbLabelDemoComponent,
    JbListPlaceholderDemoComponent,
    JbCheckboxDemoComponent,
    JbDualCheckboxDemoComponent,
    JbInputDemoComponent,
    JbInputValidatorsDemoComponent,
    JbInputAsyncValidatorDemoComponent,
    JbInputAutofillDemoComponent,
    JbInputControlsDemoComponent,

    JbDropdownDemoComponent,
    JbSwitchDemoComponent,
    JbQuantityInputDemoComponent,
    JbGrowlDemoComponent,
    JbConfirmDemoComponent,
    JbTextareaDemoComponent,
    JbRadioDemoComponent,
    JbDatePickerDemoComponent,
    JbListPaginatorDemoComponent,
    JbPrototypesDemoComponent,
    JbLoadingBarDemoComponent,
    JbPromiseDemoComponent,
    JbDeferDemoComponent,
    JbListHandlerDemoComponent,
    JbTimePickerDemoComponent,
    JbAutocompleteDemoComponent,
    JbMultiSelectorDemoComponent,
    JbProgressBarDemoComponent,
    JbStatusBadgeDemoComponent,
    JbColorPickerDemoComponent,
    JbSliderDemoComponent,
    JbPagePlaceholderDemoComponent,
    JbLoadingSpinnerDemoComponent,
    ShowDemoComponent,
    JbNoDataDemoComponent,
    JbSectionHeaderDemoComponent,
    JbListHandlerTestComponent,
    JbRangeSliderDemoComponent,
    JbModalHeaderDemoComponent,
    JbModalDemoComponent,
    JbDndDemoComponent,
    JbDndDemo1Component,
    JbDndDemo2Component,
    JbDndDemo3Component,
    JbDndDemo4Component,
    JbDndDemo5Component,
    JbDndDemo6Component,
    JbListCheckboxDemoComponent,
    JbListSelectionDemoComponent,
    JbLazyDropdownDemoComponent,
    JbCollapseDemoComponent,
    JbExpandableListDemoComponent,
  ],
  entryComponents: [
    JbNoDataComponent,
    JbModalDemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbPopoverModule,
    NgbDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    JbUiLibModule.forRoot({
      trans: {
        useExisting: JbTranslateService
      }
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: JbTranslateLoader
      }
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
