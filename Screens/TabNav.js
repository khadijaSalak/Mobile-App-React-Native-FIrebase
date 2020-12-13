import * as React from 'react';
import {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// add this after other import statements
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { createAppContainer, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from './Home';
import Profile from './Profile';
import Settings from './Settings';
// add this after other import statements
import Historique from './Historique';
const Tabs = createBottomTabNavigator();

export default class TabNav extends Component{
  render(){
    return(
      <NavigationContainer>
      <Tabs.Navigator>
        <Tabs.Screen name="Home" component={Home}  />
        <Tabs.Screen name="Historique" component={Historique}  />

        
      </Tabs.Navigator>
      </NavigationContainer>
    );
  }
}
