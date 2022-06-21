import { StyleSheet, View, ScrollView, Button, TextInput, Text, Image, TouchableOpacity, Icon , Dimensions } from 'react-native';
import React, { useEffect, useState } from "react";
import { getUserData, LogoutUser, storeUserData, updateUserData } from "../utils/AsyncStorageFunctions";
import Toast from 'react-native-toast-message';
const {width:WIDTH} =Dimensions.get('window')
import * as FilesSystem from 'expo-file-system';
export default function Horaire({ navigation }) {
  const [station, setStation] = useState('')
 const[jourPT , setJour]=useState('')
  const[error , setError]=useState(false);
  const editProfile = async () => {
    console.log(station.data)
    
    //Api modifier station by id du station
    fetch("http://192.168.43.230:3001/utilisateur/ms/" + station.data.station._id, {
      method: "PUT",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
       jourPT

      }
      )
    }).then(res => res.json())
      .then(async (res) => {
        const newStation = { ...station };
        newStation.data.station = { ...newStation.data.station, ...res }
        await updateUserData(newStation);
       

        {
          Toast.show({
            type: 'success',
            position: 'top',
            text1:'Succès',
            text2:'Ajouté avec succée',
            autoHide: true,
            visibilityTime: 5000000,
            autoHide: true,
          
            onShow: () =>{},
          })  
        }
        console.log(res)
       
      }


      )
      .catch((err) => {
        Toast.show({
          type: 'error',
          text1:'Modification ',
          text2:'Modification éroner',
          visibilityTime: 1000,
          position: 'top',
        }) 
        console.warn(err) })
  }

  useEffect(async () => {
    const data = await getUserData();
    setStation(data);
    setJour(data.data.station.jourPT)
   
  }, []);
  
  return (
    <>
      {station != undefined ?
        <ScrollView>

          <View style={styles.container1}>

            <View style={styles.wrapper}>
            <Toast/>
                <View style={styles.emailInput}>
                <Text style={styles.a}>Horaire </Text>
              <TextInput
                style={styles.input}
                defaultValue={station?.data?.station.jourPT}
                placeholder="Ajouter vos Horaires du travail"
                onChangeText={text => setJour(text)}
                multiline={true}
              /></View>
             
             
              <TouchableOpacity style={styles.btnLogin} onPress={() => {
                editProfile()
              }}>
                <Text style={styles.TextBtn}>Ajouter</Text>

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
  
    marginTop: 20
  },
  input: {
  
        width: WIDTH-30,
        height:200,
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
      marginTop:100
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
  containers: {
    flex: 1,
    backgroundColor: "white",
  },

  ac : {
    width: 10,
  height: 50,
  flexDirection: "row",
 
   
    
  },

});