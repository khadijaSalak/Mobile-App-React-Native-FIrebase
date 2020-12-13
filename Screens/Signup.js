import React ,{Component} from 'react';
import { StyleSheet,Button,Keyboard,KeyboardAvoidingView,Text, View,Modal,Dimensions ,TouchableOpacity,Image,Platform,TextInput,ActivityIndicator,ImageBackground} from 'react-native';
import Firebase from '../config/Firebase';
import Loader from'./Loader';
import { Entypo } from '@expo/vector-icons';
import Login from './Login';
import Genre from './Genre';
 export default class Signup extends Component<navigation>{
    static navigationOptions={
      header:null,
    }
    constructor(props) {
        super(props);
         this.state = {
           email:'',
           password:'',
           name:'',
           passwordconfi:'',
           emailIsValid:true,
           passwordIsValid:true,
            confirmvalid:true,
            isLoading:false,
            age:'null',
            sex:'',
            city:'',
            country:'',
            photo:'C:/Users/admin/Documents/S6/project/Doctoor/assets/engi.jpg',
            nshow:true,
            iconn:"eye-with-line"
      }
      }

    state={
      email:'',
      password:'',
      name:'',

      }

 handleSignUp = () => {

          const { email, password ,name,sex,age,city,country,photo}= this.state;

          if(!this.checkDetails(email)){
            this.setState({
             emailIsValid: false
            // passwordIsValid:false
          });
           }


        this.setState({
            isLoading: true,
         },
         () => Firebase.auth()
              .createUserWithEmailAndPassword(email, password)
              //.then(() => this._handleResponse1(name))
              .then(()=>this.handlepro(name,sex,age,city,country,photo))
              //.then((userCredentials)=>{
              //if(userCredentials.user){
              //  userCredentials.user.updateProfile({
            //displayName:name,

          //}).then((s)=> {
          ///  this.handlepro(name,sex,age,city,country)
          //})
      //  }
    //})
              .catch(error => this._handleError(error))
     );
   }
      comparePassword(passwordconfi){
       //event.preventDefault();
      //this.setState({ passwordconfi })
       if(this.state.password === this.state.passwordconfi){
         return this.setState({confirmvalid:true});

       }
        this.setState({confirmvalid:false});
     }
     _handleError(error){
       this.setState({
         isLoading: false,
         emailIsValid:false,
        passwordIsValid:true,
       });
       console.log(error)
     }
     handlepro(name,sex,age,city,country,photo){
       this.setState({
         isLoading: false,
       });
       var user = Firebase.auth().currentUser;
       var uid;
       uid=user.uid;
       this.setState({
         isLoading: false,
         passwordIsValid:true

       });
       Firebase.database().ref('users/' + uid).set({
     username: name,
     age: age,
     city:city,
     sex:sex,
     country:country,
     photo:photo
   });
       this.props.navigation.push('Genre')
     }
     handlepassword(password){

       if(this.state.password.length < 8){

         this.setState({passwordIsValid:false})}
       else{

         this.setState({passwordIsValid:true})
       }


     }
     _handleResponse1(name){
       var user = Firebase.auth().currentUser;
       var uid;
       uid=user.uid;
       this.setState({
         isLoading: false,
       });
       Firebase.database().ref('Users/profile'+uid).push({
      name
  }).then((data)=>{
      //success callback
      console.log('data ' , data)
  }).catch((error)=>{
      //error callback
      console.log('error ' , error)
  })
       this.props.navigation.push('Main')
     }
     _handleResponse(){
   this.setState({
     isLoading: false,
   });

   this.props.navigation.push('Main')
 }
 checkDetails (email){


   const emailIsValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);


   //this.setState({emailIsValid});
   if (emailIsValid) return true;
   return false;
 }
 handleIntpu(e){
   this.setState({

     passwordIsValid:true,
       password:e,

   });

 }
 handleIntpuconfirm(e){
   this.setState({

     confirmvalid:true,
       passwordconfi:e,

   });

 }
 handleeye(){
   var nam
   if(this.state.iconn=="eye"){
     nam="eye-with-line"
   }
   else{
     nam="eye"
   }

   this.setState({
     nshow:!this.state.nshow,
     iconn:nam
   })

 }
    render(){
      return(
    <ImageBackground source={require('../assets/Sign.png')} style={styles.container}>
        <Loader isLoading={this.state.isLoading}/>
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.viewstyl}>
            <Image source={require('../assets/user2.png')} style={styles.img}/>
          </View>
        <View style={styles.loginview}>
           <TextInput style={styles.input}
           value={this.state.name}
                 onChangeText={name => this.setState({ name })}
                 placeholder='Full Name'
           />
           <TextInput placeholder="E-mail"
                  value={this.state.email}
                  onChangeText={email => this.setState({ email })}

                  style={this.state.emailIsValid ? styles.input : styles.invalidPassword}
                  autoCapitalize='none'
           />
           <View style={{flexDirection:'row'}}>
           <TextInput
                    value={this.state.password}

                    onChangeText={password => this.setState({ password })}
                  //onChangeText={e=> this.handleIntpu(e)}
                    onSubmitEditing={e=>this.handlepassword(e)}
                    placeholder='Password'
                    secureTextEntry={this.state.nshow}
                     style={this.state.passwordIsValid ? styles.input1 : styles.invalidPassword1}

           />
           <TouchableOpacity onPress={()=>this.handleeye()} style={{marginTop:40,marginLeft:-50}}>
           <Entypo name={this.state.iconn} size={24} color="black" />
           </TouchableOpacity>

           </View>
           {!this.state.passwordIsValid && <Text style={{alignSelf:'center',color:'red'}}>pass word must be more than 8 lettres!</Text>}
           <TextInput placeholder="confirm password"  style={styles.input}
                  //ref={input => { this.secondInput = input }}
                  value={this.state.passwordconfi}
                  secureTextEntry={true}
                 //onChangeText={passwordconfi=>this.setState({passwordconfi})}
                 onChangeText={e=> this.handleIntpuconfirm(e)}
                 onSubmitEditing={passwordconfi=>this.comparePassword(passwordconfi)}
                 style={this.state.confirmvalid ? styles.input: styles.confirmvalid}
           />
           {!this.state.confirmvalid && <Text style={{color:'red'}}>pass word is not identic!!</Text>}

           <TouchableOpacity style={styles.bnt2} onPress={this.handleSignUp}>
           <Text style={styles.bntTxt}> Sign up</Text>
           </TouchableOpacity>

         </View>
         <TouchableOpacity style={{marginTop:10}} onPress={() => this.props.navigation.goBack()}>
         <Text > Already registred?<Text style={{color:'#63A9DF'}}>Log in</Text></Text>
         </TouchableOpacity>
        </KeyboardAvoidingView>

    </ImageBackground>

      );
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor:'#63A9DF',
    //backgroundColor:'#1a8193',
    alignItems: 'center',
    justifyContent: 'center',
    width:360,
    height:639,//639
    padding:20,
  },
  text:{
    color:'black',


  },
  invalidEmail: {
    borderBottomColor: 'red',
    width:250,
    height:50,
    padding:10,
    marginTop:20,
  borderBottomWidth: 1,
    color:'black',
  },
  invalidPassword: {
    borderBottomColor: 'red',
    width:250,
    height:50,
    padding:10,
    marginTop:20,
borderBottomWidth: 1,
    color:'black',
  },

  invalidPassword1: {
    borderBottomColor: 'red',
    width:250,
    height:50,
    marginRight:20,
    padding:10,
    marginTop:20,
borderBottomWidth: 1,
    color:'black',
  },
confirmvalid:{
  width:250,
  height:45,
  padding:10,
  marginTop:20,

  color:'black',

  borderBottomColor: 'red',
   borderBottomWidth: 1,
   paddingHorizontal:10,
},
  input:{
    //backgroundColor:'#7d9296',

    width:250,
    height:45,
    padding:10,
    marginTop:20,

    color:'black',

    borderBottomColor: '#000000',
     borderBottomWidth: 1,
     paddingHorizontal:10,
  },
  input1:{
    //backgroundColor:'#7d9296',

    width:250,
    height:45,
    padding:10,
    marginTop:20,
marginRight:20,
    color:'black',

    borderBottomColor: '#000000',
     borderBottomWidth: 1,
     paddingHorizontal:10,
  },
  imgflech:{
    width:40 ,height:40,
  },
  bntlog:{
    backgroundColor:'#63A9DF',
    width:160,
    height:50,
    marginTop:20,
    padding:10,
    borderRadius:15,
    justifyContent: 'center',
    marginTop:15,
    marginBottom:5,
  },
  bnt2:{
    backgroundColor:'#63A9DF',
    width:160,
    height:50,
    marginTop:20,
    padding:10,
    borderRadius:25,
    justifyContent: 'center',
    marginTop:20,
    elevation:4
  },
  bntTxt:{
    textAlign:"center",
    fontSize:15,
  },
  loginview:{
     width:300,
     height:390,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor:'white',
     borderRadius:15,
     marginTop:3,
     shadowColor: 'white',
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation:5
  },
  img:{
     width:80,
     height:80,
     borderRadius:50,
  },
  viewstyl:{
    width:90,
    height:90,
      backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:50,
    marginBottom:1,
    marginTop:60,
  },
  img11:{
    width:30,
    height:30,
    marginTop:40,
  },
  use:{
    flexDirection: 'row',
    //justifyContent: 'space-around',
    padding: 8
  },
});
