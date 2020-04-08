import { useAsync } from 'react-async';
import { deleteFavorite } from './queries';
import { useFavsChanged } from './FavsChangedContext';

const useDeleteFavorite = () => {
  const { setFavsChanged } = useFavsChanged();

  const { data, error, isPending, run } = useAsync({
    deferFn: runDelete,
    onResolve: () => setFavsChanged(Date.now()),
  });

  function runDelete([params]) {
    return deleteFavorite(params);
  }

  return { data, error, isPending, run };
};

export default useDeleteFavorite;
