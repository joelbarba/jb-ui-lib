import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal, NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { JbConfirmComponent } from './jb-confirm.component';
import { JbBtnComponent } from '../jb-btn/jb-btn.component';
import { TestingModule } from '../../testing/testing-module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('JbConfirmComponent', () => {
  let component: JbConfirmComponent;
  let fixture: ComponentFixture<JbConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ JbConfirmComponent, JbBtnComponent ],
      imports: [ TestingModule, NgbModalModule, NgbTooltipModule ],
      providers: [ NgbActiveModal ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
