import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Icon({ name, size, style, color, focusedColor, focused }) {
  return (
    <MaterialCommunityIcons
      name={name}
      size={size}
      style={style}
      color={focused && focusedColor ? focusedColor : color}
    />
  );
}
