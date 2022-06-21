import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, SafeAreaView, Image, TextInput, TouchableOpacity,Dimensions } from 'react-native';

import { DataTable } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
const { width: WIDTH } = Dimensions.get('window')
const {height:HEIGHT} =Dimensions.get('window')


export default function OnHistorique({ route, navigation }) {
    const { itemId, getReservations} = route.params;
    const[prix , setPrix]=useState('')
    const[reservation , setReservation]=useState('')

    
    useEffect(async () => {
      
        if (getReservations) {
            setReservation(getReservations)
            if(getReservations.etat=='confirme'){
            setPrix('Prix : '+getReservations.prix+'  dinars')
            }
        }
    }, []);
 
    
    return (

        <SafeAreaView  style={{height:HEIGHT , backgroundColor:'white'}}>
            <ScrollView >
                
            <Text style={{color:'#427CA2' , fontWeight:'bold' , fontSize:19 , alignSelf:'center' ,marginTop:100 }}>Informations de la réservation</Text>
                
                <View style={styles.container}>
                <DataTable>
                <DataTable.Header>
                <DataTable.Cell style={{fontSize:20}}><Ionicons
                    name="person"
                    size={20}
                    color="#427CA2"
                    
            />    Nom client</DataTable.Cell>
            <DataTable.Title style={{width:WIDTH/2 , marginLeft:40}}>{reservation.Nom_client}</DataTable.Title>
      
            
             
             </DataTable.Header>
    
             <DataTable.Header>
        <DataTable.Cell ><Ionicons
              name="person"
              size={20}
              color="#427CA2"
            
            />    Prenom </DataTable.Cell>
            <DataTable.Title style={{width:WIDTH/2 , marginLeft:40}}>{reservation.Prenom_client}</DataTable.Title>
      
             </DataTable.Header>
    
             <DataTable.Header>
            <DataTable.Cell style={{fontSize:20}}><Ionicons
              name="car"
              size={22}
              color="#427CA2"
              style={{marginRight: 10}}
            />    Nature </DataTable.Cell>
            <DataTable.Title style={{width:WIDTH/2 , marginLeft:40}}>{reservation.Nature_vehicule}</DataTable.Title>
    
             </DataTable.Header>
    
        </DataTable>

      </View>
      <View style={{ marginTop:60}}>
        <Text style={{fontWeight:'bold' , marginLeft:20, alignSelf: 'center'}}>Date et heure de réservation   </Text>
            <Text style={{
            marginTop:20 , alignSelf: 'center'}} >{reservation.date_heure}</Text>       
                    
            </View>   
                  <Text style={{color:'red', fontWeight:'bold' , alignSelf:'center' , marginTop:40}}>{prix}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
      
      },
   
   f:{
      fontStyle:'italic',
      color:'red'
   }

});