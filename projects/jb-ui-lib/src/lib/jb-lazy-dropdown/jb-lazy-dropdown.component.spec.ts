import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JbLazyDropdownComponent } from './jb-lazy-dropdown.component';
import {TestingModule} from '../../testing/testing-module';
import {FormsModule} from '@angular/forms';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';

describe('JbLazyDropdownComponent', () => {
  let component: JbLazyDropdownComponent;
  let fixture: ComponentFixture<JbLazyDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbLazyDropdownComponent ],
      imports: [ TestingModule, FormsModule, NgbTooltipModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbLazyDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('search()', () => {
    beforeEach(() => {
      component.jbLazyLoad = () => Promise.resolve([]);
    });

    it('should not call expandList', () => {
      spyOn(component, 'minLengthValid').and.returnValue(false);
      spyOn(component, 'expandList');
      expect(component.expandList).not.toHaveBeenCalled();
    });

    it('should call expandList', () => {
      const event = 'test';
      spyOn(component, 'minLengthValid').and.returnValue(true);
      spyOn(component, 'expandList');
      component.search(event);
      expect(component.expandList).toHaveBeenCalled();
    });

  });

  describe('setResult()', () => {
    it('should set the results found', () => {
      const list = [{label: 'lallero 0'}, {label: 'lallero 1'}, {label: 'lallero 2'}];
      const searchParam = 'lallero';
      component.setResult(list, searchParam, false);
      expect(component.results.hasOwnProperty(searchParam)).toBe(true);
      expect(component.results[searchParam]).toEqual(list);
      expect(component.list).toEqual(list);
    });
  });

  describe('minLengthValid()', () => {

    it('should return valid', () => {
      component.list = ['test1', 'test2'];
      component.inputText = 'test';
      component.jbMinSearchLength = 1;

      expect(component.minLengthValid()).toEqual(true);
      expect(component.list).toEqual(['test1', 'test2']);
    });

    it('should return invalid', () => {
      component.list = ['test1', 'test2'];
      component.inputText = '';
      component.jbMinSearchLength = 1;

      expect(component.minLengthValid()).toEqual(false);
      expect(component.list).toEqual([]);
    });
  });

  describe('showNoResultLabel()', () => {

    it('should return true', () => {
      component.list.length = 0;
      component.isLoading = false;
      component.inputText = 'test';
      component.jbMinSearchLength = 1;

      expect(component.showNoResultLabel()).toEqual(true);
    });

    it('should return false', () => {
      component.list.length = 1;
      component.isLoading = false;
      component.inputText = 'test';
      component.jbMinSearchLength = 1;

      expect(component.showNoResultLabel()).toEqual(false);
    });
  });
});
