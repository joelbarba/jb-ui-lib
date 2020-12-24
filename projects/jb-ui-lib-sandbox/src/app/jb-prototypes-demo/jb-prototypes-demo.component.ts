import { Component, OnInit } from '@angular/core';
import { dCopy, JbArray, JbObject} from 'projects/jb-ui-lib/src/lib/jb-prototypes/jb-prototypes';
import { JbPrototypes } from 'projects/jb-ui-lib/src/lib/jb-prototypes/jb-prototypes';

JbPrototypes.run();

// const dateValue = new Date();
// let myObj = {
//   p1: 'hey',
//   p2: null,
//   p3: undefined,
//   p4: 0,
//   p5: false,
//   p6: dateValue,
//   p7: [1, 2, 3],
//   p8: { name: 'god', age: 0 },
//   $p10: 'this',
//   $q20: 'this',
// };
// const obj1 = { p1: 'hey', p2: null, p3: undefined };
// const obj2 = { p1: 'updated' };
// JbObject.cloneProp.call(obj1, obj2);
// console.log(obj1);

// const myObj2 = dCopy(myObj1);
// myObj2.p3 = undefined;
// myObj2.p6 = myObj1.p6;
// console.log(myObj1, myObj2);
// const obj1: any = { p1: 'hey', p2: null }; obj1.p3 = { p4: 10, p5: obj1 }; // <-- obj1.p3.p5 === obj1
// const obj2: any = { p1: 'hey', p2: null }; obj2.p3 = { p4: 10, p5: obj1 };
// const res1 = isEqualTo(obj1, obj2);
//
//
// const a: any = { p1: 'hey', p2: null };
// a.p3 = { p4: 10, p5: a };
// const b = { p1: 'hey', p2: null, p3: { p4: 10, p5: {} } };
// // const a: any = [10, 30];
// // a.push([1, 2, a]);
// // const b = [10, 30, [1, 2, [10, 30]]];
// const res = isEqualTo(a, b);
//
// // const res = myObj1.isEqualTo(myObj2);
// console.log('res = ', res);

// console.log(myObj, myObj.peel());

// const myObj2 = myObj.valMap(val => val ? val : null);

// const myObj2 = myObj.keyFilter(val => !!val);
// console.log(myObj2);

// const list = [{id:'1'}, {id:'2'}, {id:'3'}, {id:'4'}, [1,3,5, [9, 1, 2]], null, 1];
// const a = list.getById('30');
// list.removeById('30');
// console.log(a);
// JbPrototypes.run(['Array.getById']);
// JbPrototypes.run(['Array.getByProp']);
// const list1 = [{id:'1'}, {id:'2'}, {id:'3'}, {id:'4'}];
// console.log(JbArray.getByProp.call(list1, 'id', '3'));
// const list = [{id:'1'}, {id:'2'}, {id:'3'}, {id:'4'}, [1,3,5, [9, 1, 2]]];
// console.log('RES', list.getById('33'));
// console.log('RES', list.getByProp('id', '3'));
// console.log('RES', list.getIndexById('3'));
// console.log('RES', list.removeById('23'), list);
// const list3 = null;
// const myObj = { name: 'Tom', age: 20, pass: '3' };
// let list2 = dCopy(list);
// console.log(list2);
// list2 = dCopy(list3);
// console.log(list2);
// list2 = dCopy(myObj);
// console.log(list2);
// const list2 = list.dCopy();

// list[4][0] = '99999';
// list[4][3][1] = '99999';
// console.log(list, list2);
// console.log('LAST', list.getLast());
//
// const myObj2 = { id: 2, name: 'Max', age: 12 };
// const myObj1 = { id: 1, name: 'Sam', age: 10, isValid: true, dad: myObj2, list };
// console.log(myObj1.keyMap('id, name'));
// console.log(myObj1.keyMap('id, age, isValid'));
//
// const myObj3 = myObj1.dCopy();
// myObj1.name = 'Tom';
// myObj1.dad.name = 'Lu';
// myObj1.list[1].id = 'changed';
// myObj1.list[2] = { id : '99999' };
// console.log(myObj1, myObj3);
// const myVal = 43;
// console.log(myVal.isIn([1,2,3,4,5,6]));
// const val = 'one2';
// console.log(val.isIn(['one','two','three','four']));
//
// let myDate = new Date();
// console.log('MyDate', myDate);
// console.log('to UTC', myDate.toUTC());
// console.log('Trunc min', myDate.truncMin());
// console.log('Trunc h', myDate.truncHour());
// console.log('Trunc d', myDate.truncDay());
// console.log('+ 20 sec', myDate.addSeconds(20));
// console.log('+ 21 min', myDate.addMinutes(21));
// console.log('+ 3 hour', myDate.addHours(3));
// console.log('+ 2 days', myDate.addDays(2));
// console.log('+ 3 months', myDate.addMonths(3));
// console.log('+ 4 years', myDate.addYears(-1).addDays(1));
// let val2 = '32';
// console.log(val2.pad(5));
// console.log(val2.pad(val2.length, '*', 10));
//
// let myObj = { name: 'Tom', age: 20, pass: '3' };
// console.log(myObj);
// myObj.cloneProp('ini', { ini: false });
// console.log(myObj);
// myObj.cloneProp('age', { age: 30 });
// console.log(myObj);
// myObj.cloneProp('pass', { age: 30 });
// console.log(myObj);
// const a = new Date();
// console.log(a);
// a.convertTZ('America/New_York'); console.log(a);
// a.convertTZ('Europe/Dublin'); console.log(a);
// console.log(new Date().convertTZ('Europe/Berlin'));
//
// const list5 = [{id:1, name:'foo'}, {id:2, name:'liz'}, {id:3, name:'tom'}, {id:4, name:'zul'}];
// console.log(list5.getKeyById('name', 3));
// console.log(list5.getKeyByProp('id', 'name', 'zul'));


@Component({
  selector: 'app-jb-prototypes-demo',
  templateUrl: './jb-prototypes-demo.component.html',
  styleUrls: ['./jb-prototypes-demo.component.scss']
})
export class JbPrototypesDemoComponent implements OnInit {
  public name = jbPrototypesDoc.name;
  public desc = jbPrototypesDoc.desc;
  public api = jbPrototypesDoc.api;
  public instance = jbPrototypesDoc.instance;

  public instance2 =
`<jb-prototypes</jb-prototypes>`;


  public cssReset = `$input-border: #ccc !default;
$optional_input_color : $input-border;
$disabled_input_color : #797979;
$primary_color        : #00B6F1;
$warning_color        : #ED0677;
$invalid_input_color  : $warning_color;

.jb-prototypes-form-group {
  ...
}`;


  public example1 = `  import { JbPrototypes } from 'jb-ui-lib';
  JbPrototypes.run();

  const myArray = [{ id: '1' }, { id: '2' }, { id: '3' }];
  const item = myArray.getById('3');`;


  public example2 = `  import { JbArray } from 'jb-ui-lib';

  const myArray = [{ id: '1' }, { id: '2' }, { id: '3' }];
  const item = JbArray.getById.call(myArray, '3');`;

  public arrayT = `Array<T>`;
  public partialT = `Partial<T>`;
  public example3 = `import { JbPrototypes } from 'jb-ui-lib';

JbPrototypes.run(); // This will override all prototypes`;

  public example4 = `// This will define prototypes for only 3 functions
JbPrototypes.run(['Array.getById', 'Array.getByProp', 'Object.isEqualTo']);`;



  // ---- This is the logic to manage autogenerated code example ----
  public brStr = `\n`;
  public bsStr = `\n             `;
  public customCompCode = `<jb-dropdown [(ngModel)]="selObj" [jbList]="myList"></jb-dropdown>`;
  public compConf: any = {
    isRequired: false,
    isDisabled: false,
    rows: null,
    hasLabel: false,   labelText: 'My Description',
    hasTooltip: false, tooltipText: 'Hello World', tooltipPos: null, tooltipBody: false,
  };
  public upComp = () => {
    this.customCompCode = `<jb-textarea `;

    let compClasses = '';
    if (this.compConf.hasFullWidth) { compClasses += (!!compClasses.length ? ' ' : '') + 'full-width'; }
    if (this.compConf.hasSquash)    { compClasses += (!!compClasses.length ? ' ' : '') + 'squash'; }
    if (!!compClasses) {
      this.customCompCode += `class="${compClasses}"` + this.bsStr;
    }
    this.customCompCode += `[(ngModel)]="myVal"` + this.bsStr;
    this.customCompCode += `(ngModelChange)="doSomething($event)"`;

    if (this.compConf.hasLabel)   { this.customCompCode += this.bsStr + `jbLabel="${this.compConf.labelText}"`; }
    if (this.compConf.isRequired) { this.customCompCode += this.bsStr + `[jbRequired]="true"`; }
    if (this.compConf.isDisabled) { this.customCompCode += this.bsStr + `[jbDisabled]="true"`; }

    if (this.compConf.hasTooltip) {
      this.customCompCode += this.bsStr + `jbTooltip="${this.compConf.tooltipText}"`;
      if (!!this.compConf.tooltipPos)  { this.customCompCode += this.bsStr + `jbTooltipPos="${this.compConf.tooltipPos}"`; }
      if (!!this.compConf.tooltipBody) { this.customCompCode += this.bsStr + `jbTooltipBody="${this.compConf.tooltipBody}"`; }
    }

    this.customCompCode += (`>` + this.brStr + `</jb-textarea>`);
  }





  constructor() { }

  ngOnInit() { }

}


export const jbPrototypesDoc = {
  name    : `JbPrototypes`,
  uiType  : 'function',
  desc    : `Collection of helper functions to perform basic variable types operations`,
  api     : `[jbText]: Button text`,
  instance: `<jb-prototypes></jb-prototypes>`,
  demoComp: JbPrototypesDemoComponent
};
