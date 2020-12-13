import React, { Component ,useState} from 'react';

//import { Header } from 'react-native-elements';
import Header from './Header';

import {View,Text,Dimensions,ScrollView,StyleSheet,Image,Platform,TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window')
const SCRENE=height-480
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
import {Linking} from 'react-native'
import Firebase from '../config/Firebase';
import firebase from 'firebase';
import { Feather ,AntDesign} from '@expo/vector-icons';

const Settings = ({navigation}) => {
  const[res,setRes]=useState(false)
  const[icori,setIcon]=useState(true)
  const[currentpass,setCurrent]=useState("")
  const[newpass,setNew]=useState("")
  const[confirm,setConfirm]=useState("")
const handle=()=>{
  setRes(!res)
  setIcon(!icori)
}
const change=()=>{
  const emailCred  = firebase.auth.EmailAuthProvider.credential(
    Firebase.auth().currentUser.email, currentpass);
Firebase.auth().currentUser.reauthenticateWithCredential(emailCred)
    .then(() => {
      // User successfully reauthenticated.
      const newPass = newpass;
       Firebase.auth().currentUser.updatePassword(newPass);
       alert("password reseted successfully!")
       setCurrent("")
       setNew("")
       setConfirm("")
       setIcon(false)
       navigation.navigate("Home")
    }).catch(error => _handleError(error))
}
const _handleError=err=>{
  alert("the current password is not correct!!")
}
const handelepass=()=>{
  if(newpass==currentpass){alert("the new password i the same as the current!")}
  if(newpass.length<8){
    alert("password too weak!")
  }

}
const handelepass1=()=>{
  if(newpass!=confirm){alert("passwords is not confiremed!!")}


}
    return(
  <View style={styles.container}>
    <View style={{alignSelf:'center',height:60,top:10,width:SCREEN_WIDTH,alignItems:'center',elevation:5,padding:12,backgroundColor:'white'}}>
        <TouchableOpacity onPress={()=>handle()} style={{flexDirection:'row'}}>
              <Text style={{marginRight:SCREEN_WIDTH-200}}> Change your Password</Text>
              { icori ? <AntDesign name="rightcircleo" size={24} color="black" />:<AntDesign name="downcircleo" size={24} color="black" />}
        </TouchableOpacity>
    </View >
     {res && <View style={{alignSelf:'center',alignItems:'center',top:30}}>
            <TextInput  placeholder="enter your current password" style={styles.input}  value={currentpass} onChangeText={currentpass=>setCurrent(currentpass)}/>
            <TextInput placeholder="enter your new password" style={styles.input}   value={newpass} onChangeText={newpass=>setNew(newpass)} onSubmitEditing={()=>handelepass()}/>
            <TextInput placeholder="confirm your new password" style={styles.input}value={confirm} onChangeText={confirm=>setConfirm(confirm)} onSubmitEditing={()=>handelepass1()} />
            <TouchableOpacity style={{width:150,height:50,marginTop:5,padding:12,elevation:40,borderRadius:30,alignSelf:'center',alignItems:'center'}} onPress={()=>change()}>
            <LinearGradient
               colors={['#32a0c1','#056299']}
               start={{x:0.0,y:1.0}}
               end={{x:1.0,y:1.0}}
               style={{
                 position: 'absolute',
                 left: 0,
                 right: 0,
                 top: 0,
                 height: 50,
                 borderRadius:30
               }}
             />

             <Text> Save</Text>
            </TouchableOpacity>


       </View>

     }
  </View>
)
}
const styles=StyleSheet.create({
   container:{
     flex:1,
     marginTop:22,
   },
   input:{height:50,width:SCREEN_WIDTH-20,elevation:1,borderRadius:5,padding:15,marginBottom:20}
})
export default Settings;
