import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JbLazyDropdownDemoComponent } from './jb-lazy-dropdown-demo.component';

describe('JbLazyDropdownDemoComponent', () => {
  let component: JbLazyDropdownDemoComponent;
  let fixture: ComponentFixture<JbLazyDropdownDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbLazyDropdownDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbLazyDropdownDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
