import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JbLoadingBarComponent } from './jb-loading-bar.component';

describe('JbLoadingBarComponent', () => {
  let component: JbLoadingBarComponent;
  let fixture: ComponentFixture<JbLoadingBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbLoadingBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbLoadingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
