import React ,{Component} from 'react';
import { StyleSheet,Button,Keyboard,KeyboardAvoidingView,FlatList,Text, View,Modal,Dimensions ,TouchableOpacity,Image,Platform,TextInput,ActivityIndicator,ImageBackground} from 'react-native';
import Firebase from '../config/Firebase';
import { Ionicons ,icon} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
function Item({ item, navigate }) {
  return (
    <TouchableOpacity style={styles.listItem} onPress={()=>navigate(item.name)}>
      <Ionicons name={item.icon} size={32}  color="gray"/>
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
}
export default class Sidebar extends React.Component {
  state = {
    currentUser: null,
    name:"",
    routes:[
        {
            name:"Home",
            icon:"ios-home"
        },
        {
            name:"Profile",
            icon:"ios-person"
        },
        {
            name:"Settings",
            icon:"ios-settings"
        },
        {
            name:"Logout",
            icon:"md-log-out"
        },
    ]

}

componentDidMount() {
  const { currentUser } = Firebase.auth()

  this.setState({ currentUser })

}
  render() {
    const { currentUser,name } = this.state
    return (

      <View>
      <LinearGradient
      colors={['#32a0c1','#056299']}
      start={{x:0.0,y:1.0}}
      end={{x:1.0,y:1.0}}
      style={styles.user}
      >
      <View style={{borderColor:'#9cd7e4',borderWidth:3,borderRadius:55,alignItems:'center',width:99,height:97,marginTop:19,marginLeft:13}}>
       <Image source={require("../assets/specia.png")} style={styles.profileImg}/>
      </View>
       <Text style={{fontWeight:"bold",fontSize:16,marginTop:10,}}>Account</Text>
       <Text style={{color:"gray",marginBottom:10,color:'white'}}>{currentUser && currentUser.email}</Text>
      </LinearGradient>

     <FlatList
    style={{width:"100%",marginLeft:30,marginTop:20}}
    data={this.state.routes}
    renderItem={({ item }) => <Item  item={item} navigate={this.props.navigation.navigate}/>}
    keyExtractor={item => item.name}
      />

      </View>
      //<View style={styles.sidebarDivider}></View>

    );
  }
}
const styles=StyleSheet.create({
  profileImg:{
  width:91,
  height:90,
  borderRadius:50,
// marginTop:20,
//  marginLeft:20,
},
user:{
  alignItems:'center',
  //alignSelf:'center',
  //backgroundColor:'#63A9DF'//'#1890ab'
},
sidebarDivider:{
  height:1,
  width:"100%",
  backgroundColor:"lightgray",
  marginVertical:10
},
listItem:{
    height:60,
    alignItems:"center",
    flexDirection:"row",
},
title:{
    fontSize:15,

    marginLeft:20
},
})
