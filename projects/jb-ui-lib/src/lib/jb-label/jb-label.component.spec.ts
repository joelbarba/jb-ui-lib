import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { JbLabelComponent } from './jb-label.component';
import { TestingModule } from '../../testing/testing-module';

describe('JbLabelComponent', () => {
  let component: JbLabelComponent;
  let fixture: ComponentFixture<JbLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbLabelComponent ],
      imports: [ TestingModule, NgbTooltipModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
