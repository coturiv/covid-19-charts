import { format as _format, isBefore, differenceInCalendarDays, addDays, addHours } from 'date-fns';

// this is a name of report files
const DAY_PATTERN = 'MM-dd-yyyy';
// database key
const DAY_NUMBER_PATTERN = 'yyyyMMdd';

/**
 * @param {string} dayString "MM-dd-yyyy"
 * @returns {?Date}
 */
export const parseDayString = dayString => {
  const found = dayString.match(/(\d+)/g);
  const date = new Date(found[2], found[0] - 1, found[1], 0, 0, 0);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date;
};

/**
 * @param {number} dayNumber "yyyyMMdd"
 * @returns {?Date}
 */
export const parseDayNumber = dayNumber => {
  const str = `${dayNumber}`;
  if (!dayNumber || str.length < 8) {
    return null;
  }
  const date = new Date(str.slice(0, 4), str.slice(4, 6) - 1, str.slice(6, 8), 0, 0, 0);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date;
};

/**
 * @param {?Date} date
 * @returns {string}
 */
export const toDayString = date => (date ? _format(date, DAY_PATTERN) : '');

/**
 * @param {?Date} date
 * @returns {number}
 */
export const toDayNumber = date => (date ? parseInt(_format(date, DAY_NUMBER_PATTERN), 10) : 0);

/**
 * @param {number} dayNumber "yyyyMMdd"
 * @returns {string} "MM-dd-yyyy"
 */
export const dayNumberToString = dayNumber =>
  String(dayNumber).replace(/(\d{4})(\d{2})(\d{2})/, '$2-$3-$1');

/**
 * @param {string} dayString "MM-dd-yyyy"
 * @returns {number} "yyyyMMdd"
 */
export const dayStringToNumber = dayString =>
  parseInt(dayString.replace(/(\d{2})-(\d{2})-(\d{4})/, '$3$1$2'), 10);

/**
 * @param {?Date} date
 * @returns {string}
 */
export const toShortDateString = date => (date ? _format(date, 'MMM d') : '');

/**
 * @param {?Date} date
 * @returns {string}
 */
export const toLongDateString = date => (date ? _format(date, 'MMM d, yyyy') : '');

export { addDays, differenceInCalendarDays, isBefore, addHours };
