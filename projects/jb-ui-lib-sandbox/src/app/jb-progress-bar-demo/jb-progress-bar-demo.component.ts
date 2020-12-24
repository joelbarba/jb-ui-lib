import {Component, OnInit} from '@angular/core';
import { interval, range, zip } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-jb-progress-bar-demo',
  templateUrl: './jb-progress-bar-demo.component.html',
  styleUrls: ['./jb-progress-bar-demo.component.scss']
})
export class JbProgressBarDemoComponent implements OnInit {
  public name = jbProgressBarDoc.name;
  public desc = jbProgressBarDoc.desc;
  public api = jbProgressBarDoc.api;

  // Small RxJS trick to loop through 0 to 100
  public cyclingProgress = zip(interval(100), range(0, 101)).pipe(map((pair) => pair[1]));

  public instance1 = `<jb-progress-bar
  [jbValue]="cyclingProgress | async"
  [jbTotal]="100">
</jb-progress-bar>`;

  public instance2 = `<jb-progress-bar
  [jbLabel]="'Mobile Minutes 250'"
  [jbValue]="1299"
  [jbTotal]="2048"
  [jbUsedLabel]="\'view.minutes_used\'" // {{value}} minutes used
  [jbLeftLabel]="\'view.minutes_left\'"> // {{leftValue}} minutes left
</jb-progress-bar>`;

  public custom = {
    config: {
      hasValues: false,
      hasLabel: false,
      hasUsedLabel: false,
      hasLeftLabel: false
    },
    obj: {
      jbValue: 10,
      jbTotal: 100,
      jbLabel: '',
      jbUsedLabel: '',
      jbLeftLabel: '',
      componentView: `<jb-progress-bar></jb-progress-bar>`
    },
    buildComponentView: () => {
      const obj = this.custom.obj;
      const config = this.custom.config;
      this.custom.obj.componentView = `<jb-progress-bar
  [jbValue]="${obj.jbValue}"
  [jbTotal]="${obj.jbTotal}"` +
  (config.hasLabel ? `
  [jbLabel]="${obj.jbLabel}"` : ``) +
  (config.hasUsedLabel ? `
  [jbLeftLabel]="${obj.jbUsedLabel}"` : ``) +
  (config.hasLeftLabel ? `
  [jbUsedLabel]="${obj.jbLeftLabel}"` : ``) + `>` + `
</jb-progress-bar>`;
    }
  };

  public cssReset = `$progress-bar-bg: $primary_color !default;
$progress-bar-color: $white !default;
$progress-bar-used-label: $secondary_color !default;
$progress-bar-left-label: $primary_color !default;
$progress-bar-per-outside: $primary_color !default;`;

  constructor() {
  }

  ngOnInit() {
  }

}


export const jbProgressBarDoc = {
  name: `jb-progress-bar`,
  uiType: 'component',
  desc: `Display a progress bar by calculating the percentage from the current value and the max value, in plus, we can display
  2 sentences below using the actual value as param for the left sentence or the left value for the right sentence`,
  api: `  [jbLabel]: label on top of the component
  [jbTotal]: maximum value that can be reached
  [jbValue]: actual value
  [jbUsedLabel]: translation for the label below the component on the left and have the value as binding {{value}}
  [jbLeftLabel]: translation for the label below the component on the right and have the missing value as binding {{leftValue}}

  For example: [jbUsedLabel]="'view.subscriptions.minutes_used'" -> {{value}} minutes used
               [jbLeftLabel]="'view.subscriptions.minutes_left'" -> {{leftValue}} minutes left

  If you want to display only the values you might do a translation key with inside just the binding in this way:
  [jbUsedLabel]="'view.subscriptions.value_used'" -> {{value}}`,
  demoComp: JbProgressBarDemoComponent
};
