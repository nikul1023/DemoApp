import React,{ useState,useEffect} from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle,Text,View,FlatList,TouchableOpacity ,TextStyle,Image,ImageStyle,ScrollView, Alert} from "react-native"
import { Screen, Header } from "../../components"
import { useNavigation,useRoute } from "@react-navigation/native"
 import { useStores } from "../../models"
 import { toJS } from 'mobx'
 import { Api } from '../../services/api'
import { color } from "../../theme"
import { Button } from "../../components"
import {SvgUri} from 'react-native-svg'
import { iteratorSymbol } from "mobx/lib/internal"
import AsyncStorage from "@react-native-community/async-storage"
import axios from 'axios'

const ROOT: ViewStyle = {
  backgroundColor: 'white',
  flex: 1,
 
}
const COUNTRY_DETAILS: ViewStyle = {
  backgroundColor: '#71aee3',
  flex: 1,
   marginTop:20,
   marginBottom:20,
   justifyContent :"center",
   alignItems:"center",
   borderRadius : 15,
   marginLeft:15,
   marginRight:15
}
const COUNTRY_NAME: TextStyle = {
  
   marginTop:7,
   fontSize : 35 ,
   fontWeight:'bold'
}

const CAPITAL: TextStyle = {
  
  marginTop:10,
  fontSize : 20 ,
  
}
const POPULATION: TextStyle = {
  
  marginTop:7,
  fontSize : 13 ,
  
}
const LATLANG : TextStyle ={
  marginTop:5,
  fontSize:13
}
const FLAG: ImageStyle = {
 
  flex: 1,
  
}
const BUTTON : ViewStyle ={
  backgroundColor:'blue',
  marginBottom:15,
  height:50,
  width :200,
  borderRadius:20
}
const BUTTON_TEXT : TextStyle ={
  fontSize:20
}

  


export const OpeningScreen = observer(function OpeningScreen(this:any) {
  // Pull in one of our MST stores

  
  const route = useRoute();
  const capitalName = route.params.countryDetail.capital;
  
  //console.warn(route.params.countryDetail);
  const navigation = useNavigation();
  

   

// const [weatherinfo,setweatherinfo] = useState({
//   name : '',
//   temp :'',
//   icon : '',
//   windspeed :'',
//   precip :'',
// })

 
const { weatherStore }  = useStores();
   async function getCapitalWeather(){

    await weatherStore.getWeatherDetails(capitalName);
    
   const weatherInfo = weatherStore.weatherinfo;
   if(weatherInfo === null)
   {
     Alert.alert("No data");
   }
   else{
    
     navigation.push('weather',{
        cname: capitalName,
        temp : weatherInfo.temperature,
        windspeed : weatherInfo.wind_speed,
        icon : weatherInfo.weather_icons[0],
        precip : weatherInfo.precip,
    })
   }
   
  }
  return (
    <ScrollView style={ROOT}>
       
     
      
   <View  style={COUNTRY_DETAILS}>
          <Text style={COUNTRY_NAME}>
              {route.params.countryDetail.name}
          </Text>
          <Text style={CAPITAL}>
              Capital :{route.params.countryDetail.capital}
          </Text>
          <Text style={POPULATION}>

            Population :  {route.params.countryDetail.population}
          </Text>
          <Text style={LATLANG}>
              Location : [{route.params.countryDetail.latlng[0]},{route.params.countryDetail.latlng[1]}]
          </Text>
          <View>
          <SvgUri
          width="200"
          height="250"
          style={FLAG}
           uri ={ route.params.countryDetail.flag ? route.params.countryDetail.flag : null}
           />
          
          </View>
          <Button onPress={() => {getCapitalWeather()}} textStyle={BUTTON_TEXT} style={BUTTON} text='Capital Weather' />
      </View>
      
    
    </ScrollView>
  )
})
