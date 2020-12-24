import { Component, OnInit } from '@angular/core';
import { LibRegisterService } from '../lib-register.service';
import { ActivatedRoute, Router, ResolveEnd } from '@angular/router';
import * as RxOp from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public activeRoute: string = null;
  public filteredList = [];

  constructor(
    private reg: LibRegisterService, 
    private router: Router
  ) {
    this.router.events.pipe(
      RxOp.filter(e => e instanceof ResolveEnd)
    ).subscribe((routeObj: ResolveEnd) => {
      this.activeRoute = routeObj.url;
    });

  }

  ngOnInit() {
    this.filterMenu('');
  }

  filterMenu(searchText: string) {
    // console.log('filtering ', searchText);
    const matchText = searchText.toLowerCase();
    // this.filteredList = [...this.reg.compList];
    this.filteredList = this.reg.compList.filter((item) => {
      return item.name.toLowerCase().indexOf(matchText) >= 0;
    });
  }

}
