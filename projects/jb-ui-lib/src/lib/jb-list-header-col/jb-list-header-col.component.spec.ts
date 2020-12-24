import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JbListHeaderColComponent } from './jb-list-header-col.component';
import { TestingModule } from '../../testing/testing-module';

describe('JbListHeaderColComponent', () => {
  let component: JbListHeaderColComponent;
  let fixture: ComponentFixture<JbListHeaderColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbListHeaderColComponent ],
      imports: [ TestingModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbListHeaderColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
