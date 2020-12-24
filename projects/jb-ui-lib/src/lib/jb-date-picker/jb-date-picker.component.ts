import {Component, OnInit, Input, forwardRef, OnDestroy, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Inject} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {JbUiLibTransService} from '../abstract-translate.service';
import {NgbDateStruct, NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';
import JbString from '../jb-prototypes/string.prototype';
import {DatePipe} from '@angular/common';
import { Subscription } from 'rxjs';


@Component({
  selector: 'jb-date-picker',
  templateUrl: './jb-date-picker.component.html',
  styleUrls: [],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => JbDatePickerComponent)
    },
    { // Custom validator
      provide: NG_VALIDATORS, multi: true,
      useExisting: forwardRef(() => JbDatePickerComponent),
    }
  ]
})
export class JbDatePickerComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
  private ngControl;  // Reference to the parent model controller
  public jbModel: NgbDateStruct; // Internal to hold the ngModel inside the wrapper

  @Input() jbLabel = '';
  @Input() jbRequired = false;
  @Input() jbDisabled = false;
  @Input() jbLocale: string;        // To fix a format for the date to display (overrides translation.locale$)
  @Input() jbFormat = 'shortDate';  // Format to display the date
  @Input() jbHasClearBtn = false;   // Whether to add a clear button on the input
  @Input() jbMinDate: string;   // 'yyyy-mm-dd'
  @Input() jbMaxDate: string;   // 'yyyy-mm-dd'

  @Input() jbTooltip = '';
  @Input() jbTooltipPos = 'top';
  @Input() jbTooltipBody = true;

  @Input() jbErrorPos = 'top-right';  // top-right, bottom-left, bottom-right
  @Input() jbErrorText: string;       // Error text to display when invalid value
  @Input() jbIsInlineDatePicker: boolean; // flag to determine if the date-picker should be inline or not

  @ViewChild('dpRef', { static: true }) datePickerRef: NgbInputDatepicker;

  public isPristine = true;
  public status = 'valid';            // valid, error
  public errorPosition = 'default';   // where to display the error message (from jbErrorPos)
  public jbFormattedValue = '';       // String to display in the input
  public errorText = 'view.common.invalid_value';  // Internal error label (from jbErrorText)
  public ngbMinDate: NgbDateStruct = null;
  public ngbMaxDate: NgbDateStruct = null;
  public isTodayValid = true;         // Whether the min/max validation allows today as a valid option
  public locale: string;

  private localeSubscription$: Subscription;

  constructor(
    @Inject(JbUiLibTransService) private translate: JbUiLibTransService,
  ) {}


  // ------- ControlValueAccessor -----

  public propagateModelUp = (_: any) => {};
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }

  // ControlValueAccessor --> writes a new value from the external ngModel into the internal ngModel
  // This is triggered by setUpControl in FormControl directive outside this component
  public writeValue = (value: any) => {
    // console.log('writeValue -> ', value);

    this.jbModel = this.parseModelIn(value);
    setTimeout(() => this.onInternalModelChange(true)); // Update status (after internal ngModel cycle)
  };


  // NG_VALIDATORS provider triggers this validation
  // Validation to determine the outer formControl state. It propagates upward the status of the form element
  public validate = (extFormCtrl: FormControl) => {
    this.ngControl = extFormCtrl; // Save the reference

    if (this.status === 'error') {
      return { error: this.errorText };
    } else {
      return null; // valid
    }
  };

  ngOnInit() {
    if (this.translate.locale$) {
      this.localeSubscription$ = this.translate.locale$.subscribe(locale => {
        this.locale = locale;
        this.onInternalModelChange(true);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.jbLocale) { this.onInternalModelChange(true); }
    if (!!changes.jbFormat) { this.onInternalModelChange(true); }
    if (!!changes.hasOwnProperty('jbMinDate')) { this.ngbMinDate = this.parseModelIn(this.jbMinDate); this.updateStatus(); }
    if (!!changes.hasOwnProperty('jbMaxDate')) { this.ngbMaxDate = this.parseModelIn(this.jbMaxDate); this.updateStatus(); }

    if (changes.hasOwnProperty('jbErrorPos') && this.jbErrorPos) { this.errorPosition = this.jbErrorPos; }
  }

  ngOnDestroy() {
    if (this.localeSubscription$) {
      this.localeSubscription$.unsubscribe();
    }
  }


  // Convert incoming string to ngb  '2020-01-19' --> { day: 19, month: 1, year: 2020 }
  public parseModelIn = (value: string): NgbDateStruct => {
    if (!value) { return null; }

    // Check expected format 'yyyy-mm-dd'
    if (isNaN(+value[0]) || isNaN(+value[1]) || isNaN(+value[2]) || isNaN(+value[3]) || value[4] !== '-' ||
        isNaN(+value[5]) || isNaN(+value[6]) || value[7] !== '-' || isNaN(+value[8]) || isNaN(+value[9])) {
      console.warn(`Unexpected format: ${value} !== 'yyyy-mm-dd'`);
    }

    const dateArr: Array<string> = value.split('-');

    // Extract year
    const year = parseInt(dateArr[0].slice(0, 4));
    if (Number.isNaN(year)) { return null; }
    const modelOut: NgbDateStruct = { year: +year, month: 1, day: 1 };

    // Extract month
    if (dateArr.length >= 2) {
      const month = parseInt(dateArr[1].slice(0, 2));
      if (!Number.isNaN(month)) { modelOut.month = +month; }
    }

    // Extract day
    if (dateArr.length >= 3) {
      const day = parseInt(dateArr[2].slice(0, 2));
      if (!Number.isNaN(day)) { modelOut.day = +day; }
    }

    return modelOut;
  };

  // Convert incoming ngb to string   { day: 19, month: 1, year: 2020 } --> '2020-01-19'
  public parseModelOut = (value: NgbDateStruct): string => {
    if (!value) { return null; }
    const year  = JbString.pad.call('' + (value.year  || 1), 4).slice(0, 4);
    const month = JbString.pad.call('' + (value.month || 1), 2).slice(0, 2);
    const day   = JbString.pad.call('' + (value.day   || 1), 2).slice(0, 2);
    return year + '-' + month + '-' + day;
  };


  // When the internal modal changes
  public onInternalModelChange = (externalTrigger = false) => {
    if (!externalTrigger) { this.isPristine = false; }

    // https://angular.io/api/common/DatePipe
    this.jbFormattedValue = new DatePipe(this.jbLocale || this.locale || 'en-IE').transform(this.parseModelOut(this.jbModel), this.jbFormat) || '';

    this.updateStatus();
    this.propagateModelUp(this.parseModelOut(this.jbModel), );
    if (!!this.ngControl && this.isPristine) { this.ngControl.markAsPristine(); } // Do not dirty it if pristine
  };


  // Update the internal status of the component
  public updateStatus = () => {
    this.status = 'valid';

    if (this.jbRequired && !this.jbModel) {
      this.status = 'error';
      this.errorText = this.jbErrorText || 'view.common.required_field';
    }

    const minVal = this.getNumDate(this.ngbMinDate, 0);
    const maxVal = this.getNumDate(this.ngbMaxDate, 99999999);
    const modelVal = this.getNumDate(this.jbModel);

    // Check valid range jbMinDate <= jbMaxDate
    if (this.ngbMinDate && this.ngbMaxDate) {
      if (minVal > maxVal) {
        console.warn(`jbMinDate (${this.jbMinDate}) > jbMaxDate (${this.jbMaxDate})`);
        this.ngbMinDate = null;
        this.ngbMaxDate = null;
      }
    }

    if (this.ngbMinDate && this.jbModel && modelVal < minVal) {
      console.warn('Value lower than min', this.jbMinDate, this.jbModel);
      this.status = 'error';
      this.errorText = this.jbErrorText || 'view.common.invalid_value';
    }

    if (this.ngbMaxDate && this.jbModel && modelVal > maxVal) {
      console.warn('Value greater than max', this.jbMaxDate, this.jbModel);
      this.status = 'error';
      this.errorText = this.jbErrorText || 'view.common.invalid_value';
    }

    const today = new Date();
    const todayNum = this.getNumDate({ year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() }, 0);
    this.isTodayValid = (todayNum >= minVal && todayNum <= maxVal);
  };

  private getNumDate = (date: NgbDateStruct, defaultValue = null): number => {
    return !!date ? (date.year * 10000) + (date.month * 100) + date.day : defaultValue;
  };


  // Click on "X" button to clear the value (turn it null)
  public clearValue = ($event, dpRef) => {
    this.jbModel = null;
    this.onInternalModelChange();

    dpRef.close();
    $event.stopPropagation();
  };


  // Set date to current day
  public setToday = ($event, dpRef) => {
    const today = new Date();
    this.jbModel = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
    this.onInternalModelChange();
    dpRef.close();
  }

}
