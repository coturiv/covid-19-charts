import React from 'react';
import Banner from './Banner';
import { parseDayNumber, toShortDateString } from '../../libs/date';
import useTotalSum from '../../repository/days/useTotalSum';

const TotalBanner = ({ navigation }) => {
  const { data } = useTotalSum();

  const onPress = () => {
    navigation.navigate('Charts', { location: '', province: '', country: '' });
  };

  const { confirmed = '-', recovered = '-', deaths = '-', day = '' } = data || {};

  return (
    <Banner
      location="World"
      day={toShortDateString(parseDayNumber(day))}
      confirmed={confirmed}
      recovered={recovered}
      deaths={deaths}
      onPress={onPress}
    />
  );
};

export default TotalBanner;
