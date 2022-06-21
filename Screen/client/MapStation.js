import React, { useState ,Component, useEffect } from 'react';
import { View, StyleSheet, Image , Text, TouchableOpacity, Dimensions, ToastAndroid, Pressable} from 'react-native';
import MapView , { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import liste from '../../assets/menu.png'
import * as Location from 'expo-location';
import { PickerItem } from 'react-native/Libraries/Components/Picker/Picker';
import Icon from "react-native-vector-icons/FontAwesome5";
var iconHeight = 26;
var iconWidth= 26;
const  App = ({navigation}) => {

  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const { width, height } = Dimensions.get('window');
  const[data , setData]=useState()

    useEffect(() => {
      fetch("http://192.168.43.230:3001/utilisateur/getAll")
        .then((res) => res.json())
        .then((resJSON) => {
          console.log(resJSON)
          setData(resJSON);
      
        })
        .catch((err) => console.warn(err));
    }, []);
     useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }

          let location = await Location.getCurrentPositionAsync({});
          setLatitude(location.coords.latitude)
          setLongitude(location.coords.longitude)
          console.log(location);
        })();
      }, []);

      const [mapRegion, setmapRegion] = useState({
        latitude: 36.8002068,
        longitude: 	10.1857757,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421, });

        onChangeValue = mapRegion =>{
        ToastAndroid.show(JSON.stringify(mapRegion), ToastAndroid.SHORT)
        setmapRegion({
          mapRegion
        })
      
    console.log(mapRegion);
      }

 
  return (
   
  
    <View style={styles.container}>
      <MapView
        style={styles.mapp}
        provider={PROVIDER_GOOGLE}

        region= {{
          
            latitude: latitude,
            longitude: longitude,
            latitudeDelta:mapRegion.latitudeDelta,
            longitudeDelta:mapRegion.longitudeDelta,}}
          
          >
<>

        {data?.map(marker =>(

        <Marker
        coordinate={{
        latitude:marker.latitude,
        longitude:marker.longitude,
        }}
        title={marker.Nom_station}
        key={marker._id}
        onPress={()=>{navigation.navigate('stationData', {
                                  itemId: marker._id,
                                  getStation: marker,
                                });}}

        />

        ))} 
          </>
   
     </MapView>  
     <View style={styles.NavContainer}>
      <View style={styles.NavBar}>
        <Pressable onPress={() =>  navigation.navigate('Liste_stas') } style={styles.IconBehave} 
        android_ripple={{borderless: true, radius:50}}
        >

          <Icon name="list" color="white" size={20} style={{
            marginTop: -4,
          }} >&nbsp;&nbsp;&nbsp;<Text height= {iconHeight} width={iconWidth} style={styles.text}>Liste</Text></Icon>

        </Pressable>
      </View>
      </View>
    </View>
    
  );

};

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapp:{
      width:400,
      height:700,
      marginTop:10
  },
  NavContainer:{
    position: 'absolute',
    alignItems: 'center',
    bottom:20,
  },
  NavBar: {
    flexDirection: 'row',
    backgroundColor: '#23262E',
    width: '50%',
    justifyContent: 'space-evenly',

    borderRadius: 40,
    marginLeft: 90
  },
  IconBehave: {
    padding:14
  },
  text:{
    color: 'white',
   
  }
});