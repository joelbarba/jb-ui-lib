import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JbListCheckboxDemoComponent } from './jb-list-checkbox-demo.component';

describe('JbListCheckboxDemoComponent', () => {
  let component: JbListCheckboxDemoComponent;
  let fixture: ComponentFixture<JbListCheckboxDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbListCheckboxDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbListCheckboxDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
