import React from 'react';
import { FlatList } from 'react-native';
import ItemSeparator from './ItemSeparator';
import ListEmpty from './ListEmpty';

const createItemLayout = height => (data, index) => ({
  length: height,
  offset: height * index,
  index,
});

const List = ({ data, Item, itemHeight, itemLayout, keyExtractor }) => {
  const itLayout = itemHeight ? createItemLayout(itemHeight) : itemLayout;

  return (
    <FlatList
      data={data}
      renderItem={Item}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={ItemSeparator}
      ListEmptyComponent={ListEmpty}
      itemLayout={itLayout}
    />
  );
};

export default List;
