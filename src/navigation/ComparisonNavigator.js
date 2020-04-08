import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ComparisonScreen from '../screens/Comparison/ComparisonScreen';
import Colors from '../constants/Colors';

const Stack = createStackNavigator();

const ComparisonNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerStyle: {
          backgroundColor: Colors.headerBackground,
        },
        headerBackTitleStyle: { fontSize: 12, color: '#fff' },
      }}
    >
      <Stack.Screen
        name="Comparison"
        component={ComparisonScreen}
        options={{
          title: 'Comparison',
        }}
      />
    </Stack.Navigator>
  );
};

export default ComparisonNavigator;
