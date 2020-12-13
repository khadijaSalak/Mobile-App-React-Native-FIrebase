import React ,{Component} from 'react';
import {View,Text,CheckBox,Image,StyleSheet,TouchableOpacity} from 'react-native';
import Firebase from'../config/Firebase';
var userid
import Main from './Main'
import Info from './Info'
export default class Genre extends Component{
static navigationOptions={
  headerShowen:true
}
constructor(props) {
    super(props);
     this.state = {
       checked1:false,
       checked2:false,
       Sexx:''
  }
 }

setGenre1(){


  userid= Firebase.auth().currentUser.uid;
  Firebase.database().ref('users/' + userid).update({
    sex:"Men",
  });
  this.props.navigation.push("Info");
}
setGenre2(){


  userid= Firebase.auth().currentUser.uid;
  Firebase.database().ref('users/' + userid).update({
    sex:"Woman",
  });
  this.props.navigation.push("Info");
}
  render(){


    return(
    <View >
       <View style={{alignSelf:'center',alignItems:'center',marginTop:70}}>
        <Text style={{fontSize:20}}> Are you Male or Female? </Text>
       </View>
       <View style={{alignSelf:'center',flexDirection:"row" ,alignItems:'center',marginTop:50}}>
       <TouchableOpacity style={{elevation:10,marginLeft:10}}
            onPress={()=>this.setGenre1()}
             >

                   <Image  style={{width:140,height:140,borderRadius:74,marginTop:140,marginLeft:20}} source={require('../assets/male11.jpg')} />
        </TouchableOpacity >
        <View style={{width:30}}></View>
             <TouchableOpacity    style={{marginRight:10}}    onPress={()=>this.setGenre2()}>

            <Image source={require('../assets/fem11.jpg')} style={{width:140,height:140,borderRadius:95,marginTop:140,marginRight:10}}/>
          </TouchableOpacity>
       </View>

       </View>

    );
  }

}
