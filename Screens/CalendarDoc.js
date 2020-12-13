import React,{Component,useState,useEffect}from 'react'
import {Text,View,Dimensions,ScrollView,TouchableOpacity} from 'react-native'
import Firebase from '../config/Firebase';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
const {width, height} = Dimensions.get('window')
import { LinearGradient } from 'expo-linear-gradient';
import {Ionicons,Feather} from '@expo/vector-icons';
const SCRENE=height-480
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width

const CalendarDoc=({navigation})=>{
   const[dt,setDate]=useState('2020-08-10');
   const nextDays = [
      '2020-06-01',
      '2020-06-05',
      '2020-06-08',
      '2020-06-07',

    ];
    let i=0
    const [isLoading, setIsLoading] = useState(false);
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const [lastDoc, setLastDoc] = useState(null);
    const[usenom,setUser]=useState("");
    const[useprenom,setUserpre]=useState("");
const[datApp,setDate1]=useState({})
    const [appointements, setAppoitements] = useState([]);
    const [appts, setAppoitements1] = useState({});
      var useid=Firebase.auth().currentUser.uid

        const doctorsRef=Firebase.database().ref('InfoDoctor/'+useid+'/appointementdoc/');
  const currentDat=(dayy)=>{

         setDate(dayy.dateString)
        // alert(dt)
          navigation.navigate("DocAppointement",{
            date:dayy.dateString
          })
  }

  const mark={

    //[dt]:{selected: true, marked: true,selectedColor:'blue'}

  }
  useEffect(() => {

    getAppointements();
   getObjet();



 }, []);

 let newDaysObject= {};
 appointements.forEach((day) => {

   newDaysObject[day.key] = {
       selected: true,
       marked: true,

   };

 });
const getObjet=()=>{
let listapp={};



}
  const getAppointements = async () => {

    setIsLoading(true);

    doctorsRef.on('value', snapshot => {
   let array = [];
   let array1 = {};
   snapshot.forEach(function(childSnapshot) {
   // const key = childSnapshot.key;
   const childData = childSnapshot.val();
   //console.log(childSnapshot.key);

     Firebase.database().ref('InfoDoctor/'+useid+'/appointementdoc/'+childSnapshot.key).on('value', snapshot => {

    snapshot.forEach(function(childSnapshot1) {
    // const key = childSnapshot.key;
    const childData1 = childSnapshot1.val();
  //  console.log(childData1);
     array.push({ ...childSnapshot1.val(),key:childSnapshot.key});
     array1[childSnapshot.key]={

           ...childSnapshot1.val(),
           //key:childSnapshot.key
         }

})
     //array.push({...,childSnapshot.key})
});
   //array.push(childData);


   });

   setAppoitements(array);
setAppoitements1(array1)
   setIsLoading(false);
   });

  };
  const  renderI=(item)=>{

    return(
      <View style={{backgroundColor:'white',top:10,borderRadius:5,elevation:5,width:SCREEN_WIDTH-50,height:80,marginBottom:20,padding:8}}>
        <Text style={{color:'black'}}>{item.usermail}</Text>
        <Text style={{color:'black'}}>{item.usernam}</Text>
        <Text style={{color:'black'}}></Text>
      </View>
    )
  }
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
          <Text style={{marginLeft:SCREEN_WIDTH-240,fontSize:20}}>
            Calendar
          </Text>
          </View>
          </LinearGradient>
      <CalendarList
      // Initially visible month. Default = Date()
      //current={}
      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
      minDate={Date()}
      // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
      maxDate={'2021-05-30'}
      // Handler which gets executed on day press. Default = undefined
      onDayPress={(day) => currentDat(day)}
      // Handler which gets executed on day long press. Default = undefined
      onDayLongPress={(day) => {console.log('selected day', day)}}
      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
      titleFormat={'MMMM YYYY'}
      pastScrollRange={0}
      futureScrollRange={3}
      // Handler which gets executed when visible month changes in calendar. Default = undefined
      //onMonthChange={(month) => {console.log('month changed', month)}}
      // Hide month navigation arrows. Default = false

      showControls={true}
      // Replace default arrows with custom ones (direction can be 'left' or 'right')
      renderArrow={(direction) => (<Arrow/>)}
      // Do not show days of other months in month page. Default = false
      hideExtraDays={true}
      // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
      // day from another month that is visible in calendar page. Default = false
      disableMonthChange={true}

      monthNames={Array}
      markedDates={
      // mark
      newDaysObject
      }
      // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
      firstDay={1}
      theme={{
        weekendDayText: {
             color: 'blue',
           },
      backgroundColor: 'white',
      //calendarBackground: '#63A9DF',
      textSectionTitleColor: '#b6c1cd',
      textSectionTitleDisabledColor: '#d9e1e8',
      selectedDayBackgroundColor:'#00adf5',
      selectedDayTextColor: '#ffffff',
      todayTextColor: '#00adf5',
      dayTextColor:'#2d4150',
      textDisabledColor: '#d9e1e8',
      dotColor: '#00adf5',
      selectedDotColor: '#ffffff',
      arrowColor: 'orange',
      disabledArrowColor: '#d9e1e8',
      monthTextColor: '#63A9DF',
      indicatorColor: '#63A9DF',
      textDayFontFamily: 'monospace',
      textMonthFontFamily: 'monospace',
      textDayHeaderFontFamily: 'monospace',
      textDayFontWeight: '300',
      textMonthFontWeight: 'bold',
      textDayHeaderFontWeight: '300',
      textDayFontSize: 16,
      textMonthFontSize: 16,
      textDayHeaderFontSize: 16
      }}
      items={appts}
   /*renderItem={(items) => (

       <Text>{items.usermail}</Text>
   )}*/


   renderItem={(items) => renderI(items)}
      // Hide day names. Default = false
      //hideDayNames={true}
      hideMonthNames={false}
      titleFormat={'MMMM YYYY'}
      // Show week numbers to the left. Default = false
      showWeekNumbers={true}

      // Handler which gets executed when press arrow icon left. It receive a callback can go back month
      onPressArrowLeft={substractMonth => substractMonth()}
      // Handler which gets executed when press adrrow icon right. It receive a callback can go next month
      onPressArrowRight={addMonth => addMonth()}
      // Disable left arrow. Default = false
      disableArrowLeft={true}
      // Disable right arrow. Default = false
      disableArrowRight={true}
      // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
      disableAllTouchEventsForDisabledDays={true}
      /** Replace default month and year title with custom one. the function receive a date as parameter. */
      //renderHeader={(date) => {/*Return JSX*/}}
      />
      </ScrollView>

)}


export default CalendarDoc;
