import  React,{Component} from'react';
import { createDrawerNavigator ,DrawerItem,DrawerContentScrollView} from '@react-navigation/drawer'
import { createAppContainer ,NavigationActions} from 'react-navigation';
//import { createStackNavigator } from 'react-navigation-stack';
import {createStackNavigator} from '@react-navigation/stack';
import {View,Text,Image,StyleSheet,FlatList,TouchableOpacity} from 'react-native';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import Settings from './Settings';
import Home from './Home';
import Login from './Login';

import { AsyncStorage } from 'react-native';
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
import Logout from './Logout';
import Notification from './Notification';
import Mapp from './Mapp';
import AddDoctor from './AddDoctor';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainTabDoctor from './MainTabDoc';
import HomeDoctor from './HomeDoctor'
 import DoctorSettings from './DoctorSettings'
import { AuthContext } from '../Components/Context';
import  SideDoctor  from './SideDoctor';
import Firebase from '../config/Firebase';
const Drawer = createDrawerNavigator();

export default class MainAdmin extends React.Component{







render(){

 return(



   <Drawer.Navigator
     drawerContent={(props) => <SideDoctor {...props} />}>
     <Drawer.Screen name="Home" component={MainTabDoctor}  />
     <Drawer.Screen name="DoctorSettings" component={DoctorSettings} />
         <Drawer.Screen name="Logout" component={Logout}  />



   </Drawer.Navigator>


);

}

};
