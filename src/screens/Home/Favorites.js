import React from 'react';
import { StyleSheet, View } from 'react-native';
import TotalBanner from '../../components/HomeBanner/TotalBanner';
import FavoriteBanner from '../../components/HomeBanner/FavoriteBanner';
import {
  FAVS_LOCATION,
  FAVS_PROVINCE_STATE,
  FAVS_COUNTRY_REGION,
} from '../../repository/constants';
import useFavorites from '../../repository/favorites/useFavorites';
import { Button } from '../../components/base/Buttons';
import { getFavoriteKey } from '../../libs/favorites';

const Favorites = ({ navigation }) => {
  const { data: favs } = useFavorites();

  let FavBanners = null;
  if (favs && Array.isArray(favs) && favs.length) {
    FavBanners = favs.map(f => {
      const key = getFavoriteKey(f[FAVS_COUNTRY_REGION], f[FAVS_PROVINCE_STATE], f[FAVS_LOCATION]);
      return (
        <FavoriteBanner
          key={key}
          location={f[FAVS_LOCATION]}
          province={f[FAVS_PROVINCE_STATE]}
          country={f[FAVS_COUNTRY_REGION]}
          navigation={navigation}
        />
      );
    });
  }

  return (
    <>
      <TotalBanner navigation={navigation} />
      {FavBanners}
      <View style={styles.addContainer}>
        <Button onPress={() => navigation.navigate('Countries')}>Add location</Button>
      </View>
    </>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  addContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
});
