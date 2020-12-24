import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-jb-modal-demo',
  templateUrl: './jb-modal-demo.component.html',
  styleUrls: ['./jb-modal-demo.component.sass']
})
export class JbModalDemoComponent implements OnInit {
  @Input() options;
  public compConf = {
    title: 'view.common.modal.title',
    description: 'view.common.modal.description',
    hasDescription: false
  };

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.compConf = { ...this.compConf, ...this.options };
  }

  close() {
    this.activeModal.close();
  }

}
