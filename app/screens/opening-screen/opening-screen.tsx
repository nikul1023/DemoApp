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
import SvgUri from 'react-native-svg-uri-reborn'
import { iteratorSymbol } from "mobx/lib/internal"


const ROOT: ViewStyle = {
  backgroundColor: 'white',
  flex: 1,
  // height:500,
  // width:500
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
  // height:100,
  // width:100,
  //  marginTop:20,
  //  marginBottom:20,
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

  


export const OpeningScreen = observer(function OpeningScreen() {
  // Pull in one of our MST stores
  const { countryDetails,countryStore } = useStores();
  // OR
  
  
  const route = useRoute();
  const navigation = useNavigation();
  const renderItem =({item }) =>
{
  if(item.name === route.params.countryName)
  {
  return(
  
    <View key={item.name} style={COUNTRY_DETAILS}>
    <Text style={COUNTRY_NAME}>
        {item.name}
    </Text>
    <Text style={CAPITAL}>
        Capital :{item.capital}
    </Text>
    <Text style={POPULATION}>

      Population :  {item.population}
    </Text>
    <Text style={LATLANG}>
        Location : [{item.latlng[0]},{item.latlng[1]}]
    </Text>
    <SvgUri 
    width="200"
    height="250"
    style={FLAG}
     source ={{ uri : item.flag ? item.flag : null}}
     />
    
   
    <Button onPress={()=> navigation.push('weather',{cityName : item.capital})} textStyle={BUTTON_TEXT} style={BUTTON} text='Capital Weather' />
</View>
  
  )
  }
  else{
    Alert.alert('No data found');
  }

};
  React.useEffect(() => {
     countryStore.getCountryDetails(route.params.countryName);
    
  },[route.params.countryName])
  // const rootStore = useStores()
  //setData(toJS(countryDetails.country))
  //console.warn(countryStore.country);
 console.log(countryStore.country);
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <ScrollView style={ROOT}>
       <FlatList
        data={toJS(countryStore.country)}
        renderItem={renderItem}
        keyExtractor={item => item.name}
      />
      {/* {countryStore.country.map(countrys => 
      
   <View key={countrys.name} style={COUNTRY_DETAILS}>
          <Text style={COUNTRY_NAME}>
              {countrys.name}
          </Text>
          <Text style={CAPITAL}>
              Capital :{countrys.capital}
          </Text>
          <Text style={POPULATION}>

            Population :  {countrys.population}
          </Text>
          <Text style={LATLANG}>
              Location : [{countrys.latlng[0]},{countrys.latlng[1]}]
          </Text>
          <SvgUri 
          width="200"
          height="250"
          style={FLAG}
           source ={{ uri : countrys.flag ? countrys.flag : null}}
           />
          
         
          <Button onPress={()=> navigation.push('weather',{cityName : countrys.capital})} textStyle={BUTTON_TEXT} style={BUTTON} text='Capital Weather' />
      </View>
      )} */}
    
    </ScrollView>
  )
})
