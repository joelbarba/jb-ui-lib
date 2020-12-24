import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDirective } from './show.component';

// FIXME this is using the component boilerplate for a directive
xdescribe('ShowComponent', () => {
  let component: ShowDirective;
  let fixture: ComponentFixture<ShowDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
