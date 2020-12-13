import React from 'react';
import {Text,View,TouchableOpacity,StyleSheet,TextInput} from 'react-native';
import {Ionicons,Feather} from '@expo/vector-icons';


const Header =({name, openDrawer})=> (
  <View style={styles.header}>
    <TouchableOpacity onPress={()=>openDrawer()}>
      <Ionicons name="ios-menu" size={38} style={styles.ico}/>
    </TouchableOpacity>
    <View style={styles.fakein}>

      <TextInput  placeholder="search" style={styles.input}
      />
       <Feather style={styles.ico} name="search" size={22} color="#000"/>

    </View>
    <Text style={{width:50}}></Text>
  </View>
)
const styles=StyleSheet.create({
  header:{
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
  input:{
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
});
export default Header;
