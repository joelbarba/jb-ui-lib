import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

import { JbProgressBarComponent } from './jb-progress-bar.component';
import { TestingModule } from '../../testing/testing-module';
import { JbTranslatePipe } from '../abstract-translate.service';

describe('JbProgressBarComponent', () => {
  let component: JbProgressBarComponent;
  let fixture: ComponentFixture<JbProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbProgressBarComponent, JbTranslatePipe ],
      imports: [ TestingModule, NgbProgressbarModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
