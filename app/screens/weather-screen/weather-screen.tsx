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
  
  
 
  const route = useRoute();
  
  
  return (
    
    <View style={ROOT} >
   
      <Text style={NAME}>{route.params.cname}</Text>
      <Text style={TEXT}>Temperature :{route.params.temp} c</Text>
      <Text style={TEXT}>Wind Speed : {route.params.windspeed} km/h</Text>
      <Text style={TEXT}>Precip : {route.params.precip}</Text>
      <Image style={ICON} source={{ uri : route.params.icon }} />
    
    </View>
  )
})
