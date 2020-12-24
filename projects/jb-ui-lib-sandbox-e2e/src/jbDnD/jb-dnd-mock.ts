import {browser} from 'protractor';

/*************************************************************************************
 Simple browser drag and drop mocking based on 'html-dnd' (https://github.com/html-dnd/html-dnd)
 It uses a script to manually trigger events on given elements, mocking the user's interaction
 and keeps a reference to the current dragging element and dragging over containers.
 There is no support for DataTransfer at the moment.
 Example:
     const dnd = new BfDnDMock();
     await dnd.drag(elem);
     await dnd.dragOver(container);
     await dnd.drop();
**************************************************************************************/
export class BfDnDMock {
  public draggingEl;
  public containerEl;
  public showPointer = false;   // Debug: To show a dragging mark

  // Generates the script to execute and mock an event
  private runScript = (eventName, element, extraLogic = '') => {
    const scriptStr = `var element = arguments[0];
      var mockDataTransfer = {
        setDragImage: function(element, x, y) {},
        getData: function(format) {},
        setData: function(format, data) {},
        clearData: function(format) {},
        dropEffect: undefined,
        types: [],
        files: undefined,
        effectAllowed: 'uninitialized',
        items: undefined
      };

      var event = document.createEvent('CustomEvent');
      event.initCustomEvent('${eventName}', true, true, null);
      event.dataTransfer = mockDataTransfer;
      ${extraLogic}
      element.dispatchEvent(event);`;

    return browser.executeScript(scriptStr, element);
  };

  // Shortcut for the 3 methods:
  //    await dnd.drag(elem);
  //    await dnd.dragOver(container);
  //    await dnd.drop();
  public dragAndDrop = async (element, container) => {
    await this.drag(element);
    await this.dragOver(container);
    await this.drop();
  };

  public wait = (time) => browser.sleep(time);


  // Mocking the drag start event on a given element [bfDraggable]
  public drag = async (element) => {
    this.draggingEl = element;
    await this.runScript('dragstart', this.draggingEl);
    await browser.sleep(10);
  };


  // Mocking the drop of the current [bfDraggable] and [bfDropContainer]
  public drop = async () => {
    if (this.containerEl) { await this.runScript('drop', this.containerEl); }
    if (this.draggingEl)  { await this.runScript('dragend', this.draggingEl); }
    await browser.sleep(10);
    this.draggingEl = null;
    this.containerEl = null;
    await this.showDebugPointer();
  };


  // Mocking the dragging over a container of a [bfDropContainer]
  // If no container provided, it is acknowledge as dragging outside the current container
  // pos{} mocks the position inside the container where the dragging happens
  public dragOver = async (container?, pos = { x: 1, y: 1 }) => {
    const setClientPos = `var elRect = element.getBoundingClientRect();
    event.clientX = elRect.left + ${pos.x};
    event.clientY = elRect.top + ${pos.y};`;

    if (container !== this.containerEl) {
      if (this.containerEl) { await this.runScript('dragleave', this.containerEl); }
      if (container)        { await this.runScript('dragenter', container); }
    }
    if (container) { await this.runScript('dragover', container, setClientPos); }
    this.containerEl = container;
    await this.showDebugPointer(container, pos);
    await browser.sleep(10);
  };




  // --- This is purely for debug purposes

  // Helper to display a pointer on the page representing the area that is dragging over
  private showDebugPointer = async (container?, pos = { x: 1, y: 1 }) => {
    if (!this.showPointer) { return; }
    const removePointerScript = `var pointerEl = document.getElementById('bf-dnd-pointer');
      if (!!pointerEl) { pointerEl.remove(); }`;
    await browser.executeScript(removePointerScript);

    if (container) {
      const pointerScript = `var container = arguments[0];
      var elRect = container.getBoundingClientRect();
      var clientX = elRect.left + ${pos.x};
      var clientY = elRect.top + ${pos.y};
      pointerEl = document.createElement('div');
      pointerEl.id = 'bf-dnd-pointer';
      pointerEl.style = 'position: fixed; z-index: 99999; '
          + ' border: 5px solid red; border-radius: 100%; background: rgba(red, 0.5);'
          + ' width: 20px; height: 20px;'
          + ' left: ' + (clientX - 10) + 'px; top: ' + (clientY - 10) + 'px;';
      document.body.appendChild(pointerEl);`;
      await browser.executeScript(pointerScript, container);
    }
  }

}




