import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SubSink} from 'subsink';
import {JbGrowlService} from '../../../../../jb-ui-lib/src/lib/jb-growl/jb-growl.service';
import {JbDnDService} from '../../../../../jb-ui-lib/src/lib/jb-dnd/jb-dnd.service';

@Component({
  selector: 'app-jb-dnd-demo-5',
  templateUrl: './jb-dnd-demo-5.component.html',
  styleUrls: ['./jb-dnd-demo-5.component.scss']
})
export class JbDndDemo5Component implements OnInit, OnDestroy {
  private subs = new SubSink();
  public myList = [
    { id: '1',  pos: 0, name: 'Orange' },
    { id: '2',  pos: 1, name: 'Banana' },
    { id: '3',  pos: 2, name: 'Apple' },
    { id: '4',  pos: 3, name: 'Berries' },
    { id: '5',  pos: 4, name: 'Pear' },
    { id: '6',  pos: 5, name: 'Melon' },
    { id: '7',  pos: 6, name: 'Cherry' },
    { id: '8',  pos: 7, name: 'Grapes' },
    { id: '9',  pos: 8, name: 'Peach' },
    { id: '10', pos: 9, name: 'Lemon' },
  ];
  public heightAnimation = false;
  public dropAnimation = true;
  public isDroppingId;

  public viewCode = `<div id="list-cont" jbDropContainer (jbDrop)="reorderList($event)">

  <!--Unique first placeholder to drop at position 0-->
  <div id="pos-0" [jbDropPlaceholder]="{ pos: -1 }" jbDropContainerId="list-cont">
    <span class="marL20">{{'myList[' + jbDnD.jbDraggable?.pos + ']'}}</span>
    <span class="marL30">{{jbDnD.jbDraggable?.id + '. ' + jbDnD.jbDraggable?.name}}</span>
  </div>

  <div *ngFor="let item of myList">

    <!--Row Item-->
    <div class="list-draggable" [jbDraggable]="item" [class.is-dropping]="item.id === isDroppingId">
      <span class="icon-more2 marR5"></span>
      <span>{{'myList[' + item.pos + ']'}}</span>
      <span class="marL30">{{item.id + '. ' + item.name}}</span>
    </div>

    <!--Placeholder below every item (except the dragging one)-->
    <div [id]="'pos-' + item.id" *ngIf="jbDnD.jbDraggable?.id !== item.id"
         [jbDropPlaceholder]="item" jbDropContainerId="list-cont">
      <span class="marL20">{{'myList[' + jbDnD.jbDraggable?.pos + ']'}}</span>
      <span class="marL30">{{jbDnD.jbDraggable?.id + '. ' + jbDnD.jbDraggable?.name}}</span>
    </div>

  </div>
</div>`;

  scssCode1 = `
.jb-drop-container {
  width: 100%; height: 450px;
  padding: 25px 15px;

  .jb-draggable {
    border: 1px solid gray;
    padding: 0 15px;
    background: lightgrey;
    display: flex;
    align-items: center;
    height: 40px;
    overflow: hidden;
    cursor: grab;
    &.is-dragging { opacity: 0.5; }
  }

  .jb-drop-placeholder {
    @extend .jb-draggable;
    border: 1px dashed gray;
    &.active-placeholder {
      height: 40px;
      opacity: 0.5;
      background: greenyellow;
    }
    &:not(.active-placeholder) {
      height: 0;
      border: none;
    }
  }

  &.dragging-over {
    border-color: greenyellow;
    .jb-draggable.is-dragging {
      opacity: 0;
      height: 0;
      border: none;
    }
  }
}`;

  scssCode2 = `
// Drag option icon
.jb-draggable .icon-more2 { opacity: 0; }
.jb-drop-container:not(.dragging-over) {
  .jb-draggable:hover .icon-more2 { opacity: 0.5; }
}

// Animation on expanding placeholders
.jb-drop-container.dragging-over .jb-drop-placeholder {
  transition-property: height;
  transition-duration: 0.15s;
}

// Animation on dropping elements
.jb-draggable.is-dropping {
  animation: 0.2s ease-in my-drop-ani;
  @keyframes my-drop-ani {
    0% { background: darken(greenyellow, 10%); }
    20% { background: greenyellow; }
    100% { background: lightgrey; }
  }
}

// --------- Non encapsulated styles ------
.jb-drag-ghost .jb-draggable.list-draggable {
  opacity: 0.6;
  background: gray !important;
  width: 200px;
  height: 40px;
  padding: 10px 15px;
  transform: rotate(-3deg);
}`;

  ctrlCode = `public myList = [
  { id: '1',  pos: 0, name: 'Orange' },
  { id: '2',  pos: 1, name: 'Banana' },
  { id: '3',  pos: 2, name: 'Apple' },
  { id: '4',  pos: 3, name: 'Berries' },
  { id: '5',  pos: 4, name: 'Pear' },
  { id: '6',  pos: 5, name: 'Melon' },
  { id: '7',  pos: 6, name: 'Cherry' },
  { id: '8',  pos: 7, name: 'Grapes' },
  { id: '9',  pos: 8, name: 'Peach' },
  { id: '10', pos: 9, name: 'Lemon' },
];  
  
constructor(public jbDnD: JbDnDService) {}

// Reorder on drop
reorderList(event) {
  const dragItem = event.jbDraggable;
  const placeAfter = event.jbDropPlaceholder.model;

  // Calculate new position in the array
  let newPos = placeAfter.pos;
  if (newPos < dragItem.pos) { newPos++; }

  this.myList.removeById(dragItem.id); // Remove it from original position
  this.myList.splice(newPos, 0, dragItem); // Inject it after placeholder
  this.myList.forEach((item, ind) => item.pos = ind); // Reorder list

  // This is to trigger an animation when dropping
  this.isDroppingId = dragItem.id;
  setTimeout(() => this.isDroppingId = null, 1000);
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

    // this.subs.add(this.jbDnD.dragEndKo$.subscribe(params => {
    //   this.growl.error('Ups, that fell out');
    // }));

  }

  ngOnDestroy() { this.subs.unsubscribe(); }


  resetArray() {
    this.myList = this.myList.sort((a, b) => Number.parseInt(a.id) - Number.parseInt(b.id));
    this.myList.forEach((item, ind) => item.pos = ind);
    this.growl.success('Array list has been reset');
  }

  reorderList(event) {
    const dragItem = event.jbDraggable;
    const placeAfter = event.jbDropPlaceholder.model;

    console.log('Move item:', dragItem, ' and place it after: ', placeAfter);

    // Calculate new position in the array
    let newPos = placeAfter.pos;
    const oldPos = dragItem.pos;
    if (newPos < oldPos) { newPos++; }
    this.growl.success(`Item "${dragItem.name}" reordered <br> from myList[${oldPos}] --- to ---> myList[${newPos}]`);

    this.myList.removeById(dragItem.id); // Remove it from original position
    this.myList.splice(newPos, 0, dragItem); // Inject it after the placeholder item
    this.myList.forEach((item, ind) => item.pos = ind); // Reorder all items of the list

    // This is to trigger an animation when dropping
    this.isDroppingId = dragItem.id;
    setTimeout(() => this.isDroppingId = null, 1000);
  }

}
