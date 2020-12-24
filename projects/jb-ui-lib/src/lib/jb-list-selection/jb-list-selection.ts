import {JbListHandler} from '../jb-list-handler/jb-list-handler';
import {BehaviorSubject, isObservable, Observable, Subscription} from 'rxjs';


export class JbListSelection {
  public subs: {[ key: string]: Subscription } = {};  // Subscriptions holder
  public ids = {};  // Object list of selected keys (ids)
  public isPageChecked = false; // Whether the current page has all items selected
  public resetOnFilter = true;  // If true, onFiltersChange$ empties the selection
  public list;                  // List of items rendered on the current page
  public count = 0;             // Length of the selection
  public onChange$: BehaviorSubject<{}>; // To react to any change on the selection

  // The param can be:
  // 1 - A JbListHandler object
  // 2 - An observable emitting the array of items (renderList$)
  // 3 - An array with the list of items (renderedList)
  constructor(param: JbListHandler | Observable<Array<{}>> | Array<{}>) {
    this.onChange$ = new BehaviorSubject(this.ids);

    let list$;
    if (param instanceof JbListHandler) {
      list$ = param.renderList$;
      this.subs.filter = param.onFiltersChange$.subscribe(_ => this.resetOnFilter &&  this.resetSel());

    } else if (isObservable(param)) { list$ = param;
    } else if (Array.isArray(param)) { this.list = param;
    } else {
      throw new Error('Wrong param type: ' + param);
    }

    // If a reactive list is provided, update it when changes
    if (list$) { this.subs.list = list$.subscribe(v => { this.list = v; this.refresh(); }); }
  }

  public destroy = () => {
    Object.values(this.subs).forEach(sub => sub.unsubscribe());
  }

  public getSelection = () => Object.keys(this.ids);
  public isChecked = (id) => !!this.ids[id];
  public resetSel = () => { this.ids = {}; this.refresh(); };
  public refresh = () => {
    this.isPageChecked = this.list && this.list.length && this.list.every(item => this.ids[item.id]);
    this.count = Object.keys(this.ids).length;
    this.onChange$.next(this.ids);
  }

  public toggleCheck = (id: any, value = !this.ids[id]) => {
    if (value) {
      this.ids[id] = true;
    } else {
      delete this.ids[id];
    }
    this.refresh();
  };

  public togglePage = (value = !this.isPageChecked) => {
    this.list.forEach(item => this.toggleCheck(item.id, value));
  };
}
