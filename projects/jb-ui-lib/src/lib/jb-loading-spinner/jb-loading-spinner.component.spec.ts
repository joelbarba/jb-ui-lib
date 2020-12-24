import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JbLoadingSpinnerComponent } from './jb-loading-spinner.component';

describe('JbLoadingSpinnerComponent', () => {
  let component: JbLoadingSpinnerComponent;
  let fixture: ComponentFixture<JbLoadingSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbLoadingSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbLoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
