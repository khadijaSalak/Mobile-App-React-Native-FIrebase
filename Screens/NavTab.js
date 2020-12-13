import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// add this after other import statements
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { createAppContainer, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from './Home';
import Notifications from './Notifications';
import Settings from './Settings';
// add this after other import statements
import Historique from './Historique';
const Tabs = createBottomTabNavigator();
const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={Home} options={{header:none;}} />
    <Tabs.Screen name="Notifications" component={Notifications} options={{header:none;}} />
  </Tabs.Navigator>
);
export default TabsScreen;
