import React, { useLayoutEffect } from 'react';
import { Alert } from 'react-native';
import HeaderRightButton from '../../navigation/HeaderRightButton';
import useDeleteFavorite from '../../repository/favorites/useDeleteFavorite';

const useDeleteButton = (navigation, location, province, country, onDelete) => {
  const { isPending, run: runDelete } = useDeleteFavorite();

  // create right header button
  useLayoutEffect(() => {
    const name = location || province || country;
    function handleDelete() {
      Alert.alert(
        `Delete "${name}" from selected locations?`,
        'Downloaded data will remain untouched.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            style: 'default',
            onPress: () => {
              runDelete({ location, province, country });
              if (typeof onDelete === 'function') {
                onDelete();
              }
            },
          },
        ],
        { cancelable: true },
      );
    }
    // add button
    if (location || province || country) {
      navigation.setOptions({
        headerRight: () => (
          <HeaderRightButton
            name="trash-can-outline"
            size={24}
            loading={isPending}
            onPress={() => handleDelete()}
          />
        ),
      });
    }
  }, [navigation, location, province, country, runDelete, isPending, onDelete]);
};

export default useDeleteButton;
