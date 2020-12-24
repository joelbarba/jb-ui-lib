import {JbListSelection} from './jb-list-selection';
import {JbListHandler} from '../jb-list-handler/jb-list-handler';
import {Observable, Subject} from 'rxjs';


describe('JbListSelection', () => {
  let mySel: JbListSelection;
  let myList: JbListHandler;
  const myData = [
    { id: '1', name: 'First of his name' },
    { id: '2', name: 'Second minute' },
    { id: '3', name: 'Third position' },
    { id: '4', name: 'Fourth musketeer' },
    { id: '5', name: 'Fifth element' },
  ];

  beforeEach(() => {
    myList = new JbListHandler({ listName: 'test-list' });
    mySel = new JbListSelection(myList);
    myList.load(myData);
  });
  afterEach(() => {
    mySel.destroy();
    myList.destroy();
  });

  it('should create a selection from a JbListHandler', () => {
    expect(new JbListSelection(myList)).toBeTruthy();
  });

  it('should create a selection from an observable', () => {
    const myObs: Observable<Array<{}>> = new Subject();
    expect(new JbListSelection(myObs)).toBeTruthy();
  });

  it('should create a selection from an array', () => {
    expect(new JbListSelection(myData)).toBeTruthy();
  });

  // it('should not accept invalid type', () => {
  //   expect(new JbListSelection(null)).toThrowError('Wrong param type: null');
  // });


  it('should select / unselect values by id', () => {
    expect(mySel.ids).toEqual({});
    mySel.toggleCheck('2');
    expect(mySel.ids).toEqual({ 2: true });
    mySel.toggleCheck('2');
    expect(mySel.ids).toEqual({});
    mySel.destroy();
  });

  it('should reset selection on filter', () => {
    mySel.toggleCheck('1');
    mySel.toggleCheck('2');
    expect(mySel.getSelection()).toEqual(['1', '2']);
    myList.filter('something');
    expect(mySel.ids).toEqual({});
    mySel.destroy();
  });

  it('should not reset selection after destroy', () => {
    mySel.toggleCheck('1');
    mySel.destroy();
    myList.filter('something');
    expect(mySel.ids).toEqual({ 1: true });
    mySel.destroy();
  });

  it('should toggle the whole page', () => {
    mySel.toggleCheck('1');
    mySel.togglePage();
    expect(mySel.getSelection()).toEqual(['1', '2', '3', '4', '5']);
    mySel.togglePage();
    expect(mySel.ids).toEqual({});
    mySel.destroy();
  });

  it('should tell if an id is checked', () => {
    mySel.toggleCheck('2');
    mySel.toggleCheck('3');
    mySel.toggleCheck('5');
    expect(mySel.isChecked('3')).toEqual(true);
    mySel.destroy();
  });

});
