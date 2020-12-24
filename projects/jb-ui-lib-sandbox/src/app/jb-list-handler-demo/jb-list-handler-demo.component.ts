import {Component, OnDestroy, OnInit} from '@angular/core';
import {JbGrowlService} from '../../../../jb-ui-lib/src/lib/jb-growl/jb-growl.service';
import {JbListHandler} from '../../../../jb-ui-lib/src/lib/jb-list-handler/jb-list-handler';
import {BehaviorSubject, Subject} from 'rxjs';
import { Location } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-jb-list-handler-demo',
  templateUrl: './jb-list-handler-demo.component.html',
  styleUrls: ['./jb-list-handler-demo.component.scss']
})
export class JbListHandlerDemoComponent implements OnInit, OnDestroy {
  public name = jbListHandlerDoc.name;
  public desc = jbListHandlerDoc.desc;
  public api = jbListHandlerDoc.api;
  public instance = jbListHandlerDoc.instance;

  public listData = [
    { id:  0, username: 'joel.barba',   email: 'joel@barba.com', first_name: 'Joel', last_name: 'Barba'},
    { id:  2, username: 'syrax',        email: 'syrax@blackfire.com',        first_name: 'Syrax',        last_name: 'Targaryen' },
    { id:  3, username: 'vermithor',    email: 'vermithor@targaryen.com',    first_name: 'Vermithor',    last_name: 'Targaryen' },
    { id:  4, username: 'CAraxes',      email: 'caraxes@targaryen.com',      first_name: 'Caraxes',      last_name: 'Targaryen' },
    { id:  5, username: 'silverwing',   email: 'silverwing@blackfire.com',   first_name: 'Silverwing',   last_name: 'Targaryen' },
    { id:  6, username: 'sunfyre',      email: 'sunfyre@targaryen.com',      first_name: 'Sunfyre',      last_name: 'Targaryen' },
    { id:  7, username: 'vhagar',       email: 'vhagar@targaryen.com',       first_name: 'Vhagar',       last_name: 'Targaryen' },
    { id:  8, username: 'tessarion',    email: 'tessarion@targaryen.com',    first_name: 'Tessarion',    last_name: 'Targaryen' },
    { id:  9, username: 'cannibal',     email: 'cannibal@targaryen.com',     first_name: 'Cannibal',     last_name: 'Targaryen' },
    { id: 10, username: 'meraxes',      email: 'meraxes@targaryen.com',      first_name: 'Meraxes',      last_name: 'Targaryen' },
    { id: 11, username: 'balerion',     email: 'balerion@targaryen.com',     first_name: 'Balerion',     last_name: 'Targaryen' },
    { id: 12, username: 'quicksilver',  email: 'quicksilver@targaryen.com',  first_name: 'Quicksilver',  last_name: 'Targaryen' },
    { id: 13, username: 'Dreamfyre',    email: 'dreamfyre@blackfire.com',    first_name: 'Dreamfyre',    last_name: 'Targaryen' },
    { id: 14, username: 'meleys',       email: 'meleys@targaryen.com',       first_name: 'Meleys',       last_name: 'Targaryen' },
    { id: 15, username: 'seasmoke',     email: 'seasmoke@targaryen.com',     first_name: 'Seasmoke',     last_name: 'Targaryen' },
    { id: 16, username: 'vermax',       email: 'vermax@targaryen.com',       first_name: 'Vermax',       last_name: 'Targaryen' },
    { id: 17, username: 'arrax',        email: 'arrax@targaryen.com',        first_name: 'Arrax',        last_name: 'Targaryen' },
    { id: 18, username: 'tyraxes',      email: 'tyraxes@targaryen.com',      first_name: 'Tyraxes',      last_name: 'Targaryen' },
    { id: 19, username: 'moondancer',   email: 'moondancer@targaryen.com',   first_name: 'Moondancer',   last_name: 'Targaryen' },
    { id: 20, username: 'stormcloud',   email: 'stormcloud@targaryen.com',   first_name: 'Stormcloud',   last_name: 'Targaryen' },
    { id: 21, username: 'morghul',      email: 'morghul@targaryen.com',      first_name: 'Morghul',      last_name: 'Targaryen' },
    { id: 22, username: 'shrykos',      email: 'shrykos@targaryen.com',      first_name: 'Shrykos',      last_name: 'Targaryen' },
    { id: 23, username: 'greyghost',    email: 'greyghost@targaryen.com',    first_name: 'Greyghost',    last_name: 'Targaryen' },
    { id: 24, username: 'sheepstealer', email: 'sheepstealer@targaryen.com', first_name: 'Sheepstealer', last_name: 'Targaryen' },
  ];
  public genList;

  public example1 = `import { JbListHandler} from 'jb-ui-lib';

this.myList = new JbListHandler({
  listName      : 'test-list-1',
  filterFields  : ['username', 'email'],
  orderFields   : ['id', 'username'],
  orderReverse  : false,
  data$         : this.loader$,
  status$       : this.status$,
}, qParams);`;


  public example2 = `this.myList.load(data);   // <-- Sync load

or 

this.myList.subscribeTo(this.loader$);  // <-- Async loading`;

  public example3 = `<jb-input jbLabel="Search"   [(ngModel)]="myList.filterText"       (ngModelChange)="myList.filter($event)"></jb-input>
<jb-input jbLabel="Username" [(ngModel)]="myList.filters.username" (ngModelChange)="myList.filter($event, 'username')"></jb-input>
<jb-input jbLabel="Email"    [(ngModel)]="myList.filters.email"    (ngModelChange)="myList.filter($event, 'email', 1500)"></jb-input>

this.myList.filterList = (list: Array<any>, filterText: string = '', filterFields: Array<string>): Array<any> => {
  return this.defaultFilterList(list, filterText, filterFields);
};`;

  public example4 = `<jb-list-header-col colTitle="Email"></jb-list-header-col>
<jb-list-header-col colTitle="Username" fieldName="username" [orderConf]="myList.orderConf"></jb-list-header-col>

this.myList.orderList = (list: Array<any>, orderFields: Array<string>, orderReverse: boolean): Array<any> => {
  return this.defaultOrderList(list, orderFields, orderReverse);
};`;

  public example5 = `<jb-list-paginator class="col-12" [jbCtrl]="myList" jbShowSelector="true"></jb-list-paginator>`;
  public example6 = `<jb-btn jbType="add" jbText="view.common.add" (jbClick)="myList.add({...})"></jb-btn>
<li *ngFor="let item of myList.renderList$ | async">
  <div class="col-10">...</div>
  <div class="col-2 text-right">
    <jb-btn jbType="delete" (jbClick)="item.$remove()"></jb-btn>
    <jb-btn jbType="edit"   (jbClick)="item.$save({ username: 'new value' })"></jb-btn>
  </div>
</li>`;

  public viewExample = `<div class="row whiteBg padB15">
  <jb-input class="col-4" jbIcon="icon-search" [(ngModel)]="myList.filterText" (ngModelChange)="myList.filter($event)"></jb-input>
</div>
<div class="row whiteBg">
  <jb-list-paginator class="col-12" [jbCtrl]="myList" jbShowSelector="true"></jb-list-paginator>
</div>
<div class="row">
  <div class="col-12">
    <ul class="list-unstyled table-list">
      <li class="list-header">
        <jb-list-header-col class="col-1" colTitle="Id"         fieldName="id"        [orderConf]="myList.orderConf"></jb-list-header-col>
        <jb-list-header-col class="col-2" colTitle="Username"   fieldName="username"  [orderConf]="myList.orderConf"></jb-list-header-col>
        <jb-list-header-col class="col-4" colTitle="Email"></jb-list-header-col>
        <jb-list-header-col class="col-4" colTitle="Full Name"></jb-list-header-col>
      </li>

      <jb-list-placeholder [hidden]="myList.loadingStatus > 1" [jbColumns]="[1, 2, 4, 4, 1]"></jb-list-placeholder>
      <li class="list-row" [hidden]="myList.loadingStatus <= 1" *ngFor="let item of myList.renderList$ | async">
        <div class="col-1">{{item.id}}</div>
        <div class="col-2">{{item.username}}</div>
        <div class="col-4">{{item.email}}</div>
        <div class="col-4">{{item.first_name + ' ' + item.last_name}}</div>
        <div class="col-1 text-right">
          <jb-btn jbType="delete" (jbClick)="item.$remove()"></jb-btn>
          <jb-btn jbType="edit"   (jbClick)="item.$save({ username: 'new value' })"></jb-btn>
        </div>
      </li>
    </ul>
  </div>
</div>`;

  public codeExample = `
  public myList: JbListHandler;  
  
  constructor() {
    this.myList = new JbListHandler({
      data$         : this.loader$,
      listName      : 'test-list',
      filterFields  : ['username', 'first_name'],
      orderFields   : ['id', 'username'],
      orderReverse  : false,
    }, this.route.snapshot.queryParams);
  }`;


  public viewExampleBe = `
<div class="row">
  <jb-input class="col-4" jbLabel="Username" jbIcon="icon-search"
            [(ngModel)]="bpList.filters.username" (ngModelChange)="bpList.filter($event, 'username', 1000)">
  </jb-input>
  <jb-input class="col-4" jbLabel="Filter email" jbIcon="icon-search"
            [(ngModel)]="bpList.filters.email" (ngModelChange)="bpList.filter($event, 'email')">
  </jb-input>
</div>
<div class="row whiteBg">
  <jb-list-paginator class="col-12" [jbCtrl]="bpList" jbShowSelector="true"></jb-list-paginator>
</div>
<div class="row">
  <div class="col-12" [jbLoadingSpinner]="bpList.loadingStatus === 4">
    <ul class="list-unstyled table-list">
      <li class="list-header">
        <jb-list-header-col class="col-1" colTitle="Id"         fieldName="id"        [orderConf]="bpList.orderConf"></jb-list-header-col>
        <jb-list-header-col class="col-2" colTitle="Username"   fieldName="username"  [orderConf]="bpList.orderConf"></jb-list-header-col>
        <jb-list-header-col class="col-4" colTitle="Email"></jb-list-header-col>
        <jb-list-header-col class="col-4" colTitle="Full Name"></jb-list-header-col>
      </li>
      <jb-list-placeholder [hidden]="bpList.loadingStatus > 1" [jbColumns]="[1, 2, 4, 4, 1]"></jb-list-placeholder>
      <li class="list-row" [hidden]="bpList.loadingStatus <= 1" *ngFor="let item of bpList.renderList$ | async">
        <div class="col-1">{{item.id}}</div>
        <div class="col-2">{{item.username}}</div>
        <div class="col-4">{{item.email}}</div>
        <div class="col-4">{{item.first_name + ' ' + item.last_name}}</div>
      </li>
    </ul>
  </div>
</div>`;

  public codeExampleBe = `this.bpList  = new JbListHandler({
  listName      : 'backend-pagination-list',
  filterFields  : ['username', 'email'],
  orderFields   : ['id', 'username'],
  orderReverse  : false,
  rowsPerPage   : 5,
  backendPagination : (slimFilter: any, fullFilter: any) => {

    // this.mockBEFilter(slimFilter).then((data: any) => {
    //   this.bpList.load(data.users, data.count);
    // });

    return this.mockBEFilter(slimFilter).then((data: any) => {
      return { list: data.users, count: data.count };
    });
  },
}, this.route.snapshot.queryParams);`;


  public myList: JbListHandler;
  public loader$ = new Subject();

  public bpList: JbListHandler;
  public bpLoader$ = new Subject();

  constructor(
    private growl: JbGrowlService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
  ) {

    const queryParams = {
      '~username': 'ver',
      '~email': 'silverwing@blackfire.co',
    };
    this.myList  = new JbListHandler({
      data$         : this.loader$,
      listName      : 'test-list',
      filterFields  : ['username', 'first_name'],
      orderFields   : ['id', 'username'],
      orderReverse  : false,
      rowsPerPage   : 5,
    }, queryParams);

    this.bpList  = new JbListHandler({
      listName      : 'backend-pagination-list',
      filterFields  : ['username', 'email'],
      orderFields   : ['id', 'username'],
      orderReverse  : false,
      rowsPerPage   : 5,
      backendPagination : (slimFilter: any, fullFilter: any) => {

        // this.mockBEFilter(slimFilter).then((data: any) => {
        //   this.bpList.load(data.users, data.count);
        // });

        return this.mockBEFilter(slimFilter).then((data: any) => {
          return { list: data.users, count: data.count };
        });
      },
    }, this.route.snapshot.queryParams);


    this.bpList.onFiltersChange$.subscribe((filterObj: any) => {
      const { filters, filterText } = filterObj;

      // Replace the empty values by null, to stripe them out the url
      Object.keys(filters).forEach(n => {
        if (filters[n] === '' || filters[n] === undefined) { filters[n] = null; }
      });

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: filters,
        replaceUrl: true,
        queryParamsHandling: 'merge',
      });
    });
  }

  ngOnInit() {
    this.bpList.fetchPage().then(data => {
      console.log('FIRST PAGE LOADED', data);
    });

    // this.myList.subscribeTo(this.loader$);

    // this.loader$.next(this.getRandomData());
    this.loader$.next(this.listData);
    // this.myList.load(this.getRandomData());
  }

  ngOnDestroy() {
    this.myList.destroy();
    this.bpList.destroy();
  }

  asyncLoad(backend = false) {
    if (!backend) {
      this.myList.loadingStatus = 1;
      setTimeout(() => {
        this.loader$.next(this.getRandomData());
      }, 4000);

    } else {
      this.bpList.loadingStatus = 4;
      setTimeout(() => {
        const data = this.getRandomData();
        this.bpList.load(data.slice(0, this.bpList.rowsPerPage), Math.trunc(Math.random() * 50));
      }, 4000);
    }
  }

  addItem() {
    this.myList.add({
      id: (Math.trunc(Math.random() * 500)),
      username: 'USER ' + (Math.trunc(Math.random() * 50)),
      email: 'someone@there.com',
      first_name: 'new',
      last_name: 'user'
    });
  }

  editItem(item) {
    item.$save({
      username: 'USER ' + (Math.trunc(Math.random() * 50))
    });
  }

  deleteItem(item) {
    console.log(item, new Date());
    item.$remove();
  }

  public getRandomData = () => {
    this.genList = this.listData.filter(item => !!Math.trunc(Math.random() * 5));
    return this.genList;
  };

  clearFilters() {
    this.bpList.filters.username = null;
    this.bpList.filters.email = null;
    this.bpList.goToPage(1);
  }

  // Mock a backend side paginated list request
  public mockBEFilter = (backFilter) => {
    console.log('--------- Mocking webAPI request with --------->', backFilter);
    return new Promise(resolve => {
      let orderReverse = 1;
      let orderFields = [];
      if (!!backFilter.order_by) {
        orderFields = backFilter.order_by.replace(/-/gi, '').split(',');
        orderReverse = backFilter.order_by.charAt(0) === '-' ? -1 : 1;
      }

      const usersQuery = this.listData.dCopy()
        .filter(item => {
          if (backFilter.username && item.username.toLowerCase().indexOf(backFilter.username.toLowerCase()) < 0) { return false; }
          if (backFilter.email && item.email.toLowerCase().indexOf(backFilter.email.toLowerCase()) < 0) { return false; }
          if (backFilter.first_name && item.first_name.toLowerCase().indexOf(backFilter.first_name.toLowerCase()) < 0) { return false; }
          return true;
        })
        .sort((itemA, itemB) => {
          const reVal = orderReverse;
          for (const field of orderFields) {
            let valA = itemA[field];
            let valB = itemB[field];
            if (!isNaN(valA) && !isNaN(valB)) { valA = Number(valA); valB = Number(valB); }
            if (typeof valA === 'string') { valA = valA.toLowerCase(); }
            if (typeof valB === 'string') { valB = valB.toLowerCase(); }
            if (valA !== valB) { return (valA > valB ? reVal : -reVal); }
          }
          return reVal;
        });

      const users = usersQuery.dCopy().splice(backFilter.offset, backFilter.limit);

      setTimeout(() => {
        resolve({ count: usersQuery.length, users });
      }, 1000);
    });
  };
}


export const jbListHandlerDoc = {
  name    : `JbListHandler`,
  uiType  : 'class',
  desc    : `(Class) Factory to generate list handlers`,
  api     : `renderList$      → Emits the rendered list to be displayed
render$          → Emits the whole state object
onFiltersChange$ → Emits when any filter on the list changes

.load(data: Array<T>)    → To load a new content passing a new array of objects.

.subscribeTo(data$: Observable<Array<T>>, status$: Observable<number>)
                         → Subscribes to a source (array to load on the list).

loadedList    : Array<T> → Full loaded list (or current page when backend pagination).
renderedList  : Array<T> → Rendered content (loadedList with order + filter + pagination applied).
listName      : string   → Optional list identifier.
loadingStatus : number   → 0=Empty, 1=Loading, 2=Loaded, 3=Error, 4=Page loading.
totalItems    : number   → Length of the full list (loadedList.length).
totalFiltered : number   → Length of the list after filters applied (before pagination).
renderedItems : number   → Length of the rendered list (renderedList.length).
rowsPerPage   : number   → Current number of rows per page (pagination).
currentPage   : number   → Current page (pagination).
totalPages    : number   → Current total of pages (pagination).
filterText    : string   → Multiple field filter match.
filterFields  : Array<string> → Array of the fields that will be match with the "filterText" during the filter process.
filters       : Array<{name, value}> → Set of filters to apply per field.

orderConf { → Object to manage order (ready to be link to <jb-list-header-col [jbCtrl]="orderConf">)
  fields: Array<string>   → Array of the fields to order the list (order by).
  reverse: boolean        → Whether the list is ordered asc (false) or desc (true)
  setField(field: string) → It adds (unshift) a new order field in fields[]. If that field was already present in the array
                            it swaps it to the first position (first field to order by)
}

// Action dispatchers - All this methods will trigger a list render after the state changes
.filter(value, name, debounce) → To change the filters. If no filter name, filterText is considered.
.order(orderField)             → Select what field we order the list by. Choosing the same twice reverts.
.paginate(rowsPerPage)         → To change the number of rows per page
.nextPage()                    → Jump pagination to the next page
.prevPage()                    → Jump pagination to the previous page
.goToPage(page: number)        → Jump pagination to the previous page
.refresh()                     → It doesn't change anything, just forces a rerender of the list`,
  instance: ``,
  demoComp: JbListHandlerDemoComponent
};
