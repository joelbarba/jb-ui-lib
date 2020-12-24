import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JbModalHeaderComponent } from './jb-modal-header.component';
import { JbTranslatePipe, JbUiLibTransService } from '../abstract-translate.service';
import { JbUILibTransStubService } from '../../testing/jb-ui-lib-trans-service-stub.service';


describe('JbModalHeaderComponent', () => {
  let component: JbModalHeaderComponent;
  let fixture: ComponentFixture<JbModalHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbModalHeaderComponent, JbTranslatePipe ],
      providers: [{ provide: JbUiLibTransService, useClass: JbUILibTransStubService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbModalHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit close event', () => {
    const closeSpy = spyOn(component.jbClose, 'emit');

    component.close();
    expect(closeSpy).toHaveBeenCalled();
  });
});
