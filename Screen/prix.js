import { StyleSheet, View, ScrollView, Button, TextInput, Text, Image, TouchableOpacity, Icon , Dimensions } from 'react-native';
import React, { useEffect, useState } from "react";
import { getUserData} from "../utils/AsyncStorageFunctions";

import Toast from 'react-native-toast-message';
const {width:WIDTH} =Dimensions.get('window')

const {height:HEIGHT} =Dimensions.get('window')

export default function Prix({route, navigation }) {

 const[station , setStation]=useState('')
 const { itemId,  getReservationn} = route.params;
  const[prix , setPrix]=useState('')

  const[reservation , setReservation]=useState('')
  useEffect(async () => {
    
      if (getReservationn) {
          setReservation(getReservationn)
      }
      console.log(getReservationn._id)
    
  }, []);
  useEffect(async () => {
    const data = await getUserData();
    setStation(data); 
  }, []);

  //Api Modifier reservation par l'id du réservation
const[error , setError]=useState(false)
  const editPrix = async () => {
    if( !prix || prix<0){
      setError(true);
      return false;
        
    }
    console.log(reservation._id)
    fetch("http://192.168.43.230:3001/reservation/mR/" +  reservation._id, {
      method: "PUT",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
       prix:prix

      }
      )
    }).then(res => res.json())
      .then(async (res) => {
        

        {
          Toast.show({
            type: 'success',
            position: 'top',
            text1:'Succes',
            text2:'Ajout de prix validé',
            autoHide: true,
            visibilityTime: 1000,
            autoHide: true,
          
            onHide: () =>{ navigation.navigate('Dashboard') },
          })  
        }
        console.log(res)
       
      }


      )
      .catch((err) => {
        Toast.show({
          type: 'error',
          text1:'Modification ',
          text2:'Ajout de prix éroner',
          visibilityTime: 1000,
          position: 'top',
        }) 
        console.warn(err) })
  }
  return (
    <>
      {reservation != undefined ?
        <ScrollView style={{backgroundColor:'white' , height:HEIGHT}}>

          <Toast />
         
          <View style={styles.container1}>

            <View style={styles.wrapper}>

                <View >
                <Text style={styles.a}>Prix du lavage</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Prix en dinar"
                onChangeText={text => setPrix(text)}
               
              />
             
             {error && !prix &&<Text style={{color:'red' ,marginLeft:10,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}
             {error && prix<0 &&<Text style={{color:'red' ,marginLeft:10,fontSize:10 , fontWeight:'bold'}} > le prix doit etre positive</Text>}

            </View>
              <TouchableOpacity style={styles.btnLogin} onPress={() => {
                editPrix()
              }}>
                <Text style={styles.TextBtn}>Envoyer</Text>

              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>

        : null}
    </>
  );
};

const styles = StyleSheet.create({

  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
  
    marginTop: 70
  },
  input: {
  
        width: WIDTH-30,
        
        marginTop: 20,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        marginBottom: 8,
        borderColor: '#427CA2',
  },
 a: {
      fontWeight:'bold',
      fontSize:20,
      marginTop:50
 },

 
  
  btnLogin: {
    borderColor: '#007BFF',
    backgroundColor: '#427CA2',
    padding: 15,
    borderRadius:10,
    margin: 5,
    width: WIDTH-40,
   
  },
  TextBtn: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
 

  ac : {
    width: 10,
  height: 50,
  flexDirection: "row",
 
   
    
  },
  
});