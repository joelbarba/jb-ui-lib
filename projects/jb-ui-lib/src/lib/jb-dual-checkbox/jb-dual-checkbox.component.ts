import {Component, OnInit, Input, forwardRef, OnChanges} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, } from '@angular/forms';

@Component({
  selector: 'jb-dual-checkbox',
  templateUrl: './jb-dual-checkbox.component.html',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => JbDualCheckboxComponent),
    }
  ]
})

export class JbDualCheckboxComponent implements ControlValueAccessor, OnInit, OnChanges {
  public checkboxes = {
    yes: true,
    no: true
  };
  @Input() jbLabel = '';
  @Input() jbLabelOptionOne = 'view.common.yes';
  @Input() jbLabelOptionTwo = 'view.common.no';
  @Input() jbDisabled = false;

  constructor() { }

  ngOnInit() {}

  ngOnChanges() {}

  // ------- ControlValueAccessor -----
  writeValue(value: any) {
    if (!!value) {
      this.checkboxes = { yes: true, no: false };
    }
    if (value === false) {
      this.checkboxes = { yes: false, no: true };
    }
    if (value === undefined) {
      this.checkboxes = { yes: true, no: true };
    }
  }

  public propagateModelUp = (value: boolean) => {}; // This is just to avoid type error (it's overwritten on register)
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }

  onChange(field: 'yes' | 'no') {
      if (!this.checkboxes.yes && !this.checkboxes.no) {
        if (field === 'yes') { this.checkboxes.no = true; }
        if (field === 'no') { this.checkboxes.yes = true; }
      }
      this.propagateModelUp(this.checkboxes.yes === this.checkboxes.no ? undefined : this.checkboxes.yes);
  }
}
