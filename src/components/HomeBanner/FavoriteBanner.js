import React from 'react';
import Banner from './Banner';
import { parseDayNumber, toShortDateString } from '../../libs/date';
import useFavoriteSum from '../../repository/days/useFavoriteSum';

const FavoriteBanner = ({ location, province, country, navigation }) => {
  const { data } = useFavoriteSum(location, province, country);

  const onPress = () => {
    navigation.navigate('Charts', { location, province, country });
  };

  const { confirmed = '-', recovered = '-', deaths = '-', day = '' } = data || {};

  return (
    <Banner
      location={location}
      day={toShortDateString(parseDayNumber(day))}
      province={province}
      country={country}
      confirmed={confirmed}
      recovered={recovered}
      deaths={deaths}
      onPress={onPress}
    />
  );
};

export default FavoriteBanner;
