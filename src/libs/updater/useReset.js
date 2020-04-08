import { useAsync } from 'react-async';
import { deleteReports } from '../reportFiles';
import { deleteDays } from '../../repository/days/queries';
import { useDaysChanged } from '../../repository/days/DaysChangedContext';

const runReset = () => {
  return Promise.all([deleteReports(), deleteDays()]);
};

const useReset = () => {
  const { setDaysChanged } = useDaysChanged();

  const { error, isPending, run } = useAsync({
    deferFn: runReset,
    onResolve: resolveHandler,
  });

  function resolveHandler() {
    setDaysChanged(Date.now());
  }

  return { isPending, run, error };
};

export default useReset;
