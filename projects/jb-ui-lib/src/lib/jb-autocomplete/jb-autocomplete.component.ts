import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnChanges, OnDestroy,
  OnInit, Output,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import {BehaviorSubject, Observable, of, Subject, Subscription} from 'rxjs';
import { JbUiLibTransService } from '../abstract-translate.service';
import { Patterns } from '../patterns';
import {debounceTime, takeUntil} from 'rxjs/operators';


/****
 *  ATTRIBUTES

 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | =      | *ngModel            | Where the selected string of the list is held                                      |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | =      | *jbList             | The list of the options (array of string)                                          |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | jbRequired          | Whether the input is required or not                                               |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | =      | jbDisabled          | Disable the input                                                                  |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | =      | jbDisabledTip       | If autocomplete is disabled, tooltip to display on hover (label)                   |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | jbLabel             | If present it adds a label above the input                                         |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | jbPlaceholder       | The placeholder of the input field                                                 |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | jbTooltip           | Add a badge next to the label with the tooltip to give more info                   |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | jbTooltipPos        | If tooltip on the label, specific position (top by default)                        |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | jbTooltipBody       | If tooltip on the label, whether it is appended on the body                        |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | jbEmptyText         | When no suggestion are matched display a text (default: 'No results found')        |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | jbValidType         | Sets a default pattern: 'integer' | 'number' | 'decimal' | 'email'                 |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | jbPattern           | Custom JbPattern                                                                   |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | jbErrorOnPristine   | If true, validate on pristine                                                      |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | jbSelect            | Event emitter, select or enter an item in the list                                       |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 *
 *****/

@Component({
  selector: 'jb-autocomplete',
  templateUrl: './jb-autocomplete.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => JbAutocompleteComponent),
    },
    { // Custom validator
      provide: NG_VALIDATORS, multi: true,
      useExisting: forwardRef(() => JbAutocompleteComponent),
    }
  ]
})
export class JbAutocompleteComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
  @Input() ngModel: string;
  @Input() jbList: Array<string>;    // List of options (array of strings)
  @Input() jbRequired = false; // Whether the model is required (can't be empty)
  @Input() jbDisabled = false; // Whether the autocomplete is disabled
  @Input() jbDisabledTip = '';    // If autocomplete is disabled, tooltip to display on hover (label)
  @Input() jbPlaceholder = '';    // Text to display in as placeholder
  @Input() jbLabel = '';          // Label to display above the dropdown
  @Input() jbTooltip = '';        // Add a badge next to the label with the tooltip to give more info
  @Input() jbTooltipPos = 'top';  // If tooltip on the label, specific position (top by default)
  @Input() jbTooltipBody = true;  // If tooltip on the label, whether it is appended on the body
  @Input() jbValidType: keyof typeof Patterns;  // Predefined validator patterns. It overrides jbPattern
  @Input() jbPattern;
  @Input() jbErrorOnPristine;
  @Input() jbMinLength = 0;   // [optional] Number of keys needed to start showing suggestions. If absent, shows the list on focus.
  @Output() jbOnEnter = new EventEmitter<any>();
  @Output() jbSelect = new EventEmitter<any>();

  // --------------

  ngControl;  // Reference to the external formControl

  list;
  jbCandidate; // Pointer to a extList item that might be selected next but not yet (hovering / arrow scrolling)
  ignoreHover;
  ignoreHover$ = new BehaviorSubject<boolean>(false); // When scrolling with the arrow keys, ignore mouse hover
  arrowScroll$ = new Subject();
  subs: {[ key: string]: Subscription } = {};  // Subscriptions holder
  destroyed$: Subject<boolean> = new Subject<boolean>();

  isInvalid = false;   // If the model holds an invalid option
  isFocus = false;     // Whether the input is focused

  jbDisabledTipTrans$: Observable<string> = of('');   // Translated text for the disabled tooltip
  jbPlaceholderTrans$: Observable<string> = of('');   // Translated text for the placeholder

  @ViewChild('autocomplete', { static: true }) autocomplete: ElementRef<HTMLElement>;
  @ViewChild('autocompleteInputGroup', { static: false }) autocompleteInputGroup: ElementRef<HTMLElement>;
  @ViewChild('autocompleteInput', { static: false }) autocompleteInput: ElementRef<HTMLInputElement>;
  @ViewChild('listContainer', { static: false}) listContainer: ElementRef<HTMLElement>;

  constructor(
    private translate: JbUiLibTransService,
  ) { }

  @HostListener('document:click', ['$event'])
  outsideClick(event) {
    if (!this.autocompleteInputGroup.nativeElement.contains(event.target)) {
      this.collapse();
    }
  }

  ngOnChanges(changes) {
    if (changes.hasOwnProperty('ngModel')) {
      if (this.checkValidity(changes.ngModel.currentValue)) { this.jbErrorOnPristine = true; }
    }
    if (changes.hasOwnProperty('jbList')) { this.initList(); }
    if (changes.hasOwnProperty('jbRequired')) { this.checkValidity(this.ngModel); }
    if (changes.hasOwnProperty('jbValidType')) { this.setPattern(); }
    if (changes.hasOwnProperty('jbDisabledTip'))  {
      this.jbDisabledTipTrans$ = this.translate.getLabel$(this.jbDisabledTip);
    }
    if (changes.hasOwnProperty('jbPlaceholder'))  { this.setPlaceholder(); }

    this.filter();
  }

  ngOnInit() {
    this.setPattern();

    // Give the browser .1s to scroll and avoid the mouseenter selecting a different item while using arrows up/down
    this.subs.scrollSub$ = this.arrowScroll$
      .pipe(
        debounceTime(100),
        takeUntil(this.destroyed$))
      .subscribe(() => this.ignoreHover$.next(false));

    // (ignoreHover$ | async) can't be used inside (mouseenter), (mouseleave)
    this.ignoreHover$.subscribe((ignoreHover) => this.ignoreHover = ignoreHover);

  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();

    Object.values(this.subs).forEach(sub => sub.unsubscribe());
  }

  initList() {
    this.jbList = this.jbList.filter((v, i) => this.jbList.indexOf(v) === i); // Remove duplicates
    this.list = [ ...this.jbList ];
  }

  /**
   * @returns whether the list is visible or not
   */
  isExpanded() {
    return this.isFocus && this.list.length > 0 && ((this.ngModel || '').length >= (this.jbMinLength || 0));
  }

  setPattern() {
    if (this.jbValidType) {
      this.jbPattern = Patterns[this.jbValidType];
    }
  }

  toggle() {
    this.isFocus ? this.collapse() : this.expand();
  }

  // On input focus in -> Expand the select list
  expand() {
    this.focus();
  }

  // On input focus out -> Collapse the select list
  collapse() {
    this.isFocus = false;
    this.jbCandidate = null;
    this.setPlaceholder(null);
  }

  navigate(index, list, key) {
    if (!this.isExpanded()) return;

    const nextIndex = {
      ArrowUp: (index > 0) ? index - 1 : list.length - 1,
      ArrowDown: (index >= 0 && index < list.length - 1) ? index + 1 : 0
    }[key];
    this.jbCandidate = list[nextIndex];
    this.arrowScroll$.next();
    this.ignoreHover$.next(true);
    this.setPlaceholder(this.jbCandidate);

    if (this.listContainer.nativeElement.children[0]) {
      this.listContainer.nativeElement.scrollTop = nextIndex * this.listContainer.nativeElement.children[0].clientHeight;
    }
  }

  confirm() {
    if (this.jbCandidate) {
      this.select(this.jbCandidate);
    } else {
      if (!!this.ngModel) {
        this.jbSelect.emit(this.ngModel);
      }
    }
    this.autocompleteInput.nativeElement.blur();
    this.collapse();
  }

  // React on key events (on the input)
  triggerKey(event) {
    const visibleList = this.list;

    const index = visibleList.indexOf(this.jbCandidate);

    const keyFunctions = {
      Tab: () => { this.collapse(); },
      Escape: () => { this.collapse(); },
      ArrowDown: () => { this.navigate(index, visibleList, event.key); },
      ArrowUp: () => { this.navigate(index, visibleList, event.key); },
      Enter: () => { this.confirm(); }
    };

    if (keyFunctions[event.key]) {
      keyFunctions[event.key]();
    }
  }

  setPlaceholder(value?: string) {
    const newPlaceholder = !!value ? value : this.jbPlaceholder;
    this.jbPlaceholderTrans$ = this.translate.getLabel$(newPlaceholder);
  }

  typing(value) {
    this.updateModel(value);
    this.filter();
    this.expand();
  }

  select(value) {
    this.setValidity(true);
    this.updateModel(value);
    this.filter();
    this.jbSelect.emit(value);
  }

  reset() {
    this.updateModel('');
    this.filter();
    this.expand();
    this.focus();
  }

  focus() {
    this.isFocus = true;
    this.autocompleteInput.nativeElement.focus();
  }

  isMatch(value : string) : boolean {
    return value.toLowerCase().includes(this.ngModel ? this.ngModel.trim().toLowerCase() : '');
  }

  filter() {
    this.list = this.jbList.filter(item => this.isMatch(item));
  }

  // Update isInvalid and propagate the state up
  setValidity(isValid: boolean) {
    this.isInvalid = !isValid;
    if (!!this.ngControl) { this.ngControl.updateValueAndValidity(); }
    return this.isInvalid;
  }

  checkValidity(value) {
    const fromList = this.jbList.find(item => item === value);
    if (fromList) {
      return this.setValidity(true);
    }
    if (!!this.jbRequired) {
      if (!value) { return this.setValidity(false); }
    }
    if (!!this.jbPattern && !!value) {
      if (!new RegExp(this.jbPattern).test(value)) { return this.setValidity(false); }
    }
    return this.setValidity(true);
  }

  // Select an item from extList to jbModel, and propagate ngModel up
  updateModel(value) {
    this.ngModel = value;
    this.setPlaceholder(null);
    this.propagateModelUp(value);
  }

  // ------- ControlValueAccessor -----

  // ControlValueAccessor --> writes a new value from the form model into the view
  writeValue(value: any) {
    const wasPristine = (!!this.ngControl && this.ngControl.pristine);

    // External changes shan't turn pristine state (only internals). Set it back if so
    if (wasPristine) { this.ngControl.markAsPristine(); }
  }

  propagateModelUp = (_: any) => {}; // This is just to avoid type error (it's overwritten on register)
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }


  // NG_VALIDATORS provider triggers this validation
  // Validation to determine the outer formControl state. It propagates upward the internal state
  validate(extFormCtrl: FormControl) {
    this.ngControl = extFormCtrl; // Save the reference to the external form Control

    if (this.isInvalid) {
      if (!!this.ngModel) {
        if (!!this.jbPattern) {
          if (!new RegExp(this.jbPattern).test(this.ngModel)) {
            return { value: 'Expected value type: ' + (this.jbValidType ? this.jbValidType : this.jbPattern) }; // Mistype value
          }
        }
      } else {
        return { required: true };  // No value on required
      }
    }
    return null; // valid
  }

  // ------------------------------------
}
