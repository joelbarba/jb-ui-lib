import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { JbTextareaComponent } from './jb-textarea.component';
import { TestingModule } from '../../testing/testing-module';

describe('JbTextareaComponent', () => {
  let component: JbTextareaComponent;
  let fixture: ComponentFixture<JbTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbTextareaComponent ],
      imports: [ TestingModule, FormsModule, NgbTooltipModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
