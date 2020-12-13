import React ,{Component,useState,useEffect} from 'react';
import {View,Text,ScrollView,Alert,StyleSheet,Dimensions,FlatList,SafeAreaView,Image,TextInput,
  ActivityIndicator,
  RefreshControl} from 'react-native';
import Firebase from'../config/Firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Ionicons,Feather} from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import DetailsAdmin from './DetailsAdmin';

const {width, height} = Dimensions.get('window')
const SCRENE=height-480
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
var num=0
import { LinearGradient } from 'expo-linear-gradient';
const HomeAdmin = ({navigation}) => {



  let onEndReachedCalledDuringMomentum = false;
   var doctorsData=[];
   const[respo,setResp]=useState('no')
    const[tosearch,setTosearch]=useState([]);
    const[tosearch1,setTosearch1]=useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const [lastDoc, setLastDoc] = useState(null);
    const [lastDocu, setLastDocu] = useState(null);
    const[isuser,setIsuser]=useState(false);
    const [doctors, setDoctors] = useState([]);
    const[color1,setColor1]=useState("#32a0c1")
    const[color,setColor]=useState("black")
    const[users,setUsers]=useState([]);
      const doctorsRef=Firebase.database().ref('InfoDoctor');
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
      }
    const getUsers = async () => {
             setIsLoading(true);


             Firebase.database().ref('users').on('value', snapshot => {
        let array = [];
        snapshot.forEach(function(childSnapshot) {
          // const key = childSnapshot.key;
          const childData = childSnapshot.val();
          console.log(childData);
          //array.push(childData);
          array.push({ ...childSnapshot.val(), key: childSnapshot.key });

        });
      setUsers(array);
      setTosearch1(array);
      setLastDocu(array[array.length - 1]);
      setIsLoading(false);
      });
      }
      useEffect(() => {
getUsers();
      getDoctors();

     }, []);


  const renderPost = post =>{

         return (

             <View style={styles.feedItem}>
                <Image source={{uri:post.photo}} style={styles.avatar} />
                 <View style={{ flex: 1 }}>
                     <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                         <View>
                             <Text style={styles.name}>Dr.{post.Name} {post.Surname}</Text>
                        </View>
                        <TouchableOpacity>
                          <MaterialIcons name="delete-forever" size={24} color="black" onPress={()=>deleteItemById(post.key)}/>
                        </TouchableOpacity>
                     </View>
                     <View style={{flexDirection:"row"}}>
                     <Text style={styles.post}> {post.Specialite}</Text>
                     </View>
                 </View>
             </View>

         );
     };
    const renderPost2 = post =>{

            return (

                <View style={styles.feedItem}>
                   <Image source={{uri:post.photo}} style={styles.avatar} />
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <View>
                                <Text style={styles.name}>{post.username}</Text>
                           </View>
                           <TouchableOpacity>
                             <MaterialIcons name="delete-forever" size={24} color="black" onPress={()=>deleteItemById(post.key)}/>
                           </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:"row"}}>
                        <Text style={styles.post}> {post.city}</Text>
                        </View>
                    </View>
                </View>

            );
        };
     const onRefresh = () => {
        setTimeout(() => {
          getDoctors();
        }, 1000);
      }
       const setu=()=>{

         setIsuser(true)
         setColor("#32a0c1")
         setColor1("black")
       }
       const setuu=()=>{

         setIsuser(false)
         setColor1("#32a0c1")
         setColor("black")
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
      };

      const getMore = async () => {
   if(isuser){
     try {
  // Set State + Retrieve Users
  setIsLoading(true);
   async () => {
    await getUsers();
  }

  // Set State
  setIsLoading(false);
  }catch (error) {
  console.log(error);
  }


       onEndReachedCalledDuringMomentum = true;
   }else{
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
   }

     };
     const searchContacts = value => {
       if(isuser){
         const filteredContacts = tosearch1.filter(contact => {
           let contactLowercase = (
             contact.username

           ).toLowerCase();

           let searchTermLowercase = value.toLowerCase();

           return contactLowercase.indexOf(searchTermLowercase) > -1;
         });
         setUsers(filteredContacts)

       }
       else{
         const filteredContacts = tosearch.filter(contact => {
           let contactLowercase = (
             contact.Name +
        ' ' +
        contact.Surname

           ).toLowerCase();

           let searchTermLowercase = value.toLowerCase();

           return contactLowercase.indexOf(searchTermLowercase) > -1;
         });
         setDoctors(filteredContacts)
       }

       };
       const AsyncAlert = () => {
    return new Promise((resolve, reject) => {
        Alert.alert(
            'ALERT!',
            'Are you sure you want delete this!',
            [
                {text: 'YES', onPress: ()=>  seti()},
                {text: 'NO', onPress: () => seti1() }
            ],
            { cancelable: false }
        )
    })
}
const seti=()=>{

  setResp('yes')
}
const seti1=()=>{
  setResp('no')
}
      const deleteItemById = id => {

          //AsyncAlert()
          //if(respo=='yes'){

            if(isuser){
              Alert.alert(
     "Alert !!",
     "Are you sure you want detele that user!",
     [
       {
         text: "Yes",
         onPress: () => {const filteredData = users.filter(item => item.key !== id);
         setUsers(filteredData);
         Firebase.database().ref('users').child('' + id).remove()},

       },
       { text: "No", onPress: () => console.log("OK Pressed") }
     ],
     { cancelable: false }
   );


            }else{
              Alert.alert(
     "Alert !!",
     "Are you sure you want detele that user!",
     [
       {
         text: "Yes",
         onPress: () => {const filteredData = doctors.filter(item => item.key !== id);
           setDoctors(filteredData);
          Firebase.database().ref('InfoDoctor').child('' + id).remove()},
       },
       { text: "No", onPress: () => console.log("OK Pressed") }
     ],
     { cancelable: false }
     );


            }





}

    return(
<ScrollView>
   <View >

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

         <View style={{marginTop:20,marginLeft:10,flexDirection:'row'}}>
         <TouchableOpacity onPress={()=>navigation.openDrawer()} >
           <Ionicons name="ios-menu" size={38} />
         </TouchableOpacity>

         <TextInput placeholder="search by firstname,lastname..." style={{fontSize:15,alignSelf:'center',marginLeft:SCREEN_WIDTH-340,width:SCREEN_WIDTH-120,height:40,top:5}} onChangeText={(value => searchContacts(value))}/>
          <Ionicons name="md-search" size={30} color="black" style={{top:10}}/>
         </View>
    </LinearGradient>

         <View style={{flexDirection:'row',top:100,alignSelf:'center'}}>
           <TouchableOpacity style={{marginRight:SCREEN_WIDTH-200}}>
            <Fontisto name="doctor" size={30} color={color1} onPress={()=>setuu()}/>
           </TouchableOpacity>
           <TouchableOpacity>
            <Fontisto name="persons" size={30} color={color}  onPress={()=>setu()}/>
           </TouchableOpacity>
          </View>


          {isuser ? <FlatList
                  style={styles.feed}
                  data={users}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => renderPost2(item)}
                  initialNumToRender={3}
               onEndReachedThreshold={0.1}
               ListEmptyComponent={() => (
               <View
                 style={{
                   flex: 1,
                   alignItems: 'center',
                   justifyContent: 'center',
                   marginTop: 50
                 }}
               >
                 <Text style={{fontSize:15, color: 'black' }}>No users Found</Text>
               </View>
             )}
             refreshControl={
            <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
              />
        }
        onEndReached = {getMore}

                  showsVerticalScrollIndicator={true}
              ></FlatList> : <FlatList
                    style={styles.feed}
                    data={doctors}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => renderPost(item)}
                    initialNumToRender={3}
                 onEndReachedThreshold={0.5}
              onMomentumScrollBegin = {() => {onEndReachedCalledDuringMomentum = false;}}
              ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 50
                }}
              >
                <Text style={{fontSize:15, color: 'black' }}>No Doctors Found</Text>
              </View>
            )}
          refreshControl={
         <RefreshControl
         refreshing={isLoading}
         onRefresh={onRefresh}
           />
     }
     onEndReached = {getMore}

                    showsVerticalScrollIndicator={true}
                ></FlatList> }
        </View>
          </ScrollView>

    );
  }


const styles=StyleSheet.create({
    header:{
      alignSelf:'center',
      alignItems:'center',
elevation:30,


    },
  feed: {
      marginHorizontal: 16,
      top:140,
     height:SCREEN_HEIGHT*3,
     
  },
  feedItem: {
      backgroundColor: "#FFF",
      borderRadius: 10,
      padding: 8,
      flexDirection: "row",
      marginVertical: 2,
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
      color: "#838899"
  },
  postImage: {
      width: undefined,
      height: 150,
      borderRadius: 5,
      marginVertical: 16
  }
})
export default HomeAdmin;
