import React ,{Component} from 'react';
import {View,Text,Dimensions,StyleSheet,ScrollView,TextInput,TouchableWithoutFeedback,Image,SafeAreaView,TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import Firebase from '../config/Firebase';
const {width, height} = Dimensions.get('window')
const SCRENE=height-480
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
import { LinearGradient } from 'expo-linear-gradient';
export default class AppointDeatails extends Component{
  constructor(props){
    super(props);
    this.state = {
    motif:"",
    key:"",
    dat:""

    };
  }
  componentDidMount(){
  }
  edit(){
    this.setState({
      key:this.props.route.params.dock,
      dat:this.props.route.params.date
    })

    const ky=this.props.route.params. dock
    var userid= Firebase.auth().currentUser.uid;
    Firebase.database().ref('InfoDoctor/' +this.props.route.params. dock+'/appointementdoc/'+this.props.route.params.date+'/'+userid+'/').update({
      motif:this.state.motif,

    });
    Firebase.database().ref('users/' +userid+'/appointementuser/'+this.props.route.params.date).update({
      motif:this.state.motif,

    });
    alert("you have got your appointement!")
    if(this.props.route.params.ismp){
      this.props.navigation.navigate("Mapp")
    }
    else{
      this.props.navigation.navigate("Details")
    }

    //this.props.navigation.goBack();
  }
  render(){
    return(

       <ScrollView style={{alignSelf:'center',marginTop:10,width:SCREEN_WIDTH}}>
       <View style={{borderRadius:90,elevation:40,marginTop:20,width:150,height:150,alignItems:'center',padding:5,alignSelf:'center'}}>
        <Image source={require('../assets/appoi.jpg')} style={{width:140,height:140,borderRadius:90}}/>
        </View>

        <KeyboardAvoidingView behavior="padding">

      <View style={{flexDirection:'row',marginTop:SCREEN_HEIGHT-600,elevation:10,borderRadius:3,alignSelf:'center',padding:12,alignItems:'center',width:SCREEN_WIDTH-50,height:50,backgroundColor:'white'}}>
           <Fontisto name="doctor" size={24} color="black" />
        <Text style={{marginLeft:5}}>Dr.{this.props.route.params.doctornam}</Text>
        </View>
        <View style={{flexDirection:'row',marginTop:1,elevation:10,borderRadius:3,alignSelf:'center',padding:12,alignItems:'center',width:SCREEN_WIDTH-50,height:50,backgroundColor:'white'}}>
       <Fontisto name="date" size={24} color="black" />
        <Text style={{marginLeft:5}}>{this.props.route.params.date}</Text>
        </View>
        <View style={{flexDirection:'row',marginTop:1,elevation:10,borderRadius:3,alignSelf:'center',padding:12,alignItems:'center',width:SCREEN_WIDTH-50,height:50,backgroundColor:'white'}}>
         <Image source={require('../assets/spc.jpg')} style={{width:40,height:40}}/>
        <Text >{this.props.route.params.specialit}</Text>
         </View>
         <View   style={{flexDirection:'row',marginTop:1,elevation:10,borderRadius:3,alignSelf:'center',padding:12,alignItems:'center',width:SCREEN_WIDTH-50,height:50,backgroundColor:'white'}}>

        <TextInput
         value={this.state.motif}
         onChangeText={motif=>this.setState({motif})}
          placeholder=" say motif..." />
        </View>

        <TouchableOpacity style={{width:150,height:50,marginTop:20,padding:12,elevation:40,borderRadius:30,alignSelf:'center',alignItems:'center',marginBottom:100}} onPress={()=>this.edit()}>
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

         <Text> OK</Text>
        </TouchableOpacity>

        </KeyboardAvoidingView>
        </ScrollView>


    );
  }

}
const styles=StyleSheet.create({

  input:{
    marginTop:20,
    fontSize:15,
    borderBottomWidth:1.5,
    padding:10

  }
})
