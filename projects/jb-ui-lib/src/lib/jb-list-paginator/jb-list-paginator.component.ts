import {Component, EventEmitter, Input, OnInit, OnChanges, Output, DoCheck} from '@angular/core';
import {Observable} from 'rxjs';

interface IJbCtrl {
  goToPage: (pageNum: number) => void;
  paginate?: (rowsPerPage: number) => void;
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  maxRowsPerPageList?: Array<{ num: number, label: string }>;
  render$ ?: Observable<{ currentPage, totalPages, rowsPerPage }>;
}

@Component({
  selector: 'jb-list-paginator',
  templateUrl: './jb-list-paginator.component.html',
  styleUrls: [],
  // encapsulation: ViewEncapsulation.None
})
export class JbListPaginatorComponent implements OnInit, OnChanges, DoCheck {
  @Output() jbPageChange = new EventEmitter<any>();
  @Input() jbShowSelector = false; // Whether to show the dropdown with the number of items per page
  @Input() jbMaxButtons = 4; // Number of maximum extra page buttons to display (0=1, 1=3, 2=5, 3=7, 4=9 ... x=2x+1)
  @Input() jbCtrl: IJbCtrl;

  public defaultCtrl: IJbCtrl = { // Default values for jbCtrl
    goToPage: (pageNum) => {},
    currentPage : 1,
    totalPages  : 1,
    rowsPerPage : 10,
    maxRowsPerPageList : [ // Selector for the max items per page
      { num: 5,   label: 'views.common.5_items_per_page' },
      { num: 10,  label: 'views.common.10_items_per_page' },
      { num: 15,  label: 'views.common.15_items_per_page' },
      { num: 20,  label: 'views.common.20_items_per_page' },
      { num: 30,  label: 'views.common.30_items_per_page' },
      { num: 50,  label: 'views.common.50_items_per_page' },
      { num: 100, label: 'views.common.100_items_per_page' },
    ]
  };

  public listBtns = [];   // Buttons to display on the left (1, 2, 3 ...)
  public prevCtrl;        // Copy of the previous jbCtrl, to detect changes
  public listLength = 0;  // Keep the previous list length to recalculate pages (internal default function)
  public renderSubs;      // Subscription to the jbCtrl.render$

  constructor() { }

  ngOnChanges(changes) {
    if (changes.hasOwnProperty('jbCtrl') || changes.hasOwnProperty('jbMaxButtons')) {
      this.jbCtrl = { ...this.defaultCtrl, ...this.jbCtrl };

      // if jbCtrl comes with a render$ observable, subscribe
      if (this.jbCtrl.render$) {
        if (!!this.renderSubs) { this.renderSubs.unsubscribe(); }
        this.renderSubs = this.jbCtrl.render$.subscribe(listState => {
          this.jbCtrl.currentPage = listState.currentPage;
          this.jbCtrl.totalPages = listState.totalPages;
          this.jbCtrl.rowsPerPage = listState.rowsPerPage;
          this.renderComponent();
        });
      }

      this.renderComponent();
    }
    this.listLength = this.jbCtrl.totalPages * this.jbCtrl.rowsPerPage;
  }

  // The object change "jbCtrl" is not detected by ngChanges. Do it here:
  ngDoCheck() {
    if (!this.prevCtrl
        || this.prevCtrl.currentPage !== this.jbCtrl.currentPage
        || this.prevCtrl.totalPages  !== this.jbCtrl.totalPages
        || this.prevCtrl.rowsPerPage !== this.jbCtrl.rowsPerPage) {
      this.renderComponent();
    }
  }

  ngOnInit() {
    this.renderComponent();
  }

  // Change the current page
  public goToPage(pageNum) {
    this.jbCtrl.currentPage = pageNum;
    this.renderComponent();
    this.jbPageChange.emit(pageNum);
    if (!!this.jbCtrl.goToPage && typeof this.jbCtrl.goToPage === 'function') {
      this.jbCtrl.goToPage(pageNum);
    }
  }

  public goToPrev() {
    if (this.jbCtrl.currentPage > 1) {
      this.goToPage(this.jbCtrl.currentPage - 1);
    }
  }

  public goToNext() {
    if (this.jbCtrl.currentPage < this.jbCtrl.totalPages) {
      this.goToPage(this.jbCtrl.currentPage + 1);
    }
  }

  // Recalculate rows per page
  public changeRowsPerPage = (rowsPerPage) => {
    if (!!this.jbCtrl.paginate) {
      this.jbCtrl.paginate(rowsPerPage);

    } else {
      // If jbCtrl does not provide a paginate() function, run this by default to recalculate totalPages
      this.jbCtrl.totalPages = Math.ceil(this.listLength / rowsPerPage);
      if (this.jbCtrl.currentPage < 1) { this.jbCtrl.currentPage = 1; }
      if (this.jbCtrl.currentPage > this.jbCtrl.totalPages) { this.jbCtrl.currentPage = this.jbCtrl.totalPages; }
      this.listLength = this.jbCtrl.totalPages * rowsPerPage;
    }
    this.renderComponent();
  };


  // Check and convert the value to a number
  public checkNumber = (value) => {
    if (typeof value !== 'number' && !Number.isNaN(value)) {
      return parseInt(value) || 1;
    } else {
      return value;
    }
  };


  // Calculates the array of buttons to display, based on the total pages, current page, max buttons
  public renderComponent = () => {
    this.jbCtrl.currentPage = this.checkNumber(this.jbCtrl.currentPage);
    this.jbCtrl.rowsPerPage = this.checkNumber(this.jbCtrl.rowsPerPage);
    this.jbCtrl.totalPages = this.checkNumber(this.jbCtrl.totalPages);
    this.jbMaxButtons = this.checkNumber(this.jbMaxButtons);

    // console.log('Rendering list paginator', this.jbCtrl);
    this.listBtns = [];
    const totalMax = (this.jbMaxButtons * 2) + 1; // Total number of buttons to display



    if (totalMax === 1) { // [x]
      this.listBtns.push({ pageNum: this.jbCtrl.currentPage });
    }
    if (totalMax === 3) { // [1 x 99]
      this.listBtns.push({ pageNum: 1 });
      if (this.jbCtrl.currentPage === 1 || this.jbCtrl.currentPage === this.jbCtrl.totalPages) {
        this.listBtns.push({ pageNum: null });
      } else {
        this.listBtns.push({ pageNum: this.jbCtrl.currentPage });
      }
      this.listBtns.push({ pageNum: this.jbCtrl.totalPages });
    }

    if (totalMax > 3) {
      if (this.jbCtrl.totalPages <= totalMax) {  // All pages in the list
        for (let ind = 1; ind <= this.jbCtrl.totalPages; ind++) { this.listBtns.push({ pageNum: ind }); }

      } else { // Split the list
        if (this.jbCtrl.currentPage <= 1 + this.jbMaxButtons) { // [1 2 3 x 5 6 7 ... 99]
          for (let ind = 1; ind <= totalMax - 2; ind++) { this.listBtns.push({ pageNum: ind }); }
          this.listBtns.push({ pageNum: null });
          this.listBtns.push({ pageNum: this.jbCtrl.totalPages });

        } else {
          if (this.jbCtrl.currentPage >= this.jbCtrl.totalPages - this.jbMaxButtons) {
            // [1 ... 93 94 95 96 97 98 99]
            this.listBtns.push({ pageNum: 1 });
            this.listBtns.push({ pageNum: null });
            for (let ind = this.jbCtrl.totalPages - totalMax + 3; ind <= this.jbCtrl.totalPages; ind++) {
              this.listBtns.push({ pageNum: ind });
            }

          } else {
            // [1 ... 4 5 6 7 8 ... 99]
            this.listBtns.push({ pageNum: 1 });
            this.listBtns.push({ pageNum: null });
            for (let ind = this.jbCtrl.currentPage - this.jbMaxButtons + 2; ind <= this.jbCtrl.currentPage + this.jbMaxButtons - 2; ind++) {
              this.listBtns.push({ pageNum: ind });
            }
            this.listBtns.push({ pageNum: null });
            this.listBtns.push({ pageNum: this.jbCtrl.totalPages });
          }
        }
      }
    }

    // Remember the values
    this.prevCtrl = {
      currentPage : this.jbCtrl.currentPage,
      totalPages  : this.jbCtrl.totalPages,
      rowsPerPage : this.jbCtrl.rowsPerPage,
    };
  };


}
