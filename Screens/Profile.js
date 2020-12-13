import React,{Component,useEffect,useState} from 'react';
import {View,Text,Image,StyleSheet,TextInput,TouchableOpacity,Dimensions} from 'react-native';
import Header from './Header';
import Firebase from'../config/Firebase';
import { LinearGradient } from 'expo-linear-gradient';
import {Ionicons,Feather,FontAwesome} from '@expo/vector-icons';
import {NavigationEvents} from 'react-navigation';
import * as ImagePicker from 'expo-image-picker';
import Editing from './Editing';
//var age;
var userid;


const {width, height} = Dimensions.get('window')
const SCRENE=height-480
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
import { useFocusEffect } from '@react-navigation/native';
const Profile=({ navigation })=> {


      const [age,setAge]=useState("");
      const [sex,setSex]=useState("");
      const [city,setCity]=useState("");
      const [username,setUsername]=useState("");
      const[ma,setMa]=useState("");
      //const[photuir,setPhoto]=useState("");
      const[image,setImage]=useState("");
      const[phot,setPhoto]=useState("");




      useFocusEffect(
            React.useCallback(() => {

                fetchData();
                console.log("herre",phot)
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
/*uploadPost=post=>{

  userid = Firebase.auth().currentUser.uid;


 setPhoto(post)


 return Firebase.database().ref('users/' + userid).update({
photo:photuir,

 });
};*/
async function fetchData(){

  setMa(Firebase.auth().currentUser.email);
 userid = Firebase.auth().currentUser.uid;

return Firebase.database().ref('users/' + userid).once('value').then(function(snapshot) {
  setPhoto((snapshot.val() && snapshot.val().photo));
setAge((snapshot.val() && snapshot.val().age) || 'Anonymous');
setUsername((snapshot.val() && snapshot.val().username) || 'Anonymous');
setCity((snapshot.val() && snapshot.val().city) || 'Anonymous');
setSex((snapshot.val() && snapshot.val().sex) || "Anonymous");
// ...
});
}
const pickImage = async () => {
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
      uploadImage(result.uri)

   }
   /*return Firebase.database().ref('users/'+ useruid).update({
      photo:image
   });*/
    fetchData();
     //setImage(null)

 };
const uploadImage = async(uri) => {
  var useruid=Firebase.auth().currentUser.uid
  const response = await fetch(uri);
  const blob = await response.blob();

  var ref = Firebase.storage().ref().child("PatientImg/"+useruid);
  const snapshot= ref.put(blob);
  ref.getDownloadURL()
           .then((downloadUrl) => {
             console.log("File available at: " + downloadUrl);

            // food.image = downloadUrl;

             //delete food.imageUri;
             return Firebase.database().ref('users/'+ useruid).update({
                photo:downloadUrl
             });

           })

}

  return(

    <View>

    <View style={styles.use2}>
    <LinearGradient          colors={['#056299','#32a0c1']}
       style={{
         position: 'absolute',
         left: 0,
         right: 0,
         top: 0,
         height: SCRENE-20,
         borderTopRightRadius:10,
         borderTopLeftRadius:10
       }}
     />
    <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{marginRight:85,marginTop:17}}>
      <Ionicons name="ios-menu" size={38} style={styles.ico}/>
    </TouchableOpacity>
       <View style={{marginRight:200,}}>
       <View style={{marginLeft:9,marginTop:40,marginBottom:50}}>
         <Text style={{fontWeight:"bold",fontSize:16,marginLeft:25}}>{username}</Text>
         <Text style={{color:'white',fontSize:15,width:180,marginBottom:8,elevation:5,}}>{ma}</Text>
       </View>

       <View style={styles.imguser}>
              <TouchableOpacity    onPress={()=>navigation.navigate("Choosefile")} >
             {phot!="" ? <Image source={{uri:phot}} style={styles.profileImg}/>:<Image source={require('../assets/pro1.png')} style={styles.profileImg}/>}
          </TouchableOpacity>
          <View style={{width:38,height:38,alignItems:'center',backgroundColor:"#fff", shadowOpacity:0, elevation:35,borderRadius:40,paddingTop:8,paddingLeft:5,paddingRight:5,marginTop:40,marginLeft:-20}}>




               <FontAwesome name="camera" size={24} color="black" />
           </View>

         </View>
       </View>
    </View>
    <View style={{
      alignItems:'center',
      borderRadius:40,
      marginBottom:-29,
      marginTop:57,
      //backgroundColor:'white',
      width:60,
      height:60,
      marginLeft:280,
      elevation:35,
    }}>
     <TouchableOpacity onPress={() => navigation.navigate('Editing',{ag:age,
    us:username,
    ci:city,
    se:sex
     })}>
       <Image source={require('../assets/edit2.png')} style={styles.edi}/>
     </TouchableOpacity>
    </View>
    <View style={styles.map}>
     <View style={styles.use}>
        <Text  style={styles.img11}>Age </Text>
          <Text style={styles.input}>{age}</Text>
      </View>
      <View style={styles.sidebarDivider}></View>
        <View style={styles.use}>
          <Text  style={styles.img11}>Username</Text>
          <Text style={styles.input}>{username}</Text>
        </View>
     <View style={styles.sidebarDivider}></View>
      <View style={styles.use}>
         <Text style={styles.img11}>Gender</Text>
        <Text style={styles.input}>{sex}</Text>
      </View>
      <View style={styles.sidebarDivider2}></View>
      <View style={styles.use}>
        <Text  style={styles.img11}>City</Text>
        <Text style={styles.input}>{city}</Text>
      </View>

    </View>

    </View>

  );

}




const styles=StyleSheet.create({
   container:{
     flex:1,
     marginTop:22,
   },
   sidebarDivider:{
    // height:1,
     width:250,
     alignSelf:'center',
     backgroundColor:"lightgray",
     //marginVertical:10,
     borderColor:"gray",
     borderWidth:0.6
   },
   sidebarDivider2:{
     width:250,
     alignSelf:'center',
     backgroundColor:"lightgray",
     //marginVertical:10,
     borderColor:"gray",
     borderWidth:0.6
   },
   profileImg:{
     width:93,//93
     height:90,//90

     borderRadius:50,
 },
   touch:{
     alignSelf:'center',
     marginTop:50
   },
   edi:{
     marginTop:10,
     width:40,
     height:40,


   },
   edi2:{
     marginTop:10,
     width:40,
     height:40,


   },
   input:{
     //backgroundColor:'#7d9296',

     width:170,

     height:36 ,
     padding:5,

     paddingLeft:20,
     marginTop:20,
     marginLeft:3,
     justifyContent:'center',
     color:'black',

     //borderBottomColor: '#000000',
      //borderBottomWidth: 1,
      paddingHorizontal:10,
   },
   use:{
     flexDirection: 'row',
     //justifyContent: 'space-around',
     padding: 8,

     borderRadius:10,
   },
   imguser:{
     shadowColor:'#000',
     shadowOffset:{
       width:20,
       height:12,
     },
     shadowOpacity:0.5,
     shadowRadius:16.00,
     elevation:50,
     borderColor:'#9cd7e4',
     borderWidth:3,
     borderRadius:55,
     alignItems:'center',
     backgroundColor:'transparent',
     width:99,
     height:97,
     marginLeft:13,
     marginTop:SCREEN_HEIGHT-690,//-45
     flexDirection:'row'

   },
   use2:{
     flexDirection: 'row',
     //justifyContent: 'space-around',
     padding: 8,




    height:150,
     //alignItems:'center',
     //padding:20,
     paddingTop:5,
     width:357,
     borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
     //marginTop:5,
     alignSelf:'center',
     //backgroundColor:'#63A9DF'//'#1890ab'
     //backgroundColor:'#4bacd2'
   },
   img11:{
   color:'#63A9DF',
   fontSize:14,
   fontWeight:'bold',
   width:65,
     marginTop:38,
     marginRight:20
   },
   shadw:{
     shadowColor:'#000',
     shadowOffset:{
       width:200,
       height:300,
     },
     shadowOpacity:0.5,
     shadowRadius:16.00,
     elevation:24,
   },
   map:{
     shadowColor:'black',
     shadowOffset:{
       width:5,
       height:12,
     },
     shadowOpacity:1,
     shadowRadius:16.00,
     elevation:30,
      alignSelf:'center',
    backgroundColor: 'white',
    //  marginTop:60,
      //borderColor:'black',
      //borderWidth:1,
      borderRadius:20,
      //borderTopRightRadius:0,
    //  height:300,
      paddingBottom:15,

   justifyContent:"space-between",

 }
})
export default Profile;
