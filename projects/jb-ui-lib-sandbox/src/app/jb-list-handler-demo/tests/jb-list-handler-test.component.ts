import {Component, OnDestroy, OnInit} from '@angular/core';
import {JbGrowlService} from '../../../../../jb-ui-lib/src/lib/jb-growl/jb-growl.service';
import {JbListHandler} from '../../../../../jb-ui-lib/src/lib/jb-list-handler/jb-list-handler';
import {Subject} from 'rxjs';
import {dCopy} from '../../../../../jb-ui-lib/src/lib/jb-prototypes/deep-copy';

@Component({
  selector: 'app-jb-list-handler-test',
  templateUrl: './jb-list-handler-test.component.html'
})
export class JbListHandlerTestComponent implements OnInit, OnDestroy {
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

  public testList1: JbListHandler;
  public testList2: JbListHandler;
  public loader$ = new Subject();
  public testNum = 1; // 1=frontend pagination / 2=backend pagination


  constructor() {

    // Simple frontend paginated list
    this.testList1 = new JbListHandler({
      listName      : 'test-list-1',
      filterFields  : ['username', 'email'],
      orderFields   : ['id', 'username'],
      orderReverse  : false,
      rowsPerPage   : 5,
      data$         : this.loader$
    });

    // Backend paginated list
    this.testList2 = new JbListHandler({
      listName      : 'test-list-2',
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
    });

    // this.testList1.filterList = (list: Array<any>, filterText: string = '', filterFields: Array<string>): Array<any> => {
    //   return this.testList1.defaultFilterList(list, filterText, filterFields).filter(item => {
    //     return true;
    //   });
    // };
  }

  ngOnInit() {
    this.testList1.subscribeTo(this.loader$);
    this.testList2.fetchPage();
    this.loader$.next(this.listData);
  }

  ngOnDestroy() {
    this.testList1.destroy();
    this.testList2.destroy();
  }

  loadMoreData() {
    const newList = dCopy(this.listData);
    newList.push({ id: 1, username: 'new.dragon', email: 'smaug@lonley.com', first_name: 'Smaug', last_name: 'Baggins'});
    newList.push({ id: 25, username: 'dr.who', email: 'who@dr.com', first_name: 'Dr', last_name: 'Who'});
    this.loader$.next(newList);
  }
  loadLessData() {
    const newList = dCopy(this.listData);
    this.loader$.next(newList.slice(0, 15));
  }

  clearFilters() {
    // this.bpList.filters.username = null;
    // this.bpList.filters.email = null;
    // this.bpList.goToPage(1);
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
