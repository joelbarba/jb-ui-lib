import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { JbDualCheckboxComponent } from './jb-dual-checkbox.component';
import { TestingModule } from '../../testing/testing-module';
import {JbCheckboxComponent} from '../jb-checkbox/jb-checkbox.component';
import {JbLabelComponent} from '../jb-label/jb-label.component';

describe('JbDualCheckboxComponent', () => {
  let component: JbDualCheckboxComponent;
  let fixture: ComponentFixture<JbDualCheckboxComponent>;
  let propagateModelSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbDualCheckboxComponent, JbCheckboxComponent, JbLabelComponent ],
      imports: [ TestingModule, FormsModule, NgbTooltipModule ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbDualCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    propagateModelSpy = spyOn(component, 'propagateModelUp');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Check if 2 checkboxes are in sync and do we propagate correct value to model', () => {

    it('should check if default values are unchanged', () => {
      component.checkboxes = {yes: true, no: true};
      component.onChange('yes');
      expect(component.checkboxes).toEqual({yes: true, no: true});
      expect(propagateModelSpy).toHaveBeenCalledWith(undefined);
    });

    it('should pass yes field value and set checkboxes', () => {
      component.checkboxes = {yes: false, no: false};
      component.onChange('yes');
      expect(component.checkboxes).toEqual({yes: false, no: true});
      expect(propagateModelSpy).toHaveBeenCalledWith(false);
    });

    it('should pass no field value and set checkboxes', () => {
      component.checkboxes = {yes: false, no: false};
      component.onChange('no');
      expect(component.checkboxes).toEqual({yes: true, no: false});
      expect(propagateModelSpy).toHaveBeenCalledWith(true);
    });

  });
});
