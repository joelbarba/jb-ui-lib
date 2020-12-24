import {Component, OnDestroy, OnInit} from '@angular/core';
import {JbListHandler, ListStatus} from '../../../../jb-ui-lib/src/lib/jb-list-handler/jb-list-handler';
import {JbListSelection} from '../../../../jb-ui-lib/src/lib/jb-list-selection/jb-list-selection';
import {JbGrowlService} from '../../../../jb-ui-lib/src/lib/jb-growl/jb-growl.service';


@Component({
  selector: 'app-jb-list-selection-demo',
  templateUrl: './jb-list-selection-demo.component.html',
  styleUrls: ['./jb-list-selection-demo.component.scss']
})
export class JbListSelectionDemoComponent implements OnInit, OnDestroy {
  name = jbListSelectionDoc.name;
  desc = jbListSelectionDoc.desc;
  api = jbListSelectionDoc.api;
  instance = jbListSelectionDoc.instance;
  compInst = `<jb-list-checkbox>`;

  example1 = `public myList = new JbListHandler({ ... });
public mySel = new JbListSelection(this.myList);
this.mySel.getSelection(); / this.mySel.ids;


<ul class="list-unstyled table-list">
  <li class="list-header">
    <jb-list-header-col class="mobile" ...
  
    <jb-list-checkbox [selection]="mySel"></jb-list-checkbox>    
    <jb-list-header-col class="col-2" ...
    <jb-list-header-col class="col-2" ...
  </li>
  <li class="list-row">
    <jb-mobile-list-row ...
  
    <jb-list-checkbox [selection]="mySel" [id]="item.id">                      
    </jb-list-checkbox>  
    <div class="col-2">...</div>
    <div class="col-2">...</div>
  </li>
</ul>`;

  example2 = `public myList = new JbListHandler({ ... });
public mySel = new JbListSelection(this.myList);
this.mySel.getSelection(); / this.mySel.ids;


<ul class="list-unstyled table-list">
  <li class="list-header">    
    <jb-checkbox class="col-1"
                 [ngModel]="mySel.isPageChecked"
                 (ngModelChange)="mySel.togglePage()">                 
    </jb-checkbox>
    ...    
  </li>

  <li class="list-row">
    <jb-checkbox class="col-1"
                 [ngModel]="mySel.ids[item.id]"
                 (ngModelChange)="mySel.toggleCheck(item.id)">                 
    </jb-checkbox>
    ...
  </li>
</ul>`;

  example3 = `<ul class="list-unstyled table-list">
  <li class="list-header">
    <jb-list-header-col class="mobile" ...
  
    <jb-list-checkbox class="actions-pad" [selection]="sel"
                      [actions]="actions" (actionClick)="triggerAction($event)">
    </jb-list-checkbox>

    <jb-list-header-col class="col-2" ...
    <jb-list-header-col class="col-2" ...
  </li>
  <li class="list-row">
    <jb-mobile-list-row ...
  
    <jb-list-checkbox class="actions-pad" [selection]="sel" [id]="item.id">
      <span class="icon-aid-kit"></span>
      <span class="icon-warning2"></span>
      <span class="icon-spam"></span>
    </jb-list-checkbox>
                     
    </jb-list-checkbox>  
    <div class="col-2">...</div>
    <div class="col-2">...</div>
  </li>
</ul>`;

  example4 = `public myList = new JbListHandler({ ... });
public mySel = new JbListSelection(this.myList);

public actions = [
  { id: 1, label: 'Delete all',    disabled: false, fn: (sel) => ... },
  { id: 2, label: 'Move all',      disabled: true,  fn: (sel) => ... },
  { id: 3, label: 'Link selected', disabled: false, fn: (sel) => ... },
];`;



  public status = ListStatus;

  public itemsList = [
    { id:  0, username: 'joel.barba',   email: 'joel@barba.com', first_name: 'Joel', last_name: 'Barba', icon: 'icon-smile2', img: 'assets/language-flags/ca.png' },
    { id:  2, username: 'syrax',        email: 'syrax@targaryen.com',        first_name: 'Syrax',        last_name: 'Targaryen', icon: 'icon-home',          img: 'assets/language-flags/de.png' },
    { id:  3, username: 'vermithor',    email: 'vermithor@targaryen.com',    first_name: 'Vermithor',    last_name: 'Targaryen', icon: 'icon-office',        img: 'assets/language-flags/ja.png' },
    { id:  4, username: 'caraxes',      email: 'caraxes@targaryen.com',      first_name: 'Caraxes',      last_name: 'Targaryen', icon: 'icon-thumbs-up',     img3: 'assets/language-flags/cn.png' },
    { id:  5, username: 'silverwing',   email: 'silverwing@targaryen.com',   first_name: 'Silverwing',   last_name: 'Targaryen', icon: 'icon-phone2',        img: 'assets/language-flags/da.png' },
    { id:  6, username: 'sunfyre',      email: 'sunfyre@targaryen.com',      first_name: 'Sunfyre',      last_name: 'Targaryen', icon: 'icon-bell2',         img: 'assets/language-flags/cat.png' },
    { id:  7, username: 'vhagar',       email: 'vhagar@targaryen.com',       first_name: 'Vhagar',       last_name: 'Targaryen', icon: 'icon-user',          img: 'assets/language-flags/el.png' },
    { id:  8, username: 'tessarion',    email: 'tessarion@targaryen.com',    first_name: 'Tessarion',    last_name: 'Targaryen', icon: 'icon-users',         img: 'assets/language-flags/es.png' },
    { id:  9, username: 'cannibal',     email: 'cannibal@targaryen.com',     first_name: 'Cannibal',     last_name: 'Targaryen', icon: 'icon-lock',          img: 'assets/language-flags/fi.png' },
    { id: 10, username: 'meraxes',      email: 'meraxes@targaryen.com',      first_name: 'Meraxes',      last_name: 'Targaryen', icon: 'icon-teapot',        img: 'assets/language-flags/fr.png' },
    { id: 11, username: 'balerion',     email: 'balerion@targaryen.com',     first_name: 'Balerion',     last_name: 'Targaryen', icon: 'icon-plus',          img: 'assets/language-flags/gb.png' },
    { id: 12, username: 'quicksilver',  email: 'quicksilver@targaryen.com',  first_name: 'Quicksilver',  last_name: 'Targaryen', icon: 'icon-minus',         img: 'assets/language-flags/ie.png' },
    { id: 13, username: 'dreamfyre',    email: 'dreamfyre@targaryen.com',    first_name: 'Dreamfyre',    last_name: 'Targaryen', icon: 'icon-notification2', img: 'assets/language-flags/it.png' },
    { id: 14, username: 'meleys',       email: 'meleys@targaryen.com',       first_name: 'Meleys',       last_name: 'Targaryen', icon: 'icon-warning2',      img: 'assets/language-flags/ja.png' },
    { id: 15, username: 'seasmoke',     email: 'seasmoke@targaryen.com',     first_name: 'Seasmoke',     last_name: 'Targaryen', icon: 'icon-checkmark',     img: 'assets/language-flags/nl.png' },
    { id: 16, username: 'vermax',       email: 'vermax@targaryen.com',       first_name: 'Vermax',       last_name: 'Targaryen', icon: 'icon-rocket',        img: 'assets/language-flags/no.png' },
    { id: 17, username: 'arrax',        email: 'arrax@targaryen.com',        first_name: 'Arrax',        last_name: 'Targaryen', icon: 'icon-bin',           img: 'assets/language-flags/pl.png' },
    { id: 18, username: 'tyraxes',      email: 'tyraxes@targaryen.com',      first_name: 'Tyraxes',      last_name: 'Targaryen', icon: 'icon-shield',        img: 'assets/language-flags/pt.png' },
    { id: 19, username: 'moondancer',   email: 'moondancer@targaryen.com',   first_name: 'Moondancer',   last_name: 'Targaryen', icon: 'icon-switch',        img: 'assets/language-flags/sv.png' },
    { id: 20, username: 'stormcloud',   email: 'stormcloud@targaryen.com',   first_name: 'Stormcloud',   last_name: 'Targaryen', icon: 'icon-list',          img: 'assets/language-flags/tw.png' },
    { id: 21, username: 'morghul',      email: 'morghul@targaryen.com',      first_name: 'Morghul',      last_name: 'Targaryen', icon: 'icon-tree6',         img: 'assets/language-flags/us.png' },
    { id: 22, username: 'shrykos',      email: 'shrykos@targaryen.com',      first_name: 'Shrykos',      last_name: 'Targaryen', icon: 'icon-earth2',        img: 'assets/language-flags/zh.png' },
    { id: 23, username: 'greyghost',    email: 'greyghost@targaryen.com',    first_name: 'Greyghost',    last_name: 'Targaryen', icon2: 'icon-menu3',        img2: 'assets/language-flags/ca.png' },
    { id: 24, username: 'sheepstealer', email: 'sheepstealer@targaryen.com', first_name: 'Sheepstealer', last_name: 'Targaryen', icon: 'icon-link',          img: 'assets/language-flags/de.png' },
  ];


  public myList = new JbListHandler({
    listName: 'test-list',
    filterFields: ['username', 'email'],
    orderFields: ['id'],
    rowsPerPage: 5,
  });

  // public sel: JbListSelection;
  public sel = new JbListSelection(this.myList);
  // public sel = new JbListSelection(this.myList.renderList$);
  // public sel = new JbListSelection(this.myList.renderedList);

  public actions = [
    { id: 1, label: 'Delete all',          disabled: false, fn: (sel) => console.log('Delete action', sel) },
    { id: 2, label: 'Move all',            disabled: true,  fn: (sel) => console.log('Move action', sel) },
    { id: 3, label: 'Link selected items', disabled: false, fn: (sel) => console.log('Link action', sel) },
  ];

  constructor(
    private growl: JbGrowlService,
  ) { }

  ngOnInit() {
    this.myList.load(this.itemsList);
    // this.sel = new JbListSelection(this.myList.renderedList);
  }
  ngOnDestroy() {
    this.sel.destroy();
  }

  public getSel() {
    console.log('Selected IDs:', this.sel.getSelection());
  }
  public selectAll() {
    this.myList.loadedList.forEach(item => this.sel.toggleCheck(item.id, true));
  }

  public triggerAction(action) {
    this.growl.success(`Action ${action.label} performed on a multiple selection: ${this.sel.getSelection()}`);
  }

}


export const jbListSelectionDoc = {
  name    : `JbListSelection`,
  uiType  : 'class',
  desc    : `(Class) Multiple selection handler`,
  api     : `new JbListSelection(list)   The list param of the constructor can be:
                              1 - A JbListHandler object
                              2 - An observable emitting the array of items (renderList$)
                              3 - An array with the list of items (renderedList)

ids: {};                    Object list with the selected keys (ids)
list: [];                   Reference to the list of items rendered on the current page of the list (renderedList)
count: number               Current number of selected items
isPageChecked: boolean;     Whether the current page has all items selected or not
resetOnFilter: boolean;     If true and using a JbListHandler, onFiltersChange$ empties the selection automatically
onChange$: BehaviorSubject  Emits the new list of selected items every time it changes

destroy() ................. In case of using observables, to destroy subscriptions. 
getSelection() ............ Returns the selected ids with an array = Object.keys(this.ids).
isChecked(id) ............. Returns whether an item with the ID is selected or not.
resetSel() ................ Empties the current selection.
refresh() ................. Updates the selection (page selection checkbox).
toggleCheck(id, value?) ... Selects/deselects the given ID. If value is provided, true=selects, false=deselects. 
togglePage(value?) ........ Selects/deselects all the items of the current page. If value is provided, true=selects all, false=deselects all.
`,
  instance: `mySel = new JbListSelection(this.myList);`,
  demoComp: JbListSelectionDemoComponent
};
