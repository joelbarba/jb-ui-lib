import {BehaviorSubject, Observable, Subject, Subscription, timer} from 'rxjs';
import {debounce, distinctUntilChanged, map} from 'rxjs/operators';
import {dCopy} from '../jb-prototypes/deep-copy';
import Debug from 'debug';
import {JbObject} from '../jb-prototypes/jb-prototypes';
const debugList = Debug('jbUiLib:JbListHandler');  // Turn it on with:   localStorage.debug='jbUiLib:JbListHandler'

export interface JbListHandlerConfig {
  listName      ?: string;
  filterFields  ?: Array<string>;
  orderFields   ?: Array<string>;
  orderReverse  ?: boolean;
  rowsPerPage   ?: number;
  totalPages    ?: number;
  extMethods    ?: boolean;
  smartTrigger  ?: boolean;
  data$         ?: Observable<any> | Subject<any> | BehaviorSubject<any>;
  status$       ?: Observable<number> | Subject<number> | BehaviorSubject<number>;
  backendPagination ?: (fullFilter: any, slimFilter?: any, isDiff?: boolean, isFirstFetch?: boolean) => void | Promise<void | { list, count }>;
}

export enum ListStatus { EMPTY = 0, LOADING = 1, LOADED = 2, ERROR = 3, FETCHING = 4 }


export class JbListHandler {
  public render$: BehaviorSubject<any>; // Observable to listen to rendering changes
  public renderList$: Observable<any>;  // Observable to listen to rendering changes, mapping only renderedList as output
  public onFiltersChange$: Observable<any>; // Whenever the filters change

  // ---- STATE ---------------
  public loadedList: Array<any>;    // Array with the full loaded content
  public renderedList: Array<any>;  // Array with the content to render on the list (filtered + ordered + paginated)
  public listName = '';             // Optional list identifier
  public loadingStatus = ListStatus.EMPTY; // 0=Empty, 1=Loading, 2=Loaded, 3=Error, 4=Loading Page
  public totalItems = 0;            // loadedList.length
  public totalFiltered = 0;         // Total number of filtered items (middle step after filter and before pagination)
  public renderedItems = 0;         // renderedList.length
  public rowsPerPage = 10;          // Max number of rows per page of the pagination
  public currentPage = 1;           // Current page of the pagination
  public totalPages = 1;            // Calculation of the total number of pages
  public isEmpty = false;           // True when the full list is loaded and empty (show noData placeholder)
  public noMatch = false;           // True when the filtered list has no matches, but the list is not empty
  public filterText = '';           // Current filter value
  public backendPagination;         // Function to provide a backend filtered/paginated list handler
  public filters: any = {};         // Set of values applied to filter the list. Backend included here (limit, offset, order_by)
  // --------------------------
  public filterFields: Array<string> = [];  // Name of the field where to apply the filter (filterText)
  public extMethods = false;        // Whether to extend the items with handling methods ($remove, $save)
  public orderConf = {
    fields: [],       // Array with all the fields the list is ordered by
    reverse: false,   // Whether the list is ordered asc (false) or desc (true)
    setField: (orderField) => this.order(orderField) // Function to add a new field to the order sequence
  };
  public pagesList = [{id: 1, isLast: false}];   // List of page numbers (to loop)
  public lastFilters: any = {};  // Snapshot of the last "this.filters" applied to the list
  public customDefault;  // Default customInit value (set in constructor)
  public subs: {[ key: string]: Subscription } = {  // Subscriptions to hold
    dataSub     : null,   // Content loader
    statusSub   : null,   // External status
    debounceSub : null,   // Debounced filter
  };
  private debouncedFilter$ = new Subject<{filterName: string, filterValue, debounceMs?: number}>();
  private smartTrigger = true;  // For backend pagination: Avoid triggering page load again if filter hasn't changed
  private filtersExt = {}; // Extended config on filters: {}. It keeps the prefix coming from .filter()

  constructor(customInit: Partial<JbListHandlerConfig> = {}, qParams: any = {}) {
    this.customDefault = dCopy(customInit);
    if (customInit.hasOwnProperty('listName'))          { this.listName          = customInit.listName; }
    if (customInit.hasOwnProperty('orderFields'))       { this.orderConf.fields  = customInit.orderFields; }
    if (customInit.hasOwnProperty('orderReverse'))      { this.orderConf.reverse = customInit.orderReverse; }
    if (customInit.hasOwnProperty('rowsPerPage'))       { this.rowsPerPage       = customInit.rowsPerPage; }
    if (customInit.hasOwnProperty('totalPages'))        { this.totalPages        = customInit.totalPages; }
    if (customInit.hasOwnProperty('extMethods'))        { this.extMethods        = customInit.extMethods; }
    if (customInit.hasOwnProperty('smartTrigger'))      { this.smartTrigger      = customInit.smartTrigger; }
    if (customInit.hasOwnProperty('backendPagination')) { this.backendPagination = customInit.backendPagination; }
    if (customInit.hasOwnProperty('filterFields'))      { this.filterFields      = customInit.filterFields; }

    // Setting initial values from parsed url route (2nd param, overriding the defaults)
    if (qParams.hasOwnProperty('filterText')) { this.filterText = qParams.filterText; }
    if (qParams.hasOwnProperty('limit')) { this.rowsPerPage = parseInt(qParams.limit) || 1; }
    if (qParams.hasOwnProperty('offset')) {
      this.currentPage = Math.floor((parseInt(qParams.offset) || 0) / this.rowsPerPage) + 1;
    }
    if (qParams.hasOwnProperty('order_by')) {
      this.orderConf.reverse = qParams.order_by.charAt(0) === '-';
      this.orderConf.fields = qParams.order_by.replace(/-/gi, '').split(',');
    }

    // Syntax of the incoming filter, to determine its type of match: queryParams = {
    //    'email': 'sil', --> exact match filter
    //    '~user': 'ver', --> like match filter
    //  };
    Object.entries(qParams).forEach(([key, value]) => {
      let prefix = key.slice(0, 1);
      if (prefix === '=' || prefix === '~') { key = key.slice(1).trim(); } else { prefix = '='; }
      this.filtersExt[key] = prefix;
      this.filters[key] = value;
    });
    this.filters = this.getFilters();  // Initial filters

    // Init debounced filters subscription
    this.subs.debounceSub = this.debouncedFilter$.pipe(
      debounce((filter) => timer((!!filter.debounceMs || filter.debounceMs === 0) ? filter.debounceMs : 500)),
      distinctUntilChanged()
    ).subscribe(filter => {
      this.filters[filter.filterName] = filter.filterValue;
      this.dispatch({ action: 'FILTER', payload: this.filterText });
    });

    this.loadedList = [];
    this.renderedList = [];

    this.loadingStatus = ListStatus.EMPTY;
    this.render$ = new BehaviorSubject(this.getState());
    this.renderList$ = this.render$.pipe(map(state => state.renderedList ));
    this.onFiltersChange$ = this.render$.pipe(
      map(_ => ({ filters: dCopy(this.filters), filterText: this.filterText })),
      distinctUntilChanged((prev, next) => {
        return !this.isFilterDiff(prev.filters, next.filters) && prev.filterText === next.filterText;
      }),
      map(filterObj => dCopy(filterObj)),
    );

    // Automatically subscribe to an input source of data
    if (customInit.hasOwnProperty('data$')) { this.subscribeTo(customInit.data$, customInit.status$); }
  }


  // This should be called when the list is no longer used, to avoid memory leaks
  public destroy = () => {
    Object.keys(this.subs).forEach(sub => {
      if (!!this.subs[sub] && !!this.subs[sub].unsubscribe) {
        this.subs[sub].unsubscribe();
      }
    });
  };

  // @Todo: Turn it into a real reducer without state mutation
  // ------------------------- REDUCER -----------------------------
  // Apply an action to the current state to generate the next state
  private dispatch = (change: { action?: string, payload?: any } = {}) => {
    debugList('Reducer [', this.listName, ']----> ', change.action, change.payload);

    switch (change.action) {
      case 'LOAD' :
        if (!this.backendPagination) { // Load full list
          this.loadedList = change.payload.list;
          this.totalItems = this.loadedList.length;

        } else { // Load page (backend pagination)
          this.loadedList = change.payload.list;
          this.totalItems = change.payload.count;
          this.totalPages = Math.ceil(this.totalItems / this.rowsPerPage) || 1;
          this.currentPage = this.getPage(this.currentPage);
        }
        this.loadedList.forEach(this.extendItem);
        this.loadingStatus = ListStatus.LOADED;
        break;

      case 'ROWS': // New rows per page = refresh pagination
        this.rowsPerPage = change.payload || this.rowsPerPage;
        this.currentPage = this.getPage(this.currentPage);
        break;

      case 'ADD'     : this.loadedList.push(this.extendItem(change.payload)); break;
      case 'REMOVE'  : this.loadedList.splice(this.loadedList.indexOf(change.payload), 1); break;
      case 'FILTER'  : this.filterText = change.payload; break;
      case 'ORDER'   : this.orderConf = this.getOrderConf(change.payload); break;
      case 'GOTO'    : this.currentPage = this.getPage(change.payload); break;
      case 'NEXT'    : this.currentPage = this.getPage(this.currentPage + 1); break;
      case 'PREV'    : this.currentPage = this.getPage(this.currentPage - 1); break;
      case 'REFRESH' : break;
    }

    // Generate rendered list
    this.renderedList = this.loadedList;

    // Filter list
    this.renderedList = this.filterList(this.renderedList, this.filterText, this.filterFields);
    this.totalFiltered = this.renderedList.length;

    // Order list
    if (!!this.orderConf && !!this.orderConf.fields && this.orderConf.fields.length > 0) {
      this.renderedList = this.orderList(this.renderedList, this.orderConf.fields, this.orderConf.reverse);
    }

    // Pagination
    if (!this.backendPagination) { // Frontend (slice based on the state)
        this.totalPages = Math.ceil(this.renderedList.length / this.rowsPerPage) || 1;
        if (this.loadingStatus === ListStatus.LOADED) { this.currentPage = this.getPage(); } // In case it falls off

        this.renderedList = this.renderedList.filter((item, ind) => {
          const offSet = (this.currentPage - 1) * this.rowsPerPage;
          const limit = this.currentPage * this.rowsPerPage;
          return (ind >= offSet && ind < limit);
        });

    } else { // Backend (trigger on page change)
      if (this.loadingStatus > ListStatus.EMPTY) {
        if (['ROWS', 'FILTER'].includes(change.action) && this.isFilterDiff(this.lastFilters, this.getFilters())) {
           this.currentPage = 1; // These actions should force offset reset
        }

        // These actions should trigger a backend page request to load the page
        if (['ROWS', 'FILTER', 'ORDER', 'GOTO', 'NEXT', 'PREV', 'REFRESH'].includes(change.action)) {
          this.fetchPage();
        }
      }
    }

    // Generate an array with all pages (ready for <jb-list-paginator>)
    this.pagesList = Array.from(Array(this.totalPages).keys())
      .map(ind => ({ id: ind + 1, isLast: (ind === this.totalPages - 1) }));

    this.renderedItems = this.renderedList.length;

    // Empty flags
    if (!this.backendPagination) {
      this.isEmpty = this.loadingStatus === ListStatus.LOADED && this.totalItems === 0; // Full list empty
      this.noMatch = this.loadingStatus === ListStatus.LOADED && this.totalItems > 0 && this.totalFiltered === 0; // No filter matches
    } else {
      const hasFilters = !!Object.keys(this.lastFilters).filter(n => !!this.lastFilters[n] && n !== 'limit' && n !== 'offset' && n !== 'order_by').length;
      this.isEmpty = this.loadingStatus === ListStatus.LOADED && this.renderedItems === 0 && !hasFilters && this.totalItems === 0; // Full list empty
      this.noMatch = this.loadingStatus === ListStatus.LOADED && this.renderedItems === 0 &&  hasFilters && this.totalItems === 0; // Filtered list empty
    }

    // debugList('dispatching: ', change.action, this.getState());
    this.render$.next(this.getState());
  };

  // Wrap the state the fields
  public getState = () => {
    return {
      loadedList    : this.loadedList,
      renderedList  : this.renderedList,
      listName      : this.listName,
      loadingStatus : this.loadingStatus,
      totalItems    : this.totalItems,
      totalFiltered : this.totalFiltered,
      renderedItems : this.renderedItems,
      rowsPerPage   : this.rowsPerPage,
      currentPage   : this.currentPage,
      totalPages    : this.totalPages,
      filterFields  : this.filterFields,
      filterText    : this.filterText,
      isEmpty       : this.isEmpty,
      noMatch       : this.noMatch,
    };
  };

  // Returns an "orderConf" object with the order configuration for the list, adding the passed field
  public getOrderConf = (orderField: string) => {
    const orderConf = { ...this.orderConf };
    if (orderConf.fields[0] === orderField) {
      orderConf.reverse = !orderConf.reverse; // Revers current order

    } else { // Add selected field to the first field order
      const fieldPos = orderConf.fields.indexOf(orderField);
      if (fieldPos >= 0) { orderConf.fields.splice(fieldPos, 1); }
      orderConf.fields.unshift(orderField);
      orderConf.reverse = false;
    }
    return orderConf;
  };

  public getPage = (pageNum = this.currentPage) => {
    if (pageNum < 1) { pageNum = 1; }
    if (pageNum > this.totalPages) { pageNum = this.totalPages; }
    return pageNum;
  };

  // Returns an object with all filters applied on the list
  public getFilters = () => {
    const listFilter = { ...this.filters };

    if (!!this.backendPagination) {
      listFilter.limit  = this.rowsPerPage;
      listFilter.offset = (this.currentPage - 1) * listFilter.limit;
      listFilter.order_by = '';
      if (this.orderConf.fields.length) {
        listFilter.order_by = (this.orderConf.reverse ? '-' : '') + this.orderConf.fields[0]; // Backend supports only 1st field
        // listFilter.order_by = this.orderConf.fields.map(field => (this.orderConf.reverse ? '-' : '') + field).join(',');
      }
    }

    return listFilter;
  };


  // ---------------- Backend side pagination ----------------------

  // Backend pagination: Call this every time a different page needs to be requested and loaded
  public fetchPage = (force = false) => {
    this.filters = this.getFilters();
    const isFilterDiff = this.isFilterDiff(this.lastFilters, this.filters);
    const isFirstFetch = (this.loadingStatus === ListStatus.EMPTY);

    if (this.loadingStatus === ListStatus.EMPTY || !this.smartTrigger || isFilterDiff || force) {
      this.loadingStatus = ListStatus.FETCHING;
      this.lastFilters = dCopy(this.filters); // Keep a copy to remember

      const slimFilter = dCopy(this.filters);
      Object.keys(slimFilter).forEach(n => { if (!slimFilter[n]) { delete slimFilter[n]; } });

      const resPromise = this.backendPagination(dCopy(slimFilter), dCopy(this.filters), isFilterDiff, isFirstFetch);

      if (!!resPromise) { // If a promise is returned, trigger the page load automatically
        return resPromise.then(page => {
          this.load(page.list, page.count);
          return page;
        });
      }
    } else {
      debugList('[', this.listName, ']----> ', 'Same filter, do not refresh page', this.lastFilters, this.filters);
    }
    return Promise.resolve();
  };

  // Compares 2 filters objects prop by prop (ignoring empty values)
  public isFilterDiff = (filters1, filters2) => {
    const keys1 = Object.keys(filters1).filter(n => !['', null, undefined].includes(filters1[n]));
    const keys2 = Object.keys(filters2).filter(n => !['', null, undefined].includes(filters2[n]));
    if (keys1.length !== keys2.length) { return true; }
    for (const key of keys1) {
      if (!keys2.includes(key)) { return true; }
      if (filters1[key] !== filters2[key]) { return true; }
    }
    return false;
  };


  // ---------------- Public methods to trigger actions ----------------------

  // Load a list of data
  public load = (list, count?) => {
    this.dispatch({ action: 'LOAD', payload: { list, count } });
  };

  // Set an observable as the source of input data for the list
  public subscribeTo = (data$, status$?) => {
    if (!!this.subs.dataSub) { this.subs.dataSub.unsubscribe(); }

    if (status$) {
      if (!!this.subs.statusSub) { this.subs.statusSub.unsubscribe(); }
      this.subs.statusSub = status$.subscribe(status => this.loadingStatus = status);
      this.subs.dataSub = data$.subscribe(list => {
        if (this.loadingStatus === ListStatus.LOADED) { this.load(dCopy(list || [])); }
      });

    } else { // If no status$, pretend it's loading until first data$
      this.loadingStatus = ListStatus.LOADING;
      this.subs.dataSub = data$.subscribe(list => this.load(dCopy(list || [])));
    }
  };

  // Shortcuts to dispatch action
  public refresh  = () => this.dispatch({ action: 'REFRESH' });
  public add      = (item: any) => this.dispatch({ action: 'ADD', payload: item });
  public order    = (orderField = '') => this.dispatch({ action: 'ORDER', payload: orderField });
  public goToPage = (numPage = 1) => this.dispatch({ action: 'GOTO', payload: numPage });
  public nextPage = () => this.dispatch({ action: 'NEXT' });
  public prevPage = () => this.dispatch({ action: 'PREV' });
  public paginate = (rowsPerPage) => {
    if (this.rowsPerPage !== rowsPerPage) { this.dispatch({ action: 'ROWS',  payload: rowsPerPage }); }
  };

  // .filter()                              Triggers all filters set on the list
  // .filter(filterValue)                   Triggers a text free included match on multiple fields
  // .filter(filterValue, 'filter_name')    Triggers a strict match (=) on the specified field
  // .filter(filterValue, '=filter_name')   Triggers a strict match (=) on the specified field
  // .filter(filterValue, '~filter_name')   Triggers an included match (~) on the specified field

  // public filter = (filterValue: any, filterName?: string, debounceMs = (!!this.backendPagination ? 500 : 0)) => {
  public filter = (...args: [any?, string?, number?]) => {
    const filterValue = args[0];
    let filterName = args[1];
    const debounceMs = args.length > 2 ? args[2] : (!!this.backendPagination ? 500 : 0);

    if (args.length === 0) { // If no params, just trigger the filter again
      this.dispatch({ action: 'FILTER', payload: this.filterText });
      return true;
    }

    if (filterName) { // Filter on an specific field

      // If the filter name comes with a prefix, save it onto filtersExt: {}
      const prefix = filterName.slice(0, 1);
      if (prefix === '=' || prefix === '~') {
        filterName = filterName.slice(1).trim();
        this.filtersExt[filterName] = prefix;
      } else {
        this.filtersExt[filterName] = '=';
      }

      this.debouncedFilter$.next({ filterValue, filterName, debounceMs });

    } else { // Filter filterText on multiple fields (filterFields)
      if (!!this.backendPagination) {
        console.warn('Not allowed with backend pagination. Provide a field please');
        return false;
      }
      this.dispatch({ action: 'FILTER', payload: filterValue });
    }
  };

  // Resets all filters + order + pagination
  public reset = (defaults = {}) => {
    Object.keys(this.filters).forEach(n => this.filters[n] = null);
    Object.keys(defaults).forEach(n => this.filters[n] = defaults[n]);
    this.filterText = '';
    this.orderConf.fields  = [ ...this.customDefault.orderFields ];
    this.orderConf.reverse = this.customDefault.orderReverse;
    this.rowsPerPage = this.customDefault.rowsPerPage;
    this.goToPage(1);
  };

  // If fields[] is provided, it resets only the selected filters. Ex: resetFilters(['status', 'email'])
  public resetFilters = (fields: Array<string> = null, defaults = {}) => {
    this.filterText = '';
    Object.keys(this.filters).filter(n => !fields || fields.includes(n)).forEach(n => this.filters[n] = null);
    Object.keys(defaults).filter(n => !fields || fields.includes(n)).forEach(n => this.filters[n] = defaults[n]);
    this.dispatch({ action: 'FILTER', payload: '' });
  };

  // Check if all settings are still on default
  public isDefaultState = () => {
    return this.isFilterEmpty()
      && JSON.stringify(this.orderConf.fields) === JSON.stringify(this.customDefault.orderFields)
      && this.orderConf.reverse === this.customDefault.orderReverse
      && this.rowsPerPage === this.customDefault.rowsPerPage
      && this.currentPage === 1;
  };

  // Check if there is any filter applied to the list
  public isFilterEmpty = (ignorePagination = false, defaults = {}) => {
    return !this.filterText && !Object.entries(this.filters).filter(([key, val]) => {

      // Remove pagination keys, whatever value they have
      if (ignorePagination && ['offset', 'limit', 'order_by'].includes(key)) { return false; }

      // Remove keys with empty or default values
      return !(val === '' || val === undefined || val === null || val === defaults[key]);

    }).length;
  };


  // Extend the list item with manipulation methods: $save(), $remove()
  private extendItem = (item: any = {}) => {
    if (this.extMethods) {
      item.$remove = () => {
        this.dispatch({ action: 'REMOVE', payload: item });
      };
      item.$save = (nextItem = {}) => {
        Object.assign(item, nextItem);
        this.dispatch({ action: 'REFRESH' });
      };
    }
    return item;
  };

  // Default function to filter the list (on render). If "filterList" is extended later, this can be used to refer to the default
  public defaultFilterList = (list: Array<any>, filterText = '', filterFields: Array<string> = []): Array<any> => {
    if (!!this.backendPagination) { return list; } // No frontend filtering when backend pagination

    const filters = JbObject.peel.call(this.filters); // Strip out nulls and undefined s

    const arrValues = {}; // Filters with an array value
    Object.keys(filters).filter(key => Array.isArray(filters[key])).forEach(key => arrValues[key] = filters[key]);

    const isFilters = Object.keys(filters).length > 0;  // Any specific filters ?

    if (!filterText && !isFilters) {
      return list; // If no filters, return it all

    } else {
      const matchPattern = filterText.toLowerCase();
      return list.filter((item) => {
        let isMatch1 = true; // If filterText matches any of the fields of the item
        if (!!matchPattern) {
          isMatch1 = false;
          for (const key of filterFields) {
            isMatch1 = isMatch1 || JSON.stringify(item[key]).toLowerCase().indexOf(matchPattern) >= 0;
          }
        }

        let isMatch2 = true; // Specific field filter (filters: {})
        if (isFilters) {
          for (const key of Object.keys(item)) {
            if (filters.hasOwnProperty(key)) {

              // The 3 types of match:
              // 1 .filter([val1, val2, val3], 'field')   If the value matches any of the ones in the array
              // 2 .filter(filterValue, '~filter_name')   Included match (~). Match included in value
              // 3 .filter(filterValue, '=filter_name')   Strict match (=). Same exact values

              if (arrValues[key]) { // Match type 1 ([])
                isMatch2 = isMatch2 && (filters[key].includes(item[key]) || !filters[key].length);

              } else if (this.filtersExt[key] === '~') { // Match type 2 (~)
                isMatch2 = isMatch2 && JSON.stringify(item[key]).toLowerCase().indexOf((filters[key] + '').toLowerCase()) >= 0;

              } else { // // Match type 3 (=)
                isMatch2 = isMatch2 && (item[key] === filters[key]);
              }

              if (!isMatch2) { break; } // If no match, stop looping
            }
          }
        }
        return isMatch1 && isMatch2;
      });
    }
  };

  // Default function to order the list
  public defaultOrderList = (list: Array<any>, orderFields: Array<string>, orderReverse: boolean): Array<any> => {
    return list.sort((itemA, itemB) => {
      const reVal = !!orderReverse ? -1 : 1;

      // Iterate all fields until we find a difference and can tell which goes first
      for (const field of orderFields) {
        let valA = itemA[field];
        let valB = itemB[field];

        // Avoid undefined sorting
        if (valA === null || valA === undefined) { valA = ''; }
        if (valB === null || valB === undefined) { valB = ''; }

        if (!isNaN(valA) && !isNaN(valB)) { // If numbers, compare using number type
          valA = Number(valA);
          valB = Number(valB);
        }

        // Turn string order fields lowercase to make the search not case sensitive
        if (typeof valA === 'string') { valA = valA.toLowerCase(); }
        if (typeof valB === 'string') { valB = valB.toLowerCase(); }

        if (valA !== valB) { // If not equal, return which goes first
          return (valA > valB ? reVal : -reVal);
        }
      }
      return reVal;
    });
  };


  // Function to filter the list. ---> Extend this function if you need a custom filter
  public filterList = (list: Array<any>, filterText = '', filterFields: Array<string> = []): Array<any> => {
    return this.defaultFilterList(list, filterText, filterFields);
  };

  // Function to order the list. ---> Extend this function if you need a custom order
  public orderList = (list: Array<any>, orderFields: Array<string>, orderReverse: boolean): Array<any> => {
    return this.defaultOrderList(list, orderFields, orderReverse);
  };

}
