import { useAsync } from 'react-async';
import { totalSum } from './queries';
import { useDaysChanged } from './DaysChangedContext';

const useTotalSum = () => {
  const { daysChanged } = useDaysChanged();

  const { data, error, isPending } = useAsync({
    promiseFn: totalSum,
    watch: daysChanged,
  });

  let result = null;
  if (data && Array.isArray(data) && data.length) {
    [result] = data;
  }
  return { data: result, error, isPending };
};

export default useTotalSum;
