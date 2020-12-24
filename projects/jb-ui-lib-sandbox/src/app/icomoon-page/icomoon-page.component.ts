import { Component, OnInit } from '@angular/core';
import {icomoonList} from '../icomoon-list';
import {JbGrowlService} from '../../../../jb-ui-lib/src/lib/jb-growl/jb-growl.service';

@Component({
  selector: 'app-icomoon-page',
  templateUrl: './icomoon-page.component.html',
  styleUrls: ['./icomoon-page.component.scss']
})
export class IcomoonPageComponent implements OnInit {
  public iconList: any = icomoonList;
  public showNames = false;
  public onlyFree = false;
  public markFree = false;
  public searchTxt = '';
  public selIcon = '';
  public lastIcon = 'icon-arrow-right';

  constructor(
    private growl: JbGrowlService,
  ) { }
  ngOnInit() { }


  public copyName = (jbIcon) => {
    const copyText: any = document.getElementById('copy-input');
    copyText.value = jbIcon.icon;
    copyText.select();
    document.execCommand('copy');
    this.growl.success('Icon name to clipboard:   ' + copyText.value);
    jbIcon.sel = !jbIcon.sel;
    this.lastIcon = jbIcon.icon;
  };

  public filterList = () => {
    const txt = this.searchTxt.toLowerCase();
    this.iconList.forEach(i => i.hide = i.icon.toLowerCase().indexOf(txt) < 0);
  }

  printList = () => {
    let res = '';
    this.iconList.forEach(i => {
      if (i.sel) {
        res += `{ icon: '${i.icon}', free: true },\n`;
      } else {
        res += `{ icon: '${i.icon}' },\n`;
      }
    });
    const copyText: any = document.getElementById('copy-input');
    copyText.value = res;
    copyText.select();
    document.execCommand('copy');
  };
}
