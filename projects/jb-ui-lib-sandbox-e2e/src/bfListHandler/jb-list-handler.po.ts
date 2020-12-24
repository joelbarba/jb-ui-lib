import {$, $$, browser, by, element} from 'protractor';
import {JbListPaginatorPo} from '../bf-list-paginator.po';

export class BfListHandlerPo {
  public base = '.bf-list-handler-test1';
  public paginator = new BfListPaginatorPo();
  public selectors = {
    rows:  ' li.list-row:not(.list-row-placeholder)',
    cells: ' > div:not(.mobile-row)'
  };

  constructor(baseCss) {
    this.base = baseCss;
  }
  navigateTo() {
    return browser.get(browser.baseUrl + 'list-test') as Promise<any>;
  }

  // <bf-list-paginator>
  getPagesCount = () => this.paginator.getPagesArr().then(list => list.length);
  getCurrPageNum = () => this.paginator.getCurrPageNum();
  getPageNextBtn = () => this.paginator.getPageNextBtn();
  getPagePrevBtn = () => this.paginator.getPagePrevBtn();
  selectIPP = (pageNum) => this.paginator.selectIPP(pageNum); // Select items per page option


  // List headers (to order)
  getListHeader = (num) => $(this.base + ' .list-header bf-list-header-col:nth-child(' + num + ')');

  // Return an object array with the displayed elements on the list
  getListArr = async () => {
    const list = await this.getArray();
    return list.map(row => {
      return {
        col1: row[0],
        col2: row[1],
        col3: row[2],
        col4: row[3],
      };
    });
  };
  getArray = async (rowNum?) => {
    let tableArr = [];
    const cellSelector = this.base + this.selectors.rows + this.selectors.cells;
    const tRows = $$(this.base + this.selectors.rows);

    if (rowNum !== undefined) { // Selected row
      const tRow = tRows.get(rowNum);
      tableArr = await tRow.$$(cellSelector).map(el => el.getText());

    } else {  // All rows
      const count = await tRows.count();
      for (let ind = 0; ind < count; ind++) {
        const tRow = tRows.get(ind);
        const cellArr = await tRow.$$(cellSelector).map(cellEl => {
          return cellEl.getText();
        });
        tableArr.push(cellArr);
      }
    }
    return tableArr;
  };

  // Returns a summary of the list: [first row's name, last row's name, count]
  getFirstLastCount = async (): Promise<[string, string, number] | [number]> => {
    const cellSelector = this.base + this.selectors.rows + this.selectors.cells;
    const tRows = $$(this.base + this.selectors.rows);
    const count = await tRows.count();
    if (count === 0) { return [0]; }
    const firstRow: Array<string> = await tRows.get(0).$$(cellSelector).map(el => el.getText());
    const lastRow: Array<string> = await tRows.get(count - 1).$$(cellSelector).map(el => el.getText());
    return [firstRow[1], lastRow[1], count];
  };




  getTextFilter = () => $(this.base + ' .filter-text input.form-control');
  getFilterUser = () => $(this.base + ' .filter-username input.form-control');
  getFilterUserStrict = () => $(this.base + ' .filter-username-strict input.form-control');
  getFilterEmail = () => $(this.base + ' .filter-email   input.form-control');
  getFilterName = () => $(this.base + ' .filter-name    input.form-control');
  loadMoreBtn = () => $(this.base + ' bf-btn.load-more-btn').click();
  loadLessBtn = () => $(this.base + ' bf-btn.load-less-btn').click();

  getLimitBeF = async () => {
    const limit  = await $(this.base + ' .filter-limit').getText();
    const offset = await $(this.base + ' .filter-offset').getText();
    const order  = await $(this.base + ' .filter-order-by').getText();
    return [limit, offset, order];
  }
}
