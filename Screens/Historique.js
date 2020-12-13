import React ,{Component,useState,
  useEffect } from 'react';
import {Text,View,ScrollView,Alert,Dimensions,TouchableOpacity,FlatList,StyleSheet,ActivityIndicator,
RefreshControl} from 'react-native'
import Firebase from '../config/Firebase';
import {Ionicons,Feather} from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';
const {width, height} = Dimensions.get('window')
const SCRENE=height-480
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width

const Historique=({navigation})=>{



  let onEndReachedCalledDuringMomentum = false;
   var doctorsData=[];
  const[push,setPush]=useState('');
  const[isfull,setFull]=useState(true)
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const[usenom,setUser]=useState("");
  const[useprenom,setUserpre]=useState("");
  const [appointements, setAppoitements] = useState([]);
  var userid=Firebase.auth().currentUser.uid
  var dat='2020-06-27'
    const doctorsRef=Firebase.database().ref('users/'+userid+'/appointementuser/');

    const doctorsRef1=Firebase.database().ref('users/'+userid+'/appointementuser');
    const doctorsRef2=Firebase.database();

    useEffect(() => {

      getAppointements();
      fetchData();

   }, []);

   async function fetchData(){




   return Firebase.database().ref('users/' + userid).once('value').then(function(snapshot) {

   setUser((snapshot.val() && snapshot.val().username) || 'Anonymous');

   // ...
   });


   }
const settoful=(ke,id)=>{
  let isf
  doctorsRef2.ref('InfoDoctor/'+ke+'/appointementdoc/'+id).on('value', snapshot => {
  let array = [];
  snapshot.forEach(function(childSnapshot) {
  // const key = childSnapshot.key;
  const childData = childSnapshot.val();
  //array.push(childData);
  array.push({ ...childSnapshot.val(),key:childSnapshot.key});

  });
  if(array.length<2){

   isf=false
  }


  });

   if(!isf){

     doctorsRef2.ref('fulldays/'+ke+'/').child('' + id).remove()
   }

}
  const getAppointements = async () => {

    setIsLoading(true);


    doctorsRef.on('value', snapshot => {
   let array = [];
   snapshot.forEach(function(childSnapshot) {
   // const key = childSnapshot.key;
   const childData = childSnapshot.val();

   array.push({ ...childSnapshot.val(),key:childSnapshot.key});

   });
   setAppoitements(array);

   setIsLoading(false);
   });

  };
const getToken=(key)=>{

  return Firebase.database().ref('InfoDoctor/' + key).once('value').then(function(snapshot) {

  setPush((snapshot.val() && snapshot.val().expotoken) || 'Anonymous');

  // ...
  });
}
  const deleteItemById = (id ,ke )=> {

      //AsyncAlert()
      //if(respo=='yes'){

getToken(ke)

          Alert.alert(
 "Alert !!",
 "Are you sure you want delete this Appointement!",
 [
   {
     text: "Yes",
     onPress: () => {const filteredData = appointements.filter(item => item.key !== id);
     setAppoitements(filteredData);
     doctorsRef1.child('' + id).remove()
      settoful(ke,id)
     doctorsRef2.ref('InfoDoctor/'+ke+'/appointementdoc/'+id+'/').child('' + userid).remove().then(
       ()=>sendPushNotification(push,id)
     )

       /*doctorsRef2.ref('InfoDoctor/'+ke+'/notifications/'+userid).set({
         usernom:usenom,
         textnote:' had cancelled the appointement you have at '+id
       })*/
   },

   },
   { text: "No", onPress: () => console.log("OK Pressed") }
 ],
 { cancelable: false }
);

}

async function sendPushNotification (token,dat){
  const message = {
 to: token,
 sound: 'default',
 badge:1,
 title: 'Appointement cancelled',
 body:'you have new notification',
 data: { Content:  usenom+' had cancelled the appointement you had '+dat,
 useke:userid },
};
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message),
    });
  };
  const renderPost = post =>{
         return (

             <View style={{flexDirection:'row',alignSelf:'center',width:SCREEN_WIDTH-10,elevation:5,padding:8,backgroundColor:'white',borderRadius:10,marginBottom:5}}>
                <View style={{width:88}}>
                    <Text>Dr.{post.docnam}</Text>
                    <Text>{post.doctel}</Text>
                    <Text>{post.key}</Text>
                </View>
                <TouchableOpacity style={{width:130,height:50,marginTop:5,padding:12,elevation:40,borderRadius:30,alignSelf:'center',alignItems:'center',marginLeft:SCREEN_WIDTH-240}} onPress={()=>deleteItemById(post.key,post.keydo)}>
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

                 <Text> cancel</Text>
                </TouchableOpacity>
             </View>
         );
     };
     const renderFooter = () => {
         if (!isMoreLoading) return true;

         return (
           <ActivityIndicator
               size='large'
               color={'#D83E64'}
               style={{ marginBottom: 10 }}
           />
         )
       };
       const onRefresh = () => {
          setTimeout(() => {
            getAppointements();
          }, 1000);
        }
     const getMore = async () => {

     try {
     // Set State + Retrieve Users
     setIsLoading(true);
     async () => {
     await getAppointements();
     }

     // Set State
     setIsLoading(false);
     }catch (error) {
     console.log(error);
     }


      onEndReachedCalledDuringMomentum = true;


     };



    return(

       <View>
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

            height: 80,
            width:SCREEN_WIDTH
          }}
        >
            <View style={{flexDirection:'row',top:30}}>
            <TouchableOpacity onPress={()=>navigation.goBack()} >
            <Ionicons name="ios-arrow-back" size={24} color="black" style={{marginLeft:10}} />
             </TouchableOpacity>
           <Text style={{marginLeft:SCREEN_WIDTH-240}}>
              My Appointements
           </Text>
           </View>
           </LinearGradient>
        <ScrollView >


           <FlatList
                 style={styles.feed}
                 data={appointements}
                 keyExtractor={item => item.key}
                 renderItem={({ item }) => renderPost(item)}
                 initialNumToRender={3}
              onEndReachedThreshold={0.1}
  onMomentumScrollBegin = {() => {onEndReachedCalledDuringMomentum = false;}}
  refreshControl={
 <RefreshControl
 refreshing={isLoading}
 onRefresh={onRefresh}
   />
}
onEndReached = {getMore}

            showsVerticalScrollIndicator={true}
                 showsVerticalScrollIndicator={true}
                 ListEmptyComponent={() => (
                 <View
                   style={{
                     flex: 1,
                     alignItems: 'center',
                     justifyContent: 'center',
                     marginTop: 50
                   }}
                 >
                   <Text style={{fontSize:15, color: 'black' }}>You have no appointements yet!</Text>
                 </View>
               )}

             ></FlatList>
             <Text></Text>
             <Text></Text>
             <Text></Text>
             <Text></Text>
             <Text></Text>
             <Text></Text>

        </ScrollView>
       </View>

    );


}
export default Historique;
const styles=StyleSheet.create({

  feed: {
      marginHorizontal: 16,
      marginTop:90,
      marginBottom:80,
      width:SCREEN_WIDTH,
      alignSelf:'center'
  },
})
