import { useAsync } from 'react-async';
import { areaSum } from './queries';
import { useDaysChanged } from './DaysChangedContext';

const asyncSum = ({ location, province, country }) => areaSum({ location, province, country });

const useFavoriteSum = (location, province, country) => {
  const { daysChanged } = useDaysChanged();

  const { data, error, isPending } = useAsync({
    promiseFn: asyncSum,
    watch: `${location}-${province}-${country}-${daysChanged}`,
    location,
    province,
    country,
  });

  let result = null;
  if (data && Array.isArray(data) && data.length) {
    [result] = data;
  }
  return { data: result, error, isPending };
};

export default useFavoriteSum;
