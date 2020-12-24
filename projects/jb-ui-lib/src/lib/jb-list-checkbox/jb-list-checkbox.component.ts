import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {JbListSelection} from '../jb-list-selection/jb-list-selection';

@Component({
  selector: 'jb-list-checkbox',
  templateUrl: './jb-list-checkbox.component.html',
})
export class JbListCheckboxComponent implements OnInit, OnChanges, OnDestroy {
  @Input() selection: JbListSelection;
  @Input() id: string;
  @Input() jbDisabled = false;
  @Input() actions: [{ id?, label: string, disabled?: boolean, fn?: (sel?: JbListSelection) => void }];
  @Output() actionClick = new EventEmitter<any>();
  @Output() change = new EventEmitter<any>();

  private sub;
  public hasId = false;
  public actionsExp = false;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes) {
    this.hasId = this.id !== undefined;

    // If the actions panel is expanded, collapse it automatically when the selection changes
    if (this.selection) {
      if (!!this.sub) { this.sub.unsubscribe(); }
      this.sub = this.selection.onChange$.subscribe(_ => this.actionsExp = false);
    }
  }

  ngOnDestroy() {
    if (!!this.sub) { this.sub.unsubscribe(); }
  }

  public clickAction = (action) => {
    if (!action.disabled) {
      this.actionClick.emit(action);
      if (action.fn && typeof action.fn === 'function') {
        action.fn(this.selection);
      }
      this.actionsExp = false; // Collapse panel
    }
  }

}
