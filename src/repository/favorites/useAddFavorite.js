import { useAsync } from 'react-async';
import { insertFavorite } from './queries';
import { useFavsChanged } from './FavsChangedContext';

const useAddFavorite = () => {
  const { setFavsChanged } = useFavsChanged();

  const { data, error, isPending, run } = useAsync({
    deferFn: runAdd,
    onResolve: () => setFavsChanged(Date.now()),
  });

  function runAdd([params]) {
    return insertFavorite(params);
  }

  return { data, error, isPending, run };
};

export default useAddFavorite;
