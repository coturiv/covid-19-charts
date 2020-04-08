import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { DAYS_COUNTRY_REGION } from '../../repository/constants';
import ListTitle from './ListTitle';
import List from '../../components/List/List';
import ListItem, { ITEM_HEIGHT } from '../../components/List/ListItem';
import useCountries from '../../repository/days/useCountries';
import Panel from '../../components/Panel/Panel';
import Screen from '../../components/Screen/Screen';
import FindInput from './FindInput';
import TextMessage from './TextMessage';
import { getFilteredList } from './helpers';

const keyExtractor = item => item[DAYS_COUNTRY_REGION];

const CountryScreen = ({ navigation }) => {
  const [filter, setFilter] = useState();

  const { data, error, isPending } = useCountries();

  const onPressItem = useCallback(
    title => {
      navigation.navigate('Provinces', { country: title });
    },
    [navigation],
  );

  const Item = ({ item }) => (
    <ListItem title={item[DAYS_COUNTRY_REGION]} onPressItem={onPressItem} />
  );

  const filtered = getFilteredList(filter, isPending ? null : data, DAYS_COUNTRY_REGION);
  const showList = !isPending && !!filtered;

  return (
    <Screen>
      <ListTitle>Country / Region</ListTitle>
      <FindInput onChangeText={setFilter} value={filter} />
      <Panel style={styles.listContainer} noPadding>
        {isPending && <TextMessage>Loading...</TextMessage>}
        {error && <TextMessage>Error</TextMessage>}
        {showList && (
          <List data={filtered} Item={Item} itemHeight={ITEM_HEIGHT} keyExtractor={keyExtractor} />
        )}
      </Panel>
    </Screen>
  );
};

export default CountryScreen;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
});
