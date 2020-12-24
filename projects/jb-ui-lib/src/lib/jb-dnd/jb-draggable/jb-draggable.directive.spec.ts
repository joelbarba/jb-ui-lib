import {ComponentFixture, TestBed } from '@angular/core/testing';
import {JbDraggableDirective} from './jb-draggable.directive';
import {Component, NgModule} from '@angular/core';
import {JbDnDModule} from '../jb-dnd.module';
import {TestingModule} from '../../../testing/testing-module';


@Component({ template: `<div [jbDraggable]="2">Test</div>`, })
class HostComponent {}
@NgModule({
  imports: [JbDnDModule],
  declarations: [HostComponent],
  exports: [HostComponent],
})
class HostModule {}


describe('JbDraggableDirective', () => {
  let component: HostComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HostModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    fixture.detectChanges(); // * so the directive gets appilied
  });

  it('should create a host instance', () => {
    expect(component).toBeTruthy();
  });

  it('should add the draggable attribute', () => {
    const el = element.querySelector('div');
    expect(el.draggable).toBe(true);
  });
});
