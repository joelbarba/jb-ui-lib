import {Component, OnInit, Input, Output, forwardRef, ElementRef, EventEmitter} from '@angular/core';
import {OnChanges, OnDestroy,  AfterViewInit, ViewChild, ViewChildren} from '@angular/core';
import {FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS} from '@angular/forms';
import JbObject from '../jb-prototypes/object.prototype';
import JbArray from '../jb-prototypes/array.prototypes';
import {isObservable, Observable, of, Subject, Subscription} from 'rxjs';
import {JbUiLibTransService} from '../abstract-translate.service';
import {dCopy} from '../jb-prototypes/deep-copy';
import {debounceTime} from 'rxjs/operators';

// The control object (jbOnLoaded) emits
export interface IjbDropdownCtrl {
  expand      ?: { () };
  collapse    ?: { () };
  toggle      ?: { () };
  type        ?: { (value: string) };
  setPristine ?: { () };
  removeError ?: { () };
  addError    ?: { (err) };
}


@Component({
  selector: 'jb-dropdown',
  templateUrl: './jb-dropdown.component.html',
  styleUrls: [],
    providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => JbDropdownComponent),
    },
    {
      provide: NG_VALIDATORS, multi: true,
      useExisting: forwardRef(() => JbDropdownComponent),
    }
  ]
})
export class JbDropdownComponent implements ControlValueAccessor, OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() jbList: Array<any>;    // List of options (array of objects)
  @Input() jbRender = '';         // How to display every option on the expanded list
  @Input() jbRenderFn;            // Function to be called to render the list items (when jbRender is not enough)
  @Input() jbRenderImg = 'img';   // Field of the object that contains the url of the image to display
  @Input() jbRenderIco = 'icon';  // Field of the object that contains the css class of the icon (icomoon) to display
  @Input() jbSelect = '';         // What fields need to be selected on the model (from the list object)
  @Input() jbRequired: unknown = false; // Whether the model is required (can't be empty)
  @Input() jbDisabled: unknown = false; // Whether the dropdown is disabled
  @Input() jbDisabledTip = '';    // If dropdown disabled, tooltip to display on hover (label)
  @Input() jbOrderBy = '';        // Field (or fields separated by ,). If prefixed by '-', desc order for the field
  @Input() jbGroupBy = '';        // Group the elements of the list by this field

  @Input() jbLabel = '';          // Label to display above the dropdown
  @Input() jbTooltip = '';        // Add a badge next to the label with the tooltip to give more info
  @Input() jbTooltipPos = 'top';  // If tooltip on the label, specific position (top by default)
  @Input() jbTooltipBody = true;  // If tooltip on the label, whether it is appended on the body

  @Input() jbPlaceholder;   // Placeholder to show when no value selected. If jbEmptyLabel, this gets overridden
  @Input() jbEmptyLabel;    // Text of the emptyItem option (no label = 'Empty')
  @Input() jbEmptyValue: any = null;  // By default the empty option sets a "null" value to the ngModel.
                                      // You can add a custom value here to be set when the empty option is selected
  @Input() jbErrorOnPristine = false; // If true, errors will be shown in initial state too (by default pristine shows as valid always)
  @Input() jbErrorPos: 'default' | 'top-right' | 'bottom-left' | 'bottom-right' | 'none' = 'default'; // Position of the error text
  @Input() jbErrorText: string;   // Custom error text (label) to display when invalid value
  @Input() jbCustomPlacementList: 'top' | 'bottom';   // To force the direction the list is expanded.
                                                      // By default this is automatic based on the position on the window
  @Input() jbAutoCollapse = true; // If false, the dropdown does not collapse on focus out

  @Input() jbLoading: boolean | Promise<any> | Observable<boolean>;  // To display the loading animation on the expand button

  @Input() extCtrl$: Observable<unknown>; // To trigger actions manually from an external observable (subject)
  @Input() jjBilterFn: (list: Array<any>, value: string) => Array<any>; // Custom function to perform the list filtering
  @Input() jbKeepSearch = false;  // false = resets the search string every time the list is expanded, removing the previous filter
  @Input() jbHtmlRender = false;   // When true display values can be rendered as html on the list (but not in the input)

  @Output() jbOnLoaded = new EventEmitter<IjbDropdownCtrl>();         // Emitter to catch the moment when the component is ready (ngAfterViewInit)
  @Output() jbOnListExpanded = new EventEmitter<any>();   // The moment when the list expands (focus in)
  @Output() jbOnListCollapsed = new EventEmitter<any>();  // The moment when the list collapses (select or blur)
  @Output() jbBeforeChange = new EventEmitter<any>();     // The moment before a value is set (selected)
  @Output() jbOnTyping = new EventEmitter<any>();         // When typing into the input


  // --------------


  public ngControl; // Reference to the external formControl
  public jbModel;   // Internal model, to hold the selected object of the list, or empty value

  public isModelEmpty = false;    // Whether the jbModel is holding the empty option
  public selModelText = '';       // Text representation of the selected Model (to display in the input / placeholder)
  public inputPlaceholder = '';   // Text on the input placeholder
  public inputText = '';          // Text on the input (ngModel)
  public extList;     // A copy from jbList to make sure we never modify the input array
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

  // Empty option item (in extList)
  public emptyItem = {
    $index: 0,
    $label: 'view.common.empty',
    $renderedText: 'Empty',
    $isMatch: true,
    $img: null,
    $icon: null,
  };

  public jbLabelTrans$ = of('');         // Translated text for the label
  public jbTooltipTrans$ = of('');       // Translated text for the tooltip of the label
  public jbDisabledTipTrans$ = of('');   // Translated text for the disabled tooltip
  public errorTextTrans$ = of('');       // Translated text for the error message
  public renderedPlaceholder;   // Translated value of the custom placeholder
  public lastLoadPromise; // Reference to avoid jbLoading promise overlap
  public isJbDisabledPresent = false;  // If [jbDisabled] present, do not change it automatically on jbLoading
  public subs: {[ key: string]: Subscription } = {};  // Subscriptions holder

  private readonly ctrlObject; // Object to expose control methods externally

  public ignoreHover = false; // When scrolling with the arrow keys, ignore mouse hover
  public arrowScroll$ = new Subject();
  public listHeight; // Computed height of the expanded listContainer
  public allRows; // Reference to the optionRows.toArray() html elements array
  public searchTxt = '';

  @ViewChild('dropdownInput', { static: false }) elInput: ElementRef<HTMLInputElement>;
  @ViewChild('listContainer', { static: false }) listContainer: ElementRef<HTMLInputElement>;
  @ViewChildren('optionRow') optionRows;

  constructor(
    private translate: JbUiLibTransService,
    private htmlEl: ElementRef,
  ) {

    // Rerender the list labels on language change
    this.subs.langSubs = this.translate.onLangChange$.subscribe(() => this.renderExtList());

    // Give the browser .1s to scroll and avoid the mouseenter selecting a different item while using arrows up/down
    this.subs.scrollSub = this.arrowScroll$.pipe(debounceTime(100)).subscribe(() => this.ignoreHover = false);

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
          this.inputType(this.inputText);
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
  }

  ngOnChanges(changes) {
    const changing = (prop) => changes.hasOwnProperty(prop);  // just a shortcut

    // External control via extCtrl$
    if (changing('extCtrl$')) {
      if (!!this.subs.ctrlSubs) { this.subs.ctrlSubs.unsubscribe(); }
      this.subs.ctrlSubs = this.extCtrl$.subscribe((option: { action: string, value?: any }) => {
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

    // List generation (jbList --> extList)
    if (changing('jbList') || changing('jbOrderBy') || changing('jbGroupBy') || changing('jbRender') || changing('jbRenderFn')) {
      this.generateExtList();

      if (changing('jbList')) { // If the list changes, match the ngModel with the new list
        setTimeout(() => {
          this.matchSelection(this.ngControl ? this.ngControl.value : this.jbModel);
          if (this.jbKeepSearch && this.isExpanded) { setTimeout(() => this.inputText = this.searchTxt); }
          this.ngControl.updateValueAndValidity();
        });
      }
    }

    // In case the selected field changes, reselect the item to set the new ngModel.value
    if (changing('jbSelect') && !this.isModelEmpty && !changes.jbSelect.firstChange) {
      this.selectItem(this.jbModel);
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
      this.setEmptyOption();
    }

    if (changing('jbPlaceholder')) { this.renderLabels(); }

    if (changing('jbEmptyLabel')) {
      this.emptyItem.$label = this.jbEmptyLabel || 'view.common.empty';
      this.renderLabels();
    }

    // Generate new observables for the dynamic text
    if (changing('jbLabel'))        { this.jbLabelTrans$ = this.translate.getLabel$(this.jbLabel); }
    if (changing('jbTooltip'))      { this.jbTooltipTrans$ = this.translate.getLabel$(this.jbTooltip); }
    if (changing('jbDisabledTip'))  { this.jbDisabledTipTrans$ = this.translate.getLabel$(this.jbDisabledTip); }

    if (changing('jbErrorPos')) { this.errorPosition = this.jbErrorPos || 'default'; }
    if (changing('jbErrorText') && this.isInvalid) { this.runValidation(); }
    if (changing('jbErrorOnPristine')) { this.runValidation(); }


    // jbLoading can come in as a 'boolean' or a promise. In this case, we'll automatically manage isLoading
    if (changing('jbLoading')) {
      this.isLoading = false;
      const jbLoading = changes.jbLoading.currentValue;
      if (jbLoading && typeof jbLoading === 'boolean') { this.isLoading = jbLoading; }
      if (jbLoading && typeof jbLoading === 'string')  { this.isLoading = jbLoading !== 'false'; }
      if (jbLoading && typeof jbLoading === 'object' && typeof jbLoading.then === 'function') {
        this.isLoading = true;
        this.lastLoadPromise = jbLoading;
        jbLoading.then(() => {
          if (this.lastLoadPromise === jbLoading) { this.afterLoaded(); }
        }, () => {});
      }

      // In case of jbLoading coming as an observable
      if (jbLoading && isObservable(jbLoading)) {
        this.isLoading = true;
        if (!!this.subs.loading) { this.subs.loading.unsubscribe(); }
        this.subs.loading = jbLoading.subscribe(isLoading => {
            if (isLoading) {
              this.isLoading = true;
              if (!this.isJbDisabledPresent) { this.jbDisabled = true; }
            } else {
              this.afterLoaded();
            }
          },
          () => { this.afterLoaded(); },
          () => { this.afterLoaded(); }
        );
      }

      // Detect when jbLoading finishes (changes from 'true' --> 'false')
      if (changes.jbLoading.previousValue === true && changes.jbLoading.currentValue === false) {
        this.afterLoaded();
      }

      // If no jbDisable, control it automatically, disabling the dropdown while is loading
      if (!this.isJbDisabledPresent) { this.jbDisabled = !!this.jbLoading; }
    }

  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.jbOnLoaded.emit({ ...this.ctrlObject }); // Expose all control methods
  }

  ngOnDestroy() {
    Object.values(this.subs).forEach(sub => sub.unsubscribe());
  }


  // After loading (jbLoading=false), automatically match again the ngModel with the items of the list
  public afterLoaded = () => {
    this.isLoading = false;
    setTimeout(() => {  // Wait until the new [jbList] is loaded, and match the ngModel again
      const value = !!this.ngControl ? this.ngControl.value : this.jbModel;
      this.matchSelection(value);
      this.ngControl.updateValueAndValidity();
      if (!this.isJbDisabledPresent) { this.jbDisabled = false; }
    });
  };


  // Generates the extended list to be used internally (jbList --> extList)
  public generateExtList = () => {
    this.extList = dCopy(this.jbList || []); // Make a copy

    // If jbRender starts with $$$, it's an eval() expression. If not, a single field
    // const renderExpr = (this.jbRender && this.jbRender.slice(0, 3) === '$$$') ? this.jbRender.slice(4) : false;
    // if (renderExpr) { console.warn('jbDropdown - jbRender - Consider using [jbRenderFn] instead of an eval expression'); }
    // itemLabel = eval(renderExpr); // We'll keep this for back compatibility, but better use [jbRenderFn]

    this.extList.forEach((item, ind) => {
      let itemLabel = '';

      if (!!this.jbRender) {
        itemLabel = item.hasOwnProperty(this.jbRender) ? item[this.jbRender] : this.jbRender;  // Display item property / string label

      } else if (!this.jbRenderFn) { // If render function, $label will be calculated later
        itemLabel = Object.values(item).join(', '); // If no rendering defined: Display all props
      }

      item.$label = itemLabel + '';
      item.$index = ind + 1;  // Internal unique index
      item.$isMatch = true;   // filter none by default
      item.$img = item[this.jbRenderImg] || null;
      item.$icon = item[this.jbRenderIco] || null;
    });

    // Order the list
    if (this.jbOrderBy || this.jbGroupBy) {
      const fields = (this.jbOrderBy || '').split(',').map(field => field.trim()).reverse();
      if (this.jbGroupBy) { fields.push(this.jbGroupBy); }  // If grouping, jbGroupBy has to be 1st order
      this.extList = this.extList.sort((itemA, itemB) => {
        let diff = 0;
        fields.forEach(field => {
          if (field.charAt(0) === '-') { field = field.slice(1); }
          const valueA = itemA[field] !== undefined ? itemA[field] : '';
          const valueB = itemB[field] !== undefined ? itemB[field] : '';
          if (valueA < valueB) { diff = -1; }
          if (valueA > valueB) { diff =  1; }
        });
        return diff;
      });
    }

    // Add .$groupHeader to the first item of every group
    if (this.jbGroupBy) {
      let lastHeader = '';
      for (const item of this.extList) {
        if (item[this.jbGroupBy] !== lastHeader) {
          item.$groupHeader = item[this.jbGroupBy];
          lastHeader = item.$groupHeader;
        }
      }
    }

    this.setEmptyOption(); // Set Empty option
    this.renderExtList(); // Set $renderedText
  };

  // Add or remove the "Empty" option to the extList
  public setEmptyOption = () => {
    if (!this.jbRequired) { // If not required, the list should have "Empty" option
      if (!this.extList.find(item => item.$index === this.emptyItem.$index)) {
        this.emptyItem.$renderedText = this.translate.doTranslate(this.emptyItem.$label);
        this.extList.unshift(this.emptyItem);  // Add it if not there yet
      }
    } else { // If required, the list shall not have "Empty" option
      JbArray.removeByProp.call(this.extList, '$index', this.emptyItem.$index); // remove empty item
    }

    // Check validity when Empty option is selected
    this.runValidation(); // That might set emptyRequired error
  };

  // Sync translation for the values of the list ($label --> $renderedText)
  public renderExtList = () => {
    if (!!this.extList) {
      this.extList.forEach((item, ind) => {

        if (this.jbRenderFn && typeof this.jbRenderFn === 'function') { // If render function, call it
          item.$renderedText = this.jbRenderFn(item, ind);

        } else {
          const params = {};  // Take as translation params those primitives on the same item
          for (const [key, value] of Object.entries(item)) {
            if (typeof value === 'string' || typeof value === 'number') { params[key] = value; }
          }
          item.$renderedText = this.translate.doTranslate(item.$label, params);

          // It seems that this above is in some cases overkilling??? Is it probably the doTranslate mock?
          // const time = new Date();  console.log(time.getSeconds() + '.' + time.getMilliseconds(), 'translate', item.username);
        }
      });
    }

    this.renderLabels();
  };

  // Update translation for empty options and placeholders
  public renderLabels = () => {
    this.emptyItem.$renderedText = this.translate.doTranslate(this.emptyItem.$label);
    this.renderedPlaceholder = this.translate.doTranslate(this.jbPlaceholder);
    this.setModelText(this.jbModel ? this.jbModel.$renderedText : this.emptyItem.$renderedText);
  };



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

      this.matchSelection(value);

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

    this.errors.emptyRequired = !!(this.jbRequired && this.isModelEmpty);
    this.errors.noMatch = !!(!this.isModelEmpty && this.extList.indexOf(this.jbModel) === -1);

    this.isInvalid = !!this.errors.emptyRequired || !!this.errors.noMatch || !!this.errors.manualErr;
    this.showError = this.isInvalid && !this.isLoading && (!this.ngControl.pristine || this.jbErrorOnPristine);

    // Determine the error to display
    if (this.isInvalid) {
      let errLabel = 'view.common.invalid_value';
      if (this.errors.emptyRequired) { result = { error: 'required' }; errLabel = 'view.common.required_field'; }
      if (this.errors.noMatch)       { result = { error: 'no match' }; errLabel = 'view.common.error.invalid_option'; }
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
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      this.elInput.nativeElement.focus();
    }
  };


  // On input focus in -> Expand the select list
  public expandList = () => {

    // If the dropdown is to close to the bottom of the window, expand it upward so the list doesn't fall off
    if (this.htmlEl && !this.jbCustomPlacementList) {
      const renderedShadowRect = this.htmlEl.nativeElement.getBoundingClientRect();
      this.expandUpward = (window.innerHeight - renderedShadowRect.bottom) < 350;

    } else { // Force the direction the list is expanded towards
      this.expandUpward = this.jbCustomPlacementList === 'top';
    }

    this.jbCandidate = this.jbModel;
    this.isFocus = true;
    this.isExpanded = true;
    this.inputText = this.jbKeepSearch ? this.searchTxt : '';  // Reset the search string
    this.filterList(this.inputText);

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
    if (this.jbAutoCollapse) {
      this.isFocus = false;
      setTimeout(() => {
        this.isExpanded = false;
        this.inputText = this.selModelText; // Take back the selected text
        this.jbOnListCollapsed.emit();
      }, 100);
    }
  };


  // React on key events (on the input)
  public triggerKey = (event) => {
    if (event.key === 'Escape' && this.isExpanded) { this.elInput.nativeElement.blur(); } // make it lose the focus

    // Use jbCandidate as a temporary pointer to the highlighted item on the list while moving up/down with arrows
    if (!this.jbCandidate) { this.jbCandidate = this.jbModel; }
    const visibleList = this.extList.filter(item => item.$isMatch);
    const ind = visibleList.indexOf(this.jbCandidate);

    if (event.key === 'ArrowDown') {
      const nextInd = (ind >= 0 && ind < visibleList.length - 1) ? ind + 1 : 0;
      this.jbCandidate = visibleList[nextInd];
      this.ignoreHover = true;
      this.arrowScroll$.next();
    }
    if (event.key === 'ArrowUp') {
      const nextInd = (ind > 0) ? ind - 1 : visibleList.length - 1;
      this.jbCandidate = visibleList[nextInd];
      this.ignoreHover = true;
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

  };


  public inputType = (value) => {
    this.searchTxt = value;
    this.jbOnTyping.emit(value);
    this.filterList(value);
  }

  // Filter the list to display according to the input text
  public filterList = (value) => {
    if (this.jjBilterFn) {
      const fList = this.jjBilterFn(this.extList, value);
      this.extList.forEach(item => item.$isMatch = !!fList.find(e => e.$index === item.$index));

    } else {
      const patternVal = value.toLowerCase();
      this.extList.forEach(item => {
        item.$isMatch = item.$renderedText && item.$renderedText.toLowerCase().indexOf(patternVal) >= 0;
      });
      this.emptyItem.$isMatch = true; // Fix empty option as always visible
    }

    if (this.jbGroupBy) { // If grouping, hide headers that have no matches
      this.extList.filter(i => !!i.$groupHeader).forEach(item => {
        item.$hideHeader = !this.extList.filter(gi => gi.$isMatch && gi[this.jbGroupBy] === item[this.jbGroupBy]).length;
      });
    }
  };


  // Given an external object/value, find and select the match on the internal list
  public matchSelection = (value) => {
    let matchItem = null;

    if (value !== null && value !== undefined) {
      if (!!this.jbSelect) {
        if (this.jbSelect.indexOf(',') === -1) {  // Single prop
          matchItem = JbArray.getByProp.call(this.extList, this.jbSelect, value);

        } else { // Multiple prop match
          matchItem = this.extList.filter(item => {
            return !!item.$index && (JSON.stringify(JbObject.keyMap.call(item, this.jbSelect)) === JSON.stringify(value));
          })[0];
        }

      } else {  // Full object match (without $ props)
        matchItem = this.extList.filter(item => {
          const oriItem = dCopy(JbObject.keyFilter.call(item, (val, key) => key.slice(0,1) !== '$'));
          return !!oriItem && JbObject.isEqualTo.call(oriItem, value);
        })[0];
      }
    }

    if (!!value && value !== this.jbEmptyValue && this.extList.indexOf(matchItem) === -1) { // In case of "no match"
      this.jbModel = value;
      this.isModelEmpty = false;
      this.setModelText((typeof value === 'string') ? value : '');  // Show the invalid value (if string)

    } else {
      this.selectItem(matchItem, { value }); // select valid match
    }
  };


  // Select an item from extList to jbModel, and propagate ngModel up
  public selectItem = (selObj, writeValue?) => {

    if (selObj !== this.emptyItem && selObj !== null && selObj !== undefined) {
      this.jbModel = selObj;
      this.isModelEmpty = false;
      this.setModelText(this.jbModel.$renderedText);

    } else {
      this.jbModel = this.emptyItem;
      this.isModelEmpty = true;
      this.setModelText(this.emptyItem.$renderedText);
    }

    let modelUp;  // Object to propagate up (to the formControl of the jb-dropdown)

    if (this.isModelEmpty) {
      modelUp = this.jbEmptyValue; // If empty value selected, return null (or the empty value)

    } else {
      if (!this.jbSelect) {
        // extModel = selObject without $ prefixed props
        const extModel = dCopy(JbObject.keyFilter.call(selObj, (val, key) => key.slice(0,1) !== '$'));

        modelUp = this.jbList.find(item => JSON.stringify(item) === JSON.stringify(extModel));

      } else {
        if (this.jbSelect.indexOf(',') === -1) {
          modelUp = selObj[this.jbSelect];  // Select 1 prop
        } else {
          modelUp = JbObject.keyMap.call(selObj, this.jbSelect); // Select filtered props
        }
      }
    }

    // console.log(new Date(), 'propagateModelUp', selModel);
    this.jbBeforeChange.emit({
      // currentValue: this.ngControl.value,  // TODO: find a better way
      nextValue: modelUp
    });

    // In case this comes from NG_VALUE_ACCESSOR -> writeValue(), the ngModel is already set (no need to propagate up)
    if (!writeValue || writeValue.value !== modelUp) {
      this.propagateModelUp(modelUp); // This triggers NG_VALIDATORS -> validate()
    }

  };


  // Determine how to display the selected option on the input
  public setModelText = (value) => {
    if (!this.isModelEmpty || this.jbEmptyLabel) { // When item selected, show the rendered value on the input
      this.selModelText = value;

      // If rendering html on the list, when selecting an item we need to strip out the html to display it into the input
      if (this.jbHtmlRender) { this.selModelText = value.replace(/<.*?>/g, ''); }

      this.inputText = this.selModelText;
      this.inputPlaceholder = this.selModelText; // Keep it, so when expanding (and clear inputText) still display it

    } else {  // When selecting 'Empty' (with no custom label), leave the input blank
      this.selModelText = '';
      this.inputText = '';
      this.inputPlaceholder = this.renderedPlaceholder;
    }
  };

}
