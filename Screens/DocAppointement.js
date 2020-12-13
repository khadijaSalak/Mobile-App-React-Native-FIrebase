import React ,{Component,useState,
  useEffect } from 'react';
import {Text,View,ScrollView,Image,Alert,Dimensions,TouchableOpacity,FlatList,StyleSheet,ActivityIndicator,
RefreshControl} from 'react-native'
import Firebase from '../config/Firebase';
import {Ionicons,Feather} from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';
const {width, height} = Dimensions.get('window')
const SCRENE=height-480
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width

const DocAppointement=({route,navigation})=>{



  let onEndReachedCalledDuringMomentum = false;
   var doctorsData=[];

  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const[usenom,setUser]=useState("");
  const[useprenom,setUserpre]=useState("");
  const [appointements, setAppoitements] = useState([]);
  var useid=Firebase.auth().currentUser.uid
  var dat='2020-06-27'
    const doctorsRef=Firebase.database().ref('InfoDoctor/'+useid+'/appointementdoc/'+route.params.date)
    const doctorsRef1=Firebase.database().ref('users/'+useid+'/appointementuser');
    const doctorsRef2=Firebase.database();

    useEffect(() => {


     getAppointements();

   }, []);

   async function fetchData(){




   return Firebase.database().ref('users/' + userid).once('value').then(function(snapshot) {

   setUser((snapshot.val() && snapshot.val().username) || 'Anonymous');

   // ...
   });


   }

  const getAppointements = async () => {

    setIsLoading(true);


    doctorsRef.on('value', snapshot => {
   let array = [];
   snapshot.forEach(function(childSnapshot) {
   // const key = childSnapshot.key;
   const childData = childSnapshot.val();
   console.log(childData);
   //array.push(childData);
   array.push({ ...childSnapshot.val(),key:childSnapshot.key});

   });
   setAppoitements(array);

   setIsLoading(false);
   });

  };

  const deleteItemById = (id ,ke )=> {

      //AsyncAlert()
      //if(respo=='yes'){


          Alert.alert(
 "Alert !!",
 "Are you sure you want delete that uAppointement!",
 [
   {
     text: "Yes",
     onPress: () => {const filteredData = appointements.filter(item => item.key !== id);
     setAppoitements(filteredData);
     doctorsRef1.child('' + id).remove()
     doctorsRef2.ref('InfoDoctor/'+ke+'/appointementdoc/'+id+'/').child('' + userid).remove()
       doctorsRef2.ref('InfoDoctor/'+ke+'/notifications/'+userid).set({
         usernom:usenom,
         textnote:' had cancelled the appointement you have at '+id
       })
   },

   },
   { text: "No", onPress: () => console.log("OK Pressed") }
 ],
 { cancelable: false }
);



}

  const renderPost = post =>{

         return (

             <TouchableOpacity  onPress={()=>navigation.navigate('Detailjour',{
               add:post.key,
                  mail:post.usermail,
             })}>
             <View style={{flexDirection:'row',alignSelf:'center',padding:8,width:SCREEN_WIDTH-10,elevation:5,padding:8,backgroundColor:'white',borderRadius:10,marginBottom:5}}>
                <View>
                    <Text style={{fontFamily:'monospace'}}>With:{post.usernam}</Text>
                    <Text style={{width:180, fontFamily:'monospace'}}>{post.usermail}</Text>
                    <Text style={{width:180,fontFamily:'monospace'}}>motif:"{post.motif}"</Text>
                </View>
                <Image source={require('../assets/appo.png')} style={{width:50,height:50,marginTop:5,elevation:40,alignSelf:'center',alignItems:'center',marginLeft:SCREEN_WIDTH-260}} />


            </View>
             </TouchableOpacity>
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
           <View style={{flexDirection:'row',alignSelf:'center',marginTop:90}}>
               <View style={styles.sparate}>
               </View>
               <Text> {route.params.date} </Text>
               <View style={styles.sparate}>
               </View>
           </View>
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
                   <Text style={{fontSize:15, color: 'black' }}>You have no appointements this day!</Text>
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
export default DocAppointement;
const styles=StyleSheet.create({
  sparate:{
    height:1,
    borderColor:'gray',
    top:10,
    backgroundColor:'gray',
    width:SCREEN_WIDTH-270,
  },
  feed: {
      marginHorizontal: 16,
      marginTop:10,
      marginBottom:80,
      width:SCREEN_WIDTH,
      alignSelf:'center'
  },
})
