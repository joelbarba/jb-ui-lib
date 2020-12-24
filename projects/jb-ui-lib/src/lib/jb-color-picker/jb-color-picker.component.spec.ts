import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JbColorPickerComponent } from './jb-color-picker.component';

describe('JbColorPickerComponent', () => {
  let component: JbColorPickerComponent;
  let fixture: ComponentFixture<JbColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbColorPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
