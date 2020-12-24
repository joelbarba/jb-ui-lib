import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {JbTranslateService} from './translate.service';

import * as pack from './../../../jb-ui-lib/package.json';
console.log(`Running version ${pack.version} ---> jb-ui-lib@${pack.version}`);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public lang = 'en';
  public selectedFont = 'font-23';
  public fontsList = [
    { css: 'font-11', name: `-apple-system` },
    { css: 'font-12', name: `BlinkMacSystemFont` },
    { css: 'font-13', name: `'Segoe UI'` },
    { css: 'font-14', name: `'Roboto' (webfont)` },
    { css: 'font-15', name: `'Oxygen' (webfont)` },
    { css: 'font-16', name: `'Ubuntu' (webfont) ` },
    { css: 'font-17', name: `'Fira Sans (webfont)'` },
    { css: 'font-18', name: `'Droid Sans'` },
    { css: 'font-19', name: `'Helvetica Neue'` },
    { css: 'font-20', name: `sans-serif (default)` },
    { css: '', name: `---------------------------------` },
    { css: 'font-21', name: `Lato (webfont)` },
    { css: 'font-22', name: `Montserrat (webfont)` },
    { css: 'font-23', name: `Sans Medium (webfont)` },
    { css: 'font-24', name: `Sans Regular (webfont)` },
    { css: '', name: `---------------------------------` },
    { css: 'font-32', name: `Helvetica` },
    { css: 'font-33', name: `Arial` },
  ];

  constructor(
    // @Inject('JbUiLibTransService') public translate: JbTranslateService
    public translate: JbTranslateService,
  ) { }

  ngOnInit() { }

}
