import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'jb-progress-bar',
  templateUrl: './jb-progress-bar.component.html',
  styleUrls: []
})
export class JbProgressBarComponent implements OnInit, OnChanges {
  @Input() jbLabel: string;      // Label to translate and display on top of the progress bar
  @Input() jbTotal: number;      // Maximum value
  @Input() jbValue: number;      // Actual value
  @Input() jbUsedLabel: string;  // Sentence below the progress bar on the left with a data binding of the value
  @Input() jbLeftLabel: string;  // Sentence below the progress bar on the right with a data binding of the remaining value
  percentageValue: number;

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    // Recalculate the percentage value
    this.percentageValue = Math.round(Number(this.jbValue) * 100 / Number(this.jbTotal));
  }

  getUsedValue() {
    return Number(this.jbTotal) >= Number(this.jbValue) ? this.jbValue : this.jbTotal;
  }

  getLeftValue() {
    return Number(this.jbTotal) >= Number(this.jbValue) ? (this.jbTotal - this.jbValue) : 0;
  }

}
