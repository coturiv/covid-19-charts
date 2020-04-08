import { batchValues, select, execute } from '../sqlite';
import {
  DAYS_TABLE,
  DAYS_DAY,
  DAYS_LOCATION,
  DAYS_COUNTRY_REGION,
  DAYS_PROVINCE_STATE,
  DAYS_CONFIRMED,
  DAYS_RECOVERED,
  DAYS_DEATHS,
  DAYS_ACTIVE,
} from '../constants';

// SQL statements:

const MAX_DAY = `SELECT MAX(${DAYS_DAY}) as day FROM ${DAYS_TABLE}`;

const DELETE_ALL_DAYS = `DELETE FROM ${DAYS_TABLE}`;

const DELETE_ZERO_CONFIRMED = `DELETE FROM ${DAYS_TABLE} WHERE ${DAYS_CONFIRMED} = 0`;

const INSERT_DAY = `INSERT OR IGNORE INTO ${DAYS_TABLE} (
  ${DAYS_DAY}, ${DAYS_COUNTRY_REGION}, ${DAYS_PROVINCE_STATE}, ${DAYS_LOCATION}, ${DAYS_CONFIRMED}, ${DAYS_RECOVERED}, ${DAYS_DEATHS}
  ) VALUES (?, ?, ?, ?, ?, ?, ?)`;

const SELECT_LOCATIONS = `SELECT DISTINCT ${DAYS_LOCATION} FROM ${DAYS_TABLE} 
  WHERE ${DAYS_COUNTRY_REGION} = ? AND ${DAYS_PROVINCE_STATE} = ? AND ${DAYS_LOCATION} != ""
  ORDER BY ${DAYS_LOCATION} ASC`;

const SELECT_PROVINCES = `SELECT DISTINCT ${DAYS_PROVINCE_STATE} FROM ${DAYS_TABLE} 
  WHERE ${DAYS_COUNTRY_REGION} = ? AND ${DAYS_PROVINCE_STATE} != ""
  ORDER BY ${DAYS_PROVINCE_STATE} ASC`;

const SELECT_COUNTRIES = `SELECT DISTINCT ${DAYS_COUNTRY_REGION} FROM ${DAYS_TABLE} 
  WHERE ${DAYS_COUNTRY_REGION} != ""
  ORDER BY ${DAYS_COUNTRY_REGION} ASC`;

const TOTAL_SUM = `SELECT ${DAYS_DAY}, SUM(${DAYS_CONFIRMED}) AS ${DAYS_CONFIRMED}, SUM(${DAYS_RECOVERED}) AS ${DAYS_RECOVERED}, SUM(${DAYS_DEATHS}) AS ${DAYS_DEATHS} 
  FROM ${DAYS_TABLE} 
  WHERE ${DAYS_DAY} = (SELECT MAX(${DAYS_DAY}) FROM ${DAYS_TABLE})
  `;

const AREA_SUM = `SELECT ${DAYS_DAY}, SUM(${DAYS_CONFIRMED}) AS ${DAYS_CONFIRMED}, SUM(${DAYS_RECOVERED}) AS ${DAYS_RECOVERED}, SUM(${DAYS_DEATHS}) AS ${DAYS_DEATHS} 
  FROM ${DAYS_TABLE} 
  WHERE ${DAYS_DAY} = (SELECT MAX(${DAYS_DAY}) FROM ${DAYS_TABLE} WHERE ${DAYS_COUNTRY_REGION} LIKE ? AND ${DAYS_PROVINCE_STATE} LIKE ? AND ${DAYS_LOCATION} LIKE ?)
    AND ${DAYS_COUNTRY_REGION} LIKE ? AND ${DAYS_PROVINCE_STATE} LIKE ? AND ${DAYS_LOCATION} LIKE ?
  `;

// WITH sums AS () SELECT * FROM sums nefunguje na Androidu
const DAILY_REPORTS = `SELECT ${DAYS_DAY}, SUM(${DAYS_CONFIRMED}) AS ${DAYS_CONFIRMED}, SUM(${DAYS_RECOVERED}) AS ${DAYS_RECOVERED}, SUM(${DAYS_DEATHS}) AS ${DAYS_DEATHS}, 
    SUM(${DAYS_CONFIRMED} - ${DAYS_RECOVERED} - ${DAYS_DEATHS}) AS ${DAYS_ACTIVE}
  FROM ${DAYS_TABLE} 
  WHERE ${DAYS_COUNTRY_REGION} LIKE ? AND ${DAYS_PROVINCE_STATE} LIKE ? AND ${DAYS_LOCATION} LIKE ?
  GROUP BY ${DAYS_DAY}
  ORDER BY ${DAYS_DAY} ASC
  `;

export const insertDays = (day, values) => {
  return batchValues(INSERT_DAY, values);
};

export const maxDay = () => select(MAX_DAY);

export const deleteDays = () => execute(DELETE_ALL_DAYS);

export const deleteZeroConfirmed = () => execute(DELETE_ZERO_CONFIRMED);

export const countries = () => select(SELECT_COUNTRIES);

export const provinces = ({ country }) => select(SELECT_PROVINCES, [country]);

export const locations = ({ country, province }) => select(SELECT_LOCATIONS, [country, province]);

export const totalSum = () => select(TOTAL_SUM);

export const areaSum = ({ country, province, location }) =>
  select(AREA_SUM, [
    country || '%',
    province || '%',
    location || '%',
    country || '%',
    province || '%',
    location || '%',
  ]);

export const dailyReports = ({ country, province, location }) =>
  select(DAILY_REPORTS, [country || '%', province || '%', location || '%']);
