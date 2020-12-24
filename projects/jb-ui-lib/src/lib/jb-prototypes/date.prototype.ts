declare global {
  interface Date {
    toUTC(): Date;
    truncMin(): Date;
    truncHour(): Date;
    truncDay(): Date;
    addSeconds(seconds: number): Date;
    addMinutes(minutes: number): Date;
    addHours(hours: number): Date;
    addDays(days: number): Date;
    addMonths(months: number): Date;
    addYears(years: number): Date;
    convertTZ(desTZ?: string): Date;
  }
}

const JbDate: any = {}; // Wrap all functions here



/**
 * @memberOf Date
 * @description Convert the time, whatever its timezone is, to UTC
 * @example dateVar.toUTC()
 */
JbDate.toUTC = function() {
  const utcTime = new Date(this);
  JbDate.addMinutes.call(utcTime, utcTime.getTimezoneOffset());   // getTimezoneOffset returns the difference in seconds
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
  return utcTime;
};

/**
 * @description Convert a JS time from your current timezone to another timezone. Timezone standard list: https://www.iana.org/time-zones
 *              The object returned is a JS date with the time at the specified timezone, still represented in the current timezone.
 * @example dateVar.convertTZ('America/New_York')
 */
JbDate.convertTZ = function(desTZ = 'Europe/Dublin', locale = 'default'): Date {
  if (!!this && this instanceof Date) {
    // 'en-US' hardcoded, new Date() can read the format. The only purpose is change the timezone and not the format.
    const timeStr = this.toLocaleString(locale, { timeZone: desTZ });
    const transfDate = new Date(timeStr);
    this.setTime(transfDate);
    return this;
  }
  return undefined;
};

/**
 * @memberOf Date
 * @description Truncate the current date to minutes
 * @example strDate.truncMin()
 */
JbDate.truncMin = function() {
  this.setMilliseconds(0);
  this.setSeconds(0);
  return this;
};

/**
 * @memberOf Date
 * @description Truncate the current date to day-month-year hour
 * @example strDate.truncHour()
 */
JbDate.truncHour = function() {
  this.setMilliseconds(0);
  this.setSeconds(0);
  this.setMinutes(0);
  return this;
};

/**
 * @memberOf Date
 * @description Truncate the current date to day-month-year
 * @example strDate.truncDay()
 */
JbDate.truncDay = function() {
  this.setMilliseconds(0);
  this.setSeconds(0);
  this.setMinutes(0);
  this.setHours(0);
  return this;
};


/**
 * @memberOf Date
 * @description Add seconds to the current date
 * @example myDate.addSeconds(20)
 */
JbDate.addSeconds = function(seconds: number) {
  this.setSeconds(this.getSeconds() + seconds);
  return this;
};

/**
 * @memberOf Date
 * @description Add minutes to the current date
 * @example myDate.addMinutes(20)
 */
JbDate.addMinutes = function(minutes: number) {
  this.setMinutes(this.getMinutes() + minutes);
  return this;
};

/**
 * @memberOf Date
 * @description Add hours to the current date
 * @example myDate.addHours(20)
 */
JbDate.addHours = function(hours: number) {
  this.setHours(this.getHours() + hours);
  return this;
};

/**
 * @memberOf Date
 * @description Add days to the current date
 * @example addDays.addDays(20)
 */
JbDate.addDays = function(days: number) {
  this.setDate(this.getDate() + days);
  return this;
};

/**
 * @memberOf Date
 * @description Add hours to the current date
 * @example myDate.addMonths(20)
 */
JbDate.addMonths = function(months: number) {
  this.setMonth(this.getMonth() + months);
  return this;
};

/**
 * @memberOf Date
 * @description Add years to the current date
 * @example myDate.addYears(20)
 */
JbDate.addYears = function(years: number) {
  this.setFullYear(this.getFullYear() + years);
  return this;
};


export default JbDate;
