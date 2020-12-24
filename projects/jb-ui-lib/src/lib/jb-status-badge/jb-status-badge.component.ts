import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {JbUiLibTransService} from '../abstract-translate.service';
import {Observable, of} from 'rxjs';

interface ColorSet {
  [status: string]: string;
}

@Component({
  selector: 'jb-status-badge',
  templateUrl: './jb-status-badge.component.html',
  styleUrls: []
})
export class JbStatusBadgeComponent implements OnInit, OnChanges {

  public defaultColorSet: ColorSet = {
    0: 'jb-color-first',
    1: 'jb-color-second',
    2: 'jb-color-third',
    3: 'jb-color-fourth',
    4: 'jb-color-fifth',
    5: 'jb-color-sixth',
    6: 'jb-color-seventh',
    7: 'jb-color-eighth'
  };

  public defaultLabels = ['view.common.active', 'view.common.inactive', 'view.common.pending'];

  @Input() jbStatus: boolean | number = 0;
  @Input() jbLabel: string | Array<string>  = '';
  @Input() jbColor  = '';
  @Input() jbCircle = false;
  @Input() jbColorSet: ColorSet;

  public jbCurrentLabel$: Observable<string> = of('');

  public jbCurrentStatus = 0;
  public jbStatusCss: ColorSet = {};
  public jbCurrentColor = '';

  constructor(private translate: JbUiLibTransService) { }

  ngOnInit() {
    this.setStatus(this.jbStatus);
    this.setLabel();
  }

  ngOnChanges(change) {
    this.setStatus(this.jbStatus);
    this.setLabel();
  }

  setStatus(status) {
    if (typeof status === 'boolean') {
      this.jbCurrentStatus = this.jbStatus ? 0 : 1;
    } else if (typeof status === 'number') {
      this.jbCurrentStatus = typeof this.jbStatus === 'number' ? this.jbStatus : 0;
    }
    this.setColor();
  }

  setLabel = () => {
    if (this.jbLabel) {
      if (typeof this.jbLabel === 'string') { this.jbCurrentLabel$ = this.translate.getLabel$(this.jbLabel); }
      if (typeof this.jbLabel === 'object') { this.jbCurrentLabel$ = this.translate.getLabel$(this.jbLabel[this.jbCurrentStatus]); }
    } else {
      this.jbCurrentLabel$ = this.translate.getLabel$(this.defaultLabels[this.jbCurrentStatus] || this.defaultLabels[0]);
    }
  }

  setColor = () => {
    // Default class set by default
    this.jbStatusCss = this.jbColorSet ? this.jbColorSet : this.defaultColorSet;

    // Verifying [jbColor]
    if (this.jbColor) {
      this.jbCurrentColor = this.jbColor.charAt(0) === '#' ? this.jbColor : '#' + this.jbColor;
    } else {
      this.jbCurrentColor = '';
    }
  }

}
