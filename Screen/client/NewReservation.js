import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet,Dimensions, Text, View, ImageBackground, ScrollView, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';

import { getClientData, updateClientData } from "../../utils/AsyncStorageClient";
import MapView , { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
const { width: WIDTH } = Dimensions.get('window')
import { DataTable } from 'react-native-paper';
const {height:HEIGHT} =Dimensions.get('window')
export default function NewReservation({ route, navigation }) {
    const { itemId, getStation } = route.params;
    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
        })();
      }, []);
      const [mapRegion, setmapRegion] = useState({
   
        latitude: getStation.latitude,
        longitude: 	getStation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
       
        
        }
      
      );
    
      onChangeValue = mapRegion =>{
      
        setmapRegion({
          mapRegion
        })
      
     console.log(mapRegion);
      }    
    const [client, setClient] = useState('')
    const [station, setStation] = useState()

    useEffect(async () => {
        setClient(await getClientData());
        if (getStation) {
            setStation(getStation)
        }
    }, []);


    return (

        <SafeAreaView style={{ backgroundColor: 'white'  , height:HEIGHT}}>
            <ScrollView >
           
                <View style={{  backgroundColor:'white'  }}>
                <Image
                      source={{ uri: getStation.avatar }}
                      style={{ width: WIDTH, height: 230 }}
                    ></Image>
                    <Text style={{ color: '#0594D0', fontWeight: 'bold' , fontSize:18 , marginTop:20 , marginStart:8 , marginBottom:20}}>
                        Information de la station
                    </Text>
                    
                </View>
     <View >
            <DataTable>
                <DataTable.Header>
                    <DataTable.Cell style={{fontSize:20}}>Nom station</DataTable.Cell>
                     <DataTable.Title style={{width:WIDTH/2 , marginLeft:40}}>{station?.Nom_station}</DataTable.Title>
  
                </DataTable.Header>

                <DataTable.Header>
                     <DataTable.Cell style={{fontSize:20}}>Ville</DataTable.Cell>
                    <DataTable.Title style={{width:WIDTH/2 , marginLeft:40}}>{station?.ville}</DataTable.Title>

                </DataTable.Header>
                <DataTable.Header>
                    <DataTable.Cell style={{fontSize:20}}>Email</DataTable.Cell>
                    <DataTable.Title style={{width:WIDTH/2 , marginLeft:40}}>{station?.email}</DataTable.Title>
  
                </DataTable.Header>

             </DataTable>
    </View>
            <Text  style={{marginLeft:15,fontSize:18, color:'#0594D0'  , marginTop:10}}>Adresse</Text>
            <Text style={{marginLeft:15,fontSize:15, color: 'black' , marginTop:5}}>{station?.adresse}</Text>
            <Text style={{color:'#0594D0'   , marginTop:20 , fontSize:17 , marginStart:10}}> Horaire de travail </Text>
            <Text style={{color:'black' , marginBottom:20  ,marginStart:10}}> {station?.jourPT}</Text>   
            
            <MapView
                style={styles.mapp}
                provider={PROVIDER_GOOGLE}

                region= {{
                
                    latitude: mapRegion.latitude,
                    longitude: mapRegion.longitude,
                    latitudeDelta:mapRegion.latitudeDelta,
                    longitudeDelta:mapRegion.longitudeDelta,}}
                     showsUserLocation={true}
                >


                <Marker

                coordinate={{
                latitude:getStation.latitude,
                longitude:getStation.longitude,

                }}
                title={getStation.Nom_station}


                />

     
             </MapView>  
                <TouchableOpacity style={styles.btnLogin} onPress={()=>{navigation.navigate('mapRes', {
                          itemId: station._id,
                          getStation: station,
                        });}}>
                    <Text style={styles.TextBtn}>Reserver</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
 
    scrollView: {
        backgroundColor: 'white',
        marginVertical: 10,
    },
    icon: {

        top: 8,
        left: 37,
    },
    btnLogin: {
        width: 250,
        height: 45,
        borderRadius: 10,
        backgroundColor: '#0594D0',
        justifyContent: 'center',
        marginTop: 20,
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom:30
    },
    TextBtn: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
 
    logoContainer: {
        alignItems: 'center'
    },
    btnEye: {

        top: 17,
        right: 60,
    }
    ,
  
   
    wrapper: {
        width: '80%',
    },
    mapp: {
        width: 500,
        height: 250, 
    }

});