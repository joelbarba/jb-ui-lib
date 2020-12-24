import {Component, Input, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {JbUiLibTransService} from '../abstract-translate.service';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'jb-label',
  templateUrl: './jb-label.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
})
export class JbLabelComponent implements OnInit, OnChanges {
  @Input() jbText = '';
  @Input() jbRequired = false;
  @Input() jbValue = '';
  @Input() jbTooltip = '';
  @Input() jbTooltipPos = 'top';
  @Input() jbTooltipBody = true;

  public jbTextTrans$: Observable<string> = of('');        // Translated text for the label
  public jbValueTrans$: Observable<string> = of('');       // Translated text for the value
  public jbTooltipTrans$: Observable<string> = of('');     // Translated text for the tooltip of the label

  constructor(private translate: JbUiLibTransService) {
  }

  ngOnInit() {}

  ngOnChanges(change) {
    if (change.hasOwnProperty('jbText'))    { this.jbTextTrans$    = this.translate.getLabel$(this.jbText); }
    if (change.hasOwnProperty('jbTooltip')) { this.jbTooltipTrans$ = this.translate.getLabel$(this.jbTooltip); }
    if (change.hasOwnProperty('jbValue'))   { this.jbValueTrans$   = this.translate.getLabel$(this.jbValue); }
  }

}
