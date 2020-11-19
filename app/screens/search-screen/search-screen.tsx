import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle ,TextInput , TouchableOpacity ,Button,SafeAreaView ,Image,View,ImageStyle, TextStyle,Alert} from "react-native"
import { Screen, Text } from "../../components"
 import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { NavigationContainer } from "@react-navigation/native"
import { useStores } from "../../models"
import AsyncStorage from "@react-native-community/async-storage"
const ROOT: ViewStyle = {
  backgroundColor: '#448ee4',
  flex: 1,
  justifyContent:'center',
  alignItems:"center"
}
const SEARCH: ViewStyle = {
  backgroundColor: 'white',
  height: 60,
  width:'80%',
  borderRadius:15,
  paddingLeft:20,
  justifyContent:'center',
  alignItems:"center"
  
}
const PLACEHOLDER : TextStyle ={
  fontSize : 20,
}

const SEARCH_BUTTON: ViewStyle = {
  backgroundColor: 'blue',
  marginTop:50,
  height:60,
  width:200,
  alignItems:"center",
  justifyContent:'center',
  borderRadius : 15
}
const NAME : TextStyle ={
  fontSize:35,
  fontWeight:'bold',
  marginBottom : 40
}
const LOGO : ImageStyle ={
  height :'10%',
  width :'28%',
  borderRadius:30,
  marginBottom:120
}


export const SearchScreen = observer(function SearchScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  const [countryDetail,setCountryDetail] = useState({
      name :'',
      capital :'',
      population :0,
      latlang :[],
      flag :''
  });
  const navigation = useNavigation();
  const [isValid,setIsValid] = useState(false);
   const [countryName,setCountryName] = useState<string>('');
  const rootStore = useStores();
  
 async function handleSearch (countryName)  {
   
     if(isValid){
    
       
      await rootStore.countryStore.getCountryDetails(countryName);
       
      //console.warn(rootStore.countryStore.countrys);
       const countryArray = rootStore.countryStore.countrys.filter((item) => item.name === countryName);
    
      
      if(countryArray.length === 0)
      {
        Alert.alert('No data found');
        
        
      }
      else{
        navigation.push('opening',{countryDetail:{
          name : countryArray[0].name,
          capital : countryArray[0].capital,
          population : countryArray[0].population,
          latlng : countryArray[0].latlng,
          flag : countryArray[0].flag,
        }});
      }
    }
    else
    {
      Alert.alert('Please enter country name');
    }
  }

   const textInputChange = (val) => {
    if( val.trim().length > 0 ) {
       setCountryName(val);
        setIsValid(true);
    } else {
        setIsValid(false);
        setCountryName(val);
    }
}
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View style={ROOT}>
      <Text style={NAME}>Weather App</Text>
      <Image source={require('../../../assets/weathericon.png')} style={LOGO} />
      <TextInput 
                    placeholder="Enter Country Name eg.India"
                    placeholderTextColor="#666666"
                    style={[SEARCH,PLACEHOLDER]}
                    value= {countryName}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    //onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
              
                <TouchableOpacity onPress={()=>{handleSearch(countryName)}} style={SEARCH_BUTTON}>
                  <Text style={{color:'white',fontSize:30}}>Search</Text>
                </TouchableOpacity>
              

    </View>
  )
})
