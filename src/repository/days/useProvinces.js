import { useAsync } from 'react-async';
import { provinces } from './queries';
import { useDaysChanged } from './DaysChangedContext';

const useProvinces = country => {
  const { daysChanged } = useDaysChanged();

  const { data, error, isPending } = useAsync({
    promiseFn: provinces,
    watch: daysChanged,
    country,
  });

  return { data, error, isPending };
};

export default useProvinces;
