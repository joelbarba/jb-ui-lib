import {Component, OnInit, Input, Output, EventEmitter, forwardRef, OnChanges, AfterViewInit} from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { JbUiLibTransService} from '../abstract-translate.service';
import { Observable, of } from 'rxjs';
import {JbDefer} from '../jb-defer/jb-defer';
import {map} from 'rxjs/operators';
import {IjbInputCtrl} from '../jb-input/jb-input.component';

@Component({
  selector: 'jb-textarea',
  templateUrl: './jb-textarea.component.html',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => JbTextareaComponent),
    },
    { // Custom validator
      provide: NG_VALIDATORS, multi: true,
      useExisting: forwardRef(() => JbTextareaComponent),
    }
  ]
})
export class JbTextareaComponent implements ControlValueAccessor, OnInit, OnChanges, AfterViewInit {
  private ngControl;
  public jbModel: string; // Internal to hold the linked ngModel on the wrapper

  @Input() jbLabel = '';
  @Input() jbRequired = false;
  @Input() jbDisabled = false;
  @Input() jbRows = 4;
  @Input() jbPlaceholder = '';

  @Input() jbTooltip = '';
  @Input() jbTooltipPos = 'top';
  @Input() jbTooltipBody = true;

  @Input() jbErrorPos = 'top-right';  // top-right, bottom-left, bottom-right
  @Input() jbErrorText: string;   // Custom error text (label) to display when invalid value
  @Input() jbErrorOnPristine = false; // If true, errors will be shown in pristine state too (by default pristine shows as valid always)

  @Input() jbAutoFocus = false; // If true, once input linked to the view is automatically focused

  @Input() jbMinlength = null;  // Min number of chars. Built in validator (minlength)
  @Input() jbMaxlength = null;  // Max number of chars. Built in validator (maxlength). Null means no max. It blocks input if limit.
  @Input() jbPattern = null;    // Regex validator. Built in validator (pattern). Null means no validation.
  @Input() jbValidIf: boolean;  // Inline boolean expression to determine validity (true=valid, false=invalid)

  // Callback custom validator function. It is called every time the internal ngModel validates its value.
  // As a parameter, it passes the current value of the model. It should return null (valid) or error object (invalid)
  @Input() jbValidator: (value, ops: { value, status, errors, prevErrors, ctrl }) => any;

  @Output() jbOnKeyDown = new EventEmitter<any>();  // Emitter when a key is pressed
  @Output() jbOnEsc = new EventEmitter<any>();      // Emitter when esc key is pressed
  @Output() jbOnSave = new EventEmitter<any>();     // Emitter when Ctrl+Enter

  @Output() jbOnLoaded = new EventEmitter<IjbInputCtrl>();  // Emitter to catch the moment when the component is ready (ngAfterViewInit)
  @Output() jbBeforeChange = new EventEmitter<any>();       // Emitter to catch the next value before it is set


  public status = 'pristine';      // pristine, valid, error, loading

  public jbLabelTrans$: Observable<string> = of('');        // Translated text for the label
  public jbPlaceholderTrans$: Observable<string> = of('');  // Translated text for the placeholder
  public jbTooltipTrans$: Observable<string> = of('');      // Translated text for the tooltip
  public errorTextTrans$: Observable<string> = of(''); // Translated text for the error message

  public errTxtRequired$: Observable<string> = of(''); // Default error text for required
  public errTxtMinLen$: Observable<string> = of('');   // Default error text for minlength
  public errTxtMaxLen$: Observable<string> = of('');   // Default error text for maxlength

  public errorPosition = 'default';
  public isFocus = false; // Whether the focus is on the input
  public isPristine = true;

  public manualError = null; // Manual error (set through addError() / removeError())
  private readonly ctrlObject; // Hold an object with the input controller and the action methods
  private inputCtrlDefer = new JbDefer();  // This is resolved once inputCtrl is initialized

  // Link and hook up the internal textarea FormControl
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
  ) {
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



  // ------------------------------------

  ngOnChanges(change) { // Translate jbText whenever it changes

    if (change.hasOwnProperty('jbValidator')) {
      this.inputCtrlDefer.promise.then(() => this.inputCtrl.updateValueAndValidity());
    }

    if (change.hasOwnProperty('jbLabel'))       { this.jbLabelTrans$       = this.translate.getLabel$(this.jbLabel); }
    if (change.hasOwnProperty('jbPlaceholder')) { this.jbPlaceholderTrans$ = this.translate.getLabel$(this.jbPlaceholder); }
    if (change.hasOwnProperty('jbTooltip'))     { this.jbTooltipTrans$     = this.translate.getLabel$(this.jbTooltip); }
    if (change.hasOwnProperty('jbErrorText'))   { this.errorTextTrans$     = this.translate.getLabel$(this.jbErrorText); }

    if (change.hasOwnProperty('jbErrorPos') && this.jbErrorPos) { this.errorPosition = this.jbErrorPos; }

    if (!this.jbErrorText) {
      if (change.hasOwnProperty('jbRequired'))  { this.errorTextTrans$ = this.errTxtRequired$; }
      if (change.hasOwnProperty('jbMinlength')) { this.errorTextTrans$ = this.errTxtMinLen$; }
      if (change.hasOwnProperty('jbMaxlength')) { this.errorTextTrans$ = this.errTxtMaxLen$; }
    }


    // When this runs (before ngAfterViewInit) recalculate validations manually
    if (this.inputCtrl && this.ngControl) {
      setTimeout(() => { // wait for CUSTOM_VALIDATOR run first
        this.ngControl.updateValueAndValidity(); // --> triggers NG_VALIDATORS -> validate() -> updateStatus()
        // this.propagateModelUp(this.jbModel);  // This would force NG_VALIDATORS too, but also trigger ngModelChange
      });
    }

    if (change.hasOwnProperty('jbAutoFocus') && !!this.jbAutoFocus) {
      setTimeout(() => {  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
        this.elementRef.nativeElement.querySelector('textarea').focus({ preventScroll: false });
      }, 50);
    }
  }


  ngOnInit() { }

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


  // ------- ControlValueAccessor -----

  public propagateModelUp = (_: any) => {}; // This is just to avoid type error (it's overwritten on register)
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }

  // ControlValueAccessor --> writes a new value from the external ngModel into the internal ngModel
  // This is triggered by setUpControl in FormControl directive outside this component
  public writeValue = (value: any) => {
    this.jbModel = value ? value : '';
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


  // ------------------------------------

  // Internal (ngModelChange)
  public parseModelChange = (value) => {
    // console.log('parseModelChange', value);
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
    if (this.ngControl && this.inputCtrl) {
      // this.ngControl.status can be: [VALID, INVALID, PENDING, DISABLED]
      if (this.ngControl.status === 'INVALID' && (!this.inputCtrl.pristine || this.jbErrorOnPristine)) {
        this.status = 'error';
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
      }

      this.isPristine = this.inputCtrl.pristine;
      if (this.ngControl) {
        if (this.isPristine && !this.ngControl.pristine) { this.ngControl.markAsPristine(); }
        if (!this.isPristine && this.ngControl.pristine) { this.ngControl.markAsDirty(); }
      }
    }

  };


  public triggerKey = (event) => {
    if (event.key === 'Enter' && event.ctrlKey) { this.jbOnSave.emit(event); }
    if (event.key === 'Escape') { this.jbOnEsc.emit(event); }
    this.jbOnKeyDown.emit(event);
  }
}
