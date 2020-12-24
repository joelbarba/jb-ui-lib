import { BehaviorSubject, Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';

type doTranslateFn = (label ?: string) => string;
type getFn = (label ?: string) => Observable<string>;
export abstract class AbstractTranslateService {
  public onLangChange$: Observable<{ lang: string, translations: Array<any> }>;
  abstract doTranslate: doTranslateFn;  // Synchronous translation
  abstract getLabel$: getFn;            // Async translation
  public locale$: Observable<string>;
}

export class JbUiLibTransService extends AbstractTranslateService {

  // To react on selected language changes (https://github.com/ngx-translate/core)
  public onLangChange$ = new BehaviorSubject({lang: '', translations: []});

  // The locale of the user. Default to Irish
  public locale$ = new BehaviorSubject('en-IE');

  // Synchronous translation
  public doTranslate = (label ?: string, params?): string => label;

  // Async translation (returns an observable that emits the translated value of the label)
  public getLabel$ = (label ?: string, params?) => of(label);

}


// Shortcut to get the label observable in the view, with change detection included
// Can be used like: {{ myLabel | getLabel$ | async }}
@Pipe({ name: 'getLabel$' })
export class JbTranslatePipe implements PipeTransform {
  constructor(private translate: JbUiLibTransService) {}
  transform(label: string = '') {
    return this.translate.getLabel$(label);
  }
}
