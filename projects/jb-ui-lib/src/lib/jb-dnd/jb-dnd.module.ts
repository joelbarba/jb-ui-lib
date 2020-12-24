import {CommonModule} from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import {JbDropPlaceholderDirective} from './jb-drop-placeholder/jb-drop-placeholder.directive';
import {JbDropContainerDirective} from './jb-drop-container/jb-drop-container.directive';
import {JbDraggableDirective} from './jb-draggable/jb-draggable.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    JbDraggableDirective,
    JbDropContainerDirective,
    JbDropPlaceholderDirective,
  ],
  exports: [
    JbDraggableDirective,
    JbDropContainerDirective,
    JbDropPlaceholderDirective,
  ],
})
export class JbDnDModule {
  static forRoot(): ModuleWithProviders<JbDnDModule> {
    return {
      ngModule: JbDnDModule,
    };
  }
}
