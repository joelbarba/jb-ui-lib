import {NgModule, ModuleWithProviders, Optional, SkipSelf} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPopoverModule, NgbTooltipModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule, NgbActiveModal, NgbModalModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

// Modules
import { JbGrowlModule } from './jb-growl/jb-growl.module';
import { JbLoadingBarModule } from './jb-loading-bar/jb-loading-bar.module';
import { JbDnDModule } from './jb-dnd/jb-dnd.module';

// Services
import { JbConfirmService } from './jb-confirm/jb-confirm.service';

// Components
import { JbBtnComponent } from './jb-btn/jb-btn.component';
import { JbListHeaderColComponent } from './jb-list-header-col/jb-list-header-col.component';
import { JbLabelComponent } from './jb-label/jb-label.component';
import { JbListPlaceholderComponent } from './jb-list-placeholder/jb-list-placeholder.component';
import { JbCheckboxComponent } from './jb-checkbox/jb-checkbox.component';
import { JbDualCheckboxComponent } from './jb-dual-checkbox/jb-dual-checkbox.component';
import { JbInputComponent } from './jb-input/jb-input.component';
import { JbDropdownComponent } from './jb-dropdown/jb-dropdown.component';
import { JbSwitchComponent } from './jb-switch/jb-switch.component';
import { JbQuantityInputComponent } from './jb-quantity-input/jb-quantity-input.component';
import { JbConfirmComponent } from './jb-confirm/jb-confirm.component';
import { JbTextareaComponent } from './jb-textarea/jb-textarea.component';
import { JbRadioComponent } from './jb-radio/jb-radio.component';
import { JbDatePickerComponent } from './jb-date-picker/jb-date-picker.component';
import { JbListPaginatorComponent } from './jb-list-paginator/jb-list-paginator.component';
import {CommonModule} from '@angular/common';
import {JbTranslatePipe, JbUiLibTransService} from './abstract-translate.service';
import { JbTimePickerComponent } from './jb-time-picker/jb-time-picker.component';
import { JbAutocompleteComponent } from './jb-autocomplete/jb-autocomplete.component';
import { JbMultiSelectorComponent } from './jb-multi-selector/jb-multi-selector.component';
import { JbProgressBarComponent } from './jb-progress-bar/jb-progress-bar.component';
import { JbStatusBadgeComponent } from './jb-status-badge/jb-status-badge.component';
import { JbColorPickerComponent } from './jb-color-picker/jb-color-picker.component';
import { JbSliderComponent } from './jb-slider/jb-slider.component';
import { JbPagePlaceholderComponent } from './jb-page-placeholder/jb-page-placeholder.component';
import {JbLoadingSpinnerComponent, JbLoadingSpinnerDirective} from './jb-loading-spinner/jb-loading-spinner.component';
import { ShowDirective } from './show/show.component';
import { JbNoDataComponent } from './jb-no-data/jb-no-data.component';
import { Ng5SliderModule } from 'ng5-slider';
import { JbSectionHeaderComponent } from './jb-section-header/jb-section-header.component';
import { JbRangeSliderComponent } from './jb-range-slider/jb-range-slider.component';
import { JbModalHeaderComponent } from './jb-modal-header/jb-modal-header.component';
import { JbListCheckboxComponent } from './jb-list-checkbox/jb-list-checkbox.component';
import { JbLazyDropdownComponent } from './jb-lazy-dropdown/jb-lazy-dropdown.component';
import { JbCollapseComponent } from './jb-collapse/jb-collapse.component';
import { JbExpandableListComponent } from './jb-expandable-list/jb-expandable-list.component';

@NgModule({
  declarations: [
    JbTranslatePipe,  // Internal

    JbBtnComponent,
    JbListHeaderColComponent,
    JbLabelComponent,
    JbListPlaceholderComponent,
    JbCheckboxComponent,
    JbDualCheckboxComponent,
    JbInputComponent,
    JbDropdownComponent,
    JbSwitchComponent,
    JbQuantityInputComponent,
    JbConfirmComponent,
    JbTextareaComponent,
    JbRadioComponent,
    JbDatePickerComponent,
    JbListPaginatorComponent,
    JbTimePickerComponent,
    JbAutocompleteComponent,
    JbMultiSelectorComponent,
    JbProgressBarComponent,
    JbStatusBadgeComponent,
    JbColorPickerComponent,
    JbSliderComponent,
    JbPagePlaceholderComponent,
    JbLoadingSpinnerComponent,
    JbLoadingSpinnerDirective,
    ShowDirective,
    JbNoDataComponent,
    JbSectionHeaderComponent,
    JbRangeSliderComponent,
    JbModalHeaderComponent,
    JbListCheckboxComponent,
    JbLazyDropdownComponent,
    JbCollapseComponent,
    JbExpandableListComponent,
  ],
  entryComponents: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPopoverModule,
    NgbTooltipModule,
    NgbProgressbarModule,
    NgbModalModule,
    JbGrowlModule,
    JbDnDModule,
    JbLoadingBarModule,
    NgbDatepickerModule,
    NgbModule,
    Ng5SliderModule,
  ],
  exports: [
    JbExpandableListComponent,  // <--- New component
    JbCollapseComponent,  // <--- New component
    JbListCheckboxComponent,
    JbLazyDropdownComponent,
    JbColorPickerComponent,
    JbModalHeaderComponent,
    JbSectionHeaderComponent,
    JbRangeSliderComponent,
    JbNoDataComponent,
    ShowDirective,
    JbLoadingSpinnerDirective,
    JbLoadingSpinnerComponent,
    JbPagePlaceholderComponent,
    JbSliderComponent,
    JbStatusBadgeComponent,
    JbProgressBarComponent,
    JbMultiSelectorComponent,
    JbAutocompleteComponent,
    JbTimePickerComponent,
    FormsModule,
    JbListPaginatorComponent,
    JbDatePickerComponent,
    JbRadioComponent,
    JbTextareaComponent,
    JbConfirmComponent,
    JbQuantityInputComponent,
    JbSwitchComponent,
    JbDropdownComponent,
    JbInputComponent,
    JbCheckboxComponent,
    JbDualCheckboxComponent,
    JbListPlaceholderComponent,
    JbLabelComponent,
    JbBtnComponent,
    JbListHeaderColComponent,
    JbRangeSliderComponent,
    JbGrowlModule,
    JbLoadingBarModule,
    JbDnDModule
  ]
})
export class JbUiLibModule {
  constructor(@Optional() @SkipSelf() parentModule: JbUiLibModule) {
    if (parentModule) {
      // It's not a bad developer, could be a lazy loaded module
      // throw new Error('HEY YOU BAD DEVELOPER!!! JbUiLibModule is already loaded');
    }
  }

  static forRoot(config): ModuleWithProviders<JbUiLibModule> {
    return {
      ngModule: JbUiLibModule,
      providers: [
        // { provide: 'JbUiLibTransService', ...config.trans },
        { provide: JbUiLibTransService, useExisting: config.trans.useExisting },
        // { provide: MY_SERVICE_TOKEN, useExisting: config.trans.useExisting },
        JbConfirmService,
        NgbActiveModal,
        NgbModule,
      ]
    };
  }
}
