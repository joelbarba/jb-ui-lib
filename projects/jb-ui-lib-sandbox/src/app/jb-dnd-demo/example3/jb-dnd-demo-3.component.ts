import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SubSink} from 'subsink';
import {JbGrowlService} from '../../../../../jb-ui-lib/src/lib/jb-growl/jb-growl.service';
import {JbDnDService} from '../../../../../jb-ui-lib/src/lib/jb-dnd/jb-dnd.service';

@Component({
  selector: 'app-jb-dnd-demo-3',
  templateUrl: './jb-dnd-demo-3.component.html',
  styleUrls: ['./jb-dnd-demo-3.component.scss']
})
export class JbDndDemo3Component implements OnInit, OnDestroy {
  private subs = new SubSink();
  public obj1 = { id: '1', name: 'Orange' };
  public obj2 = { id: '2', name: 'Banana' };
  public obj3 = { id: '3', name: 'Apple' };
  public list1 = [this.obj1, this.obj2, this.obj3];
  public list2 = [];
  public container1 = { id: '1', list: [] };
  public container2 = { id: '2', list: [] };
  public container3 = { id: '3', list: [] };
  public container4 = { id: '4', list: [] };
  public isNestOp = false;

  public viewCode = `<div class="col-4">
  <div class="board">
    <h4 class="padB30">Draggable elements</h4>
    <div [jbDraggable]="obj1">{{obj1.name}}</div>
    <div [jbDraggable]="obj2">{{obj2.name}}</div>
    <div [jbDraggable]="obj3">{{obj3.name}}</div>
  </div>
</div>

<div class="col-4">
  <div class="c1" [jbDropContainer]="container1">
    <h5>Container 1</h5>
    <div class="c2" [jbDropContainer]="container3">
      <h5>Container 3</h5>
      <div class="c3" [jbDropContainer]="container4">
        <h5>Container 4</h5>
      </div>
    </div>
  </div>
</div>

<div class="col-4">
  <div [jbDropContainer]="container2">
    <h5>Container 2</h5>
  </div>
</div>`;

  ctrlCode = `public obj1 = { id: '1', name: 'Orange' };
public obj2 = { id: '2', name: 'Banana' };
public obj3 = { id: '3', name: 'Apple' };
public container1 = { id: '1', list: [] };
public container2 = { id: '2', list: [] };
public container3 = { id: '3', list: [] };
public container4 = { id: '4', list: [] };

constructor(public jbDnD: JbDnDService) {}

ngOnInit() {
  this.jbDnD.dragEndOk$.subscribe(params => {
    this.growl.success(
      'Dropping into ' + params.jbDropContainer.id
      + ' - Item: ' + params.jbDraggable.name);
  });
}`;

  scssCode = `.jb-draggable {
  width: 200px;
  height: 60px;
  border: 1px solid red;
  margin: 5px;
  background: orange;
  @extend .flex-center;

  &:hover { cursor: grab; }
  &.is-dragging { opacity: 0.2; }
}

.jb-drop-container {
  width: 100%;
  height: 95%;
  h5 { z-index: -1; }
  border: 4px dashed gray;
  border-radius: 10px;
  padding: 30px 50px;
  &.dragging-over {
    border-color: greenyellow;
    background: darkseagreen;
    &.c2 { background: #FF5722; }
    &.c3 { background: magenta; }
  }
}`;


  constructor(
    public router: Router,
    public growl: JbGrowlService,
    public jbDnD: JbDnDService,
  ) {}

  ngOnInit() {
    this.subs.add(this.jbDnD.dragEndOk$.subscribe(params => {
      this.growl.success(
        'Dropping into ' + params.jbDropContainer.id
        + ' - Item: ' + params.jbDraggable.name);
    }));
  }

  ngOnDestroy() { this.subs.unsubscribe(); }


  changeNestedOp = (val) => {
    this.jbDnD.jbNestedContainers = !!val;
    this.growl.success('jbDnD Nested detection ' + (val ? 'On' : 'Off'));
  }

}
