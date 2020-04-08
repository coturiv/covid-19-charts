import { useAsync } from 'react-async';
import { countries } from './queries';
import { useDaysChanged } from './DaysChangedContext';

const useCountries = () => {
  const { daysChanged } = useDaysChanged();

  const { data, error, isPending } = useAsync({
    promiseFn: countries,
    watch: daysChanged,
  });

  return { data, error, isPending };
};

export default useCountries;
