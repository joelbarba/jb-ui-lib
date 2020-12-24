import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JbListPlaceholderComponent } from './jb-list-placeholder.component';

describe('JbListPlaceholderComponent', () => {
  let component: JbListPlaceholderComponent;
  let fixture: ComponentFixture<JbListPlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbListPlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbListPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
