import {Component, OnInit, Input, forwardRef, OnChanges} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {of} from 'rxjs';
import {JbUiLibTransService} from '../abstract-translate.service';

@Component({
  selector: 'jb-radio',
  templateUrl: './jb-radio.component.html',
  styleUrls: [],
  // encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => JbRadioComponent),
    }
  ]
})
// export class JbCheckboxComponent implements OnInit {
export class JbRadioComponent implements ControlValueAccessor, OnInit, OnChanges {
  public jbModel = false;
  @Input() jbLabel = '';
  @Input() jbValue: string = null;
  @Input() jbRadioGroup = 'radio-group';
  @Input() jbDisabled = false;
  @Input() jbRequired = false;
  @Input() jbTooltip = '';
  @Input() jbTooltipPos = 'top';
  @Input() jbTooltipBody = true;


  public jbLabelTrans$ = of('');        // Translated text for the button
  public jbTooltipTrans$ = of('');  // Translated text for the tooltip

  constructor(
    private translate: JbUiLibTransService,
  ) { }

  // ------- ControlValueAccessor -----
  writeValue(value: any) {
    this.jbModel = value;
  }
  public propagateModelUp = (_: any) => {}; // This is just to avoid type error (it's overwritten on register)
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }


  ngOnInit() {}

  onChange(value) {
    this.jbModel = value;
    this.propagateModelUp(value);
    // this.jbModelChange.emit(value);
  }

  ngOnChanges(change) {
    if (change.hasOwnProperty('jbLabel'))   { this.jbLabelTrans$ = this.translate.getLabel$(this.jbLabel); }
    if (change.hasOwnProperty('jbTooltip')) { this.jbTooltipTrans$ = this.translate.getLabel$(this.jbTooltip); }
  }
}
