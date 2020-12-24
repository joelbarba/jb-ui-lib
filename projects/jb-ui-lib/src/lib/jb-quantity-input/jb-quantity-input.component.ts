import {Component, forwardRef, Input, OnChanges, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {JbUiLibTransService} from '../abstract-translate.service';

@Component({
  selector: 'jb-quantity-input',
  templateUrl: './jb-quantity-input.component.html',
  styleUrls: [],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => JbQuantityInputComponent)
  }]
})
export class JbQuantityInputComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input() jbMinVal;
  @Input() jbMaxVal;
  @Input() jbDisabled = false;
  @Input() jbLabel = '';
  @Input() jbTooltip = '';
  @Input() jbTooltipPos = 'top';
  @Input() jbTooltipBody = true;

  public jbModel = 0; // internal value
  public previousValue = 0; // keep last value to rollback when invalid
  public decBtnEnabled = true;
  public incBtnEnabled = true;

  public jbLabelTrans$: Observable<string> = of('');        // Translated text for the label
  public jbTooltipTrans$: Observable<string> = of('');      // Translated text for the tooltip

  constructor(
    private translate: JbUiLibTransService,
  ) {}

  ngOnChanges(changes) {
    if (changes.hasOwnProperty('jbLabel'))   { this.jbLabelTrans$   = this.translate.getLabel$(this.jbLabel); }
    if (changes.hasOwnProperty('jbTooltip')) { this.jbTooltipTrans$ = this.translate.getLabel$(this.jbTooltip); }

    if (changes.hasOwnProperty('jbMinVal')) { this.jbMinVal = this.checkRangeValue(this.jbMinVal); }
    if (changes.hasOwnProperty('jbMaxVal')) { this.jbMaxVal = this.checkRangeValue(this.jbMaxVal); }

    if (this.jbMinVal !== undefined && this.jbMaxVal !== undefined && this.jbMaxVal < this.jbMinVal) {
      console.error('jbMinVal > jbMaxVal (', this.jbMinVal, '>', this.jbMaxVal, ')');
      this.jbMaxVal = this.jbMinVal;
    }

    this.modelChange(this.jbModel); // Update the model according to the new validations
  }

  ngOnInit() {}

  // Validate input value to a valid number or undefined (--> jbMinVal / jbMaxVal)
  checkRangeValue(value) {
    if (value === null) { value = undefined; }
    if (typeof value === 'string') { value = parseInt(value, 10); }
    if (Number.isNaN(value)) { value = undefined; }
    return value;
  }

  // Returns a valid value after all validations (--> jbModel)
  getValidValue = (value) => {
    if (value === null || value === '') { value = 0; }
    value = Number.parseInt(value, 10);

    if (Number.isNaN(value)) { value = this.previousValue; }
    value = Math.trunc(value);

    if (this.jbMinVal !== undefined && value < this.jbMinVal) { value = this.jbMinVal; }
    if (this.jbMaxVal !== undefined && value > this.jbMaxVal) { value = this.jbMaxVal; }

    // Enable/disable the inc/dec buttons
    this.decBtnEnabled = !this.jbDisabled && (this.jbMinVal === undefined || this.jbMinVal < value);
    this.incBtnEnabled = !this.jbDisabled && (this.jbMaxVal === undefined || this.jbMaxVal > value);

    return value;
  };


  // When rolling the wheel of the mouse, increment / decrement value
  onMouseWheel(event) {
    if (this.jbDisabled) { return; }

    if (event.wheelDelta > 0) {
      this.modelChange(this.jbModel + 1);
    } else {
      this.modelChange(this.jbModel - 1);
    }
    event.preventDefault();
    event.stopPropagation();
  }


  // Changing the value internally (propagate up)
  modelChange(value) {
    const nextVal = this.getValidValue(value);
    // console.log('modelChange ', this.jbModel, ' --->', nextVal);
    if (this.previousValue !== nextVal) {
      this.previousValue = nextVal;
      this.onChange(nextVal);
    }

    // Do it on the next cycle, so the input gets updated again after ngModel change
    setTimeout(() => { this.jbModel = nextVal; });
  }

  // ------- ControlValueAccessor ----- //

  onChange: any = (_: any) => {};
  onTouch: any = () => {};
  registerOnChange(fn: any) { this.onChange = fn; }
  registerOnTouched(fn: any) { this.onTouch = fn; }

  // When the value is changed externally (propagated down)
  writeValue(value) {
    const nextVal = this.getValidValue(value);
    // console.log('writeValue ', this.jbModel, ' --->', nextVal);
    this.previousValue = nextVal;
    if (value !== nextVal) { this.onChange(nextVal); } // If value was rectified, push it back up
    setTimeout(() => { this.jbModel = nextVal; }); // Avoid overlap with modelChange timeout
  }


}
