import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {JbGrowlService} from '../../../../../jb-ui-lib/src/lib/jb-growl/jb-growl.service';
import {IjbInputCtrl} from '../../../../../jb-ui-lib/src/lib/jb-input/jb-input.component';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-jb-input-async-validator-demo',
  templateUrl: './jb-input-async-validator-demo.component.html',
  styleUrls: ['./jb-input-async-validator-demo.component.scss']
})
export class JbInputAsyncValidatorDemoComponent implements OnInit, AfterViewInit, OnDestroy {
  private subs = new SubSink();

  constructor(
    public growl: JbGrowlService,
    public router: Router,
  ) {

    this.setValidation();

    // setTimeout(() => this.val1 = '123',  200);
    // setTimeout(() => this.val1 = 'xxx', 1000);
    // setTimeout(() => this.val1 = 'AAA', 1100);
    // setTimeout(() => this.val1 = 'xxx', 1200);
  }

  public asyncVal$ = new Subject();
  public asyncOp: {value, result?};

  public val1;
  public isLinked = true;
  public inputRef: IjbInputCtrl; // jb-input controller object (ctrlObject)

  public codeEx = `public asyncVal$ = new Subject();
public asyncOp: {value, result?};

this.asyncVal$.pipe(
  debounceTime(this.valEx.debounceTime),
  distinctUntilChanged((prev: any, next) => !prev || prev.value === next.value)
).subscribe(({ value, ctrl }) => {
  
  // Don't trigger the validation again for the same value
  if (!this.asyncOp || this.asyncOp.value !== value) {

    this.asyncOp = { value };
    this.valEx.hasIcon = true; this.valEx.jbIcon = 'loading';
    setTimeout(() => {  // <-- Mocking webapi request
      if (this.asyncOp.value !== value) { 
        return false; // Drop it, if it's changed (there's a newer value)
      }

      this.asyncOp.result = (value === 'AAA'); // Mocking a validation

      if (this.asyncOp.result) {
        ctrl.removeError();
        this.valEx.jbIcon = 'icon-checkmark4';

      } else {
        ctrl.addError({label: 'wrooong'});
        this.valEx.jbIcon = 'icon-thumbs-down';
      }
    }, this.valEx.timeoutMock);
  }
});`;


  // ---- This is the logic to manage autogenerated code example ----
  public brStr = `\n`;
  public bsStr = `\n          `;
  public customCompCode = ``;
  public valCompCode = '';
  public valEx: any = {
    hasErrOnPristine: true, isDisabled: false, errorPos: '', errorPosOpts : [
      { id: 'top-right',    text: 'top-right',  },
      { id: 'bottom-left',  text: 'bottom-left',   },
      { id: 'bottom-right', text: 'bottom-right',  },
    ],
    jbType: 'text', inputTypes: [
      { id: 'text',     text: 'text',     },
      { id: 'number',   text: 'number',   },
      { id: 'password', text: 'password', },
      { id: 'email',    text: 'email',    },
    ],
    hasInvalidIcon: false,  jbInvalidIcon: 'icon-thumbs-down',
    hasValidIcon: false,    jbValidIcon: 'icon-checkmark4',
    hasErrorText: false,    jbErrorText: 'view.common.custom_error',
    hasIcon: false,         jbIcon: 'icon-search', // jbIcon: 'loading',

    isRequired: true,
    jbValMatchVal: 'AAA',

    debounceTime: 500, timeoutMock: 3000
  };

  ngOnInit() {
    this.upComp();
  }
  ngAfterViewInit() {} // console.log('EXT - ngAfterViewInit');
  ngOnDestroy() { this.subs.unsubscribe(); }

  public upComp = () => {
    this.valCompCode = `<jb-input #jbInputRef="ngModel"`;
    this.valCompCode += this.bsStr + `[(ngModel)]="myVariable"`;
    if (this.valEx.hasErrOnPristine)  { this.valCompCode += this.bsStr + `jbErrorOnPristine="true"`; }
    if (this.valEx.isDisabled)        { this.customCompCode += this.bsStr + `[jbDisabled]="true"`; }
    if (this.valEx.errorPos)          { this.valCompCode += this.bsStr + `jbErrorPos="${this.valEx.errorPos}"`; }
    if (this.valEx.inputType !== 'text') { this.customCompCode += this.bsStr + `jbType="${this.valEx.inputType}"`; }

    if (this.valEx.hasInvalidIcon)  { this.valCompCode += this.bsStr + `jbInvalidIcon="${this.valEx.jbInvalidIcon}"`; }
    if (this.valEx.hasValidIcon)    { this.valCompCode += this.bsStr + `jbValidIcon="${this.valEx.jbValidIcon}"`; }
    if (this.valEx.hasErrorText)    { this.valCompCode += this.bsStr + `jbErrorText="${this.valEx.jbErrorText}"`; }
    if (this.valEx.hasIcon)         { this.valCompCode += this.bsStr + `jbIcon="${this.valEx.jbIcon}"`; }

    if (this.valEx.isRequired)  { this.valCompCode += this.bsStr + `jbRequired="true"`; }
    this.valCompCode += this.bsStr + `[jbValidator]="jbValidatorFn"`;
    this.valCompCode += this.bsStr + `(jbOnLoaded)="ctrl = $event"`;
    this.valCompCode += (`>` + this.brStr + `</jb-input>`);

    if (this.valEx.hasManualErr) {
      this.valCompCode += `\n \n public ctrl: IjbInputCtrl; // jbInput controller object\n`;
      this.valCompCode += ` ctrl.addError({ label: 'manual error here' });\n`;
      this.valCompCode += ` ctrl.removeError();\n`;
    }
  };

  public reLink = () => {
    this.isLinked = false;
    setTimeout(() => this.isLinked = true, 500);
  };


  public jbAsyncValidatorFn = (value, ops) => {
    if (!ops.errors) { this.asyncVal$.next(ops); } // If other errors, don't validate
    return ops.errors;
  };

  public setValidation = () => {
    this.subs.unsubscribe();
    this.subs.add(this.asyncVal$.pipe(
      debounceTime(this.valEx.debounceTime),
      distinctUntilChanged((prev: any, next) => !prev || prev.value === next.value)
    ).subscribe(({ value, ctrl }) => {
      if (!this.asyncOp || this.asyncOp.value !== value) {  // Don't trigger the validation again for the same value

        this.asyncOp = { value };
        this.growl.success('Running Async Validation for: ' + value);
        this.valEx.hasIcon = true; this.valEx.jbIcon = 'loading';
        setTimeout(() => {
          if (this.asyncOp.value !== value) { return false; } // In case the value has changed, drop the result

          this.asyncOp.result = (value === 'AAA'); // Mock a validation

          if (this.asyncOp.result) {
            ctrl.removeError();
            this.valEx.jbIcon = 'icon-checkmark4';

          } else {
            ctrl.addError({label: 'wrooong'});
            this.valEx.jbIcon = 'icon-thumbs-down';
          }
        }, this.valEx.timeoutMock);
      }
    }));
  }

}


