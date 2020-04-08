import { useAsync } from 'react-async';
import { maxDay } from './queries';
import { useDaysChanged } from './DaysChangedContext';

const useMaxDay = () => {
  const { daysChanged } = useDaysChanged();

  const { data, error, isPending } = useAsync({
    promiseFn: maxDay,
    watch: daysChanged,
  });

  let day = null;
  if (data && Array.isArray(data) && data.length) {
    [{ day }] = data;
  }
  return { maxDay: day, error, isPending };
};

export default useMaxDay;
