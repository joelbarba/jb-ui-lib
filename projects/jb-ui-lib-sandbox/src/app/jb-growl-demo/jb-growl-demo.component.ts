import { Component, OnInit } from '@angular/core';
import { JbGrowlService } from '../../../../jb-ui-lib/src/lib/jb-growl/jb-growl.service';
import {JbUiLibTransService} from '../../../../jb-ui-lib/src/lib/abstract-translate.service';

@Component({
  selector: 'app-jb-growl-demo',
  templateUrl: './jb-growl-demo.component.html',
  styleUrls: ['./jb-growl-demo.component.scss'],
})
export class JbGrowlDemoComponent implements OnInit {
  public name = jbGrowlDoc.name;
  public desc = jbGrowlDoc.desc;
  public api = jbGrowlDoc.api;
  public instance = jbGrowlDoc.instance;
  public instance1 = `import { JbGrowlService } from 'jb-ui-lib';
constructor(private growl: JbGrowlService) { }

this.growl.success('Success message pushed');
this.growl.error('Error message pushed');
this.growl.pushMsg({ text: 'view.tooltip.message', timeOut: 4000, msgType: 'success', msgIcon: 'icon-cool' });
this.growl.success('view.common.customer_changed_successfully', { customer_name: 'Other Guy' })`;

  public instance2 = `<jb-growl-pop-up></jb-growl-pop-up>`;
  public instance3 = `import { JbGrowlService } from 'jb-ui-lib';
constructor(private growl: JbGrowlService) { }`;


  public cssReset = `$growl-border: rgba($white, 0.4) !default;

$growl-success: $white !default;
$growl-success-bg: darken($primary_color, 15%) !default;

$growl-error: $white !default;
$growl-error-bg: $warning_color !default;`;

  public text$;

  constructor(public growl: JbGrowlService, private translate: JbUiLibTransService) { }
  ngOnInit() {
    this.text$ = this.translate.getLabel$('view.common.customer_changed_successfully', { customer_name: 'Other Guy' });
  }

  pushSuccess() {
    this.growl.success(`view.tooltip.message`);
    // const nowTime = new Date();
    // this.growl.success(`Success message pushed - ${nowTime}`);
  }
  pushError() {
    const nowTime = new Date();
    this.growl.error(`Error message pushed - ${nowTime}`);
  }
  pushCustom() {
    const nowTime = new Date();
    this.growl.pushMsg({
      text: `view.tooltip.message`,
      timeOut: 4000,
      msgType: 'success',
      msgIcon: 'icon-cool'
    });
  }

  htmlExample() {
    this.growl.success('Device <strong>IN BOLD</strong> of the user <strong>JOEL</strong>');
    this.growl.success(`<script>alert("XSS Attack")</script> <h1 style="color: blue;">HEEY</h1>`);
    this.growl.success(`views.test_label`);
  }

}





export const jbGrowlDoc = {
  name    : `jbGrowl`,
  uiType  : 'module',
  desc    : `Growl Module to push notifications on the screen`,
  api     : `growl.success(text) : Pushes a successful notification
growl.error(text)   : Pushes a warning notification
growl.pushMsg(msg)  : Pushes a custom message with custom parameters. 
                      msg object contains: "text", "timeOut", "msgType" (success/error), "msgIcon" properties`,
  instance: `<jb-growl-pop-up>`,
  demoComp: JbGrowlDemoComponent
};
