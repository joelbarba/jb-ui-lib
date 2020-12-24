import { async, ComponentFixture, TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { JbDatePickerComponent } from './jb-date-picker.component';
import { TestingModule } from '../../testing/testing-module';
import { JbLabelComponent } from '../jb-label/jb-label.component';
import { JbTranslatePipe } from '../abstract-translate.service';
import { JbBtnComponent } from '../jb-btn/jb-btn.component';

describe('JbDatePickerComponent', () => {
  let component: JbDatePickerComponent;
  let fixture: ComponentFixture<JbDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbDatePickerComponent, JbTranslatePipe, JbLabelComponent, JbBtnComponent ],
      imports: [ TestingModule, FormsModule, NgbDatepickerModule, NgbTooltipModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the locale on init', fakeAsync(() => {
    flushMicrotasks();
    expect(component.locale).toBe('en-IE');
  }));
});
