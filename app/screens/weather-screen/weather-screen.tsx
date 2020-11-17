import React,{useEffect, useState} from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle ,Alert , Image , ImageStyle,View,Text,TextStyle,ActivityIndicator} from "react-native"
//import { Screen, Text  } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { useRoute } from "@react-navigation/native"

const ROOT: ViewStyle = {
  backgroundColor:'#71aee3',

  flex: 1,
  justifyContent:"center",
  alignItems:"center"
}
const ICON : ImageStyle ={
  marginTop:20,
  height : 100,
  width : 100
}
const NAME : TextStyle ={
  marginTop:20,
  fontSize:40,
  fontWeight:'bold'
}
const TEXT : TextStyle ={
  marginTop:15,
  fontSize:20,
  //fontWeight:'bold'
}

export const WeatherScreen = observer(function WeatherScreen(this: any) {
  
  const [weatherinfo,setweatherinfo] = useState({
    temp :'',
    icon :'',
    windspeed :'',
    precip :'',
  })
  const [isLoading,setIsLoading] = useState(true);
  // const [temperature,setTemperature] = useState('');
  // const [icon,setIcon] = useState('');
  // const [windspeed,setWindspeed] = useState('');
  // const [precip,setPrecip] = useState<string>('');
  
  const route = useRoute();
  const capitalName = route.params.cityName;
  useEffect(() => {
   async function cityWeather(){

    const key = 'ca947a0e9971c7024935ad53a2cdc983';
 
    try{
      let response=await fetch(`http:/api.weatherstack.com/current?access_key=${key}&query=${capitalName}`);
    
          if(!response.ok){
              throw new Error('Error status: '+response.status);
          }
          else{
            const data=await response.json();
           
            setweatherinfo({
              ...weatherinfo,
              temp : data.current.temperature ,
              icon : data.current.weather_icons[0],
              windspeed : data.current.wind_speed,
              precip : data.current.precip,
            })
            setIsLoading(false);
            //   setTemperature(data.current.temperature);
            //  setIcon(data.current.weather_icons[0]);
            //  setWindspeed(data.current.wind_speed)
            //   setPrecip(data.current.precip);
              //console.log(data.current.weather_icons[0]);
            }    
          }
          catch(e){
          // Alert.alert("error"+e.message+"please connect to internet",[{text:"ok"}]);
          }
          }
            
            cityWeather();
            },
            [capitalName])
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    
    <View style={ROOT} >
      { isLoading ? <ActivityIndicator /> :(
        <>
      <Text style={NAME}>{route.params.cityName}</Text>
      <Text style={TEXT}>Temperature :{weatherinfo.temp} c</Text>
      <Text style={TEXT}>Wind Speed : {weatherinfo.windspeed} km/h</Text>
      <Text style={TEXT}>Precip : {weatherinfo.precip}</Text>
      <Image style={ICON} source={{ uri : weatherinfo.icon ? weatherinfo.icon : null}} />
      </>
      )}
    </View>
  )
})
