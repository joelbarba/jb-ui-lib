import { NgModule } from '@angular/core';
import { jbLazyLoadedTestComponent } from './jb-lazy-loaded-test.component';
import { RouterModule, Routes } from '@angular/router';
import { JbUiLibModule } from '../../../../jb-ui-lib/src/lib/jb-ui-lib.module';


console.log('JbLazyLoadedModule', new Date());
const routes: Routes = [
  { path: '', component: jbLazyLoadedTestComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    JbUiLibModule,
  ],
  declarations: [jbLazyLoadedTestComponent],
  exports: [],
})
export class JbLazyLoadedModule {}
