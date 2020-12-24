import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JbUiLibTransService } from '../abstract-translate.service';
import {JbArray} from '../jb-prototypes/jb-prototypes';

@Component({
  selector: 'jb-btn',
  templateUrl: './jb-btn.component.html',
})
export class JbBtnComponent implements OnInit, OnChanges {
  @Input() jbAsyncPromise: Promise<any>;
  @Input() jbAsyncClick;

  @Output() jbClick = new EventEmitter<any>();
  @Input() jbText: string;
  @Input() jbType = ''; // save, update, add, delete, cancel
  @Input() jbIcon: string;
  @Input() jbIconPos      = 'right';
  @Input() jbDisabled     = false;
  @Input() jbTooltip      = '';
  @Input() jbTooltipPos   = 'top';
  @Input() jbTooltipBody  = true;
  @Input() jbDisabledTip  = '';

  @Input() jbToggle = false;
  @Output() jbToggleChange = new EventEmitter<boolean>();

  public btnClass = 'primary';
  public textLabel: string;  // Internal label to display (can be either from jbText or defaulted from jbType)
  public btnIcon: string;    // Internal icon to display (usually from jbIcon)
  public typeIcon: string;   // Default button icon preset by jbType

  public jbTextTrans$: Observable<string> = of('');        // Translated text for the button
  public jbTooltipTrans$: Observable<string> = of('');     // Translated text for the tooltip of the label
  public jbDisabledTipTrans$: Observable<string> = of(''); // Translated text for the tooltip when disabled

  public isToggle = false;  // Whether the button is used as a toggle
  public isLoading = false;

  constructor(
    private translate: JbUiLibTransService,
  ) { }

  ngOnChanges(changes) {
    if (changes.hasOwnProperty('jbToggle') && this.jbToggle !== null) { this.isToggle = true; }

    if (changes.hasOwnProperty('jbType')) {
      if (!!this.jbType) { this.btnClass = this.jbType; }
      let typeText = '';
      const onlyIcon = JbArray.getLast.call((this.jbType || '').split('-')) === 'icon';
      const jbType = (this.jbType || '').split('-icon')[0]; // Remove -icon suffix

      if (jbType === 'search')   { this.btnClass = 'primary';    this.typeIcon = 'icon-search';         typeText = 'view.common.search';  }
      if (jbType === 'edit')     { this.btnClass = 'primary';    this.typeIcon = 'icon-pencil';         typeText = 'view.common.edit';    }
      if (jbType === 'save')     { this.btnClass = 'primary';    this.typeIcon = 'icon-checkmark';      typeText = 'view.common.save';    }
      if (jbType === 'update')   { this.btnClass = 'primary';    this.typeIcon = 'icon-arrow-right3';   typeText = 'views.common.update'; }
      if (jbType === 'add')      { this.btnClass = 'primary';    this.typeIcon = 'icon-plus';           typeText = 'view.common.add';     }
      if (jbType === 'delete')   { this.btnClass = 'tertiary';   this.typeIcon = 'icon-bin';            typeText = 'view.common.delete';  }
      if (jbType === 'cancel')   { this.btnClass = 'secondary';  this.typeIcon = 'icon-blocked';        typeText = 'view.common.cancel';  }
      if (jbType === 'view')     { this.btnClass = 'primary';    this.typeIcon = 'icon-eye';            typeText = 'view.common.view'; }
      if (jbType === 'prev')     { this.btnClass = 'quaternary'; this.typeIcon = 'icon-arrow-left6';    typeText = 'view.common.previous'; }
      if (jbType === 'next')     { this.btnClass = 'primary';    this.typeIcon = 'icon-arrow-right3';   typeText = 'view.common.next'; }
      if (jbType === 'download') { this.btnClass = 'primary';    this.typeIcon = 'icon-download52';     typeText = 'view.common.download'; }
      if (jbType === 'upload')   { this.btnClass = 'primary';    this.typeIcon = 'icon-upload5';        typeText = 'view.common.upload'; }
      if (jbType === 'reset')    { this.btnClass = 'secondary';  this.typeIcon = 'icon-blocked';        typeText = 'view.common.resetFilters'; }
      if (jbType === 'refresh')  { this.btnClass = 'primary';    this.typeIcon = 'icon-loop2';          typeText = 'view.common.refresh'; }

      if (jbType === 'expand')   { this.btnClass = 'secondary'; this.typeIcon = 'icon-arrow-down3'; }
      if (jbType === 'collapse') { this.btnClass = 'secondary'; this.typeIcon = 'icon-arrow-up3'; }
      if (jbType === 'copy')     { this.btnClass = 'secondary'; this.typeIcon = 'icon-files-empty'; }
      if (jbType === 'menu')     { this.btnClass = 'secondary'; this.typeIcon = 'icon-menu5'; }

      if (this.jbType === 'back') { this.btnClass = 'primary'; this.typeIcon = 'icon-undo2'; this.jbIconPos = 'left'; }

      if (!this.jbText && !onlyIcon) {
        this.textLabel = typeText;
        this.jbTextTrans$ = this.translate.getLabel$(this.textLabel);
      }
    }

    // Generate new observables for the dynamic text
    if (changes.hasOwnProperty('jbText')) {
      this.textLabel = this.jbText;
      this.jbTextTrans$ = this.translate.getLabel$(this.textLabel);
    }
    if (changes.hasOwnProperty('jbTooltip'))     { this.jbTooltipTrans$     = this.translate.getLabel$(this.jbTooltip); }
    if (changes.hasOwnProperty('jbDisabledTip')) { this.jbDisabledTipTrans$ = this.translate.getLabel$(this.jbDisabledTip); }


    // If new async blocking promise, block buttons until that is resolved
    if (changes.hasOwnProperty('jbAsyncPromise')) {
      this.initLoadingPromise();
    }

    this.setDefaultIcon();
  }

  ngOnInit() {
    if (!this.btnIcon) { this.setDefaultIcon(); }
  }

  private setDefaultIcon = () => {

    if (this.jbIcon) {
      this.btnIcon = this.jbIcon;

    } else if (this.isToggle) {
      this.btnIcon = this.jbToggle ? 'icon-arrow-up3' : 'icon-arrow-down3';

    } else if (!!this.typeIcon) {
      this.btnIcon = this.typeIcon;

    } else if (!this.textLabel) {
      this.btnIcon = 'icon-arrow-right3';

    } else {
      this.btnIcon = null;
    }
  };


  private initLoadingPromise = () => {
    if (!!this.jbAsyncPromise && Object.prototype.toString.call(this.jbAsyncPromise) === '[object Promise]') {
      this.isLoading = true;
      this.jbAsyncPromise.then(() => this.isLoading = false, () => this.isLoading = false);
    } else {
      this.isLoading = false;
    }
  };


  public btnClick = ($event) => {
    // If there's an async click callback function, trigger it and wait for the promise
    if (!!this.jbAsyncClick && typeof this.jbAsyncClick === 'function') {
      this.jbAsyncPromise = this.jbAsyncClick();
      this.initLoadingPromise();
    }

    // Toggle option
    if (this.isToggle) {
      this.jbToggle = !this.jbToggle;
      this.jbToggleChange.emit(this.jbToggle);
      this.setDefaultIcon();
    }

    this.jbClick.emit($event);
  };

}

