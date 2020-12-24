import { of, BehaviorSubject } from 'rxjs';

export class JbUILibTransStubService {
  public locale$ = new BehaviorSubject('en-IE');
  public getLabel$ = (label ?: string, params?) => of(label);
  public doTranslate = (label ?: string, params?) => label;
}
