import React,{Component,useState,useEffect}from 'react'
import {Text,View,ScrollView,Image,Alert,Dimensions,StyleSheet,TouchableOpacity,AsyncStorage} from 'react-native'
import { MaterialIcons,FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation ,Entypo} from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
//import * as Notifications from 'expo-notifications';
import {Linking} from 'react-native'
const {width, height} = Dimensions.get('window')
const SCRENE=height-480
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
import Notification from './Notification';
import Firebase from'../config/Firebase';
var userid
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
var docuse=0;
const HomeDoctor=({route, navigation })=>{
  const [firstname,setFirst]=useState("");
  const[notifications,setNotification]=useState({})
    const [lastname,setLast]=useState("");
  const [sex,setSex]=useState("");
  const [city,setCity]=useState("");
  const [tel,setTel]=useState("");
  const[pric,setPrice]=useState("");
  //const[photuir,setPhoto]=useState("");
  const[adress,setAdress]=useState("");
  const[phot,setPhoto]=useState("");
const[specialite,setSpeciale]=useState("");
const[iconame,setIco]=useState("");
const[rec,setRec]=useState("")
const[counter,setCounter]=useState("gtt")
const[bio,setBio]=useState("");
const[logedin,setLog]=useState(true)
const[image,setImage]=useState("");
useFocusEffect(
      React.useCallback(() => {

        fetchDoc();

        getPushNotificationPermissions()
        if(sex=='Man'){
          setIco("male-symbol")
        }
        else{
          setIco("female-symbol")
        }
        //ma=Firebase.auth().currentUser.email;
        /*async function fetchData(){

          setMa(Firebase.auth().currentUser.email);
         userid = Firebase.auth().currentUser.uid;

  return Firebase.database().ref('users/' + userid).once('value').then(function(snapshot) {
  setAge((snapshot.val() && snapshot.val().age) || 'Anonymous');
  setUsername((snapshot.val() && snapshot.val().username) || 'Anonymous');
  setCity((snapshot.val() && snapshot.val().city) || 'Anonymous');
  setSex((snapshot.val() && snapshot.val().sex) || "Anonymous");
  setPhoto((snapshot.val() && snapshot.val().photo));
  // ...
  });


}*/


        return () => {

          // Do something when the screen is unfocused
          // Useful for cleanup functions
        };

      }, [])
    );
useEffect(()=>{

},[])

const  _handleNotification = (notification) => {
    const { origin, data, notificationId } = notification
     var userID = Firebase.auth().currentUser.uid;

      //this.props.navigation.navigate('Notifications');//data.useke

    setNotification(notification);
//console.log(notifications)
      Firebase.database().ref('InfoDoctor/' + userID + '/notification/'+data.useke+'/').set(notification.data);


if (origin === 'selected') {
//this.navigateToNotificationScreen(data)
navigation.navigate('Notification')

}else{

}
}
  const getPushNotificationPermissions = async () => {

    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS

      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions

    if (finalStatus !== 'granted') {
      return;
    }

     let token=await Notifications.getExpoPushTokenAsync()
    // Get the token that uniquely identifies this device
    console.log(token)
    var use=Firebase.auth().currentUser.uid
    Firebase.database().ref('InfoDoctor/'+use).update({
                                     expotoken:token
    });
    let notificationSubscription = Notifications.addListener(
           _handleNotification
);
  }
  const pickImage = async () => {

     let result = await ImagePicker.launchImageLibraryAsync({
       mediaTypes: ImagePicker.MediaTypeOptions.All,
       allowsEditing: true,
       aspect: [4, 3],
       quality: 1,
     });

     console.log(result);

     if (!result.cancelled) {
       const urlimg=uploadImage(result.uri);
   setImage(urlimg);





   }
   return await Firebase.database().ref('InfoDoctor/'+ userid).update({
              photo:image

           });
   };

   const uploadImage = async(uri) => {
     //var useruid=Firebase.auth().currentUser.uid


     docuse=docuse+1

         const response = await fetch(uri);

         ref = Firebase.storage().ref().child("docImg1/"+docuse);
        const blob = await response.blob();
         const snapshot= ref.put(blob);

         return await snapshot.getDownloadURL();

   }

async function fetchDoc(){
  //setMa(Firebase.auth().currentUser.email);

  userid = Firebase.auth().currentUser.uid;

  return Firebase.database().ref('InfoDoctor/' + userid).once('value').then(function(snapshot) {
  setPhoto((snapshot.val() && snapshot.val().photo));
  setFirst((snapshot.val() && snapshot.val().Name) || 'Anonymous');
  setLast((snapshot.val() && snapshot.val().Surname) || 'Anonymous');
  setCity((snapshot.val() && snapshot.val().City) || 'Anonymous');
  setSex((snapshot.val() && snapshot.val().Sex) || "Anonymous");
    setTel((snapshot.val() && snapshot.val().Tel) || "Anonymous");
      setPrice((snapshot.val() && snapshot.val().price) || "Anonymous");

  setSpeciale((snapshot.val() && snapshot.val().Specialite));
  setAdress((snapshot.val() && snapshot.val().Adress));
  setRec((snapshot.val() && snapshot.val().recommand.toString()))
  setBio((snapshot.val() && snapshot.val().Bio))


  // ...
  });
}


    return(

      <ScrollView style={{top:10}}>
          <View style={{height:SCREEN_HEIGHT-470,borderRadius:10,width:SCREEN_WIDTH-5,alignSelf:'center',alignItems:'center'}}>
          <Image source={{uri:phot}} style={{height:SCREEN_HEIGHT-470,width:SCREEN_WIDTH-5,borderRadius:8,}}/>
          </View>
          <View >
          <TouchableOpacity   style={{marginTop:-50,borderWidth:2,borderColor:'black',alignSelf:'center',alignItems:'center',borderRadius:50,width:94,height:94}} onPress={()=>navigation.navigate("Choosefile2")} >
           <Image source={{uri:phot}}  style={{alignSelf:'center',height:90,width:90,borderRadius:50}}/>
           </TouchableOpacity>
           </View>
           <View style={{flexDirection:'row',marginLeft:20,top:10}}>
               <Text>My Bio</Text>
               <View style={styles.sparate1}>
               </View>
           </View>
            <View style={{height:90,width:SCREEN_WIDTH-30,elevation:5,marginTop:10,padding:8,alignSelf:'center',backgroundColor:'white',borderRadius:5}}>
            <Text>{bio}</Text>
            <TouchableOpacity style={{marginLeft:SCREEN_WIDTH-70,top:20}} onPress={()=>navigation.navigate("EditBio",{
              bi:bio
            })}>
            <MaterialIcons name="edit" size={20} color="gray" />
            </TouchableOpacity>
            </View>
            <View>
            <View style={{flexDirection:'row',alignSelf:'center',top:10}}>
                <View style={styles.sparate}>
                </View>
                <Text>About Me</Text>
                <View style={styles.sparate}>
                </View>
            </View>
            </View>

            <View style={{width:SCREEN_WIDTH-50,marginBottom:50,elevation:8,marginTop:20,padding:15,alignSelf:'center',backgroundColor:'white',borderRadius:5}}>
              <View style={{flexDirection:'row'}}>


                  <Entypo name="user" size={24} color="gray" />

              <Text style={styles.tx}>Dr.{firstname+' '} {lastname}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
              <Foundation name={iconame} size={24} color="gray" />
              <Text style={styles.tx}>{sex}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
              <Entypo name="location-pin" size={24} color="gray" />
              <Text style={styles.tx}>{adress}</Text>
              </View>
              <View style={{flexDirection:'row'}} >
              <MaterialIcons name="location-city" size={24} color="gray" />
              <Text style={styles.tx}>{city}</Text>
              </View>
                <View style={{flexDirection:'row'}} >
              <Entypo name="old-phone" size={22} color="gray" />
              <Text style={styles.tx}>{tel}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
              <MaterialCommunityIcons name="medical-bag" size={24} color="gray" />
              <Text style={styles.tx}>{specialite}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
              <Image  source={require('../assets/master.png')} style={{width:30,height:30,}}/>
              <Text style={styles.tx}>{pric}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <FontAwesome name="star" size={24} color="gold" />
                <Text style={styles.tx}>{rec}</Text>
              </View>

            </View>

            <TouchableOpacity  style={{alignSelf:'center',marginTop:-80,elevation:60,alignItems:'center',borderRadius:60,width:60,height:50,backgroundColor:'white',marginBottom:40}} onPress={()=>navigation.navigate("EditDoc",{
              ci:city,
              se:sex,
              las:lastname,
              us:firstname,
              ad:adress,
              spe:specialite,
              te:tel,
              pri:pric

            })}>
            <Image source={require('../assets/edit2.png')} style={styles.edi}/>
            </TouchableOpacity>

      </ScrollView>

    )
  }

const styles=StyleSheet.create({
    sparate:{
      height:1,
      borderColor:'gray',
      top:10,
      backgroundColor:'gray',
      width:SCREEN_WIDTH-270,
    },
    sparate1:{
      height:1,
      borderColor:'gray',
      top:10,
      marginLeft:5,
      backgroundColor:'gray',
      width:SCREEN_WIDTH-80,
    },
    tx:{
      marginLeft:15,
      marginBottom:15
    },
    edi:{

      width:60,
      height:60,


    },
    input:{fontSize:15,marginLeft:8,padding:15,borderBottomColor:'gray',borderBottomWidth:1,width:SCREEN_WIDTH-200}

})
export default HomeDoctor;
