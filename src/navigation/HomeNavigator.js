import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home/HomeScreen';
import Colors from '../constants/Colors';
import CountryScreen from '../screens/SelectFavorite/CountryScreen';
import ProvinceScreen from '../screens/SelectFavorite/ProvinceScreen';
import LocationScreen from '../screens/SelectFavorite/LocationScreen';
import ChartsScreen from '../screens/Charts/ChartsScreen';

const Stack = createStackNavigator();

const HomeNavigator = () => {
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
        name="Homepage"
        component={HomeScreen}
        options={{
          title: 'COVID-19 Charts',
        }}
      />
      <Stack.Screen
        name="Charts"
        component={ChartsScreen}
        options={{
          title: 'Charts',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="Countries"
        component={CountryScreen}
        options={{
          title: 'Select location',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="Provinces"
        component={ProvinceScreen}
        options={{
          title: 'Select location',
          headerBackTitle: 'Country / Region',
          headerTruncatedBackTitle: 'Country',
        }}
      />
      <Stack.Screen
        name="Locations"
        component={LocationScreen}
        options={{
          title: 'Select location',
          headerBackTitle: 'Province / State',
          headerTruncatedBackTitle: 'Province',
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
