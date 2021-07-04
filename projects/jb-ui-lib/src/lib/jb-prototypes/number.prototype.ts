declare global {
  interface Number {
    isIn(list: Array<number>): number;
  }
}

const JbNumber: any = {}; // Wrap all functions here

/**
 * @memberOf Number
 * @param list - List of numbers
 * @description Returns true if there is any instance of the current number into the list
 */
JbNumber.isIn = function(list: Array<number>): boolean {
  return (list.indexOf(this.valueOf()) >= 0);
};

/**
 * @memberOf Number
 * @param leftPad - Size of the output string counting the length of the original string + padding left
 * @param placeholder - Value to fulfill the padding (0 by default)
 * @param rightPad - Size of the output string counting the length of the original string + padding right
 * @description It coverts the number into a string and applies the pad
 *              Shortcut for .padStart() / .padEnd(). Ex: myValue.pad(4) -> 0003
 */
JbNumber.pad = function(leftPad: number, placeholder = '0', rightPad?: number): string {
  const value = this + '';
  const originalLength = value.length;
  let strValue = value.padStart(leftPad, placeholder);
  if (!!rightPad) {
    strValue = strValue.padEnd(leftPad + rightPad - originalLength, placeholder);
  }
  return strValue;
};


export default JbNumber;
