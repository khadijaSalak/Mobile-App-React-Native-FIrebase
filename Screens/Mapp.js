import React, { Component ,useState,useEffect} from 'react';
import Home from './Home'
import {
  View,Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import {Ionicons,FontAwesome,MaterialCommunityIcons,Entypo} from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { useFocusEffect } from '@react-navigation/native';
import * as geolib from 'geolib';
const {width, height} = Dimensions.get('window')
const SCRENE=height-90
import axios from 'axios'
import Polyline from '@mapbox/polyline'
import { EvilIcons } from '@expo/vector-icons';
import Firebase from '../config/Firebase';
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
var lat
const Mapp=({navigation})=>{
  const[initialPosition,setCurrent]=useState({});
  const[deta,setDeta]=useState(false)
  const[name,setName]=useState("")
  const[dista,setDist]=useState("")
  const[ville,setVille]=useState("")
  const[spe,setSpec]=useState("")
  const[yes,setYes]=useState(false)
  const[startlat,setStart]=useState(null)
  const[startlon,setStart1]=useState(null)
  const[arrlat,setArr]=useState(null)
  const[arrlon,setArr1]=useState(null)
  const[coord,setCoord]=useState([])
  const[docte,setDoctors]=useState([])
  const[lati,setLati]=useState("")
  const[last,setLast]=useState("")
  const[keyy,setKey]=useState("")
  const[speci,setSpect]=useState("")
  const[phot,setPhot]=useState("")
  const doctorsRef=Firebase.database().ref('InfoDoctor');
  const reff=Firebase.database()
  //const[closest,setClosest]=useState({})
const[closest,setArray]=useState([]);
const [readon,setRead]=useState([]);

  useEffect(() => {

    getPosition()

 }, []);
async  function getNearestDivvyStation (lt, lng){

try{
    //const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lt},${lng}&radius=7000000&type=city&keyword=Taza&key=AIzaSyBxn3hMFI_rK7RixUTE8WqJwgQo7mPuBss`
const url='https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyBxn3hMFI_rK7RixUTE8WqJwgQo7mPuBss'
    //return async (dispatch) => {
      const  {data}  = await axios.get(url)
      //const docs=await data.json()
      const current = {lt, lng}
          console.log(data)
    const closest = data.results.map((station) => {
      const coord = station.geometry.location

      return { latitude:coord.latitude,longitude:coord.longitude, dist: geolib.getDistance(current,coord) }
    })
    setArray(closest)
  }catch(error){
      console.log("error",error)
    }

     //dispatch(gotNearestDivvyStation(closest))
    //}

  }
  const calculer=()=>{
    //alert(current.latitude)

    //let close=[...closest]
    const mapped=closest.map(data =>{
             alert(initialPosition.latitude),
            alert("data"+data.dist)
            data.current=initialPosition
               return [...closest]
    })
    //alert("try"+this.state.closest[0].current.latitude)
    setArray(mapped)
console.log(closest)

  }
const  getPosition=()=> {

    navigator.geolocation.getCurrentPosition((position) => {
      lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta:LONGITUDE_DELTA,
      }

      setCurrent(initialRegion)
      const tab=[
          {
        coord:{latitude:34.214496,
      longitude: -4.009416,},
       name:"Dr.  Rachid Ouadih",
        dist:"Orthopedist",
        ville:"Taza",
        current:{latitude:initialRegion.latitude,longitude:initialRegion.longitude}},
        {
             coord:{latitude:34.230667, longitude:-4.008283},
             name:"Dr. Jaouhara GHRISSI",
             dist:"",
             spec:"Gynecologist",
             ville:"Taza",
             current:{latitude:initialRegion.latitude,longitude:initialRegion.longitude}
        },

        {
          coord:{latitude:34.221794, longitude: -4.005463},
          name:"Dr Bouallala Youness",
           dist:"Dental",
           ville:"Taza",
           current:{latitude:initialRegion.latitude,longitude:initialRegion.longitude}
        },
        {
          coord:{latitude:34.217801 ,longitude: -4.006441},


          name:" Dr lahlali et Dr laghrib",
           dist:"",
           spec:"Dental",
           ville:"Taza",
           current:{latitude:initialRegion.latitude,longitude:initialRegion.longitude}
        },
        {
          coord:{latitude:34.221567, longitude:-4.004105},


          name:" Dr El Bouchtili Ahmed",
           dist:"",
           spec:"Generalist",
           ville:"Taza",
           current:{latitude:initialRegion.latitude,longitude:initialRegion.longitude}
        },
        {
          coord:{latitude:34.202843, longitude:-3.997112},


          name:"Centre de dialyse taza ",
           dist:"",
           spec:"Kidney disease",
           ville:"Taza",
           current:{latitude:initialRegion.latitude,longitude:initialRegion.longitude}
        },
        {
          coord:{latitude:34.226080, longitude: -4.005618},


          name:"YAAKOUBI OBTIC",
          spec:"Optician",
           dist:"",
           ville:"Taza",
           current:{latitude:initialRegion.latitude,longitude:initialRegion.longitude}
        },
        {
          coord:{latitude:34.214591, longitude: -4.010640 },


          name:"OMARI AZEDDINE",
           dist:"",
           spec:"",
           ville:"Taza",
           current:{latitude:initialRegion.latitude,longitude:initialRegion.longitude}
        },




        {
          coord:{latitude:34.221439, longitude:-4.005550},
          name:"Dr Driss EL HAZZAT",
          dist:"",
          spec:"Generalist",
          ville:"Taza",
          current:{latitude:initialRegion.latitude,longitude:initialRegion.longitude}
        }];
        setRead(tab)
        //console.log(readon)
      //this.calculer(initialRegion)
      /*let closest=[...this.state.closest]
      const mapped=closest.map(data =>{

              alert("data"+data.dist)
              data.current=initialRegion
          return [...closest]
      })*/
      //alert("try"+this.state.closest[0].current.latitude)
        //this.setState({closest});
        //this.getNearestDivvyStation (lat, long)
    },
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});


  }
const  settin=(name,dist,ville,spe,start)=>{

  setDeta(true)
  setName(name)
  setDist(dist)
  setVille(ville)
  setSpec(spe)
setStart(start)


  //setCoord([start.current.latitude,start.current.longitude],[start.coord.latitude,start.coord.longitude])
}
const getDoctors = async () => {


       doctorsRef.on('value', snapshot => {
  let array = [];
  snapshot.forEach(function(childSnapshot) {
    // const key = childSnapshot.key;
    const childData = childSnapshot.val();
    //console.log(childData);
    //array.push(childData);
    array.push({ ...childSnapshot.val(), key: childSnapshot.key });

  });
setDoctors(array);
//setTosearch(array);
//setLastDoc(array[array.length - 1]);
//setIsLoading(false);
});

};
async function fetchDoc(){
  //setMa(Firebase.auth().currentUser.email);

  //userid = Firebase.auth().currentUser.uid;

  return reff.ref('InfoDoctor/' + lati).once('value').then(function(snapshot) {
  //setFirst((snapshot.val() && snapshot.val().Name) || 'Anonymous');
  setLast((snapshot.val() && snapshot.val().Surname) || 'Anonymous');
  setPhot((snapshot.val() && snapshot.val().Tel));
  setSpect((snapshot.val() && snapshot.val().Specialite));



  // ...
  });
}
const getDoct=(lat)=>{
  //alert("ddd"+startlat)
  getDoctors();
  docte.forEach((doc, i) => {
    if(doc.latitude==lat){

      //setLati(doc.key)
      //fetchDoc()

      navigation.navigate("Book",{
        DocKey:doc.key,
        ismap:true
      })
    }

  });




  //}catch(error){
    //console.log(e)
//  }

  /*navigation.navigate("Book",{
    DocKey:lati,
    docname:last,
    te:phot,
    spec:speci
  })*/


}

  return (

      <View>
      <View style={styles.map1}>
        <TouchableOpacity style={styles.touch1} >
           <FontAwesome  name="map-marker" size={30} color="#63A9DF"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touch2}  onPress={()=>navigation.navigate("Home")}>
          <MaterialCommunityIcons name="doctor" size={30} color="#000"/>
        </TouchableOpacity>
       </View>
      <View style={styles.container}>

        <MapView
          style={styles.map}
          initialRegion={initialPosition}
          showsUserLocation={true}
      followUserLocation={true}
          >
          {readon.map((marker,i) => {

            marker.dist=geolib.getPreciseDistance({latitude:marker.current.latitude, longitude:marker.current.longitude},{latitude:marker.coord.latitude,longitude:marker.coord.longitude}).toString();

    return <MapView.Marker
      coordinate={marker.coord}
       title={"you are  "+marker.dist+" miles away from "+marker.name}
      pinColor={"#32a0c1"}
    onPress={()=>settin(marker.name,marker.dist,marker.ville,marker.spec,marker.coord.latitude)}
    />

  })}

      </MapView>
      {deta &&
        <TouchableOpacity style={{width:SCREEN_WIDTH-40,height:110,marginRight:20,padding:10,borderRadius:6,elevation:10,backgroundColor:'white',top:SCREEN_HEIGHT-230,position:'absolute'}} onPress={()=>getDoct(startlat)}>
             <View style={{flexDirection:'row',justifyContent: "space-between", alignItems: "center",marginBottom:5 }}>
            <Text>Name: {name}</Text>
            <TouchableOpacity onPress={()=>setDeta(!deta)}>
            <EvilIcons name="close-o" size={24} color="gray" />
             </TouchableOpacity>
             </View>
            <Text style={{marginBottom:5}}>Distance: {dista} mile</Text>
            <Text style={{marginBottom:5}}> City: {ville}</Text>
            <Text style={{marginBottom:5}}> Speciality: {spe}</Text>
        </TouchableOpacity>}
      </View>
      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    //position: 'absolute',
    height : SCREEN_HEIGHT,
    width : SCREEN_WIDTH,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  map1:{
     alignSelf:'center',
     marginTop:30,
     marginBottom:0,
  flexDirection: 'row',
  justifyContent:"space-between",

  },
touch1:{
  color:'blue',
  marginRight:60,
  //borderBottomWidth:1,
  //borderColor:'#63A9DF',
},
touch2:{

  marginLeft:60,
  //borderBottomWidth:1,
  //borderColor:'#63A9DF',

},
});

export default Mapp;
