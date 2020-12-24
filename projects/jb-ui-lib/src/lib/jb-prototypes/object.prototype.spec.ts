import JbObject from './object.prototype';
import {dCopy} from './deep-copy';

describe('JbObject', () => {
  const dateValue = new Date();
  const myObj = {
    p1: 'hey',
    p2: null,
    p3: undefined,
    p4: 0,
    p5: false,
    p6: dateValue,
    p7: [1, 2, 3],
    p8: { name: 'god', age: 0 },
    $p10: 'this',
    $q20: 'this',
  };

  describe('keyFilter', () => {
    it('should filter properties by value', () => {
      expect(JbObject.keyFilter.call(myObj, val => val === null)).toEqual({ p2: null });
      expect(JbObject.keyFilter.call(myObj, val => typeof val === 'string')).toEqual({ p1: 'hey', $p10: 'this', $q20: 'this' });
    });
    it('should filter properties by name', () => {
      expect(JbObject.keyFilter.call(myObj, 'p2, p3, p4')).toEqual({ p2: null, p3: undefined, p4: 0 });
    });
  });

  xdescribe('keyMap', () => {
    it('should change falsy values', () => {
      expect(JbObject.keyMap.call(myObj, val => (val || null))).toEqual({
        p1: 'hey',
        p2: null,
        p3: null,
        p4: null,
        p5: null,
        p6: myObj.p6,
        p7: [1, 2, 3],
        p8: { name: 'god', age: 0 },
        $p10: 'this',
        $q20: 'this',
      });
    });
  });

  describe('peel', () => {
    it('should remove null and undefined s', () => {
      expect(JbObject.peel.call(myObj)).toEqual({
        p1: 'hey',
        p4: 0,
        p5: false,
        p6: myObj.p6,
        p7: [1, 2, 3],
        p8: { name: 'god', age: 0 },
        $p10: 'this',
        $q20: 'this',
      });
    });
  });

  describe('isEqualTo', () => {
    it('should compare primitives', () => {
      const obj1 = { p1: 'hey', p2: null, p4: 0, p5: false, };
      const obj2 = { p1: 'hey', p2: null, p4: 0, p5: false, };
      const obj3 = { p1: 'hey', p2: null, p4: 1, p5: false, };
      expect(JbObject.isEqualTo.call(obj1, obj2)).toBe(true);
      expect(JbObject.isEqualTo.call(obj1, obj3)).toBe(false);
    });
    it('should compare all types of properties', () => {
      const myObj2 = dCopy(myObj);
      myObj2.p3 = undefined;
      myObj2.p6 = myObj.p6;
      expect(JbObject.isEqualTo.call(myObj, myObj2)).toBe(true);
    });
    it('should compare nested objects, checking cycling references', () => {
      const obj1: any = { p1: 'hey', p2: null }; obj1.p3 = { p4: 10, p5: obj1 }; // <-- obj1.p3.p5 === obj1
      const obj2: any = { p1: 'hey', p2: null }; obj2.p3 = { p4: 10, p5: obj1 }; // <-- obj2.p3.p5 === obj1
      obj2.p3.p5 = {};
      expect(JbObject.isEqualTo.call(obj1, obj2)).toBe(false);
    });
    it('should compare nested arrays, checking cycling references', () => {
      const arr1: any = [10, 30]; arr1.push([1, 2, arr1]);  // arr1 = [10, 30, [1, 2, [10, 30, [1, 2, ...]]]
      const arr2 = [10, 30, [1, 2, [10, 30]]];              // arr2 = [10, 30, [1, 2, [10, 30]]]
      expect(JbObject.isEqualTo.call(arr1, arr2)).toBe(false);
    });
  });

  describe('updateFrom', () => {
    it('should update existing keys', () => {
      const obj1 = { p1: 'hey', p2: null, p3: undefined };
      const obj2 = { p1: 'updated', p2: 'new value' };
      JbObject.updateFrom.call(obj1, obj2);
      expect(obj1).toEqual({ p1: 'updated', p2: 'new value', p3: undefined });
    });
    it('should not update a non existing key', () => {
      const obj1 = { p1: 'hey', p2: null, p3: undefined };
      const obj2 = { p100: 'updated' };
      JbObject.updateFrom.call(obj1, obj2);
      expect(obj1.hasOwnProperty('p100')).toBeFalsy();
    });
  });

  describe('hasProp', () => {
    it('should detect an existing property', () => {
      const obj1 = { p1: 1, p2: 2, p3: 3 };
      expect(JbObject.hasProp.call(obj1, ['p1'])).toEqual(true);
      expect(JbObject.hasProp.call(obj1, ['p2'])).toEqual(true);
      expect(JbObject.hasProp.call(obj1, ['p3'])).toEqual(true);
      expect(JbObject.hasProp.call(obj1, ['p1', 'p2', 'p3'])).toEqual(true);
      expect(JbObject.hasProp.call(obj1, ['p1', 'p4'])).toEqual(true);
      expect(JbObject.hasProp.call(obj1, 'p3')).toEqual(true);
    });
    it('should detect a non existing property', () => {
      const obj1 = { p1: 1, p2: 2, p3: 3 };
      expect(JbObject.hasProp.call(obj1, ['p4'])).toEqual(false);
      expect(JbObject.hasProp.call(obj1, ['p4', 'p5', 'p6'])).toEqual(false);
      expect(JbObject.hasProp.call(obj1, 'p4')).toEqual(false);
    });
  });


});
