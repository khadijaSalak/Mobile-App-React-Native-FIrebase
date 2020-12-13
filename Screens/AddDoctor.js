import React ,{Component,useState,useEffect} from 'react';
import {View,Text,ScrollView,Alert,StyleSheet,Keyboard,KeyboardAvoidingView,Dimensions,FlatList,SafeAreaView,Image,TextInput,
  ActivityIndicator,
  RefreshControl} from 'react-native';
import Firebase from'../config/Firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Ionicons,Feather,FontAwesome} from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto,AntDesign } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import DetailsAdmin from './DetailsAdmin';
import * as ImagePicker from 'expo-image-picker';
const {width, height} = Dimensions.get('window')
const SCRENE=height-480
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
import { LinearGradient } from 'expo-linear-gradient';
var docuse=0;
export default class AddDoctor extends Component{
  constructor(props){
    super(props);
    this.state = {
    name:"",
    email:"",
    city:"",
    lastname:"",
    password:"",
    tel:"",
    adress:"",
    price:"",
    specialite:"",
    sex:"",
    phot:"",
    latitude:null,
    longitude:null,
    checked1:false,
    checked2:false,
    res:false,
    icori:true,
    res1:false,
    icori1:true
    };
  }
  verifieremail(email){
    const emailIsValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    if(emailIsValid)return true;
    return false;
  }
 handle(){
   this.setState({
     res:!this.state.res,
     icori:!this.state.icori
   })

  }
  handle1(){
    this.setState({
      res1:!this.state.res1,
      icori1:!this.state.icori1
    })

   }
   _handleError(error){
     alert("Email is not valid")
   }
registre(){
  if(this.state.checked1){
    this.setState({
      sex:'Man'
    })
  }else if(this.state.checked2){
    this.setState({
      sex:'Woman'
    })

  }
  if(this.state.checked1&&this.state.checked2){
    alert("define one genre for that Doctor")
  }

const { email, password } = this.state
//if(!this.verifieremail(email)){alert("Email is badly formated")}
const{name,city,lastname,adress,price,tel,specialite,sex,phot,latitude,longitude}=this.state
if(city==""&&name==""&&lastname==""&&latitude==null&&longitude==null&&adress==""&&price==""&&tel==""&&specialite==""&&phot==""){alert("Set all information!!")}
else if(city==""){alert("City field is empty!!")}
else if(name==""){alert("Firstname field is empty!!")}
else if(lastname==""){alert("Lastname  field is empty!!")}
else if(adress==""){alert("Adress field empty!!")}
else if(price==""){alert("Price field is empty!!")}
else if(email==""){alert("Email is required field is empty!!")}
else if(password==""){alert("Passwor is not valid!!")}
else if(tel==""){alert("Phone field is empty!!")}
else if(specialite==""){alert("Speciality field is empty!!")}
else if(phot==""){alert("Do not forget to add photo!!")}
else if(latitude==null){alert("latitude field is empty!!")}
else if(longitude==null){alert("longitude field is empty")}

Firebase.auth().createUserWithEmailAndPassword(email,password).then((success) => {
              var user = Firebase.auth().currentUser;
              var uid;
              if (user != null) {
                  uid = user.uid;
                  //docuse= user.uid;
              }
              try{
              var firebaseRef =Firebase.database().ref('InfoDoctor/'+uid);
                firebaseRef.set({
                  Name:name,
                  City:city,
                  Surname:lastname,
                Email:email,
                  Adress:adress,
                  price:price,
                  Tel:tel,
                  Specialite:specialite,
                  Sex:sex,
                  latitude:latitude,
                  longitude:longitude,
                  recommand:0,
                  Bio:"i am a good doctor",
                  photo:phot
                })
              }catch(err){
                alert(arr)
              }
            })
            .catch(error => this._handleError(error))
              alert("New Doctor added!!")
     this.setState({

       name:"",
       email:"",
       city:"",
       lastname:"",
       password:"",
       tel:"",
       adress:"",
       price:"",
       specialite:"",
       sex:"",
        phot:"",
           latitude:null,
           longitude:null,
       checked1:false,
       checked2:false

     })
};
async pickImage  (){
var useruid=Firebase.auth().currentUser.uid
   let result = await ImagePicker.launchImageLibraryAsync({
     mediaTypes: ImagePicker.MediaTypeOptions.All,
     allowsEditing: true,
     aspect: [4, 3],
     quality: 1,
   });

   console.log(result);

   if (!result.cancelled) {
     //this.setState({phot:result.uri});
     this.uploadImage(result.uri)

   }else{
     alert("no photo selected!")
   }
 };
   async uploadImage (uri){
   try{
     const response = await fetch(uri);
     const blob = await response.blob();
    docuse=docuse+1;
     var ref = Firebase.storage().ref().child("docImg/"+docuse);
     const snapshot= ref.put(blob);
      ref.getDownloadURL()
              .then((downloadUrl) => {
                console.log("File available at: " + downloadUrl);

               // food.image = downloadUrl;
                //delete food.imageUri;
       this.setState({
         phot:downloadUrl,
       })

              })


   }catch(err){
     console.log(err)
   }

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

         height: 70,
         width:SCREEN_WIDTH
       }}
       >
       <View style={{top:30,flexDirection:'row'}}>
               <Ionicons name="ios-arrow-back" size={28} style={{marginLeft:10,marginRight:SCREEN_WIDTH-250}} onPress={()=>this.props.navigation.goBack()}/>
               <Text >Add a new Doctor</Text>
       </View>
       </LinearGradient>

<ScrollView style={{marginTop:90}}>
     <View>
     <TouchableOpacity style={{borderWidth:1.5,borderColor:'gray',alignSelf:'center',alignItems:'center',borderRadius:53,width:103,height:103}} onPress={()=>this.pickImage()}>
     {this.state.phot!="" ? <Image source={{uri:this.state.phot}} style={{width:100,height:100,borderRadius:50}}/>:<Image source={require('../assets/profdoc.jpg')} style={{width:100,height:100,borderRadius:50}}/>}
     </TouchableOpacity>
     <View style={{width:38,height:38,alignItems:'center',backgroundColor:"#fff", shadowOpacity:0,alignSelf:'center', elevation:35,borderRadius:40,paddingTop:8,paddingLeft:5,paddingRight:5,marginTop:-30,marginLeft:60,marginBottom:20}}>
          <FontAwesome name="camera" size={24} color="gray" />
      </View>
     </View>
     <View style={{alignSelf:'center',height:60,top:10,width:SCREEN_WIDTH,marginBottom:10,alignItems:'center',elevation:5,padding:12,backgroundColor:'white'}}>
         <TouchableOpacity onPress={()=>this.handle()} style={{flexDirection:'row'}}>
               <Text style={{marginRight:SCREEN_WIDTH-220}}> Enter Personnel Information</Text>
               { this.state.icori ? <AntDesign name="rightcircleo" size={24} color="black" />:<AntDesign name="downcircleo" size={24} color="black" />}
         </TouchableOpacity>
     </View >


       {this.state.res &&<View style={{alignSelf:"center",alignItems:"center"}}>
         <View style={{flexDirection:'row',alignSelf:'center',marginTop:20}}>
            <View style={styles.sparate}>
            </View>
            <Text>Personnel Information</Text>
            <View style={styles.sparate}>
            </View>
        </View>
         <View style={{alignSelf:'center',alignItems:'center',backgroundColor:'white',borderRadius:10,elevation:14,top:10,marginBottom:12}}>
        <TextInput  value={this.state.name}
         onChangeText={name => this.setState({name})}   placeholder="firstname" style={{borderBottomColor:'black',borderBottomWidth:1,marginTop:20,width:SCREEN_WIDTH-160}}/>
        <TextInput  value={this.state.lastname}
         onChangeText={lastname => this.setState({lastname})} placeholder="lastname"  style={{borderBottomColor:'black',borderBottomWidth:1,marginTop:20,width:SCREEN_WIDTH-160}}/>
        <TextInput  value={this.state.email}
         onChangeText={email => this.setState({email})}  placeholder="Email"     style={{borderBottomColor:'black',borderBottomWidth:1,marginTop:20,width:SCREEN_WIDTH-160}}/>
        <TextInput  value={this.state.password}
         onChangeText={password => this.setState({password})} placeholder="password"   style={{borderBottomColor:'black',borderBottomWidth:1,marginTop:20,width:SCREEN_WIDTH-160}}/>
        <TextInput   value={this.state.tel}
         onChangeText={tel => this.setState({tel})}  placeholder="tel"   style={{borderBottomColor:'black',borderBottomWidth:1,marginTop:20,width:SCREEN_WIDTH-160}}/>
        <View style={{flexDirection:'row',alignSelf:'center',marginTop:5,marginLeft:20,top:8}}>
        <CheckBox
  title='Man'
  checked={this.state.checked1}
  containerStyle={{backgroundColor:'transparent',borderColor:'transparent'}}
  onPress={() => this.setState({checked1: !this.state.checked1})}
  />
  <CheckBox
    title='Woman'
    containerStyle={{backgroundColor:'transparent',borderColor:'transparent'}}
    checked={this.state.checked2}
    onPress={() => this.setState({checked2: !this.state.checked2})}
  />
        </View>

        </View>
        </View>
      }
      <View style={{alignSelf:'center',height:60,top:10,width:SCREEN_WIDTH,alignItems:'center',elevation:5,padding:12,backgroundColor:'white'}}>
          <TouchableOpacity onPress={()=>this.handle1()} style={{flexDirection:'row'}}>
                <Text style={{marginRight:SCREEN_WIDTH-240}}> Enter Professional Information</Text>
                { this.state.icori1 ? <AntDesign name="rightcircleo" size={24} color="black" />:<AntDesign name="downcircleo" size={24} color="black" />}
          </TouchableOpacity>
      </View >
      {this.state.res1 &&<View style={{alignSelf:"center",alignItems:"center"}}>
        <View style={{flexDirection:'row',alignSelf:'center',top:20}}>
            <View style={styles.sparate}>
            </View>
            <Text>Professional Information</Text>
            <View style={styles.sparate}>
            </View>
        </View>
        <KeyboardAvoidingView  style={{alignSelf:'center',alignItems:'center',backgroundColor:'white',borderRadius:10,elevation:14,top:30,width:SCREEN_WIDTH-100}}>
         <TextInput   value={this.state.spacialite}
          onChangeText={specialite => this.setState({specialite})}   placeholder="Specialite" style={{borderBottomColor:'black',borderBottomWidth:1,marginTop:20,width:SCREEN_WIDTH-160}}/>
         <TextInput  value={this.state.city}
          onChangeText={city => this.setState({city})}   placeholder="City"  style={{borderBottomColor:'black',borderBottomWidth:1,marginTop:20,width:SCREEN_WIDTH-160}}/>
         <TextInput value={this.state.adress}
          onChangeText={adress => this.setState({adress})} placeholder="Adress"     style={{borderBottomColor:'black',borderBottomWidth:1,marginTop:20,width:SCREEN_WIDTH-160}}/>
         <TextInput value={this.state.price}
          onChangeText={price => this.setState({price})}  placeholder="price"   style={{borderBottomColor:'black',borderBottomWidth:1,marginTop:20,width:SCREEN_WIDTH-160,marginBottom:20}}/>
          <TextInput value={this.state.latitude}
           onChangeText={latitude => this.setState({latitude})}  placeholder="latitude"   style={{borderBottomColor:'black',borderBottomWidth:1,marginTop:20,width:SCREEN_WIDTH-160,marginBottom:20}}/>
           <TextInput value={this.state.longitude}
            onChangeText={longitude => this.setState({longitude})}  placeholder="longitude"   style={{borderBottomColor:'black',borderBottomWidth:1,marginTop:20,width:SCREEN_WIDTH-160,marginBottom:20}}/>

        </KeyboardAvoidingView>
        </View>
        }
        <TouchableOpacity style={{width:150,height:50,marginTop:50,padding:12,elevation:40,borderRadius:30,alignSelf:'center',alignItems:'center'}} onPress={()=>this.registre()}>
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

         <Text> Add</Text>
</TouchableOpacity>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>

        </ScrollView>

         </View>

    );
  }

}
const styles=StyleSheet.create({
    sparate:{
      height:1,
      borderColor:'gray',
      top:10,
      backgroundColor:'gray',
      width:SCREEN_WIDTH-270,
    }

})
