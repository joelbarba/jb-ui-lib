import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  Renderer2
} from '@angular/core';
import {JbDnDService} from '../jb-dnd.service';
import {JbArray} from '../../jb-prototypes/jb-prototypes';


@Directive({ selector: '[jbDropPlaceholder]' })
export class JbDropPlaceholderDirective implements OnChanges, OnDestroy {
  @Input() jbDropContainerId = '';
  @Input() jbDropPlaceholder;
  @Input() jbDragGroup;
  @Input() id;

  @HostBinding('class.jb-drop-placeholder') elementClass = true;
  @HostBinding('class.active-placeholder') isActive = false;

  public placeholder;

  constructor(
    private el: ElementRef,
    private jbDnD: JbDnDService,
    private renderer: Renderer2,
  ) {

    this.id = this.jbDnD.getUniqueId(this.jbDnD.placeholders, 'jb-drop-placeholder-');
    if (!this.id) { return; }

    this.placeholder = {
      id            : this.id,
      element       : this.el.nativeElement,
      model         : this.jbDropPlaceholder,
      containerId   : this.jbDropContainerId,
      getActive     : () => this.isActive,
      setActive     : (value) => this.isActive = value,
    };

    this.jbDnD.placeholders.push(this.placeholder); // Register the placeholder
  }

  // ngOnInit() { }
  ngOnChanges(changes) {
    if (changes.hasOwnProperty('id')) {
      if (!JbArray.getById.call(this.jbDnD.placeholders, this.id)) {
        this.placeholder.id = this.id;
      } else {
        console.error('[jbDropPlaceholder] id is not unique: ', this.id);
      }
    }

    if (changes.hasOwnProperty('jbDropPlaceholder')) { this.placeholder.model = this.jbDropPlaceholder; }
    if (changes.hasOwnProperty('jbDropContainerId')) { this.placeholder.containerId = this.jbDropContainerId; }

    // Add a css class with the jbDragGroup value
    if (changes.hasOwnProperty('jbDragGroup')) {
      if (this.jbDragGroup) {
        this.renderer.addClass(this.el.nativeElement, this.jbDragGroup);
      } else if (changes.jbDragGroup.previousValue) {
        this.renderer.removeClass(this.el.nativeElement, changes.jbDragGroup.previousValue);
      }
    }
  }

  ngOnDestroy() { // Unregister
    JbArray.removeById.call(this.jbDnD.placeholders, this.id);
  }

}
