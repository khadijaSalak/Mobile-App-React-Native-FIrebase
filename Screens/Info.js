import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,TextInput,Dimensions
} from 'react-native';
import Main from './Main';
import { MaterialIcons } from '@expo/vector-icons';
import Firebase from'../config/Firebase';
var userid
const {width, height} = Dimensions.get('window')

const SCREEN_HEIGHT = height-420
const SCREEN_WIDTH = width-40
const widthlef= width-130
export default class Info extends Component{
static navigationOptions={
  headerShowen:true
}
constructor(props) {
    super(props);
     this.state = {
      city:"",
      age:""
  }
 }
setGenre2(){
const { city, age } = this.state;
if(city.length==0){
    alert("would you set your city please!")
}
else{
  userid= Firebase.auth().currentUser.uid;
  Firebase.database().ref('users/' + userid).update({
    city:city,
    age:age
  });
  this.props.navigation.push("Main");
}

}
  render(){
    return(
<View>
       <View style={{alignSelf:'center',alignItems:'center',marginTop:100}}>
        <Text style={{fontSize:20,marginBottom:50}} >Set Your Information Please</Text>
        <TextInput  style={styles.input} placeholder="Age"
         value={this.state.age}
         onChangeText={age => this.setState({ age})}
        />
        <View style={{height:20}}></View>
        <TextInput style={styles.input} placeholder="City"
          value={this.state.city}
          onChangeText={city => this.setState({ city})}
        />
         </View>
      <View style={{marginTop:SCREEN_HEIGHT}}>
        <TouchableOpacity style={{backgroundColor:"#63A9DF",width:90,height:50,padding:15,flexDirection:'row',borderRadius:15,alignItems:'center',elevation:5,marginLeft:widthlef}}
       onPress={()=>this.setGenre2()}
        >
           <Text>Next</Text>
           <MaterialIcons name="navigate-next" size={24} color="black" />
        </TouchableOpacity>
      </View>

       </View>
    );
  }

}
const styles=StyleSheet.create({

  input:{

      borderRadius:10,
      elevation:3,
      width:SCREEN_WIDTH,
      height:60,
      padding:20,
      borderColor:'black'
  }


})
