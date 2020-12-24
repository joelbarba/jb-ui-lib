import { Component, OnInit } from '@angular/core';
import { LibRegisterService } from '../lib-register.service';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {
  public libImport = `npm i jb-ui-lib@0.4.9
npm i jb-icomoon@1.0.3
npm i bootstrap@4.4.1
npm i @ng-bootstrap/ng-bootstrap@5.1.5

-- For Angular >= 9, you also need:
ng add @angular/localize`;

  public libImport2 = `import {FormsModule} from "@angular/forms";
import {JbUiLibModule} from "jb-ui-lib";

@Injectable({ providedIn: 'root' })
export class JbTranslateService {
  public onLangChange$ = new BehaviorSubject({lang: '', translations: []});
  public doTranslate = (label ?: string, params?): string => label;
  public getLabel$ = (label ?: string, params?) => of(label);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    JbUiLibModule.forRoot({ trans: {
        useExisting: JbTranslateService
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }`;




  public stylesExample = `@import "scss/variables.scss";

@import '~jb-ui-lib/scss/index';

@import "~jb-icomoon/css/icomoon-free.css";
@import "~bootstrap/scss/bootstrap.scss";`;

  constructor(private reg: LibRegisterService) { }
  ngOnInit() { }

}
