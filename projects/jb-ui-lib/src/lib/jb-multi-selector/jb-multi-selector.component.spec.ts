import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement, SimpleChange } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

import { TestingModule } from '../../testing/testing-module';
import JbArray from '../jb-prototypes/array.prototypes';

import { JbMultiSelectorComponent } from './jb-multi-selector.component';


// Setup prototypes needed in this test
for (const proFn in JbArray) {
  if (JbArray.hasOwnProperty(proFn)) {
    Array.prototype[proFn] = JbArray[proFn];
  }
}


describe('JbMultiSelectorComponent', () => {
  let comp: JbMultiSelectorComponent;
  let fixture: ComponentFixture<JbMultiSelectorComponent>;
  let debug: DebugElement;
  const detectChanges = () => fixture.detectChanges();
  const newChange = (value: any) => new SimpleChange(undefined, value, true);
  const getListContainerDe = () => debug.query(By.css('.list-container'));
  const getListContainer = () => getListContainerDe().nativeElement as HTMLDivElement;
  const getOptionRowsDe = () => debug.queryAll(By.css('.option-row'));
  const getOptionRows = () => getOptionRowsDe().map(({ nativeElement }) => nativeElement);
  const getOptionRenders = () => debug.queryAll(By.css('.option-row > span')).map(el => (el.nativeElement as HTMLSpanElement).textContent);
  const getSelectedItemsDe = () => debug.queryAll(By.css('.multi-tag-container'));
  const getSelectedItemsTextDe = () => debug.queryAll(By.css('.multi-tag-container > .multi-tag-text'));
  const getSelectedItemsText = () => getSelectedItemsTextDe().map(({ nativeElement }) => nativeElement as HTMLSpanElement).map(({ textContent }) => textContent.trim());

  // Setup test suite
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JbMultiSelectorComponent],
      imports: [TestingModule, FormsModule, NgbTooltipModule],
    }).compileComponents();

    fixture = TestBed.createComponent(JbMultiSelectorComponent);
    comp = fixture.componentInstance;
    debug = fixture.debugElement;
    detectChanges();
  }));

  // Fake ngControl
  beforeEach(() => {
    comp.ngControl = new FormControl('');
  });

  it('should create the component', () => {
    expect(comp).toBeTruthy();
  });

  describe('toggling the dropdown list', () => {
    let input: HTMLInputElement;

    // Focus on the input element
    beforeEach(() => {
      spyOn(comp.jbOnListExpanded, 'emit');
      input = debug.query(By.css('input')).nativeElement;
      input.focus();
      detectChanges();
    });

    it('should open dropdown on input focus', () => {
      expect(getListContainer()).toBeTruthy();
      expect(comp.jbOnListExpanded.emit).toHaveBeenCalled();
    });

    it('should close dropdown on input blur', fakeAsync(() => {
      spyOn(comp.jbOnListCollapsed, 'emit');
      input.blur();
      tick(100);
      detectChanges();

      expect(getListContainerDe()).toBeFalsy();
      expect(input.value).toBe('');
      expect(comp.jbOnListCollapsed.emit).toHaveBeenCalled();
    }));
  });

  it('should open the dropdown list on the search button click', () => {
    // Dropdown is closed
    expect(getListContainerDe()).toBeNull();

    // Click on search btn
    debug.query(By.css('.input-group-append')).triggerEventHandler('click', {});
    detectChanges();

    // Dropdown is open
    expect(getListContainer()).toBeTruthy();
  });

  describe('dropdown list is populated and open', () => {
    let inputDe: DebugElement;

    // Push new Inputs to the component and trigger ngOnChanges
    beforeEach(fakeAsync(() => {
      comp.jbList = [
        {
          id: 0,
          username: 'joel.barba',
          email: 'joel@barba.com',
          first_name: 'Joel',
          last_name: 'Barba'
        },
        {
          id: 1,
          username: 'deb.mallya',
          email: 'deb@mallya.com',
          first_name: 'Deb',
          last_name: 'Mallya'
        }
      ];
      comp.jbRender = 'email';
      comp.jbSelect = 'username';
      comp.ngOnChanges({
        jbList: newChange(comp.jbList),
        jbRender: newChange(comp.jbRender),
        jbSelect: newChange(comp.jbSelect),
      });
      tick();
      detectChanges();
    }));

    // Focus on the input element such that the dropdown list is open and visible
    beforeEach(fakeAsync(() => {
      inputDe = debug.query(By.css('input'));
      (inputDe.nativeElement as HTMLInputElement).focus();
      inputDe.triggerEventHandler('focusin', {});
      tick();
      detectChanges();
    }));

    it('should show the option list', () => {
      const expectedOptionRenders = comp.jbList.map(({ email }) => email);

      expect(getListContainer()).toBeTruthy();
      expect(getOptionRenders()).toEqual(expectedOptionRenders);
      expect(comp.isExpanded).toBe(true);
    });

    it('should have the the first option highlighted', () => {
      expect(getOptionRows()[0].classList).toContain('candidate');
    });

    it('should filter options on typing', () => {
      const typedValue = 'deb';
      spyOn(comp.jbOnTyping, 'emit');
      inputDe.triggerEventHandler('input', { target: { value: typedValue } });
      detectChanges();

      expect(getOptionRenders()).toEqual([comp.jbList[1].email]);
      expect(comp.jbOnTyping.emit).toHaveBeenCalledWith(typedValue);
    });

    describe('keyboard events', () => {
      let formGroupDe: DebugElement;

      // Get a reference to the form-group which has the keydown event binding
      beforeEach(() => {
        formGroupDe = debug.query(By.css('.form-group'));
      });

      it('should highlight the next option on Arrow keys', fakeAsync(() => {
        // ArrowDown (cycle through all 2 options)
        for (let i = 0; i < 3; i++) {
          formGroupDe.triggerEventHandler('keydown', { key: 'ArrowDown' });
          tick(100);
          detectChanges();
        }
        expect(getOptionRows()[0].classList).not.toContain('candidate');
        expect(getOptionRows()[1].classList).toContain('candidate');

        // ArrowUp (cycle through all 2 options)
        for (let i = 0; i < 3; i++) {
          formGroupDe.triggerEventHandler('keydown', { key: 'ArrowUp' });
          tick(100);
          detectChanges();
        }
        expect(getOptionRows()[0].classList).toContain('candidate');
        expect(getOptionRows()[1].classList).not.toContain('candidate');
      }));

      it('should lose focus on Escape key', fakeAsync(() => {
        expect(debug.query(By.css('input:focus'))).toBeTruthy();

        formGroupDe.triggerEventHandler('keydown', { key: 'Escape' });
        tick(100);
        detectChanges();

        expect(debug.query(By.css('input:focus'))).toBeFalsy();
        expect(getOptionRows().length).toBe(0); // Dropdown list closed
      }));

      it('should select highlighted value and close dropdown on Enter key', fakeAsync(() => {
        expect(getOptionRows()[0].classList).toContain('candidate');
        formGroupDe.triggerEventHandler('keydown', { key: 'Enter' });
        tick(100);
        detectChanges();

        expect(getSelectedItemsText()).toEqual([comp.jbList[0].email]);
        expect(debug.query(By.css('input:focus'))).toBeFalsy(); // Lose focus
        expect(getOptionRows().length).toBe(0); // Dropdown list closed
      }));
    });

    it('should select and deselect items', () => {
      // No items selected
      expect(getSelectedItemsText().length).toEqual(0);
      expect(getOptionRows().length).toBe(2);

      // Click the first dropdown item
      getOptionRowsDe()[0].triggerEventHandler('mousedown', {});
      detectChanges();

      // Selected item should show up as selected
      expect(getSelectedItemsText()).toEqual([comp.jbList[0].email]);
      // Selected item should be removed from the dropdown
      expect(getOptionRows().length).toBe(1);

      // Click the already selected item
      getSelectedItemsDe()[0].triggerEventHandler('click', {});
      detectChanges();

      // No selected items now
      expect(getSelectedItemsText().length).toEqual(0);
      // Deselected item goes back into dropdown
      expect(getOptionRows().length).toBe(2);
    });

    it('should select the corresponding option when a valid value is provided', () => {
      // No previously selected value
      expect(getSelectedItemsText().length).toEqual(0);

      // Provide a valid value
      comp.writeValue(comp.jbList[0].username);
      detectChanges();

      // Selected item should show up as selected
      expect(getSelectedItemsText()).toEqual([comp.jbList[0].email]);
    });

    describe('validation when an external value is provided', () => {
      let fakeFormControl: FormControl;

      beforeEach(() => {
        fakeFormControl = new FormControl();
      });

      it('should throw emptyRequired error when the formControl is empty and jbRequired is true', fakeAsync(() => {
        comp.jbRequired = true;
        comp.ngOnChanges({
          jbRequired: newChange(comp.jbRequired),
        });
        tick();
        const result = comp.validate(fakeFormControl);

        expect(result).toEqual({ error: 'required' });
      }));

      it('should throw noMatch error when an invalid value is passed', () => {
        let result = null;

        // error case
        comp.writeValue('abc');
        result = comp.validate(fakeFormControl);
        expect(result).toEqual({ error: 'no match' });

        // success case
        comp.writeValue('joel.barba');
        result = comp.validate(fakeFormControl);
        expect(result).toEqual(null);
      });

      it('should manage the manual error when provided', fakeAsync(() => {
        let error: any;

        // Provide manual error
        const fakeManualError = 'fake manual error';
        comp.extCtrl$ = of({ action: 'addError', value: fakeManualError });
        comp.ngOnChanges({
          extCtrl$: newChange(comp.extCtrl$),
        });
        tick();
        error = comp.validate(fakeFormControl);
        detectChanges();

        expect(error).toEqual({ error: fakeManualError });

        // Remove manual error
        comp.extCtrl$ = of({ action: 'removeError' });
        comp.ngOnChanges({
          extCtrl$: newChange(comp.extCtrl$),
        });
        tick();
        error = comp.validate(fakeFormControl);
        detectChanges();

        expect(error).toBeNull();
      }));
    });


    it('should persist items across multiple lists', fakeAsync(() => {

      comp.jbKeepSelection = true;
      comp.jbUniqueByProperty = 'id';
      // No items selected
      expect(getSelectedItemsText().length).toEqual(0);
      expect(getOptionRows().length).toBe(2);

      // Click the first dropdown item
      getOptionRowsDe()[0].triggerEventHandler('mousedown', {});
      detectChanges();

      comp.jbList = [
        {
          id: 3,
          username: 'andrew.byrne',
          email: 'andrew@byrne.com',
          first_name: 'Andrew',
          last_name: 'Byrne'
        },
        {
          id: 1,
          username: 'deb.mallya',
          email: 'deb@mallya.com',
          first_name: 'Deb',
          last_name: 'Mallya'
        }
      ];
      comp.ngOnChanges({
        jbList: newChange(comp.jbList)
      });
      tick();
      detectChanges();

      // Click the first dropdown item
      getOptionRowsDe()[0].triggerEventHandler('mousedown', {});
      detectChanges();

      // Selected item should show up as selected
      expect(getSelectedItemsText()).toEqual(['joel@barba.com', 'andrew@byrne.com']);
      // Selected item should be removed from the dropdown
      expect(getOptionRows().length).toBe(1);

    }));

  });
});
