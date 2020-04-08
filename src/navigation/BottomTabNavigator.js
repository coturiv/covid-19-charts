import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from './TabBarIcon';
import Colors from '../constants/Colors';
import HomeNavigator from './HomeNavigator';
import AboutNavigator from './AboutNavigator';
import ComparisonNavigator from './ComparisonNavigator';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'HomeTab';

export default function BottomTabNavigator(/* { navigation, route } */) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  // navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        activeTintColor: Colors.tabIconSelected,
        inactiveTintColor: Colors.tabIconDefault,
      }}
    >
      <BottomTab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          title: 'Locations',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="earth" />,
        }}
      />
      <BottomTab.Screen
        name="ComparisonTab"
        component={ComparisonNavigator}
        options={{
          title: 'Comparison',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="chart-line" />,
        }}
      />
      <BottomTab.Screen
        name="AboutTab"
        component={AboutNavigator}
        options={{
          title: 'About',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="information" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// function getHeaderTitle(route) {
//   const routeName =
//     route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

//   switch (routeName) {
//     case "Home":
//       return "COVID-19 Charts";
//     case "Charts":
//       return "Charts";
//     case "Links":
//       return "Settings";
//     default:
//       return routeName;
//   }
// }
