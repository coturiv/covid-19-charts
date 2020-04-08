import React from 'react';
import { StyleSheet } from 'react-native';
import RangeSlider from '../Slider/RangeSlider';
import { toShortDateString, parseDayNumber, toLongDateString } from '../../libs/date';
import Colors from '../../constants/Colors';

const DateSlider = ({ maximum, interval, daysShift, getLeftDay, getRightDay, onShiftInterval }) => {
  const formatSliderLabelL = index =>
    index <= maximum ? toShortDateString(parseDayNumber(getLeftDay(index))) : '';
  const formatSliderLabelR = index =>
    index <= maximum ? toLongDateString(parseDayNumber(getRightDay(index))) : '';

  const right = Math.min(maximum, daysShift + interval - 1);

  return (
    <RangeSlider
      leftValue={daysShift}
      rightValue={right}
      maximum={maximum}
      formatLeftLabel={formatSliderLabelL}
      formatRightLabel={formatSliderLabelR}
      onFinish={onShiftInterval}
      style={styles.slider}
      barStyle={styles.sliderBar}
    />
  );
};

export default DateSlider;

const styles = StyleSheet.create({
  slider: {
    backgroundColor: Colors.screenBackground,
  },
  sliderBar: {
    backgroundColor: Colors.panelHighlight,
  },
});
