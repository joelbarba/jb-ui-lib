declare global {
  interface String {
    isIn(list: Array<string>): boolean;
    pad(leftPad: number, placeholder?: string, rightPad?: number): string;
  }
}

const JbString: any = {}; // Wrap all functions here

/**
 * @memberOf String
 * @param list - List of strings
 * @description Returns true if there is any instance of the current string into the list
 */
JbString.isIn = function(list: Array<string>): boolean {
  return (list.indexOf(this.valueOf()) >= 0);
};

/**
 * @memberOf String
 * @param leftPad - Size of the output string counting the length of the original string + padding left
 * @param placeholder - Value to fulfill the padding (0 by default)
 * @param rightPad - Size of the output string counting the length of the original string + padding right
 * @description It fulfills the string with 0s (or specified placeholder) on the left & right.
 *              Shortcut for .padStart() / .padEnd(). Ex: myValue.pad(4) -> 0003
 */
JbString.pad = function(leftPad: number, placeholder = '0', rightPad?: number): string {
  const originalLength = this.length;
  let strValue = this.padStart(leftPad, placeholder);
  if (!!rightPad) {
    strValue = strValue.padEnd(leftPad + rightPad - originalLength, placeholder);
  }
  return strValue;
};

export default JbString;
