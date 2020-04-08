import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  FAVS_LOCATION,
  FAVS_PROVINCE_STATE,
  FAVS_COUNTRY_REGION,
} from '../../repository/constants';
import useFavorites from '../../repository/favorites/useFavorites';
import { getFavoriteKey } from '../../libs/favorites';
import FavoriteButton from './FavoriteButton';
import Colors from '../../constants/Colors';
import { Button } from '../base/Buttons';

const FavoriteSelector = ({ selected, navigation, onToggle }) => {
  const { data: favs } = useFavorites();

  function handleLocations() {
    navigation.navigate('Homepage');
  }

  const sel = selected ? [].concat(selected) : [];
  let Content = null;
  if (favs && Array.isArray(favs) && favs.length) {
    const last = favs.length - 1;
    Content = favs.map((f, ind) => {
      const key = getFavoriteKey(f[FAVS_COUNTRY_REGION], f[FAVS_PROVINCE_STATE], f[FAVS_LOCATION]);
      const s = sel.find(el => el.key === key);
      return (
        <FavoriteButton
          key={key}
          favorite={f}
          selected={s}
          isLast={last === ind}
          onPress={onToggle}
        />
      );
    });
  } else {
    Content = (
      <View style={styles.noFavorites}>
        <Text style={styles.text}>No selected locations.</Text>
        <Button onPress={handleLocations}>Add locations here</Button>
      </View>
    );
  }

  return <View style={styles.addContainer}>{Content}</View>;
};

export default FavoriteSelector;

const styles = StyleSheet.create({
  addContainer: {
    overflow: 'hidden',
    borderRadius: 6,
    marginBottom: 16,
  },
  noFavorites: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  text: {
    textAlign: 'center',
    marginBottom: 16,
    color: Colors.grey,
  },
});
