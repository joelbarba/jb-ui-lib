import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { JbSwitchComponent } from './jb-switch.component';
import { TestingModule } from '../../testing/testing-module';
import { JbLabelComponent } from '../jb-label/jb-label.component';

describe('JbSwitchComponent', () => {
  let component: JbSwitchComponent;
  let fixture: ComponentFixture<JbSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbSwitchComponent, JbLabelComponent ],
      imports: [ TestingModule, FormsModule, NgbTooltipModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
