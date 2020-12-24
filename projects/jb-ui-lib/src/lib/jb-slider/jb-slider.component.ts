import {Component, forwardRef, Input, OnChanges, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Options} from 'ng5-slider';

interface JbRangeSliderValues {
  min: number;
  max: number;
}
interface JbSliderOption {
  start: number;
  end: number;
  step?: number;
  showSelectionBar?: boolean;
  showSelectionBarEnd?: boolean;
  showTicks?: boolean;
  showTicksValues?: boolean;
  tickStep?: number;
  tickArray?: Array<number>;
  tickValueStep?: number;
  maxLimit?: number;
  minLimit?: number;
  maxRange?: number;
  minRange?: number;
}

@Component({
  selector: 'jb-slider',
  templateUrl: './jb-slider.component.html',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => JbSliderComponent)
    }
  ]
})
export class JbSliderComponent implements ControlValueAccessor, OnInit, OnChanges {

  public sliderOptions: Options = {
    animate: false,
    floor: null,
    ceil: null,
    disabled: false,
    step: 1,
    showSelectionBar: false,
    showSelectionBarEnd: false,
    showTicks: false,
    showTicksValues: false,
    tickStep: null,
    tickValueStep: 1,
    ticksArray: null,
    maxLimit: null,
    minLimit: null
  };

  @Input() ngModel: number | JbRangeSliderValues;
  @Input() jbOptions: JbSliderOption;

  @Input() jbDisabled = false;

  @Input() jbLabel: string;
  @Input() jbLabelTooltip: string;
  @Input() jbLabelTooltipPos = 'top';
  @Input() jbCustomSliderLabel: any;
  // TODO this must be in the jb-range-slider
  // @Input() jbShowOuterSection = false;

  constructor() { }

  ngOnInit() {
    this.optionsRebuild();
  }

  ngOnChanges(changes): void {
    if (changes.jbDisabled) {
      this.jbDisabled = changes.jbDisabled.currentValue;
      this.optionsRebuild();
    }
    if (changes.jbCustomSliderLabel) {
      this.jbCustomSliderLabel = changes.jbCustomSliderLabel.currentValue;
      this.optionsRebuild();
    }
  }

  onChange() {
    this.propagateModelUp(this.ngModel);
  }

  // ------- ControlValueAccessor -----
  writeValue(value) {
    this.ngModel = value || this.jbOptions.start;
  }

  public propagateModelUp = (_: any) => {};
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }

  // It's necessary to rebuild the Slider Option due a recommendation from the external component
  // more info: https://angular-slider.github.io/ng5-slider/docs/globals.html
  optionsRebuild() {
    const newOption: Options = Object.assign({}, this.sliderOptions);
    newOption.floor = this.jbOptions.start;
    newOption.ceil = this.jbOptions.end;
    newOption.disabled = this.jbDisabled;
    if (!!this.jbCustomSliderLabel) { newOption.translate = this.jbCustomSliderLabel; }

    if (this.jbOptions.step) { newOption.step = this.jbOptions.step; }
    if (this.jbOptions.showSelectionBar) { newOption.showSelectionBar = this.jbOptions.showSelectionBar; }
    if (this.jbOptions.showSelectionBarEnd) { newOption.showSelectionBarEnd = this.jbOptions.showSelectionBarEnd; }
    if (this.jbOptions.showTicks) { newOption.showTicks = this.jbOptions.showTicks; }
    if (this.jbOptions.showTicksValues) { newOption.showTicksValues = this.jbOptions.showTicks; }
    if (this.jbOptions.tickStep) { newOption.tickStep = this.jbOptions.tickStep; }
    if (this.jbOptions.tickArray) { newOption.ticksArray = this.jbOptions.tickArray; }
    if (this.jbOptions.tickValueStep) { newOption.tickValueStep = this.jbOptions.tickValueStep; }
    if (this.jbOptions.maxLimit) { newOption.maxLimit = this.jbOptions.maxLimit; }
    if (this.jbOptions.minLimit) { newOption.minLimit = this.jbOptions.minLimit; }

    this.sliderOptions = newOption;
  }

}
