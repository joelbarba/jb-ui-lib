import { Component, Input, Output, EventEmitter, forwardRef} from '@angular/core';
import { OnInit, OnChanges, AfterViewInit, OnDestroy} from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import {JbUiLibTransService} from '../abstract-translate.service';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Patterns} from '../patterns';
import {JbDefer} from '../jb-defer/jb-defer';

export interface IjbInputCtrl {
  getControl  ?: { _: FormControl };
  inputCtrl$  ?: Observable<FormControl>;
  setFocus    ?: { () };
  setBlur     ?: { () };
  setDirty    ?: { (opts?) };
  setPristine ?: { (opts?) };
  removeError ?: { () };
  addError    ?: { (err) };
  refresh     ?: { () };
}

export type TExtCtrl$ =
  { action: 'setFocus'    }
| { action: 'setBlur'     }
| { action: 'setDirty',    opts?: any }
| { action: 'setPristine', opts?: any }
| { action: 'addError',    label?: string }
| { action: 'removeError' }
| { action: 'refresh'     };


@Component({
  selector: 'jb-input',
  templateUrl: './jb-input.component.html',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => JbInputComponent),
    },
    { // Custom validator
      provide: NG_VALIDATORS, multi: true,
      useExisting: forwardRef(() => JbInputComponent),
    }
  ]
})
export class JbInputComponent implements ControlValueAccessor, OnInit, OnChanges, AfterViewInit, OnDestroy {
  private ngControl;
  public jbModel: any; // Internal to hold the linked ngModel on the wrapper

  @Input() jbLabel = '';          // Text for the label above the input. Translation applied.
  @Input() jbRequired = false;   // It adds the required validator to the ngModel (input), meaning that the required field styles will be applied on the label and input.
  @Input() jbDisabled = false;   // True=Input disabled. False=Input enabled.
  @Input() jbPlaceholder = '';    // It adds a placeholder text onto the input. Translation applied.

  @Input() jbType: 'text' | 'number' | 'email' | 'password' = 'text';  // Set a type on the input (text by default)

  @Input() jbTooltip = '';
  @Input() jbTooltipPos = 'top';    // If tooltip on the label, specific position (top by default)
  @Input() jbTooltipBody = true;
  @Input() jbDisabledTip: string;   // Label for the text of the tooltip to display when the input is disabled

  // @Input() jbName: string = '';    // The name attribute specifies the name of an <input> element
  @Input() jbLeftBtnIcon: string;   // Icon to show into a button on the left of the input (prepend addon https://getbootstrap.com/docs/4.3/components/input-group/#button-addons)
  @Input() jbRightBtnIcon: string;  // Icon to show into a button on the right of the input (append addon)
  @Input() jbLeftBtnText: string;   // Text to show into a button on the left of the input (prepend addon)
  @Input() jbRightBtnText: string;  // Text to show into a button on the left of the input (append addon)

  @Input() jbAutoFocus = false; // If true, once input linked to the view is automatically focused
  @Input() jbAutocomplete = false; // If true, once the input is clicked, the previous value will be suggested

  @Input() jbMinlength = null;  // Min number of chars. Built in validator (minlength). Null means no min
  @Input() jbMaxlength = null;  // Max number of chars. Built in validator (maxlength). Null means no max. It blocks input if limit.
  @Input() jbPattern = null;    // Regex validator. Built in validator (pattern). Null means no validation.

  @Input() jbValidType: keyof typeof Patterns = null;  // Predefined validator patterns. It overrides jbPattern
  @Input() jbValidIf: boolean;  // Inline boolean expression to determine validity (true=valid, false=invalid)

  // Callback custom validator function. It is called every time the internal ngModel validates its value.
  // As a parameter, it passes the current value of the model. It should return null (valid) or error object (invalid)
  @Input() jbValidator: (value, ops: { value, status, errors, prevErrors, ctrl }) => any;

  @Input() jbErrorText: string;   // Custom error text (label) to display when invalid value
  @Input() jbErrorPos: 'top-right' | 'bottom-left' | 'bottom-right' | 'none';  // Custom position where to display the error text

  @Input() jbIcon = '';             // Icon to show into the input floating at the right hand side (this is replace by jbValidIcon and jbInvalidIcon)
  @Input() jbValidIcon = '';        // Icon to show when the value is dirty and valid (by default none).
  @Input() jbInvalidIcon = 'icon-warning22'; // Icon to show when the value is dirty and invalid (by default icon-warning22)
  @Input() jbErrorOnPristine = false; // If true, errors will be shown in pristine state too (by default pristine shows as valid always)


  @Output() jbLeftBtnClick = new EventEmitter<any>();   // Emitter for left addon button
  @Output() jbRightBtnClick = new EventEmitter<any>();  // Emitter for right addon button
  @Output() jbOnAutofill = new EventEmitter<any>();     // Emitter when a browser autofill is detected
  @Output() jbOnKeyDown = new EventEmitter<any>();      // Emitter when a key is pressed
  @Output() jbOnEsc = new EventEmitter<any>();          // Emitter when esc key is pressed
  @Output() jbOnEnter = new EventEmitter<any>();        // Emitter when Enter is pressed
  @Output() jbOnCtrlEnter = new EventEmitter<any>();    // Emitter when Ctrl+Enter is pressed

  @Output() jbOnLoaded = new EventEmitter<IjbInputCtrl>();  // Emitter to catch the moment when the component is ready (ngAfterViewInit)
  @Output() jbBeforeChange = new EventEmitter<any>();       // Emitter to catch the next value before it is set

  @Input() extCtrl$: Observable<any>; // To trigger actions manually from an external observable (subject)



  public autocomplete = 'off';
  public jbLabelTrans$ = of('');        // Translated text for the label
  public jbTooltipTrans$ = of('');      // Translated text for the tooltip of the label
  public jbPlaceholderTrans$ = of('');  // Translated text for the placeholder of the input
  public jbDisabledTipTrans$ = of('');  // Translated text for the disabled tooltip of the input
  public errorTextTrans$ = of('');      // Translated text for the error message
  public errTxtRequired$ = of('');      // Default error text for required
  public errTxtMinLen$ = of('');        // Default error text for minlength
  public errTxtMaxLen$ = of('');        // Default error text for maxlength

  // Status of the jbInput. Pristine will be valid even if the value is wrong (unless jbErrorOnPristine)
  public status: 'valid' | 'error' | 'loading' = 'valid';  // pristine, valid, error, loading

  public displayIcon = '';
  public errorPosition = 'default';
  public isPristine = true;
  public isFocus = false; // Whether the focus is on the input
  public hasAutofillDetection = false;  // Whether is has autofill detection (any parameter linked to jbOnAutofill)
  public manualError = null; // Manual error (set through addError() / removeError())
  public ctrlSubs;  // Subscription to external control observable
  private readonly ctrlObject; // Hold an object with the input controller and the action methods
  private inputCtrlDefer = new JbDefer();  // This is resolved once inputCtrl is initialized


  // Link and hook up the internal input FormControl
  public ngInputRef: ElementRef; // <-- internal input ref
  public inputCtrl: FormControl; // <-- ngInputRef.control
  @ViewChild('ngInputRef', { static: false }) set content(content: ElementRef) {
    if (content && !this.ngInputRef) {
      this.ngInputRef = content;
      this.inputCtrl = content['control'];
      // this.inputCtrlDefer.promise.then(() => this.inputCtrl.setValidators(this.customValidator)); // add validators
      this.inputCtrlDefer.resolve(this.inputCtrl);
    }
  }



  constructor(
    private translate: JbUiLibTransService,
    private elementRef: ElementRef,
    // public ngControl: NgControl
  ) {
    // ngControl.valueAccessor = this;
    this.errorTextTrans$ = this.translate.getLabel$('view.common.invalid_value'); // Default error message
    this.errTxtRequired$ = this.translate.getLabel$('view.common.required_field');
    this.errTxtMinLen$ = this.translate.getLabel$('view.common.invalid_min_length');
    this.errTxtMaxLen$ = this.translate.getLabel$('view.common.invalid_max_length');


    const updateCtrl = () => { if (this.ngControl) { this.ngControl.updateValueAndValidity(); }};
    this.ctrlObject = {
      setFocus    : () => this.elementRef.nativeElement.querySelector('input').focus({ preventScroll: false }),
      setBlur     : () => this.elementRef.nativeElement.querySelector('input').blur(),
      setDirty    : (opts?) => { this.inputCtrl.markAsDirty(opts); updateCtrl(); },
      setPristine : (opts?) => { this.inputCtrl.markAsPristine(opts); updateCtrl(); },
      refresh     : () => updateCtrl(),
      removeError : ()      => {
        if (this.manualError !== null) { this.manualError = null; updateCtrl(); }
      },
      addError : (err)   => {
        if (JSON.stringify(this.manualError) !== JSON.stringify(err)) { this.manualError = err; updateCtrl(); }
      },
    };
  }



  ngOnChanges(change) {
    // console.log('ngOnChanges', change);

    if (change.hasOwnProperty('jbValidator')) {
      this.inputCtrlDefer.promise.then(() => this.inputCtrl.updateValueAndValidity());
    }

    // Generate new observables for the dynamic text
    if (change.hasOwnProperty('jbLabel'))        { this.jbLabelTrans$ = this.translate.getLabel$(this.jbLabel); }
    if (change.hasOwnProperty('jbTooltip'))      { this.jbTooltipTrans$ = this.translate.getLabel$(this.jbTooltip); }
    if (change.hasOwnProperty('jbPlaceholder'))  { this.jbPlaceholderTrans$ = this.translate.getLabel$(this.jbPlaceholder); }
    if (change.hasOwnProperty('jbDisabledTip'))  { this.jbDisabledTipTrans$ = this.translate.getLabel$(this.jbDisabledTip); }
    if (change.hasOwnProperty('jbErrorText'))    { this.errorTextTrans$ = this.translate.getLabel$(this.jbErrorText); }

    if (change.hasOwnProperty('jbErrorPos') && this.jbErrorPos) { this.errorPosition = this.jbErrorPos; }

    if (change.hasOwnProperty('jbType'))  {
      if (this.jbType !== 'text' && this.jbType !== 'number' && this.jbType !== 'password' && this.jbType !== 'email') {
        this.jbType = 'text';
      }
    }

    if (!this.jbErrorText) {
      if (change.hasOwnProperty('jbRequired'))  { this.errorTextTrans$ = this.errTxtRequired$; }
      if (change.hasOwnProperty('jbMinlength')) { this.errorTextTrans$ = this.errTxtMinLen$; }
      if (change.hasOwnProperty('jbMaxlength')) { this.errorTextTrans$ = this.errTxtMaxLen$; }
    }


    // Pre defined ngPatterns (only when no jbPattern)
    if (change.hasOwnProperty('jbValidType') && !(change.hasOwnProperty('jbPattern') && change.jbPattern.currentValue)) {
      this.jbPattern = this.jbValidType ? Patterns[this.jbValidType] : null;
    }

    if (change.hasOwnProperty('jbAutoFocus') && !!this.jbAutoFocus) {
      setTimeout(() => {  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
        this.elementRef.nativeElement.querySelector('input').focus({ preventScroll: false });
      }, 50);
    }

    if (change.hasOwnProperty('jbAutocomplete')) {
      this.autocomplete = this.jbAutocomplete ? 'on' : 'off';
    }

    // External control via extCtrl$
    if (change.hasOwnProperty('extCtrl$')) {
      if (!!this.ctrlSubs) { this.ctrlSubs.unsubscribe(); }
      this.ctrlSubs = this.extCtrl$.subscribe((op: TExtCtrl$) => {
        if (op.action === 'setFocus')    { this.ctrlObject.setFocus(); }
        if (op.action === 'setBlur')     { this.ctrlObject.setBlur(); }
        if (op.action === 'setDirty')    { this.ctrlObject.setDirty(op.opts); }
        if (op.action === 'setPristine') { this.ctrlObject.setPristine(op.opts); }
        if (op.action === 'addError')    { this.ctrlObject.addError(op); }
        if (op.action === 'removeError') { this.ctrlObject.removeError(); }
        if (op.action === 'refresh')     { this.ctrlObject.refresh(); }
      });
    }


    // When this runs (before ngAfterViewInit) recalculate validations manually
    if (this.inputCtrl && this.ngControl) {
      setTimeout(() => { // wait for CUSTOM_VALIDATOR run first
        this.ngControl.updateValueAndValidity(); // --> triggers NG_VALIDATORS -> validate() -> updateStatus()
        // this.propagateModelUp(this.jbModel);  // This would force NG_VALIDATORS too, but also trigger ngModelChange
      });
    }
  }

  ngOnInit() {
    // console.log('ngOnInit');
    // We are using a similar hack than these guys: https://medium.com/@brunn/detecting-autofilled-fields-in-javascript-aed598d25da7
    // to detect the autofill through a css animation listener
    this.hasAutofillDetection = this.jbOnAutofill.observers.length > 0; // Check if there's anything listening to autofill detection
    if (this.hasAutofillDetection) {
      this.elementRef.nativeElement.querySelector('input').addEventListener('animationstart', ($event) => { this.jbOnAutofill.emit($event); });
      this.elementRef.nativeElement.querySelector('input').addEventListener('webkitAnimationStart', ($event) => { this.jbOnAutofill.emit($event); });
    }
  }

  ngAfterViewInit() {
    // console.log('ngAfterViewInit');
    this.inputCtrlDefer.promise.then(() => {
      this.jbOnLoaded.emit({ // expose the formControl
        inputCtrl$ : this.inputCtrl ? this.inputCtrl.statusChanges.pipe(map(status => this.inputCtrl)) : null,
        ...this.ctrlObject,  // Add control methods here too
        inputCtrl: this.inputCtrl,
      });
    });
  }

  ngOnDestroy() {
    if (!!this.ctrlSubs) { this.ctrlSubs.unsubscribe(); }
  }


  // ------- ControlValueAccessor -----

  public propagateModelUp = (_: any) => {}; // This is just to avoid type error (it's overwritten on register)
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }


  // NG_VALUE_ACCESSOR --> This is triggered every time the external <jb-input [ngModel]> changes (propagate down)
  // It is also triggered twice when the component is first initialized
  //   1 - Before #ngInputRef is set (value always null)
  //   2 - After #ngInputRef is set (initial ngModel value from outside)
  public writeValue = (value: any) => {
    this.jbModel = (value || value === 0) ? value : '';
    // console.log('writeValue -> ', value, 'jbModel=', this.jbModel);

    if (this.inputCtrl && this.ngControl) {
      // setTimeout(() => this.ngControl.updateValueAndValidity()); // --> force NG_VALIDATORS

      // Set the value to the internal input formControl to force the internal validators run
      // so when the external validate() is triggered after this it gets the last value
      this.inputCtrl.setValue(this.jbModel, { emitViewToModelChange: false }); // https://angular.io/api/forms/FormControl#setValue
    }
  };

  // NG_VALIDATORS: To determine the <jb-input [ngModel]> formControl status. Triggered:
  //   - After writeValue()
  //   - After propagateModelUp()
  //   - After this.ngControl.updateValueAndValidity()
  public validate = (extFormCtrl: FormControl) => {
    // console.log('NG_VALIDATORS. ngControl = ', !!extFormCtrl, '. inputCtrl = ', !!this.inputCtrl);
    let result = null;  // null means valid
    this.ngControl = extFormCtrl; // FormControl of the external ngModel

    // Ignore first writeValue() when internal input is not ready yet (always VALID)
    if (!this.inputCtrl) { return null; } // this.inputCtrl  <-- FormControl of the internal ngModel


    // Propagates upward the state of the internal ngModel
    if (this.inputCtrl.status === 'INVALID') { result = this.inputCtrl.errors; }

    if (this.jbValidIf === false) { result = { label: 'view.common.invalid_value' }; }

    if (this.jbValidator && typeof this.jbValidator === 'function') {
      result = this.jbValidator(this.inputCtrl.value, {
        value: this.inputCtrl.value,
        status: this.inputCtrl.status,
        errors: result,
        prevErrors: this.ngControl.errors,
        ctrl: this.ctrlObject });
    }

    if (this.manualError) { result = this.manualError; }

    setTimeout(() => this.updateStatus());  // Update status (defer so ngControl gets updated first)
    return result;
  };


  // // Custom validator for the internal ngModel (input)
  // public customValidator = (intFormCtrl?) => {
  //   console.error('CUSTOM_VALIDATOR. ngControl = ', !!this.ngControl, '. inputCtrl = ', !!this.inputCtrl);
  //   let result = null; // no error
  //   return result;
  // };



  // ------------------------------------


  // Internal (ngModelChange)
  public parseModelChange = (value) => {
    // console.log('parseModelChange', value);
    if (this.jbType === 'number') { // Number type conversion
      value = value && value !== 0 ? Number(value) : null;
    }
    this.jbBeforeChange.emit({ currentValue: this.jbModel, nextValue: value });
    this.jbModel = value;
    this.propagateModelUp(this.jbModel);
    // console.log('propagateModelUp (ngModel) -> ', this.jbModel);
  };

  // Updates the state of the jbInput. Always triggered after NG_VALIDATORS -> validate()
  // Produce new values for: [status, displayIcon, isPristine, errorTextTrans$]
  public updateStatus = () => {
    // console.warn('updateStatus -> inputCtrl = ', this.inputCtrl.status, this.inputCtrl.errors, 'ngControl = ', this.ngControl.status, this.inputCtrl.errors);
    this.status = 'valid';
    this.displayIcon = this.jbIcon;
    if (this.ngControl && this.inputCtrl) {
      // this.ngControl.status can be: [VALID, INVALID, PENDING, DISABLED]
      if (this.ngControl.status === 'INVALID' && (!this.inputCtrl.pristine || this.jbErrorOnPristine)) {
        this.status = 'error';
        this.displayIcon = this.jbIcon || this.jbInvalidIcon;
        if (!this.jbErrorText) {
          const errors = this.ngControl.errors;
          this.errorTextTrans$ = this.translate.getLabel$('view.common.invalid_value', errors);

          if (errors.required) {
            this.errorTextTrans$ = this.errTxtRequired$;
          }
          if (errors.minlength) {
            this.errorTextTrans$ = this.translate.getLabel$('view.common.invalid_min_length', { min: this.inputCtrl.errors.minlength.requiredLength });
          }
          if (errors.maxlength) {
            this.errorTextTrans$ = this.translate.getLabel$('view.common.invalid_max_length', { max: this.inputCtrl.errors.maxlength.requiredLength });
          }
          if (errors.pattern) {
            this.errorTextTrans$ = this.translate.getLabel$('view.common.invalid_pattern');
          }
          if (errors.label) {
            this.errorTextTrans$ = this.translate.getLabel$(errors.label, errors);
          }
          if (!!this.manualError && this.manualError.label) {
            this.errorTextTrans$ = this.translate.getLabel$(this.manualError.label, this.manualError);
          }
        }
      }

      if (this.ngControl.status === 'VALID') {
        this.status = 'valid';
        if (!this.inputCtrl.pristine || this.jbErrorOnPristine) {
          this.displayIcon = this.jbIcon || this.jbValidIcon;
        }
      }

      this.isPristine = this.inputCtrl.pristine;
      if (this.ngControl) {
        if (this.isPristine && !this.ngControl.pristine) { this.ngControl.markAsPristine(); }
        if (!this.isPristine && this.ngControl.pristine) { this.ngControl.markAsDirty(); }
      }
    }

    // Special spinning icon
    if (this.displayIcon === 'loading') { this.displayIcon = 'icon-loop32'; }
  };



  // React on key events (on the input)
  public triggerKey = (event) => {
    if (event.key === 'Escape') { this.jbOnEsc.emit(event); }
    if (event.key === 'Enter') { this.jbOnEnter.emit(event); }
    if (event.key === 'Enter' && event.ctrlKey) { this.jbOnCtrlEnter.emit(event); }
    this.jbOnKeyDown.emit(event);
  }
}
