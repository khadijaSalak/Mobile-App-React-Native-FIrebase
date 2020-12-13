
import React ,{Component,useState,
  useEffect } from 'react';
import {Text,View,ScrollView,Alert,Dimensions,TouchableOpacity,FlatList,StyleSheet,ActivityIndicator,
RefreshControl} from 'react-native'
import Firebase from '../config/Firebase';
import {Ionicons,Feather,MaterialIcons} from '@expo/vector-icons';
import Swipeout from 'react-native-swipeout'
import { LinearGradient } from 'expo-linear-gradient';
const {width, height} = Dimensions.get('window')
const SCRENE=height-480
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
let onEndReachedCalledDuringMomentum = false;
export default class Notification extends Component{

  constructor(props) {
    super(props);
    this.state = {
      notification:{},
      userID: '',
      notificationcount:0,
      notificationsAvailable: [],
      error: '',
      loading:false,
      active:null
    };

  }

  componentDidMount() {
    var usei=Firebase.auth().currentUser.uid
    let notificationPath = 'InfoDoctor/' + Firebase.auth().currentUser.uid + '/notification/';
           let array=[];
    Firebase.database().ref('InfoDoctor/' + usei + '/notification/').on('value', snapshot => {
   let array = [];
   snapshot.forEach(function(childSnapshot) {
   // const key = childSnapshot.key;
   const childData = childSnapshot.val();

   array.push({ ...childSnapshot.val(),key:childSnapshot.key});

   });
   this.setState({notificationsAvailable:array})
   });

}
deleteNot(id){
  var use=Firebase.auth().currentUser.uid;
  Alert.alert(
"Alert !!",
"Are you sure you want detele this!",
[
{
text: "Yes",
onPress: () => {const filteredData = this.state.notificationsAvailable.filter(item => item.key !== id);
this.setState({
  otificationsAvailable:filteredData
})
Firebase.database().ref('InfoDoctor/'+use+'/notification/').child('' + id).remove()},

},
{ text: "No", onPress: () => console.log("OK Pressed") }
],
{ cancelable: false }
);

}
 onRefresh (){
   setTimeout(() => {
     this.getnoti();
   }, 1000);
 }
async getMore () {
try {
// Set State + Retrieve Users
this.setState({
  loading:true
})
async () => {
await this.getnoti();
}

// Set State
this.setState({
  loading:false
});
}catch (error) {
console.log(error);
}


onEndReachedCalledDuringMomentum = true;


};
getnoti(){
  var usei=Firebase.auth().currentUser.uid
  let notificationPath = 'InfoDoctor/' + Firebase.auth().currentUser.uid + '/notification/';
         let array=[];
  Firebase.database().ref('InfoDoctor/' + usei + '/notification/').on('value', snapshot => {
 let array = [];
 snapshot.forEach(function(childSnapshot) {
 // const key = childSnapshot.key;
 const childData = childSnapshot.val();

 array.push({ ...childSnapshot.val(),key:childSnapshot.key});

 });
 this.setState({notificationsAvailable:array})
 });

}
  renderPost (post){
    const rightous=[
      {
        component: (
          <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',


              }}
          >
           <MaterialIcons name="delete-forever" size={24} color="black" />
          </View>
        ),
        backgroundColor:'lightgray',
        //right:{},
        ///autoClose:"true",
      //  backgroundColor:"transparent",
        //style:{{height:60,elevation:8}}
        //underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        onPress: () => {
        //  alert(this.state.active)
          this.deleteNot(this.state.active)
        },
      },
    ];

        return (

          <Swipeout
          autoClose="true"
          backgroundColor="transparent"
           //style:{{height:60,elevation:8}},
          onClose={()=>{

          }}
          onOpen={()=>{
                  this.setState({active:post.key})
          }}
          right={rightous}
          ///autoClose:"true",

           style={{height:60,elevation:8,marginBottom:5}}>
                  <View style={{height:60,flexDirection:'row',alignSelf:'center',width:SCREEN_WIDTH-10,padding:8,backgroundColor:'white',borderRadius:10}}>
               <View>
                   <Text>content: {post.Content}</Text>
               </View>

       </View>
            </Swipeout>
        );
    };

  render() {
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
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()} >
            <Ionicons name="ios-arrow-back" size={24} color="black" style={{marginLeft:10}} />
             </TouchableOpacity>
           <Text style={{marginLeft:SCREEN_WIDTH-240}}>
              Notifications
           </Text>
           </View>
           </LinearGradient>
        <ScrollView style={{top:100}}>


           <FlatList
                 style={styles.feed}
                 data={this.state.notificationsAvailable}
                 keyExtractor={item => item.key}
                 renderItem={({ item }) => this.renderPost(item)}
                 initialNumToRender={3}
              onEndReachedThreshold={0.1}
  onMomentumScrollBegin = {() => {onEndReachedCalledDuringMomentum = false;}}
  refreshControl={
 <RefreshControl
 refreshing={this.state.loading}
 onRefresh={this.onRefresh}
   />
}
onEndReached = {this.getMore}


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
                   <Text style={{fontSize:15, color: 'black' }}>You do not have any notifications for the moment!</Text>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
