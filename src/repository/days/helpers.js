import {
  DATA_CONFIRMED,
  DATA_ACTIVE,
  DATA_RECOVERED,
  DATA_DEATHS,
  CHART_DAILY,
  CHART_PERCENTAGE,
} from '../../constants/Chart';

/**
 * @param {String} chartType
 * @param {String} dataType
 * @returns {[columnName, dataType]}
 */
export function getColumnByType(chartType, dataType) {
  let type;
  switch (dataType) {
    case DATA_CONFIRMED:
    case DATA_ACTIVE:
    case DATA_RECOVERED:
    case DATA_DEATHS:
      type = dataType;
      break;
    default:
      type = DATA_CONFIRMED;
  }

  let column;
  switch (chartType) {
    case CHART_DAILY:
      column = `${type}Daily`;
      break;
    case CHART_PERCENTAGE:
      column = `${type}Perc`;
      break;
    default:
      column = type;
  }

  return [column, type];
}
