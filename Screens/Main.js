import  React,{Component} from'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createAppContainer } from 'react-navigation';
//import { createStackNavigator } from 'react-navigation-stack';
import {createStackNavigator} from '@react-navigation/stack';
import {View,Text,Image,StyleSheet,FlatList,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Settings from './Settings';
import Home from './Home';
import Profile from './Profile';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';
import Editing from './Editing';
import Mapp from './Mapp';
import Logout from './Logout'
import Historique from './Historique';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MainTabNavigator from './MainNavigator';
import { AuthContext } from '../Components/Context';
import  Sidebar  from './Sidebar';

const Drawer = createDrawerNavigator();
export default class Main extends React.Component{
  constructor(props){
    super(props);

  }
render(){
  return(



    <Drawer.Navigator headerMode="none"
    drawerContent={props => <Sidebar {...props} />}>
      <Drawer.Screen name="Home" component={MainTabNavigator} headerMode="none" />


      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Logout" component={Logout} />

    </Drawer.Navigator>


);

}

};
