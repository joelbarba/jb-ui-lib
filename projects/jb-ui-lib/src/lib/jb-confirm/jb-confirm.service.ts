import { Injectable } from '@angular/core';
import {JbConfirmComponent, IConfirmOptions} from './jb-confirm.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class JbConfirmService {

  constructor(private modal: NgbModal) { }

  public open = (options: IConfirmOptions = {}) => {

    // https://ng-bootstrap.github.io/#/components/modal/api
    const modalRef = this.modal.open(JbConfirmComponent, { windowClass: 'modal-confirmation' });
    modalRef.componentInstance.options = options;
    return modalRef.result;

  }

}
