import React,{Component,useState,useEffect}from 'react'
import {Text,View,ScrollView,Dimensions,TouchableOpacity} from 'react-native'
import Firebase from '../config/Firebase';
import {Ionicons,Feather} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Loader from'./Loader';
import moment from "moment"
const {width, height} = Dimensions.get('window')
const SCRENE=height-480
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
var userid
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const Book=({route,navigation})=>{
   const[dt,setDate]=useState('2020-08-10');
   const[namedoc,setDoc]=useState("");
   const[userMail,setMa]=useState("")
   const[nameuser,setUser]=useState("");
   const[userkey,setUsKey]=useState("");
   const[dockey,setDocKey]=useState("");
   const[fullday,setFull]=useState([])
   const[fulldayy,setFulls]=useState([])
   const[isfull,setIsFull]=useState(false)
   const[docte,setTel]=useState("");
   const[last,setLast]=useState("");
   const[te,setPhot]=useState("");
   const[spe,setSpect]=useState("");
   const[isLoading,setIsLoading]=useState(false)
   const reff=Firebase.database();

    useEffect(() => {
       fetchData()
     Full()
fetchDoc()

   }, []);
   const seting=()=>{

   }
  const currentDat=(dayy)=>{

         setDate(dayy.dateString)
         alert(dt)

  }

  const mark={

    //[dt]:{selected: true, marked: true,selectedColor:'blue'}

  }
  async function fetchDoc(){
    //setMa(Firebase.auth().currentUser.email);

    //userid = Firebase.auth().currentUser.uid;

    return reff.ref('InfoDoctor/' + route.params.DocKey).once('value').then(function(snapshot) {
    //setFirst((snapshot.val() && snapshot.val().Name) || 'Anonymous');
    setLast((snapshot.val() && snapshot.val().Surname) || 'Anonymous');
    setPhot((snapshot.val() && snapshot.val().Tel));
    setSpect((snapshot.val() && snapshot.val().Specialite));



    // ...
    });
  }
  async function verify(day){

    userid=Firebase.auth().currentUser.uid
       reff.ref('InfoDoctor/'+route.params.DocKey+'/appointementdoc/'+day.dateString).on('value', snapshot => {
      let array = [];
      snapshot.forEach(function(childSnapshot) {
      // const key = childSnapshot.key;
      const childData = childSnapshot.val();

      array.push({ ...childSnapshot.val(),key:childSnapshot.key});

      });
      if(1<array.length){
        setIsFull(true)
      }


    });
    alert(isfull)
  }
  async function Full(){
  var userid


  return Firebase.database().ref('fulldays/' + route.params.DocKey).on('value', snapshot => {
 let array = [];
 snapshot.forEach(function(childSnapshot) {
 // const key = childSnapshot.key;
 const childData = childSnapshot.val();
 //console.log(childSnapshot.key);
 //array.push(childData);
 array.push({ ...childSnapshot.val(),key:childSnapshot.key});

 });
 setFulls(array);


 });


  }
  async function fetchData(){
  var userid
    setMa(Firebase.auth().currentUser.email);
   userid = Firebase.auth().currentUser.uid;

  return Firebase.database().ref('users/' + userid).once('value').then(function(snapshot) {

  setUser((snapshot.val() && snapshot.val().username) || 'Anonymous');

  // ...
  });


  }
  let newDaysObject= {};
  fulldayy.forEach((day) => {

    newDaysObject[day.key] = {
        selected: true,
        marked: true,
      disabled: true, disableTouchEvent: true
    };

  });
  const booking=day=>{

let dyy=moment(day).format("dd")


  setDate(day.dateString)
  setDoc(route.params.docname);
  setDocKey(route.params.DocKey)
  setTel(route.params.te)
const ky=route.params.DocKey

userid=Firebase.auth().currentUser.uid


    reff.ref('InfoDoctor/'+route.params.DocKey+'/appointementdoc/'+day.dateString+'/'+userid).set({
      usernam:nameuser,
      usermail:userMail,
      motif:""

    });

    reff.ref('users/'+userid+'/appointementuser/'+day.dateString).set({
      docnam:last,
      doctel:te,
      keydo:route.params.DocKey,
      motif:""

    });
    let isf
    reff.ref('InfoDoctor/'+route.params.DocKey+'/appointementdoc/'+day.dateString).on('value', snapshot => {
    let array = [];
    snapshot.forEach(function(childSnapshot) {
    // const key = childSnapshot.key;
    const childData = childSnapshot.val();
    console.log(childData);
    //array.push(childData);
    array.push({ ...childSnapshot.val(),key:childSnapshot.key});

    });
    if(array.length==2){

        //setIsFull(!isfull)
        isf=true
    }


    });
    //verify(day);

    if(isf){

      reff.ref('fulldays/'+route.params.DocKey+'/'+day.dateString).set({
         full:true
      })
    }

     navigation.navigate("AppointDeatails",{
       doctornam:last,
       date:day.dateString,//dt
       dock:ky,
       specialit:spe,
       ismp:route.params.ismap


     })




  }
    return(

       <View style={{flex:1,alignSelf:'center',width:SCREEN_WIDTH}}>
       
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
              Make Appointement
           </Text>
           </View>
           </LinearGradient>

      <CalendarList
      style={{top:70,marginBottom:50}}
      // Initially visible month. Default = Date()
      //current={}
      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
      minDate={Date()}
      // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
      maxDate={'2021-05-30'}
      // Handler which gets executed on day press. Default = undefined
      onDayPress={(day) => booking(day)}
      // Handler which gets executed on day long press. Default = undefined
      onDayLongPress={(day) => {console.log('selected day', day)}}
      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
      titleFormat={'MMMM YYYY'}
      pastScrollRange={0}
      futureScrollRange={4}
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
 allowDisabledSelection={false}
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
      selectedDayBackgroundColor:'#d20a14',//'#00adf5',
      selectedDayTextColor: '#ffffff',
      todayTextColor: '#00adf5',
      dayTextColor:'#2d4150',
      textDisabledColor: '#d9e1e8',
      dotColor: '#00adf5',
      selectedDotColor: '#ffffff',
      selectedDayRadius:0,
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
      /*items={{
       '2020-06-22': [{text: 'item 1 - any js object'}],
       '2020-06-23': [{text: 'item 2 - any js object'}],
       '2020-06-24': [],
       '2020-06-25': [{text: 'item 3 - any js object'},{text: 'any js object'}]
   }}*/
   /*renderItem={(items) => (
       <MyEventComponent item={items} />
   )}*/
   //renderItem={(items) => renderI(items)}
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

        </View>
)}


export default Book;
