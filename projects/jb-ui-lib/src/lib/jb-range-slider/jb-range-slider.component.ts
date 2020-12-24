import {Component, EventEmitter, forwardRef, Input, Output, OnChanges, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {JbSliderComponent} from '../jb-slider/jb-slider.component';
import {Options} from 'ng5-slider';

interface JbRangeSliderValues {
  min: number;
  max: number;
}

@Component({
  selector: 'jb-range-slider',
  templateUrl: './jb-range-slider.component.html',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => JbRangeSliderComponent)
    }
  ]
})
export class JbRangeSliderComponent extends JbSliderComponent implements ControlValueAccessor, OnInit, OnChanges {


  public minValue: number;
  public highValue: number;

  @Input() ngModel : JbRangeSliderValues;
  @Input() jbShowOuterSection = false;

  constructor() {
    super();
  }

  ngOnInit() {
    this.rangeOptionsRebuild();
  }

  ngOnChanges(changes): void {
    if (changes.jbDisabled) {
      this.jbDisabled = changes.jbDisabled.currentValue;
      this.rangeOptionsRebuild();
    }
    if (changes.jbCustomSliderLabel) {
      this.jbCustomSliderLabel = changes.jbCustomSliderLabel.currentValue;
      this.rangeOptionsRebuild();
    }
    if  (changes.jbShowOuterSection) {
      this.jbShowOuterSection = changes.jbShowOuterSection.currentValue;
      this.rangeOptionsRebuild();
    }
  }

  // ------- ControlValueAccessor -----
  writeValue(value) {
    if (!value) {
      this.ngModel = { min: 0, max: 0 };
    } else {
      this.ngModel = value;
    }
  }

  slideChange(value) {
    this.ngModel.min = value.value;
    this.ngModel.max = value.highValue;
    this.propagateModelUp(this.ngModel);
  }

  public propagateModelUp = (_: any) => {};
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }

  // It's necessary to rebuild the Slider Option due a recommendation from the external component
  // more info: https://angular-slider.github.io/ng5-slider/docs/globals.html
  rangeOptionsRebuild() {
    const newOptions: Options = Object.assign({}, this.sliderOptions);
    newOptions.showOuterSelectionBars = this.jbShowOuterSection;

    if (this.jbOptions.maxRange) { newOptions.maxRange = this.jbOptions.maxRange; }
    if (this.jbOptions.minRange) { newOptions.minRange = this.jbOptions.minRange; }

    this.sliderOptions = newOptions;

    this.optionsRebuild();
  }
}
