import {CommonModule} from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { JbGrowlPopUpComponent } from './jb-growl-pop-up.component';

@NgModule({
  imports: [CommonModule],
  declarations: [JbGrowlPopUpComponent],
  exports: [JbGrowlPopUpComponent],
})
export class JbGrowlModule {
  static forRoot(): ModuleWithProviders<JbGrowlModule> {
    return {
      ngModule: JbGrowlModule,
    };
  }
}
