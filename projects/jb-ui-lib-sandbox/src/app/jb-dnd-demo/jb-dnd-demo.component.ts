import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Injector, OnDestroy,
  OnInit, TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {JbGrowlService} from '../../../../jb-ui-lib/src/lib/jb-growl/jb-growl.service';
import {JbDnDService} from '../../../../jb-ui-lib/src/lib/jb-dnd/jb-dnd.service';
import {SubSink} from 'subsink';
import {Router} from '@angular/router';

@Component({
  selector: 'app-jb-drop-placeholder-demo',
  templateUrl: './jb-dnd-demo.component.html',
  styleUrls: ['./jb-dnd-demo.component.scss']
})
export class JbDndDemoComponent implements OnInit, AfterViewInit, OnDestroy {
  private subs = new SubSink();
  public name = jbDndDemoDoc.name;
  public desc = jbDndDemoDoc.desc;
  public api = jbDndDemoDoc.api;
  public instance = jbDndDemoDoc.instance;
  public cssReset = ``;

  public obj1 = { id: '1', name: 'Orange' };
  public obj2 = { id: '2', name: 'Banana' };
  public obj3 = { id: '3', name: 'Apple' };
  public list1 = [this.obj1, this.obj2, this.obj3];
  public list2 = [];
  public container1 = { id: '1', list: [] };
  public container2 = { id: '2', list: [] };
  public container3 = { id: '3', list: [] };
  public container4 = { id: '4', list: [] };
  public isDebugMode = false;
  public isAccurateMode = false;

  code1 = ` <h4 [jbDraggable]="{ name: 'Orange' }" jbDragMode="move">Orange</h4>`;
  code2 = `<div id="jb-drag-ghost-id" class="jb-drag-ghost"> ... </div>`;
  code3 = `<div [jbDropContainer]="myList" (jbDrop)="growl.success($event.jbDraggable.name)"></div>`;
  code4 = `this.jbDnD.dragEndOk$.subscribe(params => {
  params.jbDropContainer.list.push(params.jbDraggable);
});`;
  code5 = `<div [jbDropPlaceholder]="{ pos: 1 }" jbDropContainerId="container-1">
  <h6>Placeholder 1</h6>
</div>`;
  code6 = `placeholder.distance = ((event.clientX - placeholder.midX) * (event.clientX - placeholder.midX)
                      + (event.clientY - placeholder.midY) * (event.clientY - placeholder.midY));`;

  constructor(
    public router: Router,
    public growl: JbGrowlService,
    private injector: Injector,
    private r: ComponentFactoryResolver,
    public jbDnD: JbDnDService,
  ) {
    // const factory = this.r.resolveComponentFactory(jbNoDataComponent);
    // const compRef = factory.create(injector);
    // const view = compRef.hostView;
    // // this.vc2.createComponent(factory);

  }

  ngOnInit() {

    this.subs.add(this.jbDnD.dragEndOk$.subscribe(params => {
      let msg = 'Dropping "' + params.jbDraggable.name + '" into container ' + params.jbDropContainer.id;
      if (params.jbDropPlaceholder) {
        msg += ' <br> placeholder ' + params.jbDropPlaceholder.model.pos;
      }
      this.growl.success(msg);
    }));

    this.subs.add(this.jbDnD.dragEndKo$.subscribe(params => this.growl.error('Ups, that fell out')));
  }

  moveTo1(item) {
    this.list1.push(item);
    this.list2.removeByProp('name', item.name);
  }

  changeNestedOp = (val) => {
    this.jbDnD.jbNestedContainers = !!val;
    this.growl.success('jbDnD Nested detection ' + (val ? 'On' : 'Off'));
  };


  onDragOver(event) {
    // event.stopPropagation();
    event.preventDefault();
  }

  ngAfterViewInit() {

    // const view1 = this.myTemplate.createEmbeddedView(null);
    // const view2 = this.myTemplate.createEmbeddedView(null);
    // this.vc1.insert(view1);
    // this.vc2.insert(view2);
    // this.vc2.createEmbeddedView(this.myTemplate);
  }
  ngOnDestroy() { this.subs.unsubscribe(); }

  public changeDebugMode = (value) => {
    this.jbDnD.setDebugMode(value);
  }
}


export const jbDndDemoDoc = {
  name    : `jbDnD`,
  uiType  : 'module',
  desc    : `Drag and drop module`,
  api     : `JbDnDService + [jbDraggable] + [jbDropContainer] + [jbDropPlaceholder]`,
  instance: `JbDnDService`,
  demoComp: JbDndDemoComponent
};
