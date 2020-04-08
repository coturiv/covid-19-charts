import { useState, useEffect } from 'react';
import { useFavsChanged } from './FavsChangedContext';
import { useDaysChanged } from '../days/DaysChangedContext';
import gueryFullDailyReports from '../days/queryFullDailyReports';
import { getLocationsFromKey } from '../../libs/favorites';

// chart colors
const COLORS = [
  '#FF0000',
  '#00CE00',
  '#08A7FC',
  '#D99E5E',
  '#B3E409',
  '#0031CC',
  '#DB31E5',
  '#00D2FF',
  '#FFC100',
  '#0A8C00',
];

/**
 * @param {Array} compared
 * @returns {String} the first unused color from COLORS
 */
function getColor(compared) {
  const c = COLORS.find(col => !compared.some(comp => col === comp.color));
  return c || '#000';
}

const useCompared = () => {
  const { favsChanged } = useFavsChanged();
  const { daysChanged } = useDaysChanged();
  // compared: [{ key, color, data, maxOrder }]
  const [compared, setCompared] = useState([]);

  useEffect(() => {
    setCompared([]);
  }, [favsChanged, daysChanged]);

  async function toggleCompared(key) {
    let c;
    if (compared.some(f => f.key === key)) {
      // remove
      c = compared.filter(f => f.key !== key);
    } else {
      // add
      const loc = getLocationsFromKey(key);
      const data = await gueryFullDailyReports(loc);
      const color = getColor(compared);
      const length = data && data.length;
      c = compared.concat({
        key,
        color,
        data,
        maxOrder: length ? data[length - 1].order : 0,
      });
    }
    setCompared(c);
  }

  return { compared, toggleCompared };
};

export default useCompared;
