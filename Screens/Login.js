import React ,{Component} from 'react';
import { StyleSheet,Button,Keyboard,KeyboardAvoidingView,Text, View,Modal,Dimensions ,TouchableOpacity,Image,Platform,TextInput,ActivityIndicator,ImageBackground} from 'react-native';
import { NavigationContainer,NavigationActions } from 'react-navigation';
import  Firebase from '../config/Firebase';
import { Entypo } from '@expo/vector-icons';
import Loader from'./Loader';
import DoctorMain from './DoctorMain';
import HomeDoctor from './HomeDoctor';

 export default class Login extends Component<navigation>{
   //constructor(props) { super(props); this.state = {} }
   constructor(props) {
       super(props);
      // NavigationActions.setNavigator(props.navigator)
        this.state = {
        email: '',
        password:'',
       isLoading:false,
       isdoc:false,
        emailIsValid: true,
        passwordIsValid: true,
        nshow:true,
        docs:[],
        iconn:"eye-with-line"

     }
    }

    state = {
        email: '',
        password: ''
    }
    handleLogin = () => {
       const { email, password } = this.state;
       if(!this.checkDetails(email, password)){
         this.setState({
          emailIsValid: false,
          passwordIsValid:false
        })

        }
       this.setState({
        isLoading: true,
      },
      () => Firebase.auth()
           .signInWithEmailAndPassword(email, password)
           //.then(() => this.props.navigation.navigate('Main'))
           .then(() => this._handleResponse())
           .catch(error => this._handleError(error))
         );
   }

    ComponentDidMount(){
      SplashScreen.hide();
    }
    _handleResponse(){
        var user = Firebase.auth().currentUser;
        var iss
  this.setState({
    isLoading: false,
  });


  /*Firebase.database().ref('InfoDoctor').once('value', snapshot => {

  if(snapshot.hasChild(user.uid)){
    alert("here")

      ist=true
  }else{
    ist=false
  }
  // const key = childSnapshot.key;


});*/


  if(user.email=="khadijasalek693@gmail.com"){
  //  this.props.navigation.push('MainAdmin');
this.props.navigation.replace('MainAdmin')
  }
 else if(this.confir(user.uid)){
    this.props.navigation.replace('DoctorMain');


  }
 else{
    this.props.navigation.replace('Main');
  }

}
handlePasswordReset (email){
  try {
    Firebase.auth().sendPasswordResetEmail(email)
    alert('Password reset email sent successfully')

  } catch (error) {
    alert('general'+error.message)
  }
  return
}

test(){

  var user = Firebase.auth().currentUser;

  Firebase.database().ref('InfoDoctor').on('value', snapshot => {

snapshot.forEach(function(childSnapshot) {
// const key = childSnapshot.key;
const childData = childSnapshot.val();
//array.push(childData);
if(childSnapshot.key==user.uid){
alert(childSnapshot.key)

return true;
}

});
});
}
checkDetails (email, password){


  const emailIsValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);


  this.setState({emailIsValid, passwordIsValid: password.length > 0});
  if (emailIsValid && password.length > 0) return true;
  return false;
}
_handleError(error){
  this.setState({
    isLoading: false,
    emailIsValid:false,
    passwordIsValid:false,
  });
  console.log(error)
}
handleIntpu(e){
  this.setState({
    emailIsValid:true,
    passwordIsValid:true,
      email:e,

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
confir(doc){
//setIconam(true);

  for(let i=0;i<this.state.docs.length;i++) {

    if(this.state.docs[i].key==doc){

       return true;

    }
  };

  return false;
}
componentDidMount(){
    const doctorsRef=Firebase.database().ref('InfoDoctor');

                 doctorsRef.on('value', snapshot => {
            let array = [];
            snapshot.forEach(function(childSnapshot) {
              // const key = childSnapshot.key;
              const childData = childSnapshot.val();
              console.log(childData);
              //array.push(childData);
              array.push({ ...childSnapshot.val(), key: childSnapshot.key });

            });

          //here to set
          this.setState({
            docs:array
          })
          });
}
    render(){
      return(
    <ImageBackground source={require('../assets/back.png')} style={styles.container}>
       <Loader isLoading={this.state.isLoading}/>

        <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.viewstyl}>
            <Image source={require('../assets/Capture.png')} style={styles.img}/>
          </View>
        <View style={styles.loginview}>

           <View style={{flexDirection:'row',height:40,borderBottomColor: '#000000',borderBottomWidth:1,padding:5,width:220}}>
            <Image source={require('../assets/user1.png')} style={styles.img11}/>
           <TextInput placeholder="E-mail"

               onChangeText={ e=>this.handleIntpu(e)}
               value={this.state.email}
               style={this.state.emailIsValid ? styles.input: styles.invalidEmail}
           />
            </View>
            {!this.state.emailIsValid && <Text style={{color:'red'}}>Please enter a valid email</Text>}
          <View style={{flexDirection:'row',marginTop:30,height:40,borderBottomColor: '#000000',borderBottomWidth:1,padding:5,width:220}}>
           <Image source={require('../assets/key.png')} style={styles.img11}/>
           <TextInput  style={this.state.passwordIsValid ? styles.input : styles.invalidPassword}
           value={this.state.password}
                  onChangeText={password => this.setState({ password })}
                  placeholder='Password'
                  secureTextEntry={this.state.nshow}


           />
           <TouchableOpacity onPress={()=>this.handleeye()} style={{marginLeft:-50}}>
           <Entypo name={this.state.iconn} size={24} color="black" />
           </TouchableOpacity>
          </View>
{!this.state.passwordIsValid && <Text style={{color:'red'}}>Please enter a valid password</Text>}
           <TouchableOpacity style={styles.bntlog} onPress={this.handleLogin}
               >
           <Text style={styles.bntTxt}>Log in</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>this.handlePasswordReset(this.state.email)}>
           <Text style={{color:'#63A9DF',marginTop:5}}> Password forgotten?</Text>
           </TouchableOpacity>
         </View>

         <TouchableOpacity style={{marginTop:20}} onPress={() => this.props.navigation.push('Signup')}>
         <Text > You don't have an account?<Text style={{color:'#63A9DF'}}>Sign up</Text></Text>
         </TouchableOpacity>
        </KeyboardAvoidingView>

    </ImageBackground>

      );
    }

}
//onPress={() => this.props.navigation.push('Signup')}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor:'#63A9DF',
    //backgroundColor:'#1a8193',
    alignItems: 'center',
    justifyContent: 'center',
    width:360,
    height:639,
    padding:20,
  },
  text:{
    color:'black',


  },

  Separator: {
    marginVertical: 3,
    borderBottomColor: 'black',
    //borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomWidth:5,
    backgroundColor:'black',
  },
  invalidEmail: {
    borderBottomColor: 'red',
    width:200,
    height:40,
    padding:10,
    //marginTop:23,
     marginLeft:5,
    color:'black',
  },
  invalidPassword: {
    borderBottomColor: 'red',
    width:200,
    height:40,
    padding:10,
    //marginTop:23,
     marginLeft:5,
    color:'black',
  },
  input:{
    //backgroundColor:'#7d9296',

    width:200,
    height:40,
    padding:10,
    //marginTop:23,
     marginLeft:5,
    color:'black',

    //borderBottomColor: '#000000',
     //borderBottomWidth: 1,

  },
  bntlog:{
    backgroundColor:'#63A9DF',
    width:160,
    height:50,
    marginTop:20,
    padding:10,
    borderRadius:25,
    justifyContent: 'center',
    marginTop:25,
    marginBottom:5,
    elevation:4
  },
  bnt2:{
    backgroundColor:'#63A9DF',
    width:160,
    height:50,
    marginTop:20,
    padding:10,
    borderRadius:15,
    justifyContent: 'center',
    marginTop:10,
  },
  bntTxt:{
    textAlign:"center",
    fontSize:15,

  },
  loginview:{
     width:300,
     height:295,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor:'white',
     borderRadius:15,
     marginTop:10,
     shadowColor: 'black',
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 2,

    elevation:10
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
    marginBottom:0,
    marginTop:155,
  },
  img11:{
    width:30,
    height:30,
    //marginTop:40,

  },
  use:{
    flexDirection: 'row',
    //justifyContent: 'space-around',
    justifyContent: "space-between",
    padding: 8
  },
});
