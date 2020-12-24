import {
  Directive,
  ElementRef, EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges, OnDestroy,
  Output, Renderer2
} from '@angular/core';
import {JbDnDService} from '../jb-dnd.service';
import {JbArray} from '../../jb-prototypes/jb-prototypes';

@Directive({ selector: '[jbDropContainer]' })
export class JbDropContainerDirective implements OnChanges, OnDestroy {
  @Input() jbDropContainer;
  @Input() jbDragGroup;
  @Input() id;

  @Output() jbDrop = new EventEmitter<any>();

  @HostBinding('class.jb-drop-container') elementClass = true;
  @HostBinding('class.dragging-over') private isDraggingOver = false;

  public container;

  constructor(
    private el: ElementRef,
    private jbDnD: JbDnDService,
    private renderer: Renderer2,
  ) {
    this.id = this.jbDnD.getUniqueId(this.jbDnD.containers, 'jb-drop-container-');
    if (!this.id) { return; }

    this.container = {
      id          : this.id,
      element     : this.el.nativeElement,
      model       : this.jbDropContainer,
      dragStatus  : 0, // 0=none, 1=over, 2=leaving
      jbDragGroup : undefined,
      onDragOver  : (e) => this.dragover(e),
      onDragEnter : (e) => this.dragenter(e),
      onDragLeave : (e) => this.dragleave(e),
      onDrop      : (e) => this.drop(e),
      getDragging : () => this.isDraggingOver,
      setDragging : (value) => this.isDraggingOver = value,
    };

    this.jbDnD.containers.push(this.container); // Register the element in JbDnD.containers[]
  }

  ngOnChanges(changes) {
    if (changes.hasOwnProperty('id')) {
      if (!JbArray.getById.call(this.jbDnD.containers, this.id)) {
        this.container.id = this.id;
      } else {
        console.error('[jbDropContainer] id is not unique: ', this.id);
      }
    }

    if (changes.hasOwnProperty('jbDropContainer')) {
      this.container.model = this.jbDropContainer;
    }

    // Add a css class with the jbDragGroup value
    if (changes.hasOwnProperty('jbDragGroup')) {
      this.container.jbDragGroup = this.jbDragGroup;
      if (this.jbDragGroup) {
        this.renderer.addClass(this.el.nativeElement, this.jbDragGroup);
      } else if (changes.jbDragGroup.previousValue) {
        this.renderer.removeClass(this.el.nativeElement, changes.jbDragGroup.previousValue);
      }
    }
  }

  ngOnDestroy() { // Unregister on destroy
    JbArray.removeById.call(this.jbDnD.containers, this.container.id);
  }


  @HostListener('dragover', ['$event']) dragover(event: any) {
    if (!this.jbDnD.isDragging) { return false; } // Dragging something that is not a jbDraggable
    if (this.jbDnD.draggingGroup !== this.container.jbDragGroup) { return false; } // Cross dragging groups

    event.preventDefault();
    if (this.jbDnD.jbNestedContainers) { event.stopPropagation(); }

    // console.log('[jbDropContainer] --> dragover', this.container.id);
    this.container.setDragging(true);
    this.container.dragStatus = 1; // over
    if (this.jbDnD.activeContainer !== this.container) {
      this.jbDnD.activeContainer = this.container;
      this.jbDnD.activeContainer$.next(this.container);
    }
    this.jbDnD.dragOverRender(this.container, event); // Calculate active placeholder
  }


  @HostListener('dragenter', ['$event']) dragenter(event) {
    if (!this.jbDnD.isDragging) { return false; } // Dragging something that is not a jbDraggable
    if (this.jbDnD.draggingGroup !== this.container.jbDragGroup) { return false; } // Cross dragging groups

    if (this.el.nativeElement.contains(event.fromElement)) {
      return false; // That means you are switching elements within the container
    }

    event.preventDefault();
    // console.log('[jbDropContainer] --> dragenter', this.container.id);
    this.container.setDragging(true);
    this.container.dragStatus = 1; // over
    this.jbDnD.calcPositions(this.container);
  }


  @HostListener('dragleave', ['$event']) dragleave(event) {
    if (!this.jbDnD.isDragging) { return false; } // Dragging something that is not a jbDraggable
    if (this.jbDnD.draggingGroup !== this.container.jbDragGroup) { return false; } // Cross dragging groups
    if (this.el.nativeElement.contains(event.fromElement)) {
      return false; // That means you are switching elements within the container
    }

    event.preventDefault();
    // console.log('[jbDropContainer] --> dragleave', this.container.id);
    this.container.dragStatus = 2; // leaving
    setTimeout(() => {
      if (this.container.dragStatus === 2) {
        this.container.dragStatus = 0; // none
        this.container.setDragging(false);
        if (this.jbDnD.activePlaceholder) {
          this.jbDnD.activePlaceholder.setActive(false);
          this.jbDnD.activePlaceholder = null;
          this.jbDnD.activePlaceholder$.next(null);
        }
        if (this.jbDnD.activeContainer === this.container) {
          this.jbDnD.activeContainer = null;
          this.jbDnD.activeContainer$.next(null);
        }
      }
    }, 50);
  }

  @HostListener('drop', ['$event']) drop(event: any) {
    if (this.jbDnD.draggingGroup !== this.container.jbDragGroup) { return false; } // Cross dragging groups

    event.preventDefault();
    if (this.jbDnD.jbNestedContainers) { event.stopPropagation(); }
    // console.log('[jbDropContainer] --> drop', this.container.id);

    this.container.setDragging(false);
    if (!!this.jbDnD.activePlaceholder) { this.jbDnD.activePlaceholder.setActive(false); }
    this.jbDrop.next({
      jbDraggable: this.jbDnD.jbDraggable,
      jbDropContainer: this.jbDropContainer,
      jbDropPlaceholder: this.jbDnD.activePlaceholder,
    });
    this.jbDnD.dropInto(event, this.el, this.jbDropContainer);
  }

}
