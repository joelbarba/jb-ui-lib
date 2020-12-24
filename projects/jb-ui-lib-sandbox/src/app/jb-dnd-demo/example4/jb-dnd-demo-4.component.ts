import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SubSink} from 'subsink';
import {JbGrowlService} from '../../../../../jb-ui-lib/src/lib/jb-growl/jb-growl.service';
import {JbDnDService} from '../../../../../jb-ui-lib/src/lib/jb-dnd/jb-dnd.service';

@Component({
  selector: 'app-jb-dnd-demo-4',
  templateUrl: './jb-dnd-demo-4.component.html',
  styleUrls: ['./jb-dnd-demo-4.component.scss']
})
export class JbDndDemo4Component implements OnInit, OnDestroy {
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
  public isDebugMode = false;
  public isAccurateMode = false;



  public viewCode = `<div class="col-3">
  <div class="board">
    <h4>List 1</h4>
    <div *ngFor="let item of list1">
      <div [jbDraggable]="item" jbDragMode="copy">{{item.name}}</div>
    </div>
  </div>
</div>

<div class="col-3">
  <div id="cont-1" [jbDropContainer]="container1">
    <h5>Container 1</h5>
    <div [jbDropPlaceholder]="{ pos: 0 }" jbDropContainerId="cont-1">Placeholder 0</div>
    <div [jbDropPlaceholder]="{ pos: 1 }" jbDropContainerId="cont-1">Placeholder 1</div>
    <div [jbDropPlaceholder]="{ pos: 2 }" jbDropContainerId="cont-1">Placeholder 2</div>
  </div>
</div>

<div class="col-6">
  <div id="cont-2" class="cont-2" [jbDropContainer]="container2">
    <h5>Container 2</h5>
    <div class="ph-1" [jbDropPlaceholder]="{pos:1}" jbDropContainerId="cont-2">Placeholder 1</div>
    <div class="ph-2" [jbDropPlaceholder]="{pos:2}" jbDropContainerId="cont-2">Placeholder 2</div>
    <div class="ph-3" [jbDropPlaceholder]="{pos:3}" jbDropContainerId="cont-2">Placeholder 3</div>
    <div class="ph-4" [jbDropPlaceholder]="{pos:4}" jbDropContainerId="cont-2">Placeholder 4</div>
    <div class="ph-5" [jbDropPlaceholder]="{pos:5}" jbDropContainerId="cont-2">Placeholder 5</div>
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
  z-index: 100;
  text-align: center;
  padding: 20px;
  &.dragging-over {
    background: rgba(darkseagreen, 0.2);
    border-color: greenyellow;
  }
}

.jb-drop-placeholder {
  background: lightblue;
  border: 2px dashed cornflowerblue;
  padding: 20px;
  margin: 15px 60px;
  &.active-placeholder {
    background: rgba(yellow, 0.5);
  }
}

.cont-2.jb-drop-container {
  position: relative;
  padding: 20px 0 0 0;
  .jb-drop-placeholder {
    margin: 0;
    padding: 0;
    @extend .flex-center;
    position: absolute;
    &.ph-1 { left: 10px;  top: 210px; width: 300px; height: 50px; }
    &.ph-2 { left: 320px; top: 50px;  width: 200px; height: 70px; }
    &.ph-3 { left: 525px; top: 50px;  width: 170px; height: 50px; }
    &.ph-4 { left: 500px; top: 260px; width: 200px; height: 70px; }
    &.ph-5 { left: 50px;  top: 310px; width: 185px; height: 60px; }
  }
}`;

  ctrlCode = `constructor(public jbDnD: JbDnDService) {  
  this.jbDnD.dragEndOk$.subscribe(params => {
    this.growl.success( 
      'Dropping into container ' + params.jbDropContainer.id
      + ' - placeholder: ' + params.jbDropPlaceholder.model.pos
    );
  }); 
}`;

  constructor(
    public router: Router,
    public growl: JbGrowlService,
    public jbDnD: JbDnDService,
  ) {}

  ngOnInit() {

    this.subs.add(this.jbDnD.dragEndOk$.subscribe(params => {
      // params.jbDropContainer.list.push(params.jbDraggable);
      // console.log('dropping ', params, this.jbDnD.activeContainer);
      this.growl.success('Dropping into container '
        + params.jbDropContainer.id
        + ' - placeholder: ' + params.jbDropPlaceholder.model.pos
        // + ' - Item: ' + params.jbDraggable.name
      );
    }));

    this.subs.add(this.jbDnD.activeContainer$.subscribe(cont => console.log('A container: ', cont)));
    this.subs.add(this.jbDnD.activePlaceholder$.subscribe(ph => console.log('Active placeholder: ', ph)));
    this.subs.add(this.jbDnD.dragOver$.subscribe(ph => console.log('Dragging over...')));

  }

  ngOnDestroy() { this.subs.unsubscribe(); }

}
