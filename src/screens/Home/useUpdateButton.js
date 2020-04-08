import React, { useLayoutEffect } from 'react';
import useUpdate from '../../libs/updater/useUpdate';
import HeaderRightButton from '../../navigation/HeaderRightButton';

const useUpdateButton = navigation => {
  const { total, currentIndex, isPending, error, run } = useUpdate();

  // create right header button
  useLayoutEffect(() => {
    function handleUpdate() {
      const toDate = new Date();
      run(toDate);
    }
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton name="reload" loading={isPending} onPress={() => handleUpdate()} />
      ),
    });
  }, [navigation, isPending, run]);

  return { total, currentIndex, isPending, error, run };
};

export default useUpdateButton;
