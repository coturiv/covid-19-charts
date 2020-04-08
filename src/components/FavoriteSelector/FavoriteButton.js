import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { getTitleSubtitlePair, getFavoriteKey } from '../../libs/favorites';
import {
  FAVS_COUNTRY_REGION,
  FAVS_PROVINCE_STATE,
  FAVS_LOCATION,
} from '../../repository/constants';
import TouchablePanel from '../Panel/TouchablePanel';
import Colors from '../../constants/Colors';
import { toLongDateString, parseDayNumber } from '../../libs/date';

const FavoriteButton = ({ favorite, selected, isLast, onPress }) => {
  const handlePress = () => {
    if (typeof onPress === 'function') {
      const key = getFavoriteKey(
        favorite[FAVS_COUNTRY_REGION],
        favorite[FAVS_PROVINCE_STATE],
        favorite[FAVS_LOCATION],
      );
      onPress(key);
    }
  };

  const isSelected = !!selected;
  const selectedColor = selected ? selected.color : null;
  let containerStyle = isSelected
    ? [styles.panel, { backgroundColor: '#fff', borderLeftColor: selectedColor }]
    : styles.panel;
  if (isLast) {
    containerStyle = [containerStyle, { marginBottom: 0 }];
  }

  const titleStyle = isSelected ? [styles.title, { color: selectedColor }] : styles.title;

  const [title, subtitle] = getTitleSubtitlePair(
    favorite[FAVS_COUNTRY_REGION],
    favorite[FAVS_PROVINCE_STATE],
    favorite[FAVS_LOCATION],
    true,
  );

  let firstDay = null;
  if (isSelected) {
    const { data } = selected;
    const d = data && data.length ? data[0].day : null;
    firstDay = toLongDateString(parseDayNumber(d)) || null;
  }

  return (
    <TouchablePanel onPress={handlePress} style={containerStyle}>
      <View style={styles.row}>
        <Text style={titleStyle}>
          <Text style={styles.bold}>{title}</Text>
          {subtitle}
        </Text>
        {!!firstDay && (
          <Text style={styles.firsCase}>
            {`first case  `}
            <Text style={styles.day}>{firstDay || 0}</Text>
          </Text>
        )}
      </View>
    </TouchablePanel>
  );
};

export default FavoriteButton;

const styles = StyleSheet.create({
  panel: {
    marginBottom: 2,
    borderRadius: 0,
    borderLeftWidth: 3,
    borderLeftColor: '#ffffff',
    borderBottomWidth: 0,
    borderWidth: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingLeft: 13,
    paddingRight: 12,
  },
  title: {
    fontSize: 14,
    color: Colors.inactiveTintColor,
  },
  bold: {
    fontWeight: 'bold',
  },
  firsCase: {
    marginLeft: 8,
    fontSize: 12,
    color: Colors.inactiveTintColor,
    textAlign: 'right',
  },
  day: {
    fontSize: 14,
    color: Colors.tintColor,
    textAlign: 'right',
  },
});
