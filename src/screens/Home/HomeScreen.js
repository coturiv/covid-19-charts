import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProgressLine from '../../components/Progress/ProgressLine';
import useMaxDay from '../../repository/days/useMaxDay';
import Favorites from './Favorites';
import NoneData from './NoneData';
import useUpdateButton from './useUpdateButton';
import ScrollScreen from '../../components/Screen/ScrollScreen';
import UpdatingFailed from './UpdatingFailed';

const HomeScreen = ({ navigation }) => {
  const { maxDay } = useMaxDay();

  // add right header update button
  const { isPending, total, currentIndex, run, error } = useUpdateButton(navigation);

  const showNoneData = !error && !maxDay;
  const showFavorites = !error && maxDay;
  const showError = !!error;

  return (
    <View style={styles.container}>
      <ScrollScreen>
        {showFavorites && <Favorites navigation={navigation} />}
        {showNoneData && <NoneData runUpdate={run} isUpdating={isPending} />}
        {showError && <UpdatingFailed runUpdate={run} isUpdating={isPending} />}
      </ScrollScreen>
      <ProgressLine total={total} currentIndex={currentIndex} style={styles.progressLine} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressLine: {
    position: 'absolute',
    top: 0,
  },
});
