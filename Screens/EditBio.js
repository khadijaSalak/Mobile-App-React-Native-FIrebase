import React,{Component,useState} from 'react';
import {Text,View,TouchableOpacity,Dimensions,TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
  import Firebase from'../config/Firebase';
const {width, height} = Dimensions.get('window')
const SCRENE=height-480
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
var userid
export default class EditBio extends Component{
  constructor(props){
    super(props);
    this.state={
      txt:"",
    }
  }
  edit(){
const{txt}=this.state
    var useid= Firebase.auth().currentUser.uid;
    Firebase.database().ref('InfoDoctor/' + useid).update({
      Bio:txt

    });
    this.props.navigation.goBack();

  }
  componentDidMount(){
  this.setState({

       txt:this.props.route.params.bi
  })
  }
render(){
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
         <Ionicons name="ios-arrow-back" size={24} color="black" style={{marginLeft:10}}/>
        <Text style={{marginLeft:SCREEN_WIDTH-240}}>
           Edit your Bio
        </Text>
        </View>
        </LinearGradient>
        <View style={{top:SCREEN_HEIGHT/2-100,width:SCREEN_WIDTH-70,backgroundColor:'white',alignSelf:'center',borderRadius:10,height:150,padding:10,elevation:20}}>
          <TextInput placeholder="here goes your Bio"  style={{width:SCREEN_WIDTH-100}}
           value={this.state.txt}
           onChangeText={txt => this.setState({txt})}
           numberOfLines={5}
           multiline={true}
          />
        </View>

        <LinearGradient
           colors={['#32a0c1','#056299']}
           start={{x:0.0,y:1.0}}
           end={{x:1.0,y:1.0}}
           style={{
             position: 'absolute',

             top: SCREEN_HEIGHT-200,
             elevation:50,
        alignSelf:'center',
        alignItems:'center',
        padding:10,
             height: 50,
             width:100,
             borderRadius:10
           }}
         >
         <TouchableOpacity onPress={()=>this.edit()}>
         <Text>Save</Text>
        </TouchableOpacity>
        </LinearGradient>
    </View>

)

}

}
