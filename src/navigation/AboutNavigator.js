import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AboutScreen from '../screens/About/AboutScreen';
import Colors from '../constants/Colors';

const Stack = createStackNavigator();

const AboutNavigator = () => {
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
        name="About"
        component={AboutScreen}
        options={{
          title: 'About COVID-19 Charts',
        }}
      />
    </Stack.Navigator>
  );
};

export default AboutNavigator;
