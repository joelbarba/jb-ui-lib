import {ComponentFixture, TestBed } from '@angular/core/testing';
import {Component, NgModule} from '@angular/core';
import {JbDnDModule} from '../jb-dnd.module';
import {TestingModule} from '../../../testing/testing-module';
import {JbDnDService} from '../jb-dnd.service';


@Component({ template: `<div [jbDropContainer]="1">Test</div>`, })
class HostComponent {}
@NgModule({
  imports: [JbDnDModule],
  declarations: [HostComponent],
  exports: [HostComponent],
})
class HostModule {}


describe('jbDropContainerDirective', () => {
  let jbDnD: JbDnDService;
  let component: HostComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HostModule],
      providers: [JbDnDService]
    }).compileComponents();

    jbDnD = TestBed.inject(JbDnDService); // * inject service instance

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    fixture.detectChanges(); // * so the directive gets applied

  });

  it('should create a host instance', () => {
    expect(component).toBeTruthy();
  });
});
