import React,{Component,useState,useEffect}from 'react'
import {Text,View,ScrollView,Image,Alert,Dimensions,StyleSheet,TouchableOpacity,AsyncStorage} from 'react-native'
import { MaterialIcons,FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation ,Entypo} from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import Loader from'./Loader';
import { LinearGradient } from 'expo-linear-gradient';

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
export default class Choosefile extends Component{
constructor(props){
  super(props);
  this.state={
    phot:"",
    isLoading:false
  }
}
/*componentDidMount(){
  var use=Firebase.auth().currentUser.uid;
  return Firebase.database().ref('InfoDoctor/' + use).once('value').then(function(snapshot) {
        this.setState({phot: snapshot.val().photo})
  });
}*/
async pickImage () {
var useruid=Firebase.auth().currentUser.uid
   let result = await ImagePicker.launchImageLibraryAsync({
     mediaTypes: ImagePicker.MediaTypeOptions.All,
     allowsEditing: true,
     aspect: [4, 3],
     quality: 1,
   });

   console.log(result);

   if (!result.cancelled) {
     //setImage(result.uri);
     if(result.uri!=null){
       this.uploadImage(result.uri)
     }else{
       alert("no image uploaded!")
     }


   }
   /*return Firebase.database().ref('users/'+ useruid).update({
      photo:image
   });*/

     //setImage(null)

 };
 async uploadImage (uri){
   this.setState({
     isLoading:true
   })
   var userd=Firebase.auth().currentUser.uid
 try{
   const response = await fetch(uri);
   const blob = await response.blob();
  docuse=docuse+1;
   var ref = Firebase.storage().ref().child("PatientImg/"+userd);
   const snapshot= ref.put(blob);
    ref.getDownloadURL()
            .then((downloadUrl) => {
              console.log("File available at: " + downloadUrl);
             // food.image = downloadUrl;
              //delete food.imageUri;
     this.setState({
       phot:downloadUrl,
       isLoading:false
     })

            })


 }catch(err){
   console.log(err)
 }

}
changeimg(){
  if(this.state.phot!=""){
    var useruid=Firebase.auth().currentUser.uid
    const {phot}=this.state
    return Firebase.database().ref('users/'+ useruid).update({
       photo:phot
    }).then(()=>this.reset());
  }
  else{
    alert("no image selected!")
  }


}
reset(){
  this.setState({
    phot:""
  })
  this.props.navigation.goBack()
}
 render(){
   return(
     <View style={{alignSelf:'center',alignItems:'center',top:200}}>
        <Loader isLoading={this.state.isLoading}/>
         {this.state.phot!="" ? <Image source={{uri:this.state.phot}} style={{width:100,height:100,borderRadius:50}}/>: <Image source={require('../assets/pro1.png')} style={{borderWidth:1.5,borderColor:'gray',borderRadius:60,width:120,height:120}}/>}
         <TouchableOpacity onPress={()=>this.pickImage()} style={{top:50,width:150,height:50,marginTop:5,padding:12,elevation:40,borderRadius:30,alignSelf:'center',alignItems:'center'}}>
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
              <Text style={{fontSize:18}}>Choose a file!</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={()=>this.changeimg()} style={{top:70,width:150,height:50,marginTop:5,padding:12,elevation:40,borderRadius:30,alignSelf:'center',alignItems:'center'}}>
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
              <Text style={{fontSize:18}}>Submit</Text>
         </TouchableOpacity>
     </View>
   )
 }

}
