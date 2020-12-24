import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JbNoDataComponent } from './jb-no-data.component';
import { JbTranslatePipe } from '../abstract-translate.service';
import { TestingModule } from '../../testing/testing-module';

describe('JbNoDataComponent', () => {
  let component: JbNoDataComponent;
  let fixture: ComponentFixture<JbNoDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbNoDataComponent, JbTranslatePipe ],
      imports: [ TestingModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbNoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
