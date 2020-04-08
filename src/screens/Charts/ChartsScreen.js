import React from 'react';
import { ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';
import useDeleteButton from './useDeleteButton';
import LocationTitle from './LocationTitle';
import useDailyReports from '../../repository/days/useDailyReports';
import ScrollScreen from '../../components/Screen/ScrollScreen';
import ChartPanel from '../../components/ChartPanel/ChartPanel';
import Legend from '../../components/Legend/Legend';
import Paragraph from '../../components/Legend/Paragraph';

const ChartsScreen = ({ navigation, route }) => {
  const { location, province, country } = route.params;

  const { data, isPending } = useDailyReports(location, province, country);

  // add right header delete button
  useDeleteButton(navigation, location, province, country, onDelete);
  function onDelete() {
    navigation.navigate('Homepage');
  }

  return (
    <ScrollScreen>
      <LocationTitle location={location} province={province} country={country} />
      {isPending && <ActivityIndicator size="small" color={Colors.tintColor} />}
      {data && data.length > 0 ? (
        <ChartPanel data={data} />
      ) : (
        !isPending && (
          <Legend>
            <Paragraph>No data available.</Paragraph>
          </Legend>
        )
      )}
    </ScrollScreen>
  );
};

export default ChartsScreen;
