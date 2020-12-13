 import  React,{Component} from'react';
import { createDrawerNavigator ,DrawerItem,DrawerContentScrollView,DrawerItems } from '@react-navigation/drawer'
import { createAppContainer } from 'react-navigation';
//import { createStackNavigator } from 'react-navigation-stack';
import {createStackNavigator} from '@react-navigation/stack';
import {View,Text,Image,StyleSheet,FlatList,TouchableOpacity,Icon} from 'react-native';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import Settings from './Settings';
import Home from './Home';
import Profile from './Profile';
import Logout from './Logout'
import { LinearGradient } from 'expo-linear-gradient';
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
import AddDoctor from './AddDoctor';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainTabAdmin from './AdminTabNav';
import { AuthContext } from '../Components/Context';
import  SideAdmin  from './SideAdmin';
import AdminSetting from './AdminSetting'
import Firebase from '../config/Firebase';
const Drawer = createDrawerNavigator();


export default class MainAdmin extends React.Component{
  constructor(props){
    super(props);

  }


render(){


  return(



    <Drawer.Navigator
    drawerContent={props => <SideAdmin {...props} />}>
      <Drawer.Screen name="Home" component={MainTabAdmin}  />
      <Drawer.Screen name="Logout" component={Logout}  />



    </Drawer.Navigator>


);

}

};
const styles=StyleSheet.create({
  profileImg:{
  width:91,
  height:90,
  borderRadius:50,
// marginTop:20,
//  marginLeft:20,
},
user:{
  alignItems:'center',
  //alignSelf:'center',
  //backgroundColor:'#63A9DF'//'#1890ab'
},
sidebarDivider:{
  height:1,
  width:"100%",
  backgroundColor:"lightgray",
  marginVertical:10
},
listItem:{
    height:60,
    alignItems:"center",
    flexDirection:"row",
},
title:{
    fontSize:18,
    marginLeft:20
},
})
