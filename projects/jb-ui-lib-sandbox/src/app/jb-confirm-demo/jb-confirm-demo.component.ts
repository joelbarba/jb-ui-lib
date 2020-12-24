import { Component, OnInit } from '@angular/core';
import { JbConfirmService } from '../../../../jb-ui-lib/src/lib/jb-confirm/jb-confirm.service';

@Component({
  selector: 'app-jb-confirm-demo',
  templateUrl: './jb-confirm-demo.component.html',
  styleUrls: ['./jb-confirm-demo.component.scss']
})
export class JbConfirmDemoComponent implements OnInit {
  public name = jbConfirmDoc.name;
  public desc = jbConfirmDoc.desc;
  public api = jbConfirmDoc.api;
  public instance = jbConfirmDoc.instance;

  public result = '';
  public example1 = `constructor(private confirm: JbConfirmService)

this.confirm.open().then(
  (res) => { console.log('Ok'); },
  (res) => { console.log('Cancel');
});`;

  public example2 = `this.confirm.open({
    title            : 'view.modal.confirm.title',
    text             : 'view.common.custom_error',
    htmlContent      : '<h4 class="marT20">You want to delete user <span class="bold primary">Joel</span> ?</h4>',
    yesButtonText    : 'Yes, delete it',
    noButtonText     : 'No, keep it',
    showNo           : true,
}).then((res) => {
  if (res === 'yes') {
    console.log('Ok');
  } else {
    console.log('Ko');
  }
}, (res) => { console.log('Cancel', res); });`;

  public cssStyles = `.modal-confirmation .modal-content  {
  margin-top: -20px;
}`;







  constructor(private confirm: JbConfirmService) { }

  ngOnInit() {
    // setTimeout(this.openPopUp);
  }

  public openPopUp1 = () => {
    this.confirm.open().then(
      (res) => { this.result = '(resolved) Clicked on Yes'; },
      (res) => { this.result = '(rejected) Cancelled'; }
    );
  }

  public openPopUp2 = () => {
    this.confirm.open({
      text             : 'view.common.custom_error',
      htmlContent      : `<h4 class="marT20">You want to delete user <span class="bold primary">Joel</span> ?</h4>`,
      yesButtonText    : 'Yes, delete it',
      noButtonText     : 'No, keep it',
      showNo           : true
    }).then((res) => {
      if (res === 'yes') {
        this.result = '(resolved) Clicked on Yes';
      } else {
        this.result = '(resolved) Clicked on No';
      }
    }, (res) => { this.result = '(rejected) Cancelled'; });
  }

  public openPopUp3 = () => {
    this.confirm.open({
      text             : 'Example with innerHTML (sanitize content)',
      htmlContent      : `<script deferred>alert("XSS Attack");</script>
                          <h4 class="marT20">You want to delete user <span class="bold primary">Joel</span> ?</h4>`,
      yesButtonText    : 'Yes, delete it',
      noButtonText     : 'No, keep it',
      showNo           : true
    }).then((res) => {
      if (res === 'yes') {
        this.result = '(resolved) Clicked on Yes';
      } else {
        this.result = '(resolved) Clicked on No';
      }
    }, (res) => { this.result = '(rejected) Cancelled'; });
  }

  public openPopUp4 = () => {
    this.confirm.open({
      text             : 'Example with Unsafe html (sanitize bypass)',
      unsafeHtml       : `<script>alert("XSS Attack")</script> <h1 style="color: blue;">HEEY</h1>`,
      // unsafeHtml       : `<span translate>views.test_label</span>`,
      yesButtonText    : 'Yes, delete it',
      noButtonText     : 'No, keep it',
      showNo           : true
    }).then((res) => {
      if (res === 'yes') {
        this.result = '(resolved) Clicked on Yes';
      } else {
        this.result = '(resolved) Clicked on No';
      }
    }, (res) => { this.result = '(rejected) Cancelled'; });
  }



}


export const jbConfirmDoc = {
  name    : `jbConfirm`,
  uiType  : 'service',
  desc    : `Service to trigger a confirmation modal`,
  api     : `
.open()   It triggers a confirmation pop up before performing an action. It takes an optional parameter to config specific values:
            - title            (string)   - Title on the modal (view.modal.confirm.title)
            - text             (string)   - Description text of the confirmation (view.modal.confirm.text)
            - htmlContent      (string)   - Html content to display, in case we need a styled message
            - unsafeHtml       (string)   - Same as "htmlContent" but bypassing the sanitize filter
            - showYes          (boolean)  - Whether to display the "Yes" button (by default = true)
            - showNo           (boolean)  - Whether to display the "No" button (by default = false)
            - showCancel       (boolean)  - Whether to display the "Cancel" button (by default = true)
            - yesButtonText    (string)   - Text for the "Yes" button (view.common.yes)
            - noButtonText     (string)   - Text for the "No" button (view.common.no)
            - cancelButtonText (string)   - Text for the "Cancel" button (view.common.cancel)`,
  instance: `this.confirm.open().then(() => { });`,
  demoComp: JbConfirmDemoComponent
};
