import { useAsync } from 'react-async';
import { locations } from './queries';
import { useDaysChanged } from './DaysChangedContext';

const useLocations = (country, province) => {
  const { daysChanged } = useDaysChanged();

  const { data, error, isPending } = useAsync({
    promiseFn: locations,
    watch: daysChanged,
    country,
    province,
  });

  return { data, error, isPending };
};

export default useLocations;
