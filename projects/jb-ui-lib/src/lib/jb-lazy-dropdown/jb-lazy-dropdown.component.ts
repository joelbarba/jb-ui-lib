import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject, Subscription} from 'rxjs';
import {JbUiLibTransService} from '../abstract-translate.service';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {dCopy} from '../jb-prototypes/deep-copy';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import JbObject from '../jb-prototypes/object.prototype';
import {IjbDropdownCtrl} from '../jb-dropdown/jb-dropdown.component';

@Component({
  selector: 'jb-lazy-dropdown',
  templateUrl: './jb-lazy-dropdown.component.html',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => JbLazyDropdownComponent),
    },
    {
      provide: NG_VALIDATORS, multi: true,
      useExisting: forwardRef(() => JbLazyDropdownComponent),
    }
  ]
})
export class JbLazyDropdownComponent implements ControlValueAccessor, OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() ngModel;
  @Input() jbLazyLoad;            // Function to call to search
  @Input() jbLazyLoadItem;        // Load the item and execute the first search based on it
  @Input() jbDebounce = 300;      // To not execute the search at every digit, but only when stopping typing
  @Input() jbMinSearchLength = 3; // Min length to trigger the search and display the results
  @Input() jbRender;              // How to display every option on the expanded list and searchParam.
  @Input() jbRenderFn;            // Function to be called to render the list items (when jbRender is not enough)
  @Input() jbSelect = '';         // What fields need to be selected and propagated to the ngModel

  @Input() jbRequired: string | boolean = false; // Whether the model is required (can't be empty)
  @Input() jbDisabled: string | boolean = false; // Whether the dropdown is disabled
  @Input() jbDisabledTip = '';    // If dropdown disabled, tooltip to display on hover (label)
  @Input() jbLabel = '';          // Label to display above the dropdown
  @Input() jbTooltip = '';        // Add a badge next to the label with the tooltip to give more info
  @Input() jbTooltipPos = 'top';  // If tooltip on the label, specific position (top by default)
  @Input() jbTooltipBody = true;  // If tooltip on the label, whether it is appended on the body
  @Input() jbPlaceholder;   // Placeholder to show when no value selected. If jbEmptyLabel, this gets overridden
  @Input() jbErrorOnPristine = false; // If true, errors will be shown in initial state too (by default pristine shows as valid always)
  @Input() jbErrorPos: 'default' | 'top-right' | 'bottom-left' | 'bottom-right' | 'none' = 'default'; // Position of the error text
  @Input() jbErrorText: string;   // Custom error text (label) to display when invalid value
  @Input() jbCustomPlacementList: 'top' | 'bottom';   // To force the direction the list is expanded.
                                                      // By default this is automatic based on the position on the window

  @Input() extCtrl$: Observable<unknown>; // To trigger actions manually from an external observable (subject)

  @Output() jbOnLoaded = new EventEmitter<IjbDropdownCtrl>();         // Emitter to catch the moment when the component is ready (ngAfterViewInit)
  @Output() jbOnListExpanded = new EventEmitter<any>();   // The moment when the list expands (focus in)
  @Output() jbOnListCollapsed = new EventEmitter<any>();  // The moment when the list collapses (select or blur)
  @Output() jbBeforeChange = new EventEmitter<any>();     // The moment before a value is set (selected)

  // --------------

  public ngControl; // Reference to the external formControl
  public jbModel;   // Internal model, to hold the selected object of the list
  public typing$ = new BehaviorSubject<string>('');
  public list = [];
  public results = {};

  public destroyed$: Subject<boolean> = new Subject<boolean>();

  public inputText = '';          // Text on the input (ngModel)
  public jbCandidate; // Pointer to a extList item that might be selected next but not yet (hovering / arrow scrolling)

  public isInvalid = false;   // If the model holds an invalid option
  public isExpanded = false;  // Whether the list is shown (true) or hidden
  public isFocus = false;     // Whether the input is focused
  public isLoading = false;   // Whether to show the loading spinner animation on the expand button

  public showError = false; // Whether to show the error state (if invalid + not pristine)
  public errorPosition = 'default';
  public errors = {
    emptyRequired: false, // When no value and is required
    noMatch: false,       // When ngModel set externally and no match on the list
    manualErr: null,      // Manual error (set through addError() / removeError())
  };
  public expandUpward = false;  // Whether to expand the list upward (true) or downward (false)

  public jbLabelTrans$ = of('');         // Translated text for the label
  public jbPlaceholderTrans$ = of('');         // Translated text for the label
  public jbTooltipTrans$ = of('');       // Translated text for the tooltip of the label
  public jbDisabledTipTrans$ = of('');   // Translated text for the disabled tooltip
  public errorTextTrans$ = of('');       // Translated text for the error message
  public noResultLabel = this.translate.getLabel$('view.jbLazyDropdown.no_results_found');

  public lastLoadPromise; // Reference to avoid jbLoading promise overlap
  public isJbDisabledPresent = false;  // If [jbDisabled] present, do not change it automatically on jbLoading
  public subs: {[ key: string]: Subscription } = {};  // Subscriptions holder

  private ctrlObject; // Object to expose control methods externally

  public ignoreHover$ = new BehaviorSubject<boolean>(false); // When scrolling with the arrow keys, ignore mouse hover
  public ignoreHover;
  public arrowScroll$ = new Subject();
  public listHeight; // Computed height of the expanded listContainer
  public allRows; // Reference to the optionRows.toArray() html elements array

  @ViewChild('dropdownInput', { static: false }) elInput: ElementRef<HTMLInputElement>;
  @ViewChild('listContainer', { static: false }) listContainer: ElementRef<HTMLInputElement>;
  @ViewChildren('optionRow') optionRows;

  constructor(
    private translate: JbUiLibTransService,
    private htmlEl: ElementRef,
  ) {}

  ngOnChanges(changes) {
    const changing = (prop) => changes.hasOwnProperty(prop);  // just a shortcut

    if (changing('ngModel') && !changes['ngModel'].currentValue) {
      this.jbModel = null;
      this.inputText = '';
    }

    // External control via extCtrl$
    if (changing('extCtrl$')) {
      if (!!this.subs.ctrlSubs$) { this.subs.ctrlSubs$.unsubscribe(); }
      this.subs.ctrlSubs$ = this.extCtrl$.subscribe((option: { action: string, value?: any }) => {
        switch (option.action) {
          case 'expand'     : this.ctrlObject.expand(); break;
          case 'collapse'   : this.ctrlObject.collapse(); break;
          case 'toggle'     : this.ctrlObject.toggle(); break;
          case 'type'       : this.ctrlObject.type(option.value); break;
          case 'setPristine': this.ctrlObject.setPristine(); break;
          case 'addError'   : this.ctrlObject.addError(option.value); break;
          case 'removeError': this.ctrlObject.removeError(); break;
          default: break;
        }
      });
    }

    // If values come as strings, convert them
    if (changing('jbDisabled')) {
      this.isJbDisabledPresent = true;
      if (this.jbDisabled === 'false') { this.jbDisabled = false; }
      if (this.jbDisabled === 'true')  { this.jbDisabled = true; }
    }

    // If values come as strings, convert them
    if (changing('jbRequired')) {
      if (this.jbRequired === 'false') { this.jbRequired = false; }
      if (this.jbRequired === 'true')  { this.jbRequired = true; }
    }

    if (changing('jbPlaceholder')) { this.jbPlaceholderTrans$ = this.translate.getLabel$(this.jbPlaceholder); }

    // Generate new observables for the dynamic text
    if (changing('jbLabel'))        { this.jbLabelTrans$ = this.translate.getLabel$(this.jbLabel); }
    if (changing('jbTooltip'))      { this.jbTooltipTrans$ = this.translate.getLabel$(this.jbTooltip); }
    if (changing('jbDisabledTip'))  { this.jbDisabledTipTrans$ = this.translate.getLabel$(this.jbDisabledTip); }

    if (changing('jbErrorPos')) { this.errorPosition = this.jbErrorPos || 'default'; }
    if (changing('jbErrorText') && this.isInvalid) { this.runValidation(); }
    if (changing('jbErrorOnPristine')) { this.runValidation(); }
  }

  updateTranslations = () => {
    this.jbLabelTrans$ = this.translate.getLabel$(this.jbLabel);
    this.jbTooltipTrans$ = this.translate.getLabel$(this.jbTooltip);
    this.jbDisabledTipTrans$ = this.translate.getLabel$(this.jbDisabledTip);
  }

  ngOnInit() {

    // Rerender the list labels on language change
    this.subs.langSubs$ = this.translate.onLangChange$.subscribe(() => this.updateTranslations());

    // Give the browser .1s to scroll and avoid the mouseenter selecting a different item while using arrows up/down
    this.subs.scrollSub$ = this.arrowScroll$
      .pipe(
        debounceTime(100),
        takeUntil(this.destroyed$))
      .subscribe(() => this.ignoreHover$.next(false));

    // (ignoreHover$ | async) can't be used inside (mouseenter), (mouseleave)
    this.ignoreHover$.subscribe((ignoreHover) => this.ignoreHover = ignoreHover);

    // Controller object
    this.ctrlObject = {
      expand      : () => !this.isExpanded && this.deferExpand(),
      collapse    : () => this.isExpanded && this.collapseList(),
      toggle      : () => this.isExpanded ? this.collapseList() : this.deferExpand(),
      setPristine : () => {
        if (this.ngControl) { this.ngControl.markAsPristine(); }
        this.runValidation();
      },
      type        : (value) => {
        setTimeout(() => {
          this.elInput.nativeElement.focus();
          this.inputText = value;
        }, 100);
      },
      addError    : (value) => {
        if (JSON.stringify(this.errors.manualErr) !== JSON.stringify(value)) {
          this.errors.manualErr = value;
          this.runValidation();
        }
      },
      removeError : () => {
        if (this.errors.manualErr !== null) {
          this.errors.manualErr = null;
          this.runValidation();
        }
      },
    };

    this.subs.typing$ = this.typing$
      .pipe(debounceTime(this.jbDebounce))
      .subscribe(inputText => this.search(inputText));

    if (!!this.jbLazyLoadItem) {
      this.apiSearch(this.renderLabel(this.jbLazyLoadItem), true, true);
    }
  }

  ngAfterViewInit() {
    this.jbOnLoaded.emit({ ...this.ctrlObject }); // Expose all control methods
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();

    Object.values(this.subs).forEach(sub => sub.unsubscribe());
  }

  minLengthValid() {
    const valid = this.inputText.length >= this.jbMinSearchLength;
    if (!valid) { this.list = []; }
    return valid;
  }

  // triggered when ngModelChange
  search(event : string) {
    if (!this.minLengthValid()) {
      if (!this.inputText.length) {
        this.propagateModelUp(null);
      }
      this.isExpanded = false;
      this.isLoading = false;
      return;
    }

    const searchParam = event.toLowerCase();
    if (!this.results[searchParam]) {
      this.apiSearch(searchParam);
    } else {
      this.localSearch(searchParam);
    }
    this.expandList();
  }

  // Search and store new results coming from API JbLazyLoad
  apiSearch(searchParam, select = false, lazyItemFetch = false) {
    this.isLoading = true;
    this.jbLazyLoad(searchParam, lazyItemFetch).then(list => {
      if (list) {
        this.setResult(list, searchParam, select);
      } else {
        this.isExpanded = false;
        this.isLoading = false;
        this.isFocus = false;
      }
    });
  }

  setResult(list, searchParam, select) {
    this.renderLabels(list);
    this.results[searchParam] = list;
    this.list = [...this.results[searchParam]];
    this.isLoading = false;
    if (select && list.length) { this.selectItem(this.list[0]); }
  }

  // Filter the list to display according to the input text
  localSearch(searchParam) {
    this.list = this.results[searchParam];
  }

  renderLabels(list) {
    list.forEach((item, ind) => item.$renderedText = this.renderLabel(item, ind));
  }

  renderLabel(item, ind = 0) {
    if (!!this.jbRender) {
      const rendered = item.hasOwnProperty(this.jbRender) ? item[this.jbRender] : this.jbRender;
      return this.translate.doTranslate(rendered, item);
    } else if (!!this.jbRenderFn) {
      return this.jbRenderFn(item, ind);
    } else {
      return Object.values(item).join(', ');
    }
  }

  // Select an item from extList to jbModel, and propagate ngModel up
  selectItem = (selObj, writeValue?) => {
    this.jbModel = selObj;
    this.inputText = this.renderLabel(selObj);

    let modelUp;  // Object to propagate up (to the formControl of the jb-dropdown)
    if (!this.jbSelect) {
      modelUp = dCopy(this.list.find(item => JSON.stringify(item) === JSON.stringify(dCopy(selObj))));
      delete modelUp.$renderedText;
    } else {
      if (this.jbSelect.indexOf(',') === -1) {
        modelUp = dCopy(this.jbModel[this.jbSelect]);  // Select 1 prop
      } else {
        const jbModel = dCopy(this.jbModel);
        delete jbModel.$renderedText;
        modelUp = JbObject.keyMap.call(jbModel, this.jbSelect); // Select filtered props
      }
    }
    this.results[this.inputText] = [this.jbModel];
    this.list = this.results[this.inputText];

    this.jbBeforeChange.emit({
      currentValue: this.ngControl.value,  // TODO: find a better way
      nextValue: modelUp
    });

    // In case this comes from NG_VALUE_ACCESSOR -> writeValue(), the ngModel is already set (no need to propagate up)
    if (!writeValue || writeValue.value !== modelUp) {
      this.propagateModelUp(modelUp); // This triggers NG_VALIDATORS -> validate()
    }

  };

  clear() {
    this.jbModel = null;
    this.inputText = '';
    this.propagateModelUp(this.jbModel);
  }

  // ------- ControlValueAccessor -----

  public propagateModelUp = (_: any) => {}; // This is just to avoid type error (it's overwritten on register)
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }


  // NG_VALUE_ACCESSOR --> This is triggered every time the [ngModel] changes (propagate down)
  // It is also triggered twice when the component is first initialized
  //   1 - Before ngAfterViewInit (value always null)
  //   2 - After ngAfterViewInit (initial ngModel value from outside)
  writeValue(value: any) {
    if (this.ngControl) { // Ignore first trigger before ngAfterViewInit
      const wasPristine = this.ngControl.pristine;

      // this.matchSelection(value);

      // External changes shan't turn pristine state (only internals). Set it back if so
      if (wasPristine) { this.ngControl.markAsPristine(); }
    }
  }

  // Run ngModel validation safely
  public runValidation = () => {
    if (this.ngControl) { this.ngControl.updateValueAndValidity(); } // This triggers NG_VALIDATORS -> validate()
  };

  // NG_VALIDATORS: To determine the <jb-input [ngModel]> formControl status. Triggered:
  //   - After writeValue()
  //   - After propagateModelUp()
  //   - After this.ngControl.updateValueAndValidity()
  public validate = (extFormCtrl: FormControl) => {
    let result = null;  // null is valid
    this.ngControl = extFormCtrl; // Save the reference to the external form Control

    this.errors.emptyRequired = !!(this.jbRequired && !this.jbModel);

    this.isInvalid = !!this.errors.emptyRequired || !!this.errors.noMatch || !!this.errors.manualErr;
    this.showError = this.isInvalid && !this.isLoading && (!this.ngControl.pristine || this.jbErrorOnPristine);

    // Determine the error to display
    if (this.isInvalid) {
      let errLabel = 'view.common.invalid_value';
      if (this.errors.emptyRequired) { result = { error: 'required' }; errLabel = 'view.common.required_field'; }
      if (this.errors.manualErr)     { result = { error: this.errors.manualErr }; errLabel = this.errors.manualErr; }

      this.errorTextTrans$ = this.translate.getLabel$(this.jbErrorText || errLabel);
      if (this.jbErrorText === 'none') { this.errorTextTrans$ = of(''); }
    }

    return result;
  };

  // ------------------------------------

  // Focus on input (deferring it to next cycle)
  public deferExpand = () => {
    setTimeout(() => this.elInput.nativeElement.focus());
  };

  // Click on the expand/collapse input button
  public onInputBtnClick = () => {
    this.elInput.nativeElement.focus();
  };

  // On input focus in -> Expand the select list
  public expandList = () => {
    this.isFocus = true;
    if (this.inputText.length < this.jbMinSearchLength) {
      return;
    }

    // If the dropdown is to close to the bottom of the window, expand it upward so the list doesn't fall off
    if (this.htmlEl && !this.jbCustomPlacementList) {
      const renderedShadowRect = this.htmlEl.nativeElement.getBoundingClientRect();
      this.expandUpward = (window.innerHeight - renderedShadowRect.bottom) < 350;

    } else { // Force the direction the list is expanded towards
      this.expandUpward = this.jbCustomPlacementList === 'top';
    }

    this.jbCandidate = this.jbModel;
    this.isExpanded = true;

    // If the selected element is down in the list, auto scroll so it's immediately visible
    setTimeout(() => {
      if (this.optionRows && this.listContainer) {
        this.allRows = this.optionRows.toArray();
        this.listHeight = this.listContainer.nativeElement.getBoundingClientRect().height;
        const selectedEl = this.allRows.find(el => el.nativeElement.classList.contains('selected'));
        if (selectedEl) {
          const offsetTop = selectedEl.nativeElement.offsetTop;
          const clientHeight = selectedEl.nativeElement.clientHeight;
          const scrollTop = this.listContainer.nativeElement.scrollTop;
          const posY = offsetTop - scrollTop;
          if (posY + clientHeight > this.listHeight) { // Scroll down
            this.listContainer.nativeElement.scrollTo({ top: scrollTop + posY - 15, behavior: 'auto' });
          }
        }
      }
    });

    this.jbOnListExpanded.emit();
  };

  // On input focus out -> Collapse the select list
  public collapseList = () => {
    this.isFocus = false;
    setTimeout(() => {
      this.isExpanded = false;
      if (!this.jbModel) { this.inputText = ''; }
      this.jbOnListCollapsed.emit();
    }, 100);
  };

  // React on key events (on the input)
  triggerKey = (event) => {
    if (event.key === 'Escape' && this.isExpanded) { this.elInput.nativeElement.blur(); } // make it lose the focus

    // Use jbCandidate as a temporary pointer to the highlighted item on the list while moving up/down with arrows
    if (!this.jbCandidate) { this.jbCandidate = this.jbModel; }
    // const visibleList = this.extList.filter(item => item.$isMatch);
    if (!!this.list) {
      const ind = this.list.indexOf(this.jbCandidate);

      if (event.key === 'ArrowDown') {
        const nextInd = (ind >= 0 && ind < this.list.length - 1) ? ind + 1 : 0;
        this.jbCandidate = this.list[nextInd];
        this.ignoreHover$.next(true);
        this.arrowScroll$.next();
      }
      if (event.key === 'ArrowUp') {
        const nextInd = (ind > 0) ? ind - 1 : this.list.length - 1;
        this.jbCandidate = this.list[nextInd];
        this.ignoreHover$.next(true);
        this.arrowScroll$.next();
      }

      if (event.key === 'Enter') {
        this.selectItem(this.jbCandidate);
        this.elInput.nativeElement.blur();
      }


      // Wait for the css classes to be applied on the view
      // If the candidate falls out of the scrolling window, auto scroll so it gets back in
      setTimeout(() => {
        if (this.allRows && this.listContainer) {
          const candidateEl = this.allRows.find(el => el.nativeElement.classList.contains('candidate'));
          if (candidateEl) {
            const offsetTop = candidateEl.nativeElement.offsetTop;
            const clientHeight = candidateEl.nativeElement.clientHeight;
            const scrollTop = this.listContainer.nativeElement.scrollTop;
            const posY = offsetTop - scrollTop;

            if (posY < 0) { // Scroll up
              this.listContainer.nativeElement.scrollTo({ top: scrollTop + posY - 5, behavior: 'auto' });
            }
            if (posY + clientHeight > this.listHeight) { // Scroll down
              this.listContainer.nativeElement.scrollTo({ top: scrollTop + posY + 5 + clientHeight - this.listHeight, behavior: 'auto' });
            }
          }
        }
      });
    }
  };

  showNoResultLabel = () => {
    return !this.list.length && !this.isLoading && this.inputText.length >= this.jbMinSearchLength;
  }

}
