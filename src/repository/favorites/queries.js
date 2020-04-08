import { select, execute, insert } from '../sqlite';
import {
  FAVORITES_TABLE,
  FAVS_LOCATION,
  FAVS_COUNTRY_REGION,
  FAVS_PROVINCE_STATE,
} from '../constants';

// SQL statements:

const DELETE_ALL_FAVORITES = `DELETE FROM ${FAVORITES_TABLE}`;

const DELETE_FAVORITE = `DELETE FROM ${FAVORITES_TABLE} WHERE
  ${FAVS_COUNTRY_REGION} = ? AND ${FAVS_PROVINCE_STATE} = ? AND ${FAVS_LOCATION} = ?`;

const INSERT_FAVORITE = `INSERT OR IGNORE INTO ${FAVORITES_TABLE} (
  ${FAVS_COUNTRY_REGION}, ${FAVS_PROVINCE_STATE}, ${FAVS_LOCATION}
  ) VALUES (?, ?, ?)`;

const SELECT = `SELECT * FROM ${FAVORITES_TABLE} 
  ORDER BY ${FAVS_COUNTRY_REGION} ASC, ${FAVS_PROVINCE_STATE} ASC, ${FAVS_LOCATION} ASC`;

export const insertFavorite = ({ country, province, location }) =>
  insert(INSERT_FAVORITE, [country, province, location]);

export const deleteAllFavorites = () => execute(DELETE_ALL_FAVORITES);

export const deleteFavorite = ({ country, province, location }) =>
  execute(DELETE_FAVORITE, [country, province, location]);

export const favorites = () => select(SELECT);
