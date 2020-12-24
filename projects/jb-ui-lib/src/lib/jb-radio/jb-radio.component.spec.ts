import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { JbRadioComponent } from './jb-radio.component';
import { TestingModule } from '../../testing/testing-module';

describe('JbRadioComponent', () => {
  let component: JbRadioComponent;
  let fixture: ComponentFixture<JbRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbRadioComponent ],
      imports: [ TestingModule, FormsModule, NgbTooltipModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
