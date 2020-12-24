import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JbAutocompleteComponent } from './jb-autocomplete.component';
import { JbLabelComponent } from '../jb-label/jb-label.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TestingModule } from '../../testing/testing-module';
import { FormControl, FormsModule } from '@angular/forms';
import { Patterns } from '../patterns';

describe('JbAutocompleteComponent', () => {
  let component: JbAutocompleteComponent;
  let fixture: ComponentFixture<JbAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JbAutocompleteComponent, JbLabelComponent],
      imports: [TestingModule, FormsModule, NgbTooltipModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setPattern', () => {
    it('should set the pattern integer', () => {
      component.jbValidType = 'integer';
      component.setPattern();
      expect(component.jbPattern).toBe(Patterns.integer);
    });

    it('should set the pattern number', () => {
      component.jbValidType = 'number';
      component.setPattern();
      expect(component.jbPattern).toBe(Patterns.number);
    });

    it('should set the pattern decimal', () => {
      component.jbValidType = 'decimal';
      component.setPattern();
      expect(component.jbPattern).toBe(Patterns.decimal);
    });

    it('should set the pattern email', () => {
      component.jbValidType = 'email';
      component.setPattern();
      expect(component.jbPattern)
        .toBe(Patterns.email);
    });
  });

  describe('validate', () => {
    it('should return null if valid', () => {
      component.isInvalid = false;
      const result = component.validate(new FormControl());
      expect(result).toBe(null);
    });

    it('should return required obj on invalid', () => {
      component.isInvalid = true;
      component.ngModel = null;
      const result = component.validate(new FormControl());
      expect(result).toEqual({required: true});
    });

    it('should return pattern obj on invalid', () => {
      component.isInvalid = true;
      component.jbPattern = '^[0-9]{1,5}$';
      component.ngModel = 'A string value';
      const result = component.validate(new FormControl());
      expect(result).toEqual({value: 'Expected value type: ' + component.jbPattern});
    });
  });

  describe('toggle', () => {
    let collapseSpy;
    let expandSpy;

    beforeEach(() => {
      collapseSpy = spyOn(component, 'collapse');
      expandSpy = spyOn(component, 'expand');
    });

    it('should collapse', () => {
      component.isFocus = true;
      component.toggle();
      expect(collapseSpy).toHaveBeenCalled();
    });

    it('should expand', () => {
      component.isFocus = false;
      component.toggle();
      expect(expandSpy).toHaveBeenCalled();
    });
  });

  describe('expand', () => {
    let focusSpy;

    beforeEach(() => {
      focusSpy = spyOn(component, 'focus');
    });

    it('should expand', () => {
      component.expand();
      expect(focusSpy).toHaveBeenCalled();
    });
  });

  describe('collapse', () => {
    it('should collapse', () => {
      component.collapse();
      expect(component.isFocus).toBe(false);
    });
  });

  describe('isExpanded()', () => {
    beforeEach(() => {
      component.isFocus = true;
      component.ngModel = 'test string';
      component.list = [ 'entry' ];
    });

    it('should hide the list if the input is not focused', () => {
      component.isFocus = false;
      expect(component.isExpanded()).toBe(false);
    });

    it('should hide the list if it is empty', () => {
      component.list = [];
      expect(component.isExpanded()).toBe(false);
    });

    it('should hide the list if the user has not keyed enough characters', () => {
      component.jbMinLength = 16;
      expect(component.isExpanded()).toBe(false);
    });
  });

  describe('navigate', () => {
    beforeEach(() => {
      component.isFocus = true;
      component.list = ['a', 'b', 'c', 'd'];
      component.ngModel = 'c';
      // @ts-ignore
      component.listContainer = {nativeElement: {children: [{clientHeight: 30}]}};
    });

    it('should navigate upward', () => {
      component.navigate(2, component.list, 'ArrowUp');
      expect(component.jbCandidate).toBe('b');
    });

    it('should navigate downward', () => {
      component.navigate(2, component.list, 'ArrowDown');
      expect(component.jbCandidate).toBe('d');
    });
  });

  describe('typing, select, reset', () => {
    let updateModelSpy;
    let filterSpy;
    let expandSpy;
    let focusSpy;
    let collapseSpy;

    beforeEach(() => {
      updateModelSpy = spyOn(component, 'updateModel');
      filterSpy = spyOn(component, 'filter');
      expandSpy = spyOn(component, 'expand');
      focusSpy = spyOn(component, 'focus');
      collapseSpy = spyOn(component, 'collapse');
    });

    it('should update, filter and expand on typing', () => {
      const value = 'A string';
      component.typing(value);
      expect(updateModelSpy).toHaveBeenCalledWith(value);
      expect(filterSpy).toHaveBeenCalled();
      expect(expandSpy).toHaveBeenCalled();
    });

    it('should update, filter and collapse on select', () => {
      const value = 'A string';
      component.select(value);
      expect(updateModelSpy).toHaveBeenCalledWith(value);
      expect(filterSpy).toHaveBeenCalled();
    });

    it('should update, filter, expand and focus on reset', () => {
      component.reset();
      expect(updateModelSpy).toHaveBeenCalledWith('');
      expect(filterSpy).toHaveBeenCalled();
      expect(expandSpy).toHaveBeenCalled();
      expect(focusSpy).toHaveBeenCalled();
    });
  });

  describe('isMatch', () => {
    it('should return false if not matched', () => {
      component.ngModel = 'hello';
      expect(component.isMatch('ciao')).toBe(false);
    });

    it('should return true if matched', () => {
      component.ngModel = 'hello';
      expect(component.isMatch('hello')).toBe(true);
    });

    it('should return true if model null', () => {
      component.ngModel = '';
      expect(component.isMatch('hola')).toBe(true);
    });
  });

  describe('setValidity', () => {
    it('should return isInvalid set to true', () => {
      component.setValidity(true);
      expect(component.isInvalid).toBe(false);
    });

    it('should return isInvalid set to false', () => {
      component.setValidity(false);
      expect(component.isInvalid).toBe(true);
    });
  });

  describe('checkValidity', () => {
    let setValiditySpy;

    beforeEach(() => {
      setValiditySpy = spyOn(component, 'setValidity');
    });

    it('should be valid when value is selected from the list', () => {
      component.jbList = ['a', 'b', 'c', 'd'];
      component.checkValidity('b');
      expect(setValiditySpy).toHaveBeenCalledWith(true);
    });

    it('should be invalid when value is null', () => {
      component.jbList = ['a', 'b', 'c', 'd'];
      component.jbRequired = true;
      component.checkValidity(null);
      expect(setValiditySpy).toHaveBeenCalledWith(false);
    });

    it('should be invalid when value do not respect the pattern', () => {
      component.jbList = ['a', 'b', 'c', 'd'];
      component.jbPattern = '^[0-9]{1,5}$';
      component.checkValidity('e');
      expect(setValiditySpy).toHaveBeenCalledWith(false);
    });

    it('should be valid when value is valid', () => {
      component.jbList = ['a', 'b', 'c', 'd'];
      component.checkValidity('e');
      expect(setValiditySpy).toHaveBeenCalledWith(true);
    });
  });
});
