// Related functions dCopy on Array & Object
export { dCopy };
export { arrayDeepCopy };
export { objectDeepCopy };

/**
 * @description Generic deep copy function for any type
 */
function dCopy(item) {
  if (typeof item !== 'object') {
    return item;
  } else {
    if (Array.isArray(item)) {
      return arrayDeepCopy.call(item);
    } else {
      return objectDeepCopy.call(item);
    }
  }
}

/**
 * @description Deep copy (clone) - Makes an exact copy of the array (no references) and returns it
 */
function arrayDeepCopy() {
  return JSON.parse(JSON.stringify(this));
  // let newArray = [];
  // this.forEach(item => {
  //
  //   if (item !== null && Array.isArray(item)) {
  //     newArray.push(arrayDeepCopy.call(item));  // Deep array copy
  //
  //   } else if (item !== null && typeof item === 'object') {
  //     newArray.push(objectDeepCopy.call(item));  // Deep object copy
  //
  //   } else {
  //     newArray.push(item); // Primitive
  //   }
  // });
  // return newArray;
}


/**
 * @description It returns a deep copy of the object (no references at any level)
 *              Note: stringify omits keys with value 'undefined', and Dates are turned to strings
 */
function objectDeepCopy() {
  return JSON.parse(JSON.stringify(this));
  // const str = JSON.stringify(this, (key, value) => value === undefined ? '__undefined__' : value);
  // const str2 = str.replace(/"__undefined__"/g, 'undefined');
  // const getCircularReplacer = () => {
  //   const seen = new WeakSet();
  //   return (key, value) => {
  //     if(typeof value === 'object' && value !== null) {
  //       if(seen.has(value)) return;
  //       seen.add(value);
  //     }
  //     return value;
  //   };
  // };
  // return JSON.parse(JSON.stringify(object, getCircularReplacer()));

  // let newObj = {};
  // for (let keyName in this) { // Loop all object properties
  //   if (this.hasOwnProperty(keyName)) { // Exclude prototypes
  //     const value = this[keyName];
  //     if (value !== null && Array.isArray(value)) {
  //       newObj[keyName] = arrayDeepCopy.call(value);  // Deep array copy
  //
  //     } else if (value !== null && typeof value === 'object') {
  //       newObj[keyName] = objectDeepCopy.call(value);  // Deep object copy
  //
  //     } else {
  //       newObj[keyName] = value;
  //     }
  //   }
  // }
  // return newObj
}


// Alternative: https://lodash.com/docs/4.17.11#cloneDeep

// Better alternative:
// https://gist.github.com/gdibble/e429544ab8fa931055b2f02a1ec5739d
// function clone(thing, opts) {
//   var newObject = {};
//   if (thing instanceof Array) {
//     return thing.map(function (i) { return clone(i, opts); });
//   } else if (thing instanceof Date) {
//     return new Date(thing);
//   } else if (thing instanceof RegExp) {
//     return new RegExp(thing);
//   } else if (thing instanceof Function) {
//     return opts && opts.newFns ? new Function('return ' + thing.toString())() : thing;
//   } else if (thing instanceof Object) {
//     Object.keys(thing).forEach(function (key) { newObject[key] = clone(thing[key], opts); });
//     return newObject;
//   } else if ([ undefined, null ].indexOf(thing) > -1) {
//     return thing;
//   } else {
//     if (thing.constructor.name === 'Symbol') {
//       return Symbol(thing.toString().replace(/^Symbol\(/, '').slice(0, -1));
//     }
//     return thing.__proto__.constructor(thing);
//   }
// }
