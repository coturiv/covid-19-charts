import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

export const ITEM_HEIGHT = 46; // item height + separator height

class ListItem extends React.PureComponent {
  render() {
    const { title, hideArrow, onPressItem } = this.props;
    return (
      <TouchableHighlight
        style={styles.itemContainer}
        onPress={() => onPressItem && onPressItem(title)}
        underlayColor={Colors.panelHighlight}
      >
        <View style={styles.item}>
          <Text style={styles.title}>{title || '?'}</Text>
          {!hideArrow && (
            <View style={styles.iconContainer}>
              <FontAwesome name="angle-right" style={styles.icon} />
            </View>
          )}
        </View>
      </TouchableHighlight>
    );
  }
}

export default ListItem;

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    height: ITEM_HEIGHT - 1,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
  },
  iconContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 30,
    color: '#ddd',
  },
});
