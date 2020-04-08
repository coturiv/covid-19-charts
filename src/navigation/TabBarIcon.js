import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function TabBarIcon({ name, focused }) {
  return (
    <MaterialCommunityIcons
      name={name}
      size={30}
      style={{ marginBottom: -3, marginHorizontal: -4 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
