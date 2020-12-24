import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JbExpandableListDemoComponent } from './jb-expandable-list-demo.component';

describe('JbExpandableListDemoComponent', () => {
  let component: JbExpandableListDemoComponent;
  let fixture: ComponentFixture<JbExpandableListDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbExpandableListDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbExpandableListDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
