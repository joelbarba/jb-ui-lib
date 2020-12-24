import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { JbListPaginatorComponent } from './jb-list-paginator.component';
import { JbDropdownComponent } from '../jb-dropdown/jb-dropdown.component';
import { TestingModule } from '../../testing/testing-module';

// FIXME null pointer exception
xdescribe('JbListPaginatorComponent', () => {
  let component: JbListPaginatorComponent;
  let fixture: ComponentFixture<JbListPaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbListPaginatorComponent, JbDropdownComponent ],
      imports: [ TestingModule, FormsModule, NgbTooltipModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbListPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
