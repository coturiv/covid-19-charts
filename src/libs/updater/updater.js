/* eslint-disable camelcase */
import {
  parseDayString,
  differenceInCalendarDays,
  isBefore,
  toDayString,
  addDays,
  dayStringToNumber,
} from '../date';
import { fileExists, readCsvString, downloadFile } from '../reportFiles';
import { parseCsvString } from '../csv';
import { insertDays, deleteZeroConfirmed } from '../../repository/days/queries';
import { normalizeData } from './normalizeData';

const FIRST_DATE = '01-22-2020';

export const update = async (toDate, progressCb) => {
  let currDate = parseDayString(FIRST_DATE);
  const numDays = differenceInCalendarDays(toDate, currDate) + 1;
  if (numDays <= 0 || isBefore(toDate, currDate)) {
    return;
  }

  let loadedDays = 1;
  let dayString;
  const loadPromises = [];
  progressCb(numDays, loadedDays);
  for (let i = loadedDays; i <= numDays; i++) {
    dayString = toDayString(currDate);
    loadPromises.push(loadDay(dayString, addLoaded));
    currDate = addDays(currDate, 1);
  }

  await Promise.all(loadPromises);

  // delete days with 0 confirmed cases
  await deleteZeroConfirmed();

  function addLoaded() {
    loadedDays += 1;
    progressCb(numDays, loadedDays);
  }
};

async function loadDay(day, loadedCb) {
  let exists = await fileExists(day);
  if (day && !exists) {
    await downloadFile(day);
    exists = await fileExists(day);
    if (exists) {
      await storeDayData(day);
    }
    // probably no more days exist
  }
  loadedCb();
}

async function storeDayData(day) {
  let data = await readDayData(day);
  if (!Array.isArray(data)) {
    return;
  }
  const dayKey = dayStringToNumber(day);
  data = normalizeData(dayKey, data);
  await insertDays(dayKey, data);
}

async function readDayData(day) {
  const csv = await readCsvString(day);
  const { data } = parseCsvString(csv);
  return data;
}
