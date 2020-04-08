import { useAsync } from 'react-async';
import { favorites } from './queries';
import { useFavsChanged } from './FavsChangedContext';

const useFavorites = () => {
  const { favsChanged } = useFavsChanged();

  const { data, error, isPending } = useAsync({
    promiseFn: favorites,
    watch: favsChanged,
  });

  return { data, error, isPending };
};

export default useFavorites;
