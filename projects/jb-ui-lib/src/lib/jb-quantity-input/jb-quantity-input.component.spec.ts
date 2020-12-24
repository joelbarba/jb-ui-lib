import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControlDirective, FormsModule } from '@angular/forms';

import { JbQuantityInputComponent } from './jb-quantity-input.component';
import { TestingModule } from '../../testing/testing-module';
import {SimpleChange} from '@angular/core';

describe('JbQuantityInputComponent', () => {
  let component: JbQuantityInputComponent;
  let fixture: ComponentFixture<JbQuantityInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbQuantityInputComponent, FormControlDirective ],
      imports: [ TestingModule, FormsModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbQuantityInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a label', () => {
    component.jbLabel = 'Test';
    component.ngOnChanges({ jbLabel: new SimpleChange(null, 'Test', true) });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('label span').textContent).toEqual('Test');
  });
});
