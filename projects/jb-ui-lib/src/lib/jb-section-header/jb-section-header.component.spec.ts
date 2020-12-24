import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JbSectionHeaderComponent } from './jb-section-header.component';
import { JbUiLibTransService, JbTranslatePipe } from '../abstract-translate.service';
import { JbUILibTransStubService } from '../../testing/jb-ui-lib-trans-service-stub.service';

describe('JbSectionHeaderComponent', () => {
  let component: JbSectionHeaderComponent;
  let fixture: ComponentFixture<JbSectionHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbSectionHeaderComponent, JbTranslatePipe ],
      providers: [{ provide: JbUiLibTransService, useClass: JbUILibTransStubService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbSectionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
