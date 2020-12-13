import React ,{Component} from 'react'
import {Text,ActivityIndicator,View} from 'react-native'
import {NavigationActions,StackActions} from 'react-navigation'
import { CommonActions } from '@react-navigation/native';
export default class Logout extends Component{
  constructor(props){
    super(props)
  }
    componentDidMount(){
      /* resetAction=StackActions.reset({
        index:0,
        actions:[NavigationActions.navigate({routeName:'Login'})],
        key:null
      })
      this.props.navigation.dispatch(resetAction)*/
      this.props.navigation.reset({
        index:0,
        routes:[{name:'Login'}],
      });

    }
   render(){
     return(

         <View style={{top:200}}>
          <ActivityIndicator  size={30}/>
         </View>
     )
   }

};
