import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { JbDropdownComponent } from './jb-dropdown.component';
import { TestingModule } from '../../testing/testing-module';

describe('JbDropdownComponent', () => {
  let component: JbDropdownComponent;
  let fixture: ComponentFixture<JbDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbDropdownComponent ],
      imports: [ TestingModule, FormsModule, NgbTooltipModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
