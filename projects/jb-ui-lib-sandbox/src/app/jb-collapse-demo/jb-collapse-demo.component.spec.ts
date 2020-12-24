import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JbCollapseDemoComponent } from './jb-collapse-demo.component';

describe('JbCollapseDemoComponent', () => {
  let component: JbCollapseDemoComponent;
  let fixture: ComponentFixture<JbCollapseDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbCollapseDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbCollapseDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
