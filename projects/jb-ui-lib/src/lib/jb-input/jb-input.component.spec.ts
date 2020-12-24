import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { JbInputComponent } from './jb-input.component';
import { TestingModule } from '../../testing/testing-module';

describe('JbInputComponent', () => {
  let component: JbInputComponent;
  let fixture: ComponentFixture<JbInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbInputComponent ],
      imports: [ TestingModule, FormsModule, NgbTooltipModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
