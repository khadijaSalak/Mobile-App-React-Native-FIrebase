import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {Text,View,ScrollView,Image,Alert,Dimensions,StyleSheet,TouchableOpacity,AsyncStorage} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome5,MaterialCommunityIcons } from '@expo/vector-icons';
import { Notifications } from 'expo';
import { createDrawerNavigator } from '@react-navigation/drawer'
//import DrawerNav from './DrawerNav';
import HomeAdmin from './HomeAdmin'
import AdminSetting from './AdminSetting'
import Firebase from'../config/Firebase';
import CalendarDoc from './CalendarDoc';
import Choosefile2 from './Choosefile2';
import {useFocusEffect} from '@react-navigation/native'
import EditBio from './EditBio'
import DoctorMain from './DoctorMain'
import HomeDoctor from './HomeDoctor'
import Editing from './Editing';
import DocAppointement from './DocAppointement'
import EditDoc from './EditDoc'
import Login from './Login'
import Mapp from './Mapp';
import DoctorSettings from './DoctorSettings'
const Stack = createStackNavigator()
const Homestack=createStackNavigator();
const Profilestck=createStackNavigator();
import Details from './Details';
import Notification from './Notification';
import Detailjour from './Detailjour';
var count=0
const HomeStackScreen = () => (
  <Homestack.Navigator headerMode="none">
    <Homestack.Screen name="HomeDoctor" component={HomeDoctor} />
    <Homestack.Screen name="EditBio" component={EditBio} />
    <Homestack.Screen name="EditDoc" component={EditDoc} />
     <Homestack.Screen name="Choosefile2" component={Choosefile2} />
  </Homestack.Navigator>
);
const Profilestack = () => (
  <Profilestck.Navigator
   headerMode="none">
   <Profilestck.Screen
     name="CalendarDoc"
     component={CalendarDoc}
   />
   <Profilestck.Screen
     name="DocAppointement"
     component={DocAppointement}
   />
   <Profilestck.Screen
     name="Detailjour"
     component={Detailjour}
   />


  </Profilestck.Navigator>
);
const Tab = createBottomTabNavigator()

function getHeaderTitle(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'Home'

  switch (routeName) {
    case 'HomeDoctor':
      return 'HomeDoctor'
    case 'CalendarDoc':
      return 'CalendarDoc'

  }
}
function counterrest(){
  //count=0;

}
function _handleNotification (notification){
    //var userID = Firebase.auth().currentUser.uid;
    const { origin, data, notificationId } = notification
    //this.props.navigation.navigate('Notifications');



       if(origin=="received"){
         count=1;
              //return count;
       }
  //setNotification(notification);
//console.log(notifications)
    //Firebase.database().ref('InfoDoctor/' + userID + '/notification/'+data.useke+'/').set(notification.data);
    //if (origin === 'selected') {
//this.navigateToNotificationScreen(data)
//navigation.navigate('Notification')

}
function IconWithBadge({name,badgeCount,color,size}){

    //const { name, badgeCount, color, size } = this.props;


    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Ionicons name={name} size={size} color={color} />
        {badgeCount>0 && (
          <View
            style={{
              // If you're using react-native < 0.57 overflow outside of parent
              // will not work on Android, see https://git.io/fhLJ8
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'tomato',
              borderRadius: 7,
              width: 14,
              height: 14,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>

    );

}



function HomeIconWithBadge(props){

  // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
  return <IconWithBadge {...props}    />;
};
//export default HomeIconWithBadge;

  function MainTabDoctor() {

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
        tabBarIcon: ({ focused,color, size ,state}) => {
          let iconName
          let type

          if (route.name == 'HomeDoctor') {

            if(focused){

              return <MaterialCommunityIcons name="account-circle-outline" size={35} color="#32a0c1" />//<FontAwesome5 name="user" size={24} color="#32a0c1"/>
            }
             else{return <MaterialCommunityIcons name="account-circle-outline" size={27} color={color} />//<FontAwesome5 name="user" size={24} color={color} />}
     }
         } else if (route.name == 'CalendarDoc'){
           if(focused){

             return <Ionicons name="ios-calendar" size={30} color="#32a0c1"  />
           }
            else{return <Ionicons name="ios-calendar" size={24} color={color}  />}

          }
          else if(route.name=='Notification'){

            //console.log("tig",state.notificationcount)
            useFocusEffect(
              React.useCallback(()=>{
                count=0;
                return ()=>{

                };
              }, [])
            );

            if(focused){



              return (<Ionicons name="md-notifications" size={35} color="#32a0c1" />);

            }
             else if(!focused){

               var ct=  Notifications.addListener(
                     _handleNotification
                 );
    let ctt=count

      if(count>0){
         return <HomeIconWithBadge
         name="md-notifications"
         size={27}
         badgeCount={count}
         color={color}
         />
           count=0
       }



            //  if(count==0){}
        else{return <Ionicons name="md-notifications" size={27} color={color} />}

              }




          }

          }

        })
      }>

      <Tab.Screen name='HomeDoctor' component={HomeStackScreen} headerMode="none" />

      <Tab.Screen name='CalendarDoc' component={Profilestack} />
      <Tab.Screen name='Notification' component={Notification} />
    </Tab.Navigator>
  )
}




export default MainTabDoctor
