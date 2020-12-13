import React ,{Component,useState,useEffect} from 'react';
import {View,Text,ScrollView,Alert,StyleSheet,Keyboard,KeyboardAvoidingView,Dimensions,FlatList,SafeAreaView,Image,TextInput,
  ActivityIndicator,
  RefreshControl} from 'react-native';
import Firebase from'../config/Firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Ionicons,Feather,FontAwesome} from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto,AntDesign } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import DetailsAdmin from './DetailsAdmin';
import * as ImagePicker from 'expo-image-picker';
const {width, height} = Dimensions.get('window')
const SCRENE=height-480
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
import { LinearGradient } from 'expo-linear-gradient';
const Detailjour=({route,navigation}) => {
const[name,setName]=useState("")
const[email,setEmail]=useState(null)
const[age,setAge]=useState("")
const[city,setCity]=useState("")
const[phot,setPhot]=useState("")
const[genre,setGenre]=useState("")
useEffect(() => {

  fetchData();

}, []);
async function fetchData(){

  setEmail(route.params.mail)


return Firebase.database().ref('users/' + route.params.add).once('value').then(function(snapshot) {
setAge((snapshot.val() && snapshot.val().age) || 'Anonymous');
setName((snapshot.val() && snapshot.val().username) || 'Anonymous');
setCity((snapshot.val() && snapshot.val().city) || 'Anonymous');
setGenre((snapshot.val() && snapshot.val().sex) || "Anonymous");
setPhot((snapshot.val() && snapshot.val().photo));
// ...
});

}

    return(

       <View style={{flex:1}}>
       <LinearGradient
       colors={['#32a0c1','#056299']}
       start={{x:0.0,y:1.0}}
       end={{x:1.0,y:1.0}}
       style={{
         position: 'absolute',
         left: 0,
         right: 0,
         top: 0,
         elevation:50,

         height: 70,
         width:SCREEN_WIDTH
       }}
       >
       <View style={{top:30,flexDirection:'row'}}>
               <Ionicons name="ios-arrow-back" size={28} style={{marginLeft:10,marginRight:SCREEN_WIDTH-250}} onPress={()=>this.props.navigation.goBack()}/>
               <Text >Add a new Doctor</Text>
       </View>
       </LinearGradient>

        <ScrollView style={{marginTop:90}}>

     <TouchableOpacity style={{borderWidth:1.5,borderColor:'gray',alignSelf:'center',alignItems:'center',borderRadius:53,width:103,height:103}} >
         {phot!="" ? <Image source={{uri:phot}} style={{width:100,height:100,borderRadius:50}}/>:<Image source={require('../assets/pro1.png')} style={{width:100,height:100,borderRadius:50}}/>}

     </TouchableOpacity>

      <View style={{alignSelf:'center',alignItems:'center'}}>
      <Text style={{fontSize:16,marginTop:10}}>{name}</Text>
      <Text style={{color:'#056299',fontSize:17}}>{email}</Text>
      </View>
      <View style={{marginTop:40,padding:5,backgroundColor:'white',elevation:2}}>
       <View style={{flexDirection:'row'}}>
       <View style={{backgroundColor:'lightgray',borderRadius:20,height:30,width:30,alignItems:'center',marginTop:20}}>
         <MaterialCommunityIcons name="city" size={24} color="gray" style={{borderRadius:30,}}/>
       </View>
       <Text style={styles.input}>{city}</Text>
       </View>
       <View style={{flexDirection:'row',marginTop:20}}>
       <View style={{backgroundColor:'lightgray',borderRadius:20,height:30,width:30,alignItems:'center',marginTop:20}}>
         <MaterialCommunityIcons name="gender-male-female" size={24} color="black" />
       </View>
       <Text style={styles.input}>{genre}</Text>
       </View>
       <View style={{flexDirection:'row',marginTop:20}}>
       <Text style={{marginTop:20,fontSize:15}}>Age:</Text>
       <Text style={styles.input}>{age} years </Text>
       </View>

          <Text></Text>
          <Text></Text>

      </View>



        </ScrollView>

         </View>

    );
  }


const styles=StyleSheet.create({
    sparate:{
      height:1,
      borderColor:'gray',
      top:10,
      backgroundColor:'gray',
      width:SCREEN_WIDTH-270,
    },
    input:{fontSize:15,marginLeft:8,padding:15,borderBottomColor:'gray',borderBottomWidth:1,width:SCREEN_WIDTH-45}

})
export default Detailjour;
