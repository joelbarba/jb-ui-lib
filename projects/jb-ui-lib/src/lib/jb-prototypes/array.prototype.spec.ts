import JbArray from './array.prototypes';

describe('JbArray', () => {
  const dateValue = new Date();
  const obj1 = { p1: 10, p2: 20, p3: { q: 40 }};
  const myArr = [
    'hey',
    null,
    undefined,
    0,
    false,
    dateValue,
    [1, 2, 3],
    { name: 'god', age: 0 },
    obj1
  ];


  describe('removeDuplicates', () => {
    it('should remove primitive duplicates', () => {
      const arr1 = [1, 2, 3, 4, 5, 2, 1, 5, 6, 2, 2, 8];
      JbArray.removeDuplicates.call(arr1);
      expect(arr1).toEqual([1, 2, 3, 4, 5, 6, 8]);

      const arr2 = ['a', null, 'b', 'a', 'hey', 'c', 'b', 'd', 'aa', 'a', 'z'];
      JbArray.removeDuplicates.call(arr2);
      expect(arr2).toEqual(['a', null, 'b', 'hey', 'c', 'd', 'aa', 'z']);

      const dateVar = new Date();
      const dateVar2 = new Date();
      const dateVar3 = new Date(dateVar2);
      const arr3 = [1, 2.5, 3, 4, dateVar, 2.5, 1, dateVar2, dateVar3, true, 2, 'a', null, true, 'a', undefined, null, undefined, 1];
      JbArray.removeDuplicates.call(arr3);
      expect(arr3).toEqual([1, 2.5, 3, 4, dateVar, true, 2, 'a', null, undefined]);
    });

    it('should remove object duplicates', () => {
      const item = { id: 10, name: 'test10' };
      const arr = [item, { id: 1 }, { id: 2 }, { id: 3 }, { id: 1 }, item, item, { id: 4 }];
      JbArray.removeDuplicates.call(arr);
      expect(arr).toEqual([item, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, ]);
    });

    it('should compare using a custom function', () => {
      const arr = [
        { id: 1, age: 10 },
        { id: 2, age: 10 },
        { id: 3, age: 20 },
        { id: 4, age: 20 },
        { id: 1, age: 30 },
      ];
      const arr2 = JSON.parse(JSON.stringify(arr));

      JbArray.removeDuplicates.call(arr, (itemA, itemB) => itemA.id === itemB.id);
      expect(arr).toEqual([
        { id: 1, age: 10 },
        { id: 2, age: 10 },
        { id: 3, age: 20 },
        { id: 4, age: 20 },
      ]);

      JbArray.removeDuplicates.call(arr2, (itemA, itemB) => itemA.age === itemB.age);
      expect(arr2).toEqual([
        { id: 1, age: 10 },
        { id: 3, age: 20 },
        { id: 1, age: 30 },
      ]);

    });

  });


});
