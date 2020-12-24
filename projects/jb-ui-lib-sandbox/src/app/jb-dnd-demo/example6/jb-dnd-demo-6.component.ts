import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SubSink} from 'subsink';
import {JbGrowlService} from '../../../../../jb-ui-lib/src/lib/jb-growl/jb-growl.service';
import {JbDnDService} from '../../../../../jb-ui-lib/src/lib/jb-dnd/jb-dnd.service';

@Component({
  selector: 'app-jb-dnd-demo-6',
  templateUrl: './jb-dnd-demo-6.component.html',
  styleUrls: ['./jb-dnd-demo-6.component.scss']
})
export class JbDndDemo6Component implements OnInit, OnDestroy {
  private subs = new SubSink();
  public obj1 = { id: '1', name: 'Orange' };
  public obj2 = { id: '2', name: 'Banana' };
  public obj3 = { id: '3', name: 'Apple' };
  public obj4 = { id: '4', name: 'Lemon' };
  public container1 = { id: '1', list: [] };
  public container2 = { id: '2', list: [] };
  public lastOp = '';

  viewCode = `<div class="col-3">
  <h4 class="padB30">Group 1</h4>
  <div jbDragGroup="group-1" [jbDraggable]="obj1">{{obj1.name}}</div>
  <div jbDragGroup="group-1" [jbDraggable]="obj2">{{obj2.name}}</div>
</div>
<div class="col-3">
  <div jbDropContainer jbDragGroup="group-1" 
       (jbDrop)="growl.success($event.jbDraggable.name + ' dropped')">
    <h6>Drop container 1</h6>
  </div>
</div>


<div class="col-3">
  <div jbDropContainer jbDragGroup="group-2"
       (jbDrop)="growl.success($event.jbDraggable.name + ' dropped')">
    <h6>Drop container 2</h6>
  </div>
</div>
<div class="col-3">
  <h4 class="padB30">Group 2</h4>
  <div jbDragGroup="group-2" [jbDraggable]="obj3">{{obj3.name}}</div>
  <div jbDragGroup="group-2" [jbDraggable]="obj4">{{obj4.name}}</div>
</div>`;


  scssCode = `.jb-draggable {
  width: 200px;
  height: 60px;
  cursor: grab;
  border: 1px solid red;
  background: orange;
  @extend .flex-center;
  &.group-2 {
    border: 1px solid #2196F3;
    background: lightseagreen;
  }
  &.is-dragging { opacity: 0.2; }
}

.jb-drop-container {
  width: 100%;
  height: 100%;
  border: 4px dashed gray;
  border-radius: 10px;
  @extend .flex-center;
  &.group-2 { border: 4px dashed royalblue; }

  &.dragging-over {
    background: darkseagreen;
    border-color: greenyellow;
  }
}`;

  ctrlCode = ``;

  constructor(
    public router: Router,
    public growl: JbGrowlService,
    public jbDnD: JbDnDService,
  ) {}

  ngOnInit() {

    // this.subs.add(this.jbDnD.dragEndOk$.subscribe(params => {
    //   console.log('dropping ', params, this.jbDnD.activeContainer);
    //   this.growl.success('Dropping into container ' + params.jbDropContainer.id + ' - Item: ' + params.jbDraggable.name);
    //   // this.list2.push(params.jbDraggable);
    //   // this.list1.removeByProp('name', params.jbDraggable.name);
    // }));

    this.subs.add(this.jbDnD.dragEndKo$.subscribe(params => {
      this.lastOp = 'Ups, that fell out';
      this.growl.error(this.lastOp);
    }));

  }

  ngOnDestroy() { this.subs.unsubscribe(); }

}
