import JbArray from './array.prototypes';
import JbObject from './object.prototype';
import JbNumber from './number.prototype';
import JbString from './string.prototype';
import JbDate from './date.prototype';
import { dCopy } from './deep-copy';
import { isEqualTo } from './deep-equal';


const JbPrototypes = {
  run: (list?: Array<string>) => {
    // console.log('Extending jb-ui-lib prototypes');

    // Extend Array prototype
    for (const proFnName in JbArray) {
      if (JbArray.hasOwnProperty(proFnName) && isFnInList(proFnName, 'Array')) {
        // console.log(`Extending Array prototype with --> .${proFnName}()`);
        Array.prototype[proFnName] = JbArray[proFnName];
      }
    }

    // Extend Object prototype
    for (const proFnName in JbObject) {
      if (JbObject.hasOwnProperty(proFnName) && isFnInList(proFnName, 'Object')) {
        // console.log(`Extending Object prototype with --> .${proFnName}()`);
        Object.defineProperty(Object.prototype, proFnName, {
          value: JbObject[proFnName],
          enumerable: false
        });
      }
    }

    // Extend Number prototype
    for (const proFnName in JbNumber) {
      if (JbNumber.hasOwnProperty(proFnName) && isFnInList(proFnName, 'Number')) {
        // console.log(`Extending Number prototype with --> .${proFnName}()`);
        Number.prototype[proFnName] = JbNumber[proFnName];
      }
    }

    // Extend String prototype
    for (const proFnName in JbString) {
      if (JbString.hasOwnProperty(proFnName) && isFnInList(proFnName, 'String')) {
        // console.log(`Extending String prototype with --> .${proFnName}()`);
        String.prototype[proFnName] = JbString[proFnName];
      }
    }

    // Extend Date prototype
    for (const proFnName in JbDate) {
      if (JbDate.hasOwnProperty(proFnName) && isFnInList(proFnName, 'Date')) {
        // console.log(`Extending Date prototype with --> .${proFnName}()`);
        Date.prototype[proFnName] = JbDate[proFnName];
      }
    }


    // Check if the prototype function name is in the list for the variable type
    function isFnInList(proFnName: string, varType: string) {
      return !list || !!list.filter(e => {
        const key = e.split('.');
        return (key.length >= 1 && key[0] === varType && key[1] === proFnName);
      }).length;
    }
  }
};
export { JbPrototypes, JbArray, JbObject, JbNumber, JbString, JbDate, dCopy, isEqualTo };
