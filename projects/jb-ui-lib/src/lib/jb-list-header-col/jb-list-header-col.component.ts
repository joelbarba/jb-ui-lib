import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import { Observable } from 'rxjs';
import {JbUiLibTransService} from '../abstract-translate.service';

interface IOrderConf {
  fields: Array<string>;
  reverse: boolean;
  setField ?: (orderField) => void;
}


@Component({
  selector: 'jb-list-header-col',
  templateUrl: './jb-list-header-col.component.html',
  styleUrls: []
})
export class JbListHeaderColComponent implements OnInit, OnChanges {
  @Input() colTitle: string = null;
  @Input() fieldName: string = null;
  @Input() orderConf: IOrderConf;
  @Input() jbTooltip: string;
  @Input() jbTooltipPos = 'top';

  @Output() jbOnChange = new EventEmitter<IOrderConf>();

  public colTitle$;
  public jbTooltipTrans$: Observable<string>;

  constructor(private translate: JbUiLibTransService) {}

  ngOnChanges(changes) {
    if (changes.orderConf) { this.orderConf.fields = this.orderConf.fields || []; }
    if (changes.colTitle) { this.colTitle$ = this.translate.getLabel$(this.colTitle); }
  }

  ngOnInit() {
    this.jbTooltipTrans$ = this.translate.getLabel$(this.jbTooltip);
  }

  clickOrder = () => {
    if (!!this.orderConf && !!this.orderConf.setField && typeof this.orderConf.setField === 'function') {
      this.orderConf.setField(this.fieldName);
    }
    this.jbOnChange.emit(this.orderConf);
  }

}



