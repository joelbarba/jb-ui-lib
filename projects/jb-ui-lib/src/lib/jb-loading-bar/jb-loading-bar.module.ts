import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { JbLoadingBarComponent } from './jb-loading-bar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [JbLoadingBarComponent],
  exports: [JbLoadingBarComponent],
})
export class JbLoadingBarModule {
  static forRoot(): ModuleWithProviders<JbLoadingBarModule> {
    return {
      ngModule: JbLoadingBarModule,
    };
  }
}
