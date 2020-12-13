import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import Settings from './Settings';
import Notifications from './Notifications';
import Sidebar from './Sidebar';
import Editing from './Editing';


const Drawer = createDrawerNavigator()
export default function DrawerNav() {
return (

  <Drawer.Navigator initialRouteName="Home" >
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Notifications" component={Notifications} />
    <Drawer.Screen name="Settings" component={Settings}/>
  </Drawer.Navigator>
);
}
/*initialRouteName="Home",
 headerMode:"none",
 unmountInactiveRoutes: true,
  contentComponent: props =>(<Sidebar {...props}*/
