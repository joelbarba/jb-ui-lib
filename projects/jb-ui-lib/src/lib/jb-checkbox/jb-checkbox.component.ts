import {Component, OnInit, Input, forwardRef, OnChanges} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { of } from 'rxjs';
import {JbUiLibTransService} from '../abstract-translate.service';

@Component({
  selector: 'jb-checkbox',
  templateUrl: './jb-checkbox.component.html',
  styleUrls: [],
  // encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => JbCheckboxComponent),
    }
  ]
})
// export class JbCheckboxComponent implements OnInit {
export class JbCheckboxComponent implements ControlValueAccessor, OnInit, OnChanges {
  // @Input() jbModel: boolean = false;
  // @Output() jbModelChange = new EventEmitter<boolean>();
  public jbModel = false;
  @Input() jbLabel = '';
  @Input() jbDisabled = false;
  @Input() jbTooltip = '';
  @Input() jbTooltipPos = 'top';
  @Input() jbTooltipBody = true;

  public jbLabelText$ = of('');     // Translated text for the label
  public jbTooltipTrans$ = of('');  // Translated text for the tooltip

  constructor(private translate: JbUiLibTransService) { }

  // ------- ControlValueAccessor -----
  writeValue(value: any) {
    this.jbModel = !!value;
  }
  public propagateModelUp = (_: any) => {}; // This is just to avoid type error (it's overwritten on register)
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }


  ngOnInit() {}

  ngOnChanges(change) {
    if (change.hasOwnProperty('jbLabel'))   { this.jbLabelText$ = this.translate.getLabel$(this.jbLabel);  }
    if (change.hasOwnProperty('jbTooltip')) { this.jbTooltipTrans$ = this.translate.getLabel$(this.jbTooltip); }
  }

  onChange(value) {
    this.jbModel = value;
    this.propagateModelUp(value);
    // this.jbModelChange.emit(value);
  }

}
