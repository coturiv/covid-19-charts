import * as SQLite from 'expo-sqlite';
import {
  DAYS_TABLE,
  DAYS_DAY,
  DAYS_LOCATION,
  DAYS_COUNTRY_REGION,
  DAYS_PROVINCE_STATE,
  DAYS_CONFIRMED,
  DAYS_RECOVERED,
  DAYS_DEATHS,
  FAVORITES_TABLE,
  FAVS_LOCATION,
  FAVS_COUNTRY_REGION,
  FAVS_PROVINCE_STATE,
} from './constants';

const DB_NAME = 'covdb';

const DB_STRUCTURE = [
  `CREATE TABLE IF NOT EXISTS ${DAYS_TABLE}(
    ${DAYS_DAY} INTEGER NOT NULL,
    ${DAYS_COUNTRY_REGION} TEXT NOT NULL,
    ${DAYS_PROVINCE_STATE} TEXT NOT NULL,
    ${DAYS_LOCATION} TEXT NOT NULL,
    ${DAYS_CONFIRMED} INTEGER NOT NULL,
    ${DAYS_RECOVERED} INTEGER NOT NULL,
    ${DAYS_DEATHS} INTEGER NOT NULL,
    PRIMARY KEY(${DAYS_DAY}, ${DAYS_COUNTRY_REGION}, ${DAYS_PROVINCE_STATE}, ${DAYS_LOCATION})
    )`,
  `CREATE TABLE IF NOT EXISTS ${FAVORITES_TABLE}(
    ${FAVS_COUNTRY_REGION} TEXT NOT NULL,
    ${FAVS_PROVINCE_STATE} TEXT NOT NULL,
    ${FAVS_LOCATION} TEXT NOT NULL,
    PRIMARY KEY(${FAVS_COUNTRY_REGION}, ${FAVS_PROVINCE_STATE}, ${FAVS_LOCATION})
    )`,
];

const db = SQLite.openDatabase(DB_NAME);

/**
 * @returns {Promise}
 */
export function initDatabase() {
  return batchSql(DB_STRUCTURE);
}

export const database = () => db;

/**
 * @param {String} sql
 * @param {Array} params
 * @returns {Promise} - array of rows
 */
export async function select(sql, params) {
  const {
    rows: { _array },
  } = await execute(sql, params);
  return Promise.resolve(_array);
}

/**
 * @param {String} sql
 * @param {Array} values
 * @returns {Promise} - insetId
 */
export async function insert(sql, values) {
  const { insertId } = await execute(sql, values);
  return Promise.resolve(insertId);
}

/**
 * @param {String} sql
 * @param {Array} params
 * @returns {Promise} - result object
 */
export function execute(sql, params) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        sql,
        params || [],
        (_, r) => {
          resolve(r);
        },
        errorCb(reject),
      );
    });
  });
}

/**
 * @param {Array} sqls - many SQL statements
 * @returns {Promise} - the last result object
 */
export function batchSql(sqls) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      const l = sqls.length - 1;
      for (let i = 0; i <= l; i++) {
        tx.executeSql(sqls[i], [], i === l ? (_, r) => resolve(r) : undefined, errorCb(reject));
      }
    });
  });
}

/**
 * @param {String} sql - common SQL statement
 * @param {Array} values - many arrays of values
 * @returns {Promise} - the last result object
 */
export function batchValues(sql, values) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      const l = values.length - 1;
      for (let i = 0; i <= l; i++) {
        tx.executeSql(sql, values[i], i === l ? (_, r) => resolve(r) : undefined, errorCb(reject));
      }
    });
  });
}

function errorCb(reject) {
  return (_, err) => {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('SQL error:', err);
    }
    reject(err);
  };
}
