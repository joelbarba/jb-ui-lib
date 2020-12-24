import { Component, OnInit } from '@angular/core';
import { JbModalDemoComponent } from './jb-modal-demo/jb-modal-demo.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-jb-modal-header-demo',
  templateUrl: './jb-modal-header-demo.component.html',
  styleUrls: ['./jb-modal-header-demo.component.sass']
})
export class JbModalHeaderDemoComponent implements OnInit {
  public name = jbModalHeaderDoc.name;
  public desc = jbModalHeaderDoc.desc;
  public api = jbModalHeaderDoc.api;


  public brStr = `\n`;
  public customCompCode = ``;

  public compConf = {
    title: 'view.common.modal.title',
    description: 'view.common.modal.description',
    hasDescription: false
  };

  public cssReset = `.modal-header modal-header--description{
    color: $primary-color;
  }`;

  constructor(private modal: NgbModal) { }

  ngOnInit() {
    this.upComp();
  }

  public upComp = () => {
    this.customCompCode = `<jb-modal-header ` + this.brStr;

    if (this.compConf.title) { this.customCompCode += ` [jbTitle]="${this.compConf.title}"` + this.brStr; }
    if (this.compConf.hasDescription) { this.customCompCode += ` [jbDescription]="${this.compConf.description}"` + this.brStr; }

    this.customCompCode += ' (jbClose)="doSomething($event)"';

    this.customCompCode += (`>` + this.brStr + `</jb-modal-header>`);
  }

  public openModal() {
    this.open({});
  }

  public openModalWDescription() {
    this.open({ hasDescription : true });
  }

  open(options) {
    const modalRef = this.modal.open(JbModalDemoComponent, { windowClass: 'modal-confirmation' });
    modalRef.componentInstance.options = options;
  }
}

export const jbModalHeaderDoc = {
  name    : `jb-modal-header`,
  uiType  : 'component',
  desc    : `Generates a title for a modal.`,
  api     : `[jbTitle]        : Text to display as title
[jbDescription]  : Text to display as description (optional).
(jbClose)        : Emitter to catch the click event on close icon.`,
  instance: `<jb-modal-header jbTitle="view.common.username"></jb-modal-header>`,
  demoComp: JbModalHeaderDemoComponent
};
