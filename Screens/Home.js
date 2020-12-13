
import React, { Component,useState,
  useEffect } from 'react';
import { View, Text, StyleSheet ,Image,TouchableOpacity,ScrollView,TextInput,FlatList,SafeAreaView,
  ActivityIndicator,
  RefreshControl,Dimensions} from 'react-native';
  import { List, ListItem } from "react-native-elements";
//import { Header } from 'react-native-elements';
import {Ionicons,FontAwesome,MaterialCommunityIcons,Entypo} from '@expo/vector-icons';
import { MaterialIcons,Feather,AntDesign } from '@expo/vector-icons';
import Header from './Header';
import { NavigationContainer } from '@react-navigation/native';
import Firebase from '../config/Firebase';
import Mapp from './Mapp';
import { createAppContainer, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from './Profile';
import Settings from './Settings';
import Details from './Details';
const {width, height} = Dimensions.get('window')
const SCRENE=height-480
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
var ic=0
// add this after other import statements
var screenWidth
const Home = ({navigation}) => {
  screenWidth = Math.round(Dimensions.get('window').width);
 const screenHeight = Math.round(Dimensions.get('window').height);
  let onEndReachedCalledDuringMomentum = false;
   var doctorsData=[];
    const [isLoading, setIsLoading] = useState(false);
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const [lastDoc, setLastDoc] = useState(null);
    const [doctors, setDoctors] = useState([]);
      const[tosearch,setTosearch]=useState([]);
      const[favs,setFavs]=useState([]);
      const[iconame,setIconam]=useState(null)
      const doctorsRef=Firebase.database().ref('InfoDoctor');
      useEffect(() => {

        getDoctors();
         Full()
     }, []);

  const getDoctors = async () => {
         setIsLoading(true);

         doctorsRef.on('value', snapshot => {
    let array = [];
    snapshot.forEach(function(childSnapshot) {
      // const key = childSnapshot.key;
      const childData = childSnapshot.val();
      console.log(childData);
      //array.push(childData);
      array.push({ ...childSnapshot.val(), key: childSnapshot.key });

    });
  setDoctors(array);
  setTosearch(array);
  setLastDoc(array[array.length - 1]);
  setIsLoading(false);
  });

 };

 const searchContacts = value => {

   const filteredContacts = tosearch.filter(contact => {
     let contactLowercase = (
       contact.Name +
  ' ' +
  contact.Surname + ' '+contact.Specialite

     ).toLowerCase();

     let searchTermLowercase = value.toLowerCase();

     return contactLowercase.indexOf(searchTermLowercase) > -1;
   });
   setDoctors(filteredContacts)



   };

   async function Full(){
   var userid=Firebase.auth().currentUser.uid

   return Firebase.database().ref('users/' + userid+'/favdocs').on('value', snapshot => {
   let array = [];
   snapshot.forEach(function(childSnapshot) {
   // const key = childSnapshot.key;
   const childData = childSnapshot.val();
  console.log(childSnapshot.key);
   //array.push(childData);
   array.push({ ...childSnapshot.val(),key:childSnapshot.key});

   });
   setFavs(array);


   });
   }
   const confir=doc=>{
//setIconam(true);

     for(let i=0;i<favs.length;i++) {

       if(favs[i].key==doc){

          return false;

       }
     };

     return true;
   }
 const renderPost = post =>{
        return (
          <TouchableOpacity onPress={()=>navigation.navigate('Details',{ciity:post.City,
            add:post.Adress,
           tel:post.Tel,
           prix:post.price,
           name:post.Name,
           sur:post.Surname,
           keey:post.key,
           spc:post.Specialite,
           phot:post.photo,
           re:post.recommand,
           epmt:confir(post.key)
          })}>
            <View style={styles.feedItem}>
               <Image source={{uri:post.photo}} style={styles.avatar} />
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                            <Text style={styles.name}>Dr.{post.Name} {post.Surname}</Text>
                            <Text style={styles.name}>{post.Email}</Text>
                    </View>

                        <Ionicons name="ios-more" size={24} color="#73788B" />
                    </View>
                    <View style={{flexDirection:"row"}}>

                    <MaterialCommunityIcons name="medical-bag"  size={20} style={{marginTop:10}} color="gray" />
                    <Text style={styles.post}> {post.Specialite}</Text>
                    </View>
                    <View style={{flexDirection:"row"}}>
                    <MaterialIcons name="location-city" size={24} color="black" style={{marginTop:10}}/>
                    <Text style={styles.post}> {post.City}</Text>

                    <View  style={{flexDirection:'row',top:10,marginLeft:SCREEN_WIDTH-290,width:100}}>
                     {confir(post.key) ? <AntDesign name="staro" size={24} color="gold" /> : <AntDesign name="star" size={24} color="gold" />}
                    <Text> {post.recommand}</Text>
                    </View>
                    </View>
                </View>
            </View>
            </TouchableOpacity>
        );
      ic=0
    };

    const onRefresh = () => {
       setTimeout(() => {
         getDoctors();
       }, 1000);
     }

    const renderFooter = () => {
       if (!isMoreLoading) return true;

       return (
         <ActivityIndicator
             size='large'
             color={'#D83E64'}
             style={{ marginBottom: 10 }}
         />
       )
     }
     const compare=(a,b)=>{
       if(a){return 1;}
      if(b){return -1;}
       return 0;
     }
    const getMore = async () => {

       try {
    // Set State + Retrieve Users
    setIsLoading(true);
     async () => {
      await getDoctors();
    }

    // Set State
    setIsLoading(false);
  }catch (error) {
    console.log(error);
  }


         onEndReachedCalledDuringMomentum = true;
   };

return(
<ScrollView>
  <View>

   <View style={styles.container}>

   <View style={styles.header1}>
     <TouchableOpacity onPress={()=>navigation.openDrawer()}>
       <Ionicons name="ios-menu" size={38} style={styles.ico}/>
     </TouchableOpacity>
     <View style={styles.fakein}>

       <TextInput  placeholder="search" style={styles.input1} onChangeText={(value => searchContacts(value))}
       />
        <Feather style={styles.ico} name="search" size={22} color="#000"/>

     </View>
     <Text style={{width:50}}></Text>
   </View>



   </View>

   <View style={styles.map}>
     <TouchableOpacity style={styles.touch1} onPress={()=>navigation.push('Mapp')}>
        <FontAwesome  name="map-marker" size={30} color="#000"/>
     </TouchableOpacity>
     <TouchableOpacity style={styles.touch2}>
       <MaterialCommunityIcons name="doctor" size={30} color="#63A9DF"/>
     </TouchableOpacity>
    </View>

              <FlatList
                    style={styles.feed}
                    data={doctors.sort((a,b)=>compare(confir(a.key),confir(b.key)))}
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
 ListEmptyComponent={() => (
 <View
   style={{
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
     marginTop: 50
   }}
 >
   <Text style={{fontSize:15, color: 'black' }}>No Doctor Found!!</Text>
 </View>
 )}
                    showsVerticalScrollIndicator={true}
                ></FlatList>





  </View>
</ScrollView>
);
}

const styles=StyleSheet.create({
        container:{
          flex:1,
          marginTop:22,
        },
        map:{
           alignSelf:'center',
           marginTop:20,
           marginBottom:60,
        flexDirection: 'row',
        justifyContent:"space-between",

        },
      touch1:{
        color:'blue',
        marginRight:60,
        //borderBottomWidth:1,
        //borderColor:'#63A9DF',
      },
      touch2:{

        marginLeft:60,
        //borderBottomWidth:1,
        //borderColor:'#63A9DF',

      },
        input:{
          //borderRadius:10,
          width:250,
          height:45,
          padding:10,
          color:'black',
          marginLeft:20,
          borderBottomColor:'black',
          borderBottomWidth:1
        },
        ///herfhgfdhs
        header: {
          paddingTop: 64,
          paddingBottom: 16,
          backgroundColor: "#FFF",
          alignItems: "center",
          justifyContent: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#EBECF4",
          shadowColor: "#454D65",
          shadowOffset: { height: 5 },
          shadowRadius: 15,
          shadowOpacity: 0.2,
          zIndex: 10
      },
      headerTitle: {
          fontSize: 20,
          fontWeight: "500"
      },
      feed: {
          marginHorizontal: 16
      },
      feedItem: {
          backgroundColor: "#FFF",
          borderRadius: 10,
          padding: 8,
          flexDirection: "row",
          marginVertical: 10,
          //herfhgfdhs
          elevation:3,
           marginLeft:8,
           marginRight:8

      },
      avatar: {
          width: 36,
          height: 36,
          borderRadius: 18,
          marginRight: 16
      },
      name: {
          fontSize: 15,
          fontWeight: "500",
          color: "#454D65"
      },
      timestamp: {
          fontSize: 11,
          color: "#C4C6CE",
          marginTop: 4
      },
      post: {
          marginTop: 16,
          fontSize: 14,
          color: "#838899",
          width:100,
          
      },
      postImage: {
          width: undefined,
          height: 150,
          borderRadius: 5,
          marginVertical: 16
      },

      //here headerMode
      header1:{
        width:"100%",
        height:80,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor:'transparent',
        paddingHorizontal:20,
        elevation:5
      },
      ico:{
        marginTop:15,


      },
      search:{

      },
      fakein:{
        flexDirection: 'row',
        marginTop:10,
        marginLeft:5,
        marginRight:20,
        width:280,
    //borderBottomWidth: 1,
    //borderColor: '#000',
    backgroundColor:'white',
    paddingBottom: 10,
    height:50,
    paddingRight:1,
    elevation:3,

    alignItems:'center',
          flexDirection: 'row',
      // borderRightWidth:1,
      // borderLeftWidth:1,
      // borderTopWidth:1,
       borderRadius:10,



      },
      input1:{
        borderRadius:10,
        width:200,
        height:40,
        padding:10,
        color:'black',
        marginLeft:20,
        marginTop:5,
        marginLeft:37
        //borderBottomColor:'black',
        //borderBottomWidth:0.5,
        //borderTopColor:'black',
        //borderTopWidth:0.5,
        //borderLeftColor:'black',
        //borderLeftWidth:0.5,
        //borderRightColor:'black',
        //borderRightWidth:0.5
      }
})
export default Home;
