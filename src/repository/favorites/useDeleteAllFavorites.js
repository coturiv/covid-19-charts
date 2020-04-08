import { useAsync } from 'react-async';
import { deleteAllFavorites } from './queries';
import { useFavsChanged } from './FavsChangedContext';

const useDeleteAllFavorites = () => {
  const { setFavsChanged } = useFavsChanged();

  const { data, error, isPending, run } = useAsync({
    deferFn: runDelete,
    onResolve: () => setFavsChanged(Date.now()),
  });

  function runDelete() {
    return deleteAllFavorites();
  }

  return { data, error, isPending, run };
};

export default useDeleteAllFavorites;
