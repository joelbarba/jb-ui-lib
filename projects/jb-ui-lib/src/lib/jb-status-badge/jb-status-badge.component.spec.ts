import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JbStatusBadgeComponent } from './jb-status-badge.component';
import { TestingModule } from '../../testing/testing-module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

describe('JbStatusBadgeComponent', () => {
  let component: JbStatusBadgeComponent;
  let fixture: ComponentFixture<JbStatusBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbStatusBadgeComponent ],
      imports: [ TestingModule, NgbTooltipModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbStatusBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
