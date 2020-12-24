import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';

declare var spectrum: any;
declare var $: any;

@Component({
  selector: 'jb-color-picker',
  template: '<div class="color--picker"></div>',
  styleUrls: []
})
export class JbColorPickerComponent implements OnInit, OnChanges {
  @Input() jbColor: string; // the value of the color
  @Output() jbColorChange: EventEmitter<string> = new EventEmitter(); // an event emitted when the color has changed

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const { jbColor } = changes;

    if (!jbColor.firstChange) {
      this.updateSpectrumColorValue(jbColor.currentValue);
    }
  }

  ngOnInit() {
    this.initialiseColorPicker();
  }

  private initialiseColorPicker(): void {
    $('.color--picker').spectrum({
      color: this.getValidHexString(this.jbColor),
      flat: true,
      showButtons: false,
      showInitial: true,
      move: this.onChangeColor.bind(this)
    });
  }

  private getValidHexString(colorValue: string): string {
    if (!colorValue) {
      return '';
    }

    return colorValue.indexOf('#') === -1 ? `#${colorValue}` : colorValue;
  }

  private updateSpectrumColorValue(color: string): void {
    const colorValue = this.getValidHexString(color);
    $('.color--picker').spectrum('set', `#${colorValue}`);
  }

  private onChangeColor(color: any): void {
    const updatedColor = color.toHexString();
    this.jbColorChange.emit(updatedColor);
  }
}
