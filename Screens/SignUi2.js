import React ,{Component} from 'react';
import { StyleSheet,Button,Keyboard,KeyboardAvoidingView,Text, View,Modal,Dimensions ,TouchableOpacity,Image,Platform,TextInput,ActivityIndicator,ImageBackground} from 'react-native';
 export default class SignUi2 extends Component{
   handleSignUp = () => {
// TODO: Firebase stuff...
console.log('handleSignUp')
}
   static navigationOptions={
     header:null,
   }
    ComponentDidMount(){
      SplashScreen.hide();
    }
    render(){
      return(
    <ImageBackground source={require('../assets/Sign.png')} style={styles.container}>

        <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.viewstyl}>
            <Image source={require('../assets/user2.png')} style={styles.img}/>
          </View>
        <View style={styles.loginview}>
           <TextInput placeholder="sex" style={styles.input}/>
           <TextInput placeholder="age"  style={styles.input} autoCompleteType="password" KeyboardType='numeric'/>
           <TextInput placeholder="pass word"  style={styles.input}/>
           <TextInput placeholder=" confirm pass word"  style={styles.input}  KeyboardType='email-address' returnKeyType='next' autoCorrect={false}/>
           <View style={styles.use}>
           <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image source={require('../assets/fleche2.png')} style={styles.imgflech} />
           </TouchableOpacity>
           <TouchableOpacity  >
            <Image source={require('../assets/flech.png')} style={styles.imgflech} />
           </TouchableOpacity>
           </View>
           <TouchableOpacity style={styles.bnt2} disable={true}>
           <Text style={styles.bntTxt}> Sign in</Text>
           </TouchableOpacity>
         </View>
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
  imgflech:{
    width:40 ,height:40,
  },
  text:{
    color:'black',


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
     height:390,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor:'white',
     borderRadius:15,
     marginTop:5,
     shadowColor: 'white',
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
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
    marginTop:83,
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
