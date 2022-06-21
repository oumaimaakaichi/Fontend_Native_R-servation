import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView,Dimensions, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';

import { getClientData, updateClientData } from "../../utils/AsyncStorageClient";
const { width: WIDTH } = Dimensions.get('window')
const {height:HEIGHT} =Dimensions.get('window')
export default function StationData({ route, navigation }) {
    const { itemId, getStation } = route.params; 
    const [client, setClient] = useState('')
    const [station, setStation] = useState()

    useEffect(async () => {
        setClient(await getClientData());
        if (getStation) {
            setStation(getStation)
        }
    }, []);
  
    return (

        <SafeAreaView style={{ backgroundColor: 'white' , height:HEIGHT }}>
            <ScrollView >
                <Image
                      source={{ uri: getStation.avatar }}
                      style={{ width: WIDTH, height: 230 }}
                    ></Image>
                     <View style={{ backgroundColor:'white' }}>
                    <Text style={{ color: '#0594D0', fontWeight: 'bold' , fontSize:20 , marginTop:30 , marginBottom:20 , marginLeft:9}}>
                          Information de la station
                    </Text>
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
                        <Text  style={{marginLeft:15,fontSize:18, color:'#0594D0' , fontWeight:'bold' , marginTop:10}}>Adresse</Text>
                        <Text style={{marginLeft:15,fontSize:15, color: 'black' , marginTop:5}}>{station?.adresse}</Text>
                        </View>
                        <Text style={{color:'#0594D0'   , marginTop:10 , fontSize:17 , marginStart:10 , fontWeight:'bold'}}> Horaire de travail </Text>
                        <Text style={{color:'black' , marginBottom:30  ,marginStart:10}}> {station?.jourPT}</Text>   
     
                         <TouchableOpacity style={styles.btnLogin} 
                         onPress={()=>{navigation.navigate('mapRes', {
                                    itemId: station._id,
                                    getStation: station,
                        });}}>
                        <Text style={styles.TextBtn}>Reserver</Text>

                         </TouchableOpacity>
                            </View>
                
               
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
        marginTop: 5,
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom:40
    },
    TextBtn: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    link: {
        color: 'blue',
    },

    container1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        width: '80%',
    },
});