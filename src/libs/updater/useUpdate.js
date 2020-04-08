import { useState } from 'react';
import { useAsync } from 'react-async';
import { update } from './updater';
import { useDaysChanged } from '../../repository/days/DaysChangedContext';

const useUpdate = () => {
  const [total, setTotal] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { setDaysChanged } = useDaysChanged();

  const { error, isPending, run } = useAsync({
    deferFn: runUpdate,
    onResolve: resolveHandler,
  });

  function progress(count, current) {
    setTotal(count);
    setCurrentIndex(current);
  }

  function runUpdate([toDate]) {
    setTotal(0);
    setCurrentIndex(0);
    return update(toDate, progress);
  }

  function resolveHandler() {
    setDaysChanged(Date.now());
    setTotal(0);
    setCurrentIndex(0);
  }

  return { isPending, total, currentIndex, run, error };
};

export default useUpdate;
