import { useAsync } from 'react-async';
import { useDaysChanged } from './DaysChangedContext';
import { getFavoriteKey } from '../../libs/favorites';
import gueryFullDailyReports from './queryFullDailyReports';

const useDailyReports = (location, province, country) => {
  const { daysChanged } = useDaysChanged();

  const key = getFavoriteKey(country, province, location);
  const { data, error, isPending } = useAsync({
    promiseFn: gueryFullDailyReports,
    watch: `${key}-${daysChanged}`,
    location,
    province,
    country,
  });

  return { data, error, isPending };
};

export default useDailyReports;
