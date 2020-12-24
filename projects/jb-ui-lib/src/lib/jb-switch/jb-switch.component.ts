import {Component, forwardRef, Inject, Input, OnChanges, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {JbUiLibTransService} from '../abstract-translate.service';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'jb-switch',
  templateUrl: './jb-switch.component.html',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => JbSwitchComponent),
    },
  ]
})
export class JbSwitchComponent implements ControlValueAccessor, OnInit, OnChanges {

  // @Output() jbClick = new EventEmitter<any>();
  @Input() jbDisabled = false;
  @Input() jbOnText = 'scripts.common.directives.on_label';
  @Input() jbOffText = 'scripts.common.directives.off_label';

  @Input() jbLabel: string;
  @Input() jbLabelPos: 'top' | 'left' = 'top';
  @Input() jbTooltip: string;
  @Input() jbTooltipPos = 'top';
  @Input() jbTooltipBody: boolean;

  public jbModel = false; // Internal holding of the ngModel

  public jbOnText$: Observable<string> = of(''); // Translated text for the ON label
  public jbOffText$: Observable<string> = of(''); // Translated text for the OFF label

  constructor(
    @Inject(JbUiLibTransService) private translate: JbUiLibTransService,
  ) {
    this.jbOnText$ = this.translate.getLabel$(this.jbOnText);
    this.jbOffText$ = this.translate.getLabel$(this.jbOffText);
  }

  // ------- ControlValueAccessor -----

  // ControlValueAccessor --> writes a new value from the form model into the view
  writeValue(value: any) {
    this.jbModel = !!value;
  }
  public propagateModelUp = (_: boolean) => {}; // This is just to avoid type error (it's overwritten on register)
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }

  // ----------------


  ngOnInit() { }

  ngOnChanges(change) {
    if (change.hasOwnProperty('jbOnText'))  { this.jbOnText$  = this.translate.getLabel$(this.jbOnText);  }
    if (change.hasOwnProperty('jbOffText')) { this.jbOffText$ = this.translate.getLabel$(this.jbOffText); }
  }

  public onSwitch = () => {
    if (!this.jbDisabled) {
      this.jbModel = !this.jbModel;
      this.propagateModelUp(this.jbModel);
    }
  }

}
