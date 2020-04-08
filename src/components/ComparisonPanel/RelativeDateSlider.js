import React from 'react';
import { StyleSheet } from 'react-native';
import RangeSlider from '../Slider/RangeSlider';
import Colors from '../../constants/Colors';

const RelativeDateSlider = ({ maximum, interval, daysShift, onShiftInterval }) => {
  const formatSliderLabel = index => (index <= maximum ? `Day ${index + 1}` : '');

  const right = Math.min(maximum, daysShift + interval - 1);

  return (
    <RangeSlider
      leftValue={daysShift}
      rightValue={right}
      maximum={maximum}
      formatLeftLabel={formatSliderLabel}
      formatRightLabel={formatSliderLabel}
      onFinish={onShiftInterval}
      style={styles.slider}
      barStyle={styles.sliderBar}
    />
  );
};

export default RelativeDateSlider;

const styles = StyleSheet.create({
  slider: {
    backgroundColor: Colors.screenBackground,
  },
  sliderBar: {
    backgroundColor: Colors.panelHighlight,
  },
});
