import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {JbDndDemoComponent} from './jb-dnd-demo.component';

describe('jbDropPlaceholderDemoComponent', () => {
  let component: JbDndDemoComponent;
  let fixture: ComponentFixture<JbDndDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbDndDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbDndDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
