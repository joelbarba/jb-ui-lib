import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {filter, map, throttleTime} from 'rxjs/operators';
import {generateId} from '../generate-id';
import {JbArray} from '../jb-prototypes/jb-prototypes';


@Injectable({ providedIn: 'root' })
export class JbDnDService {
  private isDebugMode = false;    // If you turn this on, make sure parent nodes of 'jb-drop-container' have z-index >= 100

  public isDragging = false;          // Whether there is a dragging operation ongoing
  public draggingGroup;               // jbDragGroup of the current dragging element
  public jbDraggable = null;          // Model attach to the dragging element
  public jbDragMode = null;           // Current dragging mode (copy / move)
  public jbNestedContainers = false;  // If true, only the last nested container turns active on dragover
  public isAccurateMode = false;      // It requires more calculation but gives a better accuracy to select the active placeholder
  public setShadowSize = true;        // It sets with/height to "jb-drag-ghost" wrapper on dragstart, so you can use relative sizing (width:100%)

  // Observables
  public change$ = new Subject();   // Event source (all triggers go through this guy)
  public dragStart$;                // When a drag operation starts
  public dragEndOk$;                // When a drag operation finishes successfully (drop into valid container)
  public dragEndKo$;                // When a drag operation finishes unsuccessfully (drop out of any container)
  public activeContainer$ = new Subject();    // Emits every time the activeContainer changes
  public activePlaceholder$ = new Subject();  // Emits every time the activePlaceholder changes
  public dragOver$ = new Subject(); // Constant emits on dragover event on jb-drop-containers

  // Registered items
  public containers = [];              // List of the registered containers (<jb-drop-container>)
  public placeholders = [];            // List of the registered placeholders (<jb-drop-placeholder>)
                                       // id, element, model, containerId
  public activePlaceholder = null;     // Reference to the active (closest) placeholder in placeholders[]
  public activeContainer = null;       // Reference to the active (dragging over) container in containers[]


  // Internals
  public ghostHalfWidth;  // Dragging element's middle point x
  public ghostHalfHeight; // Dragging element's middle point y
  private isDropping = false;           // To know whether the drop occurs into a valid container (true) or not (false)
  private currentDropContainer = null;  // Model attach to the current dropping container
  private fixScrolls = [];
  private dragOverSub; // Subscription for dragOver$
  private canvasElem;

  constructor() {
    // Shortcuts
    this.dragStart$ = this.change$.pipe(filter((ev: any) => ev.eventName === 'onDragStart'), map(ev => ev.params));
    this.dragEndOk$ = this.change$.pipe(filter((ev: any) => ev.eventName === 'onDragEndOk'), map(ev => ev.params));
    this.dragEndKo$ = this.change$.pipe(filter((ev: any) => ev.eventName === 'onDragEndKo'), map(ev => ev.params));


    // Listen to this event globally, so we can detect when a dragging moves over a container and mock the dragover
    document.addEventListener('touchmove', this.onTouchMove);

    if (this.isDebugMode) { this.setDebugMode(true); }
  }

  // This happens when you start dragging a <div [jbDraggable]> element
  public startDrag = (element, jbDraggable, jbDragMode) => {
    this.isDropping = false;
    this.isDragging = true;
    this.jbDraggable = jbDraggable;
    this.jbDragMode = jbDragMode;
    if (this.activePlaceholder) {
      this.activePlaceholder = null;
      this.activePlaceholder$.next(this.activePlaceholder);
    }

    // When placeholder positions are constantly changing, only recalculate their position every .5 seconds
    // This should give enough time for animations and other transitions (expanding placeholders)
    if (!!this.dragOverSub) { this.dragOverSub.unsubscribe(); }
    this.dragOverSub = this.dragOver$.pipe(throttleTime(500)).subscribe(container => this.calcPositions(container));

    this.change$.next({ eventName: 'onDragStart', params: { element, jbDraggable, jbDragMode } });
  };

  // This happens when you drop a dragging element into a <div [jbDropContainer]>
  public dropInto = ($event, $element, jbDropContainer) => {
    if (this.isDragging) {
      this.isDropping = true;
      this.currentDropContainer = jbDropContainer;
    }
  };

  // This happens when you stop dragging an element. I can be dropped into a container or out
  public dragEnd = () => {
    const ghost = document.getElementById('jb-drag-ghost-id');
    if (!!ghost) { ghost.remove(); }

    if (this.isDropping) { // That means the drop was into a container
      this.change$.next({ eventName: 'onDragEndOk', params: {
          jbDraggable        : this.jbDraggable,
          jbDropContainer    : this.currentDropContainer,
          jbDropPlaceholder  : this.activePlaceholder
      }});

    } else {
      this.change$.next({ eventName: 'onDragEndKo', params: { jbDraggable: this.jbDraggable }});
    }

    // In case there's still active ones (it may happen on nested parents)
    this.containers.forEach(cont => cont.setDragging(false));
    this.placeholders.forEach(ph => ph.setActive(false));

    this.isDropping = false;
    this.isDragging = false;
    this.jbDragMode = null;
    if (this.activePlaceholder) {
      this.activePlaceholder = null;
      this.activePlaceholder$.next(this.activePlaceholder);
    }
    if (!!this.dragOverSub) {
      this.dragOverSub.unsubscribe();
      this.dragOverSub = null;
    }
  };


  // Generate unique id to register an element (to drop containers[] or placeholders[])
  public getUniqueId = (list = [], prefix = '') => {
    let id;
    let max =  0;

    do {
      id = prefix + (max < 1000 ? list.length + max : generateId(20).toLowerCase());
      max++;
    } while (max < 2000 && (!id || JbArray.getById.call(list, id)));

    if (JbArray.getById.call(list, id)) { console.error('Could not set a unique id'); id = ''; }
    return id;
  };


  // Calculates the current position and dimension of the placeholders
  public calcPositions = (container?) => {
    // console.log('calcPositions', new Date());
    // If a container is provided, it calculates only the placeholders of this container
    this.placeholders.filter(ph => !container || ph.containerId === container.id).forEach((placeholder) => {
      const dropSpot = placeholder.element.getBoundingClientRect();
      placeholder.midX = dropSpot.left + (dropSpot.width / 2);
      placeholder.midY = dropSpot.top + (dropSpot.height / 2);

      if (this.isAccurateMode) {
        placeholder.rect = {
          left   : dropSpot.left,
          right  : dropSpot.left + dropSpot.width,
          top    : dropSpot.top,
          bottom : dropSpot.top + dropSpot.height,
          width  : dropSpot.width,
          height : dropSpot.height
        };
      }
    });
  };

  // Calculate active placeholder based on current positions
  public dragOverRender = (container, event) => {
    this.dragOver$.next(container);

    // Filter those placeholders linked to the container
    const allPlaceholders = this.placeholders.filter(ph => ph.containerId === container.id);

    // Select which placeholders is closest to the dragging option
    let closestPlaceholder = null;
    if (!this.isAccurateMode) {

      // It calculates the distance between the placeholder center
      // and the mouse pointer for every placeholder, and takes the element with the lowest.
      allPlaceholders.forEach(placeholder => {
        placeholder.distance = // Pythagoras
            ((event.clientX - placeholder.midX) * (event.clientX - placeholder.midX))
          + ((event.clientY - placeholder.midY) * (event.clientY - placeholder.midY));

        if (!closestPlaceholder || placeholder.distance < closestPlaceholder.distance) {
          closestPlaceholder = placeholder;
        }
      });

    } else { // Accurate mode calculation.
      // Find out the shortest distance between the borders (rectangles) of the placeholder and the shadow
      // To do so, we asses the different cases that positioning can have:
      // Case 1, 3, 5, 7 --> They are not aligned, so the shortest distance goes from one corner to another
      // Case 2, 6 --> Aligned vertically: the shortest distance is the difference between top/bottom margins
      // Case 4, 8 --> Aligned horizontally: the shortest distance is the difference between left/right margins
      // Case 88, 99 --> Intersection. In case of intersection (part or all shadow is inside the placeholder),
      //                 instead of calculating the distance between 2 points, we calculate the square area
      //                 that intersects. We set this value as negative, so the bigger the area, the closest
      //                 we assume the placeholder is from the shadow (biggest intersection = active placeholder)
      const sh = {  // shadow rectangle
        left   : event.clientX - this.ghostHalfWidth,
        right  : event.clientX + this.ghostHalfWidth,
        top    : event.clientY - this.ghostHalfHeight,
        bottom : event.clientY + this.ghostHalfHeight
      };
      allPlaceholders.forEach((placeholder) => {
        const ph = placeholder.rect;
        let x = 0;
        let y = 0;

        if (!this.isDebugMode) { // calc the distance from the angles (no possible intersection)
          if        (sh.right < ph.left && sh.bottom < ph.top) {  x = ph.left - sh.right; y = ph.top - sh.bottom; // Case 1
          } else if (sh.left > ph.right && sh.bottom < ph.top) {  x = ph.right - sh.left; y = ph.top - sh.bottom; // Case 3
          } else if (sh.left > ph.right && sh.top > ph.bottom) {  x = sh.left - ph.right; y = sh.top - ph.bottom; // Case 5
          } else if (sh.right < ph.left && sh.top > ph.bottom) {  x = ph.left - sh.right; y = ph.bottom - sh.top; // Case 7
          } else if (sh.left <= ph.right && sh.right >= ph.left) {
            if        (sh.bottom < ph.top) { y = ph.top - sh.bottom; x = 0;   // Case 2
            } else if (sh.top > ph.bottom) { y = sh.top - ph.bottom; x = 0; } // Case 6
          } else if (sh.top <= ph.bottom && sh.bottom >= ph.top) {
            if        (sh.left > ph.right) { x = sh.left - ph.right; y = 0;   // Case 4
            } else if (sh.right < ph.left) { x = sh.right - ph.left; y = 0; } // Case 8
          }
          if (!!x || !!y) {
            placeholder.distance = ((x * x) + (y * y)); // Distance between corners
          } else {
            x = Math.abs((sh.right > ph.right ? ph.right : sh.right) - (sh.left < ph.left ? ph.left : sh.left));
            y = Math.abs((sh.top < ph.top ? ph.top : sh.top) - (sh.bottom > ph.bottom ? ph.bottom : sh.bottom));
            placeholder.distance = (x * y * -1); // Intersection area
          }

        } else {
          this.debugDistCalc(placeholder, sh);
          placeholder.distance = placeholder.minDistArr[4];
        }

        if (isNaN(placeholder.distance)) { placeholder.distance = 99999; }

        if (!closestPlaceholder || placeholder.distance < closestPlaceholder.distance) {
          closestPlaceholder = placeholder;
        }
      });
    }

    // If the active placeholder has to change (or be removed), switch the 'active-placeholder' class
    if (!this.activePlaceholder || !closestPlaceholder || this.activePlaceholder !== closestPlaceholder) {
      if (this.activePlaceholder) {
        this.activePlaceholder.setActive(false);
      }
      if (closestPlaceholder) {
        this.activePlaceholder = closestPlaceholder;
        this.activePlaceholder.setActive(true);
        this.activePlaceholder$.next(this.activePlaceholder);
      }
    }

    if (this.isDebugMode) {
      this.debugRenderCanvas(allPlaceholders, closestPlaceholder, container, event);
    }
  };


  // ------------------------------ Touch Screen Support ----------------------------------
  // Dragging on touch screen is quite tricky.
  // It is used to move scrolls, so we need to detect and freeze all scrollable elements when you
  // are dragging an element, and prevent both actions at the same time

  private getElementsWithScrolls = () => {
    const getComputedStyle = document.body && document.body['currentStyle'] ?
      (elem) => elem['currentStyle'] :
      (elem) => document.defaultView.getComputedStyle(elem, null);

    const getActualCss = (elem, style) => getComputedStyle(elem)[style];
    const autoOrScroll = (text) => (text === 'scroll' || text === 'auto');
    const isXScrollable = (elem) => elem.offsetWidth < elem.scrollWidth && autoOrScroll(getActualCss(elem, 'overflow-x'));
    const isYScrollable = (elem) => elem.offsetHeight < elem.scrollHeight && autoOrScroll(getActualCss(elem, 'overflow-y'));
    const hasScroller = (elem) => (isYScrollable(elem) || isXScrollable(elem));
    return [].filter.call(document.querySelectorAll('*'), hasScroller);
  };

  // Find all elements in the body with scroll, and freeze them (keep reference to unfreeze later)
  public disableScroll = () => {
    this.fixScrolls = [];
    const addRef = (ref, posX, posY) => {
      ref.onscroll = () => { ref.scrollTo(posX, posY); };
      if (ref.style) {
        ref.oriOverflow = ref.style.overflow;
        ref.style.overflow = 'hidden';
      }
      this.fixScrolls.push(ref);
    };

    // Freeze window scroll first
    document.body.style.overflow = 'hidden';
    addRef(window, window.pageXOffset || document.documentElement.scrollLeft,
                   window.pageYOffset || document.documentElement.scrollTop);

    const scrollEls = this.getElementsWithScrolls();
    if (scrollEls) { scrollEls.forEach(el => { addRef(el, el.scrollLeft, el.scrollTop); }); }
  };

  // Unfreeze frozen scrolls
  public enableScroll = () => {
    document.body.style.overflow = 'auto';
    this.fixScrolls.forEach(ref => {
      ref.onscroll = () => {};
      if (ref.style) { ref.style.overflow = ref.oriOverflow || null; }
    });
  };


  private onTouchMove = (event) => {
    if (this.isDragging) {
      const ghost = event.touches[0];
      const mockEvent = event;
      mockEvent.preventDefault = () => {};
      mockEvent.clientX = ghost.clientX;
      mockEvent.clientY = ghost.clientY;

      for (const cont of this.containers) {
        const contRect = cont.element.getBoundingClientRect();

        // Check if moving within the container rectangle area
        if (ghost.clientX >= contRect.left && ghost.clientX <= contRect.right && ghost.clientY >= contRect.top && ghost.clientY <= contRect.bottom) {
          if (cont.dragStatus === 0) { cont.onDragEnter(mockEvent); } // Mock drag enter
          cont.onDragOver(mockEvent); // Dragging over the container area

        } else { // If no dragging over anymore, mock drag leave
          if (cont.dragStatus === 1) { cont.onDragLeave(mockEvent); }
        }
      }
    }
  };




  // -------------------------------- Debug mode support ----------------------------------
  // All logic here below is purely debugging tools, no needed for the feature to work

  public setDebugMode = (value) => {
    this.isDebugMode = !!value;
    // Creates canvas element to print debugging lines to the placeholders while dragging
    this.canvasElem = document.getElementById('jb-dnd-canvas-debugger') || document.createElement('canvas');
    if (value) {
      this.canvasElem.setAttribute('id', 'jb-dnd-canvas-debugger');
      this.canvasElem.style.position = 'fixed';
      this.canvasElem.style.left = '0';
      this.canvasElem.style.top = '0';
      this.canvasElem.style['z-index'] = '-1';
      this.canvasElem.width = window.innerWidth;
      this.canvasElem.height = window.innerHeight;
      document.body.appendChild(this.canvasElem);
    } else {
      if (this.canvasElem) { this.canvasElem.remove(); }
    }
  };

  private debugRenderCanvas(allPlaceholders, closestPlaceholder, container, event) {
    const c = document.getElementById('jb-dnd-canvas-debugger') as HTMLCanvasElement;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);

    const $containerElement = container.element;

    if (this.canvasElem.style['z-index'] === '-1') {
      let contZInd = $containerElement.style['z-index'];
      if (!contZInd) { contZInd = '100'; $containerElement.style['z-index'] = contZInd; }
      // this.canvasElem.style['z-index'] = ((+contZInd) - 1) + '';
    }

    if (!this.isAccurateMode) {
      allPlaceholders.forEach((placeholder) => {
        ctx.beginPath();
        ctx.moveTo(placeholder.midX, placeholder.midY);
        ctx.lineTo(event.clientX - 1, event.clientY - 1);
        ctx.lineWidth = (closestPlaceholder === placeholder ? 5 : 1);
        ctx.strokeStyle = '#ff0000';
        ctx.stroke();
      });

    } else {
      allPlaceholders.forEach((placeholder, phInd) => {
        if (!!placeholder.minDistArr) {
          const distArr = placeholder.minDistArr;
          // placeholder.distances.forEach(function(distArr) {
          let fillColor;
          switch (phInd) {
            case 0: fillColor = 'red'; break;
            case 1: fillColor = 'blueviolet'; break;
            case 2: fillColor = 'darkcyan'; break;
            case 3: fillColor = 'darkorange'; break;
            case 4: fillColor = 'blue'; break;
            case 5: fillColor = 'deeppink'; break;
            case 6: fillColor = 'chartreuse'; break;
            default: fillColor = '#ff0000'; break;
          }
          ctx.beginPath();
          if (distArr[4] >= 0) {
            ctx.moveTo(distArr[0], distArr[1]);
            ctx.lineTo(distArr[2], distArr[3]);
            ctx.lineWidth = (closestPlaceholder === placeholder ? 5 : 1);
            ctx.strokeStyle = fillColor;
            ctx.stroke();

          } else {
            ctx.rect(distArr[0], distArr[1], distArr[2] - distArr[0], distArr[3] - distArr[1]);
            ctx.fillStyle = fillColor;
            ctx.fill();
          }
        }
      });
    }
  }

  private debugDistCalc = (placeholder, shadowRect) => {
    const sh = shadowRect;
    const ph = placeholder.rect;
    let fp; let x; let y;
    let intersect = false;

    // In those cases, calc the distance from the angles (no possible intersection)
    if (sh.right < ph.left && sh.bottom < ph.top) { // Case 1
      x = ph.left - sh.right;
      y = ph.top - sh.bottom;
      placeholder.minDistArr = [ph.left, ph.top,  sh.right, sh.bottom, (x * x) + (y * y)];
      placeholder.dCase = 1;
    }
    if (sh.left > ph.right && sh.bottom < ph.top) { // Case 3
      x = ph.right - sh.left;
      y = ph.top - sh.bottom;
      placeholder.minDistArr = [ph.right, ph.top,  sh.left, sh.bottom, (x * x) + (y * y)];
      placeholder.dCase = 3;
    }
    if (sh.left > ph.right && sh.top > ph.bottom) { // Case 5
      x = sh.left - ph.right;
      y = sh.top - ph.bottom;
      placeholder.minDistArr = [ph.right, ph.bottom,  sh.left, sh.top, (x * x) + (y * y)];
      placeholder.dCase = 5;
    }
    if (sh.right < ph.left && sh.top > ph.bottom) { // Case 7
      x = ph.left - sh.right;
      y = ph.bottom - sh.top;
      placeholder.minDistArr = [ph.left, ph.bottom,  sh.right, sh.top, (x * x) + (y * y)];
      placeholder.dCase = 7;
    }

    if (sh.left < ph.right && sh.right > ph.left) {
      if (sh.right > ph.left && sh.right < ph.right) { fp = sh.right; }
      if (sh.left > ph.left && sh.left < ph.right)   { fp = sh.left; }

      if (sh.bottom < ph.top) { // Case 2
        y = ph.top - sh.bottom; x = 0;
        placeholder.minDistArr = [fp, ph.top, fp, sh.bottom, (x * x) + (y * y)];
        placeholder.dCase = 2;
      } else {
        if (sh.top > ph.bottom) { // Case 6
          y = sh.top - ph.bottom; x = 0;
          placeholder.minDistArr = [fp, ph.bottom,  fp, sh.top, (x * x) + (y * y)];
          placeholder.dCase = 6;
        } else {
          // Intersection
          placeholder.minDistArr = [ph.left, ph.bottom,  ph.right, ph.top, 0];
          placeholder.dCase = 99;
          intersect = true;
        }
      }
    }

    if (sh.top < ph.bottom && sh.bottom > ph.top) {
      if (sh.bottom > ph.top && sh.bottom < ph.bottom) { fp = sh.bottom; }
      if (sh.top > ph.top && sh.top < ph.bottom)       { fp = sh.top; }

      if (sh.left > ph.right) { // Case 4
        x = sh.left - ph.right; y = 0;
        placeholder.minDistArr = [ph.right, fp,  sh.left, fp, (x * x) + (y * y)];
        placeholder.dCase = 4;
      } else {
        if (sh.right < ph.left) { // Case 8
          x = sh.right - ph.left; y = 0;
          placeholder.minDistArr = [ph.left, fp,  sh.right, fp, (x * x) + (y * y)];
          placeholder.dCase = 8;
        } else {
          // Intersection
          placeholder.minDistArr = [ph.left, ph.bottom,  ph.right, ph.top, 0];
          placeholder.dCase = 88;
          intersect = true;
        }
      }
    }


    if (intersect) {
      placeholder.minDistArr[0] = (sh.left < ph.left ? ph.left : sh.left);
      placeholder.minDistArr[2] = (sh.right > ph.right ? ph.right : sh.right);
      placeholder.minDistArr[1] = (sh.top < ph.top ? ph.top : sh.top);
      placeholder.minDistArr[3] = (sh.bottom > ph.bottom ? ph.bottom : sh.bottom);

      x = Math.abs(placeholder.minDistArr[2] - placeholder.minDistArr[0]);
      y = Math.abs(placeholder.minDistArr[1] - placeholder.minDistArr[3]);
      placeholder.minDistArr[4] = x * y * -1;
    }
  }

}
