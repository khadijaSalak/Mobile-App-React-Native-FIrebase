import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons,FontAwesome } from '@expo/vector-icons'

import { createDrawerNavigator } from '@react-navigation/drawer'
//import DrawerNav from './DrawerNav';
import Home from './Home'
import Settings from './Settings'
import Book from './Book'
import Profile from './Profile'
import Editing from './Editing';
import Historique from './Historique'
import AppointDeatails from './AppointDeatails'
import Mapp from './Mapp';
import Choosefile from './Choosefile';
const Stack = createStackNavigator()
const Homestack=createStackNavigator();
const Profilestck=createStackNavigator();
import Details from './Details';
const HomeStackScreen = () => (
  <Homestack.Navigator headerMode="none">
    <Homestack.Screen name="Home" component={Home} />
    <Homestack.Screen
      name="Mapp"
      component={Mapp}

    />
    <Homestack.Screen
      name="Details"
      component={Details}

    />
    <Homestack.Screen
      name="Book"
      component={Book}

    />
    <Homestack.Screen
      name="AppointDeatails"
      component={AppointDeatails}

    />
  </Homestack.Navigator>
);
const Profilestack = () => (
  <Profilestck.Navigator
   headerMode="none">

    <Profilestck.Screen
      name="Profile"
      component={Profile}

    />
    <Profilestck.Screen
      name="Editing"
      component={Editing}

    />
    <Profilestck.Screen
      name="Choosefile"
      component={Choosefile}

    />
  </Profilestck.Navigator>
);
const Tab = createBottomTabNavigator()

function getHeaderTitle(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'Home'

  switch (routeName) {
    case 'Home':
      return 'Home'
    case 'Historique':
      return 'Historique'
    case 'Profile':
      return 'Profile'
  }
}

function MainTabNavigator() {
  return (
    <Tab.Navigator headerMode="none"
      tabBarOptions={{
        headerMode:"none",
        showLabel: false,
        activeTintColor: '#101010',
        style: {
          backgroundColor: 'white'  //'#ffd700'
        }
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused,color, size }) => {

          let iconName
          let type
          if (route.name == 'Home') {
            if(focused){

              return <Ionicons name="ios-home" color="#32a0c1" size={34} />
            }
           else{return <Ionicons name="ios-home" color={color} size={size} />}
         } else if (route.name == 'Profile'){
           if(focused){return <Ionicons name="ios-person" size={34} color="#32a0c1"  />}
           else{return <Ionicons name="ios-person" size={size} color={color}  />}

          }
          else if(route.name=='Historique'){
            if(focused){return <FontAwesome name="calendar-check-o" size={32} color="#32a0c1" />}
            else{return <FontAwesome name="calendar-check-o" size={24} color={color} />}

          }
        }
      })}>
      <Tab.Screen name='Home' component={HomeStackScreen} headerMode="none" />
      <Tab.Screen name='Historique' component={Historique} />
      <Tab.Screen name='Profile' component={Profilestack} />
    </Tab.Navigator>
  )
}




export default MainTabNavigator
