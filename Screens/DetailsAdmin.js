import React ,{Component} from 'react';
import {View,Text} from 'react-native';


export default class DetailsAdmin extends Component{
static navigationOptions={
  headerShowen:true
}
  render(){
    return(

       <View style={{alignSelf:'center',alignItems:'center',marginTop:50}}>
        <Text>Details</Text>
       </View>
    );
  }

}
