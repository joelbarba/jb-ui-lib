import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SubSink} from 'subsink';
import {JbGrowlService} from '../../../../../jb-ui-lib/src/lib/jb-growl/jb-growl.service';
import {JbDnDService} from '../../../../../jb-ui-lib/src/lib/jb-dnd/jb-dnd.service';

@Component({
  selector: 'app-jb-dnd-demo-1',
  templateUrl: './jb-dnd-demo-1.component.html',
  styleUrls: ['./jb-dnd-demo-1.component.scss']
})
export class JbDndDemo1Component implements OnInit, OnDestroy {
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
  public lastOp = '';

  public viewCode = `<div class="col-3">
  <div class="board">
    <h4 class="padB30">Draggable elements</h4>
    <div [jbDraggable]="{ id: 1, name: 'Orange' }">Orange</div>
    <div [jbDraggable]="{ id: 2, name: 'Banana' }">Banana</div>
    <div [jbDraggable]="{ id: 3, name: 'Apple' }">Apple</div>
  </div>
</div>

<div class="col-3">
  <div class="board">
    <div jbDropContainer (jbDrop)="growl.success($event.jbDraggable.name)">
       Drop here
    </div>
  </div>
</div>`;

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
  height: 100%;
  border: 4px dashed gray;
  border-radius: 10px;
  @extend .flex-center;
  &.dragging-over {
    background: darkseagreen;
    border-color: greenyellow;
  }
}`;

  ctrlCode = `constructor(public jbDnD: JbDnDService) {}

ngOnInit() {

  this.jbDnD.dragStart$.subscribe(drag => console.log('drag start'));

  this.jbDnD.dragEndOk$.subscribe(jbDropContainer => {
    this.growl.success('Dropping into container');
  });

  this.jbDnD.dragEndKo$.subscribe(params => {
    this.growl.error('Ups, that fell out');
  });


  this.jbDnD.activeContainer$.subscribe(cont => console.log('Container: ', cont));
  this.jbDnD.activePlaceholder$.subscribe(ph => console.log('Placeholder: ', ph));
  this.jbDnD.dragOver$.subscribe(cont => console.log('Dragging over...'));  
}`;

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

    // this.subs.add(this.jbDnD.dragStart$.subscribe(params => console.log('drag start')));
    // this.subs.add(this.jbDnD.dragEndOk$.subscribe(params => console.log('drop in')));
    // this.subs.add(this.jbDnD.dragEndKo$.subscribe(params => console.log('drop out')));
    // this.subs.add(this.jbDnD.activeContainer$.subscribe(cont => console.log('Container: ', cont)));
    // this.subs.add(this.jbDnD.activePlaceholder$.subscribe(ph => console.log('Placeholder: ', ph)));
    // this.subs.add(this.jbDnD.dragOver$.subscribe(cont => console.log('Dragging over...')));

  }

  ngOnDestroy() { this.subs.unsubscribe(); }

}
