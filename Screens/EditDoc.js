import React ,{Component
  } from 'react';
  import Firebase from'../config/Firebase';
import {Ionicons,Feather,AntDesign} from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient';
import {View,Text,Image,StyleSheet,TextInput,Dimensions,ScrollView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window')
const SCRENE=height-480
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width

var userid
export  default class EditDoc extends Component{

constructor(props){
  super(props);
  this.state = {
  name:"",
  last:"",
  price:"",
  city:"",
  sex:"Man",
  adre:"",
  spec:"",
  te:"",
  checked1:false,
  checked2:false,
  res1:false,
  icori1:true,
  res2:false,
  icori2:true,
  res3:false,
  icori3:true,
  res4:false,
  icori4:true,
  res5:false,
  icori5:true,
  res6:false,
  icori6:true,
  res7:false,
  icori7:true
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
    price:this.props.route.params.pri.toString(),
    last:this.props.route.params.las,
    city:this.props.route.params.ci,
    sex:this.props.route.params.se,

    te:this.props.route.params.te,
    spec:this.props.route.params.spe,
    adre:this.props.route.params.ad,
  })
}
handle1(){

    this.setState({
      res1:!this.state.res1,
      icori1:!this.state.icori1
    })



 }
 handle2(){
     this.setState({
       res2:!this.state.res2,
       icori2:!this.state.icori2
     })
  }
  handle3(){
      this.setState({
        res3:!this.state.res3,
        icori3:!this.state.icori3
      })
   }
   handle4(){
       this.setState({
         res4:!this.state.res4,
         icori4:!this.state.icori4
       })
    }
    handle5(){
        this.setState({
          res5:!this.state.res5,
          icori5:!this.state.icori5
        })
     }
     handle6(){
         this.setState({
           res6:!this.state.res6,
           icori6:!this.state.icori6
         })
      }
      handle7(){
          this.setState({
            res7:!this.state.res7,
            icori7:!this.state.icori7
          })
       }

edit(){
  const{name,city,last,adre,price,te,spec,sex}=this.state
  var se
     if(this.state.checked1){
       se="Man"
     }
     if(this.state.checked2){
       se="Woman"
     }
     if(this.state.checked1&&this.state.checked2){alert("Either your a man or a Woman")}
  userid= Firebase.auth().currentUser.uid;
  Firebase.database().ref('InfoDoctor/' + userid).update({
    Name:name,
    Surname:last,
    price:price,
    City:city,
    Sex:se,
     Adress:adre,
      Specialite:spec,
      Tel:te,

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
         <TouchableOpacity onPress={()=>navigation.goBack()} >
         <Ionicons name="ios-arrow-back" size={24} color="black" style={{marginLeft:10}} />
          </TouchableOpacity>
        <Text style={{marginLeft:SCREEN_WIDTH-240}}>
           Edit Profile
        </Text>
        </View>
        </LinearGradient>

       <Image source={require('../assets/pencil1.png')} style={{width:100,height:100,alignSelf:'center',marginLeft:20,marginTop:90}}/>

      <View style={{alignSelf:'center',flexDirection:'column',alignItems:'center',marginTop:15}}>
      <View style={{alignSelf:'center',height:60,top:10,width:SCREEN_WIDTH,marginBottom:5,alignItems:'center',elevation:5,padding:12,backgroundColor:'white'}}>
          <TouchableOpacity onPress={()=>this.handle1()} style={{flexDirection:'row'}}>
                <Text style={{marginRight:SCREEN_WIDTH-270,width:SCREEN_WIDTH-150}}>FirstName : { this.state.name}</Text>
     <MaterialIcons name="edit" size={24} color="black" />
          </TouchableOpacity>
      </View >
      {this.state.res1 && <View style={{flexDirection:'row'}}>

      <TextInput placeholder="Name"  style={styles.input}
        value={this.state.name}
         onChangeText={name => this.setState({name})}
      />
      </View>}
      <View style={{alignSelf:'center',height:60,top:10,width:SCREEN_WIDTH,marginBottom:5,alignItems:'center',elevation:5,padding:12,backgroundColor:'white'}}>
          <TouchableOpacity onPress={()=>this.handle2()} style={{flexDirection:'row'}}>
                <Text style={{marginRight:SCREEN_WIDTH-270,width:SCREEN_WIDTH-150}}> LastName : {"  "+this.state.last}</Text>
                <MaterialIcons name="edit" size={24} color="black" />
          </TouchableOpacity>
      </View >
      {this.state.res2 && <View style={{flexDirection:'row'}}>

      <TextInput placeholder="LastName"  style={styles.input}
      value={this.state.last}
      autoFocus
       onChangeText={last => this.setState({last})}
       />
      </View>}
      <View style={{alignSelf:'center',height:60,top:10,width:SCREEN_WIDTH,marginBottom:5,alignItems:'center',elevation:5,padding:12,backgroundColor:'white'}}>
          <TouchableOpacity onPress={()=>this.handle3()} style={{flexDirection:'row'}}>
                <Text style={{marginRight:SCREEN_WIDTH-270,width:SCREEN_WIDTH-150}}> City:{" "+this.state.city}</Text>
                <MaterialIcons name="edit" size={24} color="black" />
          </TouchableOpacity>
      </View >
      {this.state.res3 && <View style={{flexDirection:'row'}}>

      <TextInput  placeholder="city"  style={styles.input}
      value={this.state.city}
       onChangeText={city => this.setState({city})}/>
       </View>}
       <View style={{alignSelf:'center',height:60,top:10,width:SCREEN_WIDTH,marginBottom:5,alignItems:'center',elevation:5,padding:12,backgroundColor:'white'}}>
           <TouchableOpacity onPress={()=>this.handle4()} style={{flexDirection:'row'}}>
                 <Text style={{marginRight:SCREEN_WIDTH-270,width:SCREEN_WIDTH-150}}> Adress:{"  "+this.state.adre}</Text>
                 <MaterialIcons name="edit" size={24} color="black" />
           </TouchableOpacity>
       </View >
       {this.state.res4 && <View style={{flexDirection:'row'}}>

       <TextInput  placeholder="Adress"  style={styles.input}
       value={this.state.adre}
        onChangeText={adre => this.setState({adre})}/>
        </View>}
        <View style={{alignSelf:'center',height:60,top:10,width:SCREEN_WIDTH,marginBottom:5,alignItems:'center',elevation:5,padding:12,backgroundColor:'white'}}>
            <TouchableOpacity onPress={()=>this.handle5()} style={{flexDirection:'row'}}>
                <Text style={{marginRight:SCREEN_WIDTH-270,width:SCREEN_WIDTH-150}}>Speciality : {" "+ this.state.spec}</Text>
                  <MaterialIcons name="edit" size={24} color="black" />
            </TouchableOpacity>
        </View >
        {this.state.res5 && <View style={{flexDirection:'row'}}>

        <TextInput  placeholder="Speciality"  style={styles.input}
        value={this.state.spec}
         onChangeText={spec=> this.setState({spec})}/>
         </View>}
         <View style={{alignSelf:'center',height:60,top:10,width:SCREEN_WIDTH,marginBottom:5,alignItems:'center',elevation:5,padding:12,backgroundColor:'white'}}>
             <TouchableOpacity onPress={()=>this.handle6()} style={{flexDirection:'row'}}>
                   <Text style={{marginRight:SCREEN_WIDTH-270,width:SCREEN_WIDTH-150}}>Tel: {this.state.te}</Text>
                   <MaterialIcons name="edit" size={24} color="black" />
             </TouchableOpacity>
         </View >
         {this.state.res6 &&<View style={{flexDirection:'row'}}>

         <TextInput  placeholder="tel"  style={styles.input}
         value={this.state.te}
          onChangeText={te=> this.setState({te})}/>
          </View>}
          <View style={{alignSelf:'center',height:60,top:10,width:SCREEN_WIDTH,marginBottom:5,alignItems:'center',elevation:5,padding:12,backgroundColor:'white'}}>
              <TouchableOpacity onPress={()=>this.handle7()} style={{flexDirection:'row'}}>
                    <Text style={{marginRight:SCREEN_WIDTH-270,width:SCREEN_WIDTH-150}}> Price : {this.state.price}</Text>
                    <MaterialIcons name="edit" size={24} color="black" />
              </TouchableOpacity>
          </View >
          {this.state.res7 && <View style={{flexDirection:'row'}}>
          
          <TextInput  placeholder="tel"  style={styles.input}
          value={this.state.price}
           onChangeText={price=> this.setState({price})}/>
           </View>}
      </View>
      <View style={{flexDirection:'row',alignSelf:'center',marginTop:10,marginLeft:60}}>
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
   input1:{
     //backgroundColor:'#7d9296',

     width:SCREEN_WIDTH-140,

     height:60 ,
     padding:5,
     marginLeft:30,
     paddingLeft:20,
     marginTop:5,

     borderRadius:5,
     elevation:10,
     justifyContent:'center',
     color:'black',
      backgroundColor:'white',

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

 },
  input:{marginTop:12,height:50,width:SCREEN_WIDTH-80,elevation:2,borderRadius:5,padding:15,marginBottom:8}
})
