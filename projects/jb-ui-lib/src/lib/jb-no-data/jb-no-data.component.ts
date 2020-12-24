import {Component, Input, OnInit} from '@angular/core';

/**
 * @ngdoc component
 * @description Generates a row with a "No data to show" alert message or a No data with a big
 * If it is a placeholder for empty lists, it styles the alert without background and displaying
 * more options (icon, title, description)
 *
 */
@Component({
  selector: 'jb-no-data',
  templateUrl: './jb-no-data.component.html'
})
export class JbNoDataComponent implements OnInit {
  @Input() jbMessage = 'view.common.no_data_to_show';

  @Input() jbIsPlaceholder = false;    // If true, a placeholder styled message is displayed instead
  @Input() jbIcon: string = null;
  @Input() jbTitle = '';          // (eg: No messages yet)
  @Input() jbDescription = '';    // (eg: Click to add a new bla bla)

  constructor() { }

  ngOnInit() { }
}
