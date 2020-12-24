import {$, $$, browser, by, element} from 'protractor';
// import {code} from 'html-dnd';

export class BfDndPo {
  base = 'app-bf-dnd-demo-1';
  pageUrl = '/BfDnD/example1';

  constructor(testNum = 1) {
    this.base = 'app-bf-dnd-demo-' + testNum;
    this.pageUrl = '/BfDnD/example' + testNum;
  }

  navigateTo() {
    return browser.get(browser.baseUrl + this.pageUrl) as Promise<any>;
  }

  getDraggable(ind = 0) {
    const bfDraggables = $$(`.bf-draggable`);
    return bfDraggables.get(ind);
  }

  getContainer(ind = 0) {
    const bfDraggables = $$('.bf-drop-container');
    return bfDraggables.get(ind);
  }

  getActiveContainer = () => $('.demo-active-container-id').getText();
  getActivePlaceholder = () => $('.demo-active-placeholder-id').getText();


  // async dragAndDrop(bfDraggable, bfDropContainer, config = { dragDelay: 10, dropDelay: 10, dropOut: false }) {
  //   await browser.executeScript(code, bfDraggable, bfDropContainer, config);
  //   await browser.sleep(config.dragDelay + config.dropDelay + 10);
  // }


  // Example1:
  getLastOp = async () => $('.last-op').getText();

  // Example2:
  getListItem = async (container) => {
    return container.$$(`.list-item-row`).map((rowEl, ind) => {
      return {
        name : rowEl.$('.list-item').getText(),
        remove: () => rowEl.$('.bf-btn').click()
      };
    });
  };

  // Example 3
  page3Cont1 = () => $('.bf-drop-container.c1');
  page3Cont2 = () => $('.bf-drop-container.c2');
  page3Cont3 = () => $('.bf-drop-container.c3');
  nestedSwitch = () => $('.nested-mode-switch .bf-switch');

  // Example 4
  accurateSwitch = () => $('.accurate-mode-switch .bf-switch');


  // Example 5
  getPage5ListItem = (ind = 0) => {
    const list = element(by.id('list-cont'));
    return list.$$(`.list-draggable .item-name`).get(ind);
  };
  getPage5ListPh = (id = 0) => $('.bf-drop-placeholder.placeholder-' + id);
  getPage5ListArray = () => {
    const list = element(by.id('list-cont'));
    return list.$$(`.list-draggable`).map((rowEl) => {
      return rowEl.$('.item-name').getText();
    });
  };


  // Example 6
  getElemG1 = () => $$('.group-1.bf-draggable').get(0);
  getElemG2 = () => $$('.group-2.bf-draggable').get(0);
  getContG1 = () => $('.group-1.bf-drop-container');
  getContG2 = () => $('.group-2.bf-drop-container');
}
