import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SubSink} from 'subsink';
import {JbGrowlService} from '../../../../../jb-ui-lib/src/lib/jb-growl/jb-growl.service';
import {JbDnDService} from '../../../../../jb-ui-lib/src/lib/jb-dnd/jb-dnd.service';

@Component({
  selector: 'app-jb-dnd-demo-2',
  templateUrl: './jb-dnd-demo-2.component.html',
  styleUrls: ['./jb-dnd-demo-2.component.scss']
})
export class JbDndDemo2Component implements OnInit, OnDestroy {
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

  public relativeWidth = false;

  public viewCode = `<div class="col-3">
  <div class="board">
    <h4 class="padB30">Draggable elements</h4>
    <div [jbDraggable]="obj1">{{obj1.name}}</div>
    <div [jbDraggable]="obj2">{{obj2.name}}</div>
    <div [jbDraggable]="obj3">{{obj3.name}}</div>
  </div>
</div>

<div class="col-3">
  <div class="board">
    <div [jbDropContainer]="container1" (jbDrop)="addItem($event)">
      <h4 class="padB30">List 1</h4>
      <div *ngFor="let item of container1.list" class="marT5">
        <jb-btn jbType="delete-icon" (jbClick)="container1.list.removeById(item.id)"></jb-btn>
        <span class="marL20" >{{item.id}}. {{item.name}}</span>
      </div>
    </div>
  </div>
</div>

<div class="col-3">
  <div class="board">
    <div [jbDropContainer]="container2" (jbDrop)="addItem($event)">
      <h4 class="padB30">List 2</h4>
      <div *ngFor="let item of container2.list" class="marT5">
        <jb-btn jbType="delete-icon" (jbClick)="container2.list.removeById(item.id)"></jb-btn>
        <span class="marL20" >{{item.id}}. {{item.name}}</span>
      </div>
    </div>
  </div>
</div>`;

  scssCode = `.board {
  position: relative;
  width: 100%;
  height: 400px;
  border: 1px solid black;
  padding: 30px;
  background: lightcyan;
  &.dragging-over { 
    background: darkseagreen; 
  }
}

.jb-draggable {
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
  background: lightgrey;
  &.dragging-over { 
    background: darkseagreen; 
  }
}`;

  ctrlCode = `public obj1 = { id: '1', name: 'Orange' };
public obj2 = { id: '2', name: 'Banana' };
public obj3 = { id: '3', name: 'Apple' };
public container1 = { id: '1', list: [] };
public container2 = { id: '2', list: [] };
  
constructor(public jbDnD: JbDnDService) {}

addItem(event) {
  const list = event.jbDropContainer.list;
  list.push({ ...event.jbDraggable, id: list.length });
}`;

  constructor(
    public router: Router,
    public growl: JbGrowlService,
    public jbDnD: JbDnDService,
  ) {}

  ngOnInit() {

    // this.subs.add(this.jbDnD.activeContainer$.subscribe(cont => {
    //   console.log('New active container: ', cont);
    // }));
    // this.subs.add(this.jbDnD.activePlaceholder$.subscribe(ph => {
    //   console.log('New active placeholder: ', ph);
    // }));

  }

  addItem(event) {
    if (!this.jbDnD.isDragging) {
      this.growl.error('Uhmmm, you are dropping something suspicious here. I do not like it');
      return false;
    }
    const list = event.jbDropContainer.list;
    list.push({ ...event.jbDraggable, id: list.length });
  }

  ngOnDestroy() { this.subs.unsubscribe(); }

}
