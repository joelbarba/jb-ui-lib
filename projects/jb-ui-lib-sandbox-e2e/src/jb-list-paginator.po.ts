import {$, $$, by, element, browser, ElementFinder} from 'protractor';

export class BfListPaginatorPo {
  public base;

  constructor(el: string | ElementFinder = '.bf-list-paginator') {
    this.base = el;
  }
  getPageBtns = () => $$(this.base + ' .page-btn.num-btn');
  getPageNextBtn = () => $(this.base + ' .page-btn.next-btn');
  getPagePrevBtn = () => $(this.base + ' .page-btn.prev-btn');

  getPagesArr     = () => $$(this.base + ' .page-btn.num-btn').map(el => el.getAttribute('innerHTML'));
  getCurrPageNum  = () => $(this.base + ' .page-btn.current').getAttribute('innerHTML');

  getLastPage = async () => {
    const pages = $$(this.base + ' .page-btn.num-btn');
    const count = await pages.count();
    return pages.get(count - 1);
  };
  getLastPageNum = async () => (await this.getLastPage()).getText();

  // Click page number button
  goToPage = async (num: number) => {
    const pageBtns = $$(this.base + ' .page-btn.num-btn');
    const count = await pageBtns.count();
    if (num > count) { console.error(`Page ${num} does not exist. Max = ${count}`); return; }
    const pageBtn = pageBtns.get(num - 1);
    await pageBtn.click();
  };

  // Items per page option
  getIPP = () => $(this.base + ' .page-num-selector .bf-dropdown input.form-control').getAttribute('value');
  selectIPP = async (pageNum) => {
    const dropdownBtn = $(this.base + ' .page-num-selector .bf-dropdown .input-group-append');
    await dropdownBtn.click();
    const ops = $$(this.base + ' .page-num-selector .bf-dropdown .list-container .option-row');
    const op = ops.get(pageNum);
    await op.click();
  };
}


/***************************************************************************************************
<bf-list-paginator>
  <div class="bf-list-paginator">
    <div class="page-buttons">
      <div class="page-btn prev-btn disabled">‹</div>
      <div class="page-btn num-btn current">1</div>
      <div class="page-btn num-btn">2</div>
      <div class="page-btn num-btn">3</div>
      <div class="page-btn num-btn">4</div>
      <div class="page-btn num-btn disabled">...</div>
      <div class="page-btn num-btn">67</div>
      <div class="page-btn next-btn">›</div>
    </div>

    <div class="page-num-selector text-right">
      <bf-dropdown class="flat">
        <div class="form-group bf-dropdown-form-group is-required">
          <div class="bf-dropdown">
            <div class="input-group">
              <input class="form-control" placeholder="Show 5 items per page">
              <div class="input-group-append" (click)="!bfDisabled && onInputBtnClick()">
                <button class="btn btn-outline-secondary"><span class="icon-arrow-down22"></span></button>
              </div>
            </div>
            <div class="list-container">
              <div class="option-row selected" (mousedown)="selectItem(item)"><span>Show 5 items per page</span></div>
              <div class="option-row"><span>Show 10 items per page</span></div>
              <div class="option-row"><span>Show 15 items per page</span></div>
              <div class="option-row"><span>Show 20 items per page</span></div>
              <div class="option-row"><span>Show 30 items per page</span></div>
              <div class="option-row"><span>Show 50 items per page</span></div>
              <div class="option-row"><span>Show 100 items per page</span></div>
            </div>
          </div>
        </div>
      </bf-dropdown>
    </div>
  </div>
</bf-list-paginator>
***************************************************************************************************/
