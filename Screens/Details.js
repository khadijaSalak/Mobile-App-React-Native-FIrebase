import React ,{Component} from 'react';
import {View,Text,Dimensions,ScrollView,StyleSheet,Image,ImageBackground,Platform} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window')
const SCRENE=height-480
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
import {Linking} from 'react-native'
import Firebase from '../config/Firebase';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {Ionicons,FontAwesome,MaterialIcons,Entypo} from '@expo/vector-icons';
import Book from './Book'
export default class Details extends Component{
  constructor(props) {
    //constructor to set default state
    super(props);
    this.state = {
    iconemp:null,
    namm:"",
    ke:"",
    tell:""
    };
  }
static navigationOptions={
  headerShowen:true
}
settt(){

  this.setState({
    iconemp:this.props.route.params.epmt
  })

}
componentDidMount(){

this.settt()


}

setIcon(){
var useid=Firebase.auth().currentUser.uid
var rec=this.props.route.params.re
    this.setState({
      iconemp:!this.state.iconemp
    })

    if(this.state.iconemp==true){
      rec=rec+1

      Firebase.database().ref('InfoDoctor/' +this.props.route.params.keey ).update({
        recommand:rec

      });
      Firebase.database().ref('users/'+useid+'/favdocs/'+this.props.route.params.keey ).set({
        docnam:this.props.route.params.name
      })
    }
    else{
      rec=rec-1
      if(rec<0){rec=0}

      Firebase.database().ref('InfoDoctor/' +this.props.route.params.keey ).update({
        recommand:rec

      });
      Firebase.database().ref('users/'+useid+'/favdocs/').child('' + this.props.route.params.keey).remove();
    }

}
dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else {phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);
 };
  render(){

   const num=this.props.route.params.sur

   const pho=this.props.route.params.tel
   const speci=this.props.route.params.spc

      const keyy=this.props.route.params.keey

    return(
      <View style={{flex:1}}>
   <ScrollView>

       <View  style={{alignSelf:'center',borderTopRightRadius:10,borderTopLeftRadius:10,alignItems:'center',marginTop:17,height:SCRENE-20,width:SCREEN_WIDTH-10,borderTopLeftRadius:10,borderTopRightRadius:10}}>

         <View  style={{width:SCREEN_WIDTH-10,height:SCRENE-20,borderTopRightRadius:10,borderTopLeftRadius:10,opacity:.6,backgroundColor:'#000'}}>
          <Image source={require('../assets/blue.jpg')} style={{resizeMode:'cover',width:SCREEN_WIDTH-10,height:SCRENE-20}}/>
          </View>
        <View style={{marginTop:10,alignItems:'center',position:'absolute'}}>
          <Image source={{uri:this.props.route.params.phot}} style={styles.profileImg}/>
        </View>
        <View style={{flexDirection:'row',marginTop:SCRENE-40,alignSelf:'center',justifyContent:'space-between',marginHorizontal:40,position:'absolute'}}>

        <TouchableOpacity style={{elevation:50,width:80,height:40,backgroundColor:'white',alignItems:'center',padding:7,marginRight:30,borderRadius:5,opacity:0.9}} onPress={()=>{this.dialCall(this.props.route.params.tel)} }>
           <Feather name="phone-call" size={24} color="green" />
        </TouchableOpacity>

        <TouchableOpacity style={{elevation:50,width:80,height:40,alignItems:'center',padding:7,backgroundColor:'white',borderRadius:5,opacity:0.9}} onPress={()=>this.setIcon()}>
          {this.state.iconemp ?  <AntDesign name="staro" size={24} color="gold" /> : <AntDesign name="star" size={24} color="gold" />}

        </TouchableOpacity>
        </View>
       </View>

          <View style={{flexDirection:'row',marginTop:56,marginLeft:5}}>
          <Text style={{color:'gray'}}>  About</Text>
          <Text style={{color:'black'}}> Dr {this.props.route.params.name} {this.props.route.params.sur}</Text>
          </View>
         <View style={{marginTop:8,elevation:7,backgroundColor:'white',borderRadius:5,width:SCREEN_WIDTH-50,height:70,padding:12,alignSelf:'center'}}>
         <Text>hey i am a good doctor!! have an appointement with me  </Text>
         </View>
            <View style={{borderWidth:0.35,borderColor:'gray',marginTop:10,width:SCREEN_WIDTH-30,alignSelf:'center'}}></View>
           <View style={{flexDirection:'row',marginTop:10,elevation:10,borderRadius:3,alignSelf:'center',padding:12,alignItems:'center',width:SCREEN_WIDTH-50,height:50,backgroundColor:'white'}}>
             <Image source={require('../assets/master.png')} style={{width:25,height:25}}/>
             <Text> Tariff :  {this.props.route.params.prix}</Text>
           </View>
           <View style={{flexDirection:'row',marginTop:1,elevation:10,borderRadius:3,alignSelf:'center',padding:12,alignItems:'center',width:SCREEN_WIDTH-50,height:50,backgroundColor:'white'}}>
               <MaterialIcons name="location-city" size={24} color="black" style={{marginRight:30}}/>
             <Text>{this.props.route.params.ciity}</Text>
           </View>
           <View style={{flexDirection:'row',marginTop:1,elevation:10,borderRadius:3,alignSelf:'center',padding:12,alignItems:'center',width:SCREEN_WIDTH-50,height:50,backgroundColor:'white'}}>
             <Entypo name="address" size={20} style={{marginRight:30}}/>
             <Text>{this.props.route.params.add}</Text>
           </View>
           <View style={{flexDirection:'row',marginTop:1,elevation:10,borderRadius:3,alignSelf:'center',marginBottom:90,padding:12,alignItems:'center',width:SCREEN_WIDTH-50,height:50,backgroundColor:'white'}}>
              <Entypo name="old-phone" size={20} color="black" style={{marginRight:30}}/>
             <Text>{this.props.route.params.tel}</Text>
           </View>

      </ScrollView>
<View style={{alignSelf:'center',top:SCREEN_HEIGHT-117,backgroundColor:'transparent',marginTop:-10,height:SCRENE-90,position:'absolute'}}>
      <TouchableOpacity style={{width:150,height:50,marginTop:5,padding:12,elevation:40,borderRadius:30,alignSelf:'center',alignItems:'center'}} onPress={()=>this.props.navigation.navigate("Book",{
        DocKey:keyy,
      //  docname:num,
        //te:pho,
        //spec:speci,
        ismap:false

      })}>
      <LinearGradient
         colors={['#32a0c1','#056299']}
         style={{
           position: 'absolute',
           left: 0,
           right: 0,
           top: 0,
           height: 50,
           borderRadius:30
         }}
       />
       <Text> Book appointement</Text>
      </TouchableOpacity>
</View>
      </View>
    );
  }

}
const styles=StyleSheet.create({
  profileImg:{
    //'#32a0c1','#1fb0db' #66adcc
    width:93,
    height:90,
    borderRadius:50,

  },

})
