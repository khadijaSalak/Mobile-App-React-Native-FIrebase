import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome5,MaterialCommunityIcons } from '@expo/vector-icons';

import { createDrawerNavigator } from '@react-navigation/drawer'
//import DrawerNav from './DrawerNav';
import HomeAdmin from './HomeAdmin'
import AdminSetting from './AdminSetting'

import Book from './Book'
import Logout from './Logout'

import AddDoctor from './AddDoctor'
import Editing from './Editing';
import Historique from './Historique'
import Mapp from './Mapp';
const Stack = createStackNavigator()
const Homestack=createStackNavigator();
const Profilestck=createStackNavigator();
import Details from './Details';
const HomeStackScreen = () => (
  <Homestack.Navigator headerMode="none">
    <Homestack.Screen name="Home" component={HomeAdmin} />
        <Homestack.Screen name="Book" component={Book} />

  </Homestack.Navigator>
);
const Profilestack = () => (
  <Profilestck.Navigator
   headerMode="none">
   <Profilestck.Screen
     name="AdminSetting"
     component={AdminSetting}

   />
   <Profilestck.Screen
     name="Logout"
     component={Logout}

   />
  </Profilestck.Navigator>
);
const Tab = createBottomTabNavigator()

function getHeaderTitle(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'Home'

  switch (routeName) {
    case 'HomeAdmin':
      return 'HomeAdmin'
    case 'AddDoctor':
      return 'AddDoctor'
    case 'AdminSetting':
      return 'AdminSetting'
  }
}

  function MainTabAdmin() {
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
          if (route.name == 'HomeAdmin') {
            if(focused){return <FontAwesome5 name="users" size={32} color="#32a0c1" />}

            else{return <FontAwesome5 name="users" size={30} color={color} />}

          } else if (route.name == 'AdminSetting') {
             if(focused){return <Ionicons name="ios-settings" size={38} color="#32a0c1"  />}
            else{return <Ionicons name="ios-settings" size={35} color={color}  />}
          }
          else if (route.name == 'AddDoctor') {
                 if(focused){return <Ionicons name="ios-add-circle" size={43} color="#32a0c1"  />}
                 else{return <Ionicons name="ios-add-circle" size={40} color={color}  />}
          }
          }

        })
      }>
      <Tab.Screen name='HomeAdmin' component={HomeStackScreen} headerMode="none" />
      <Tab.Screen name='AddDoctor' component={AddDoctor} />
      <Tab.Screen name='AdminSetting' component={Profilestack} />
    </Tab.Navigator>
  )
}




export default MainTabAdmin
