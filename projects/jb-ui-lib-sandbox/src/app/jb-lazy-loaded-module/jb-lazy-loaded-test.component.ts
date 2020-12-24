import {Component, OnInit } from '@angular/core';

console.log('jbLazyLoadedTestComponent', new Date());

@Component({
  selector: 'app-jb-lazy-loaded-test',
  templateUrl: './jb-lazy-loaded-test.component.html',
  styleUrls: ['./jb-lazy-loaded-test.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class jbLazyLoadedTestComponent implements OnInit {
  public myVal = '';
  constructor() {}

  ngOnInit() { }

}

