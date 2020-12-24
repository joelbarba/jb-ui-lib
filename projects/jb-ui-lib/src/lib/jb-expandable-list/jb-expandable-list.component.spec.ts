import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JbExpandableListComponent } from './jb-expandable-list.component';

describe('JbExpandableListComponent', () => {
  let component: JbExpandableListComponent;
  let fixture: ComponentFixture<JbExpandableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbExpandableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbExpandableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should split the first item and the rest', () => {
    component.jbList = ['Lagavulin 16', 'Dalwhinnie', 'Laphroaig 10', 'Glenmorange 12', 'Oban'];
    component.ngOnChanges();
    expect(component.firstItem).toEqual('Lagavulin 16');
    expect(component.expList).toEqual(['Dalwhinnie', 'Laphroaig 10', 'Glenmorange 12', 'Oban']);
  });

});
