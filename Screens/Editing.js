import React ,{Component
  } from 'react';
  import Firebase from'../config/Firebase';
import {Ionicons,Feather} from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient';
import {View,Text,Image,StyleSheet,TextInput,Dimensions,ScrollView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window')
const SCRENE=height-480
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width

var userid
export  default class Editing extends Component{

constructor(props){
  super(props);
  this.state = {
  name:"",
  age:"",
  city:"",
  sex:"man",
  checked1:false,
  checked2:false
  };
}
reset(){
  var sex
  if(this.props.route.params.se=='Man'){
    this.setState({
      checked1:true,

    })
  }
  if(this.props.route.params.se=='Woman'){
    this.setState({
      checked2:true,

    })
  }

  this.setState({
    name:this.props.route.params.us,
    age:this.props.route.params.ag.toString(),
    city:this.props.route.params.ci,
    sex:this.props.route.params.se
  })
}
edit(){
  var se
     if(this.state.checked1){
       se="Man"
     }
     if(this.state.checked2){
       se="Woman"
     }
  userid= Firebase.auth().currentUser.uid;
  Firebase.database().ref('users/' + userid).update({
    sex:se,
    age:this.state.age,
    username:this.state.name,
    city:this.state.city

  });
  this.props.navigation.goBack();

}
 componentDidMount(){
   this.reset();
 }
cancel(){
  this.reset();
  this.props.navigation.goBack();
}
render(){

    return(
    <ScrollView>
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
           Edit Profile
        </Text>
        </View>
        </LinearGradient>

       <Image source={require('../assets/pencil1.png')} style={{width:100,height:100,alignSelf:'center',marginLeft:20,marginTop:80}}/>
      <View style={{alignSelf:'center',flexDirection:'column',alignItems:'center',marginTop:15}}>
      <View style={{flexDirection:'row'}}>
      <Text style={{marginTop:20,marginRight:5,alignItems:'center'}}>Name </Text>
      <TextInput placeholder="Name"  style={styles.input}
        value={this.state.name}
         onChangeText={name => this.setState({name})}
      />
      </View>
      <View style={{flexDirection:'row'}}>
      <Text style={{marginTop:20,marginRight:15,alignItems:'center'}}>Age </Text>
      <TextInput placeholder="Age"  style={styles.input}
      value={this.state.age}
       onChangeText={age => this.setState({age})}
       />
      </View>
      <View style={{flexDirection:'row'}}>
      <Text style={{marginTop:20,marginRight:15,alignItems:'center'}}>City </Text>
      <TextInput  placeholder="city"  style={styles.input}
      value={this.state.city}
       onChangeText={city => this.setState({city})}/>
       </View>
      </View>
      <View style={{flexDirection:'row',alignSelf:'center',marginTop:10,marginLeft:30}}>
      <CheckBox
title='Man'
checked={this.state.checked1}
containerStyle={{backgroundColor:'transparent'}}
onPress={() => this.setState({checked1: !this.state.checked1})}
/>
<CheckBox
  title='Woman'
  containerStyle={{backgroundColor:'transparent'}}
  checked={this.state.checked2}
  onPress={() => this.setState({checked2: !this.state.checked2})}
/>
      </View>
      <View style={{marginTop:20}}>
      <TouchableOpacity style={{width:150,height:50,marginTop:5,padding:12,elevation:40,borderRadius:30,alignSelf:'center',alignItems:'center'}} onPress={()=>this.edit()}>
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

       <Text> Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{width:143,alignItems:'center',alignSelf:'center',paddingBottom:-15,paddingTop:10,elevation:20,borderRadius:30,backgroundColor:'white',height:43,marginTop:20}}   onPress={()=>this.cancel()}>


    <Text style={{color:'#32a0c1'}}> Cancel</Text>
      </TouchableOpacity>


      </View>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
    </ScrollView>
    );
  }
}
const styles=StyleSheet.create({
   container:{
     //flex:1,
     marginTop:20,
     width:SCREEN_WIDTH,
     height:65,
     backgroundColor:'gray',
     opacity:0.5
   },
   sidebarDivider:{
    // height:1,
     width:250,
     alignSelf:'center',
     backgroundColor:"lightgray",
     //marginVertical:10,
     borderColor:"gray",
     borderWidth:0.6
   },
   sidebarDivider2:{
     width:250,
     alignSelf:'center',
     backgroundColor:"lightgray",
     //marginVertical:10,
     borderColor:"gray",
     borderWidth:0.6
   },
   buttontext:{textAlign:'center',color:'white',padding:15,marginLeft:1,
 marginRight:1,width:148},
   profileImg:{
     width:91,
     height:90,
     borderRadius:50,
 },
   touch:{
     alignSelf:'center',
     marginTop:50
   },
   edi:{
     marginTop:10,
     width:40,
     height:40,


   },
   input:{
     //backgroundColor:'#7d9296',

     width:SCREEN_WIDTH-85,

     height:60 ,
     padding:5,

     paddingLeft:20,
     marginTop:5,

     borderRadius:5,
     elevation:3,
     justifyContent:'center',
     color:'black',
      //backgroundColor:'white',

     //borderBottomColor: '#000000',
      //borderBottomWidth: 1,
      paddingHorizontal:10,
   },
   use:{
     flexDirection: 'row',
     //justifyContent: 'space-around',
     padding: 8,

     borderRadius:10,
   },
   imguser:{
     shadowColor:'#000',
     shadowOffset:{
       width:20,
       height:12,
     },
     shadowOpacity:0.5,
     shadowRadius:16.00,
     elevation:40,
     borderColor:'#9cd7e4',
     borderWidth:3,
     borderRadius:55,
     alignItems:'center',
     backgroundColor:'#1890ab',
     width:99,
     height:97,
     marginLeft:13,
     marginTop:-40
   },
   use2:{
     flexDirection: 'row',
     //justifyContent: 'space-around',
     padding: 8,




    height:150,
     //alignItems:'center',
     //padding:20,
     paddingTop:5,
     width:357,
     borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
     //marginTop:5,
     alignSelf:'center',
     backgroundColor:'#1890ab'
     //backgroundColor:'#4bacd2'
   },
   img11:{
   color:'#63A9DF',
   fontSize:14,
   fontWeight:'bold',
   width:65,
     marginTop:38,
     marginRight:20
   },
   shadw:{
     shadowColor:'#000',
     shadowOffset:{
       width:200,
       height:300,
     },
     shadowOpacity:0.5,
     shadowRadius:16.00,
     elevation:24,
   },
   map:{
     shadowColor:'black',
     shadowOffset:{
       width:5,
       height:12,
     },
     shadowOpacity:1,
     shadowRadius:16.00,
     elevation:30,
      alignSelf:'center',
    backgroundColor: 'white',
    //  marginTop:60,
      //borderColor:'black',
      //borderWidth:1,
      borderRadius:20,
      //borderTopRightRadius:0,
    //  height:300,
      paddingBottom:15,

   justifyContent:"space-between",

 }
})
