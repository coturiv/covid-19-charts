import React, { useState, useEffect } from 'react';
import { PanResponder, View, Text, StyleSheet } from 'react-native';

const RangeSlider = ({
  leftValue = 0,
  rightValue = 0,
  maximum = 1,
  formatLeftLabel,
  formatRightLabel,
  onStart,
  onFinish,
  onMove,
  style,
  barStyle,
  labelStyle,
}) => {
  const [width, setWidth] = useState(0);
  const [barWidth, setBarWidth] = useState(0);
  const [barLeft, setBarLeft] = useState(0);
  const [koef, setKoef] = useState(0);
  const [newLeftValue, setNewLeftValue] = useState(leftValue);
  const [newRightValue, setNewRightValue] = useState(rightValue);

  useEffect(() => {
    function calibrate() {
      const k = maximum / width;
      const s = Math.round(leftValue / k);
      const e = Math.min(width, Math.round(rightValue / k));
      setKoef(k);
      setBarLeft(s);
      setBarWidth(e - s);
      setNewLeftValue(leftValue);
      setNewRightValue(rightValue);
    }
    calibrate();
  }, [leftValue, maximum, rightValue, width]);

  const onLayout = ({ nativeEvent }) => {
    const { width: w } = nativeEvent.layout;
    if (w) {
      setWidth(w);
    }
  };

  const startHandler = () => {
    if (typeof onStart === 'function') {
      onStart(newLeftValue, newRightValue);
    }
  };

  const finishHandler = () => {
    if (typeof onFinish === 'function') {
      onFinish(newLeftValue, newRightValue);
    }
  };

  const moveHandler = (left, right) => {
    if (typeof onMove === 'function') {
      onMove(left, right);
    }
  };

  const panResponder = PanResponder.create({
    // Should we become active when the user presses down on the slider?
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,

    // Should we become active when the user moves a touch over the slider?
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,

    onPanResponderGrant: () => {
      // The gesture has started. Show visual feedback so the user knows what is happening!
      startHandler();
    },

    onPanResponderMove: (evt, gestureState) => {
      // The most recent move distance is gestureState.move{X,Y}
      // The accumulated gesture distance since becoming responder is gestureState.d{x,y}

      // new bar position
      const bLeft =
        Math.max(0, Math.min(width - barWidth, barLeft + Math.round(gestureState.dx))) || 0;
      if (bLeft === barLeft) {
        return;
      }
      setBarLeft(bLeft);

      // new left and right values
      const nLeft = Math.round(koef * bLeft) || 0;
      const nRight = Math.min(maximum, nLeft + rightValue - leftValue) || 0;
      if (nLeft === newLeftValue && nRight === newRightValue) {
        return;
      }
      setNewLeftValue(nLeft);
      setNewRightValue(nRight);

      moveHandler(nLeft, nRight);
    },

    onPanResponderTerminationRequest: () => false,

    onPanResponderRelease: () => {
      // The user has released all touches while this view is the responder.
      // This typically means a gesture has succeeded.
      finishHandler();
    },

    onPanResponderTerminate: () => {
      // Another component has become the responder, so this gesture
      // should be cancelled.
      finishHandler();
    },

    onShouldBlockNativeResponder: () => {
      // Returns whether this component should block native components from becoming the JS
      // responder. Returns true by default. Is currently only supported on android.
      return true;
    },
  });

  // label texts
  let left = '';
  let right = '';
  if (typeof formatLeftLabel === 'function') {
    left = formatLeftLabel(newLeftValue);
  }
  if (typeof formatRightLabel === 'function') {
    right = formatRightLabel(newRightValue);
  }

  const containerStyle = [styles.container, style];
  const bStyle = [styles.bar, barStyle, { left: barLeft || 0, width: barWidth || 0 }];

  return (
    <View style={containerStyle} onLayout={onLayout} {...panResponder.panHandlers}>
      <View style={bStyle} />
      <Text style={labelStyle}>{`${left}`}</Text>
      <Text style={labelStyle}>{`${right}`}</Text>
    </View>
  );
};

export default RangeSlider;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    width: '100%',
    height: 26,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  bar: {
    position: 'absolute',
    left: 50,
    top: 0,
    width: 30,
    height: 26,
    borderRadius: 20,
    backgroundColor: '#ddd',
  },
});
