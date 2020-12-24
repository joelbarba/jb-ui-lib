import {AfterViewInit, Component, OnInit} from '@angular/core';
import {JbGrowlService} from '../../../../../jb-ui-lib/src/lib/jb-growl/jb-growl.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-jb-input-autofill-demo',
  templateUrl: './jb-input-autofill-demo.component.html',
  styleUrls: ['./jb-input-autofill-demo.component.scss']
})
export class JbInputAutofillDemoComponent implements OnInit, AfterViewInit {

  constructor(
    public growl: JbGrowlService,
    public router: Router,
  ) {}

  public user;
  public pass;

  public isAutofilled = '';

  public example = `<form>
  <jb-input jbLabel="Username" name="user"
            [(ngModel)]="user"
            [jbRequired]="true"
            (jbOnAutofill)="doSomething()">
  </jb-input>
  <button type="submit" [routerLink]="'/xxxx'">Click me</button>
</form>`;



  ngOnInit() {}
  ngAfterViewInit() {}

  public doSomething = () => {
    this.isAutofilled = 'Value has been autofilled!';
    this.growl.success('The input has been autofilled with ');
  }

}



