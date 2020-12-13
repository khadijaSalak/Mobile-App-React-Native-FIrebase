import React from 'react';
import { View, Text } from 'react-native';
import DoctorMain from './Screens/DoctorMain';
import {createStackNavigator} from '@react-navigation/stack';
import { createAppContainer ,Navigator} from 'react-navigation';

//import Splash from './Screens/Splash';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import SignUi2 from './Screens/SignUi2';
import Main from './Screens/Main';
import Logout from './Screens/Logout'
import MainAdmin from './Screens/MainAdmin';
import Genre from './Screens/Genre';
import Info from './Screens/Info';
import CustomDrawerContent from './Screens/DoctorMain'
import SideDoctor from './Screens/SideDoctor'
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
const Stack = createStackNavigator();
export default class App extends React.Component {

  render() {
    return (
      <NavigationContainer >

          <Stack.Navigator  headerMode="none" initialRoute="Login">
            <Stack.Screen name="Login" component={Login}  />
            <Stack.Screen name="Signup" component={Signup}  />
            <Stack.Screen name="Main" component={Main}  />
            <Stack.Screen name="MainAdmin" component={MainAdmin}  />
            <Stack.Screen name="Genre" component={Genre}  />
            <Stack.Screen name="Info" component={Info}  />
            <Stack.Screen name="DoctorMain" component={DoctorMain}  />



          </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
