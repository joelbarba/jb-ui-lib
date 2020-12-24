import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'jb-modal-header',
  templateUrl: './jb-modal-header.component.html'
})
export class JbModalHeaderComponent implements OnInit {
  @Input() jbTitle: string;
  @Input() jbDescription: string = null;
  @Output() jbClose = new EventEmitter();

  public jbAriaLabel = 'view.common.modal.close.button';

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.jbClose.emit();
  }

}
