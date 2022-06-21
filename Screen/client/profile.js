import React, { useEffect, useState } from "react";
import styles from "./style";
import { Alert, StyleSheet, ScrollView, Image, Keyboard, KeyboardAvoidingView, Text,Dimensions, TextInput, TouchableWithoutFeedback, Pressable, View } from "react-native";
import { Button, SocialIcon } from "react-native-elements";
import * as Facebook from "expo-facebook";
import profl from '../../assets/asmaaa.png'
import { getClientData, updateClientData } from "../../utils/AsyncStorageClient";
import Toast from 'react-native-toast-message';
const { width: WIDTH } = Dimensions.get('window')
export default function Profile({ navigation }) {
  const [client, setClient] = useState('')
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [Adr, setAdr] = useState('')
  const [Num_tel, setNum_tel] = useState('')
  const[error , setError]=useState(false);
  const[emaill , setEmail]=useState('')
  const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
  const editProfile = async () => {

          if( !nom || !prenom ||!Adr|| !Num_tel||Num_tel<0 ||Num_tel.length!=8 ||(!regEx.test(emaill) && emaill!="")){
            setError(true);
            return false;
              
          }
          fetch("http://192.168.43.230:3001/utilisateur/m/" + client.data.utilisateur._id, {
            method: "PUT",
            headers: {
              "Content-Type": 'application/json',
            },
            body: JSON.stringify({
              nom,
              prenom,
              Adr,
              Num_tel,
              emaill
              
            }
            )
          }).then(res => res.json())
            .then(async (res) => {
            
              console.log(res)
              const newClient = { ...client };
              newClient.data.utilisateur = { ...newClient.data.utilisateur, ...res }
              await updateClientData(newClient);
              if(res){
                Toast.show({
                  type: 'success',
                  position: 'top',
                  text1:'Succès',
                  text2:'Modification validée',
                  autoHide: true,
                  visibilityTime: 500,
                  autoHide: true,
                  onHide: () =>{  navigation.navigate("espaceClient")},
                  onShow: () =>{},
                })  
              }
            
            }


            )
            .catch((err) => { 
              Toast.show({
                type: 'error',
                text1:'Connexion éroner',
                text2:'vérifier votre champs',
                visibilityTime: 1000,
                position: 'top',
              }) 
             
              })
  }

          useEffect(async () => {
            const data = await getClientData();
            setClient(data);
            setNom(data.data.utilisateur.nom)
            setPrenom(data.data.utilisateur.prenom)
            setAdr(data.data.utilisateur.Adr)
            setNum_tel(data.data.utilisateur.Num_tel)
            setEmail(data.data.utilisateur.emaill)
            console.log(client)
          }, []);

 

  return (
    <View style={{backgroundColor: '#FFFFFF',}}>
    
    {client != undefined ?
    
    <ScrollView>
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
        
          <View >
            <></>
          
          <View style={{ justifyContent: 'center',alignItems: 'center',}}>
            <Image source={ profl } style={{
                                        width: 300,
                                        height: 300,
                                        alignSelf:'center',
                                        marginTop:20
                                    
                                      }} />

          </View>
            <TextInput placeholder="Adresse" 
                       placeholderColor="#c4c3cb" 
                       defaultValue={client?.data?.utilisateur.Adr}
                       
                       onChangeText={text => setAdr(text)}
                       style={styles.loginFormTextInput} />
          {error && !Adr &&<Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}
            
            <TextInput placeholder="Numéro de téléphonr" 
                  placeholderColor="#c4c3cb" 
                  defaultValue={`${client?.data?.utilisateur.Num_tel}`}
                  keyboardType="numeric"
                  onChangeText={text => setNum_tel(text)}
                  style={styles.loginFormTextInput} />
                  {error && !Num_tel &&<Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}
                  {error && Num_tel.length!=8 &&<Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} >Numéro du téléphone doit contenir 8 chiffres</Text>}
                  {error && Num_tel<0 &&<Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} >Numéro du téléphone doit  etre positive</Text>}
      
            <TextInput placeholder="Email" 
                  placeholderColor="#c4c3cb" 
                  defaultValue={`${client?.data?.utilisateur.emaill}`}
             
                  onChangeText={text => setEmail(text)}
                  style={styles.loginFormTextInput} />
            {error && !emaill &&<Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}
            {error && !regEx.test(emaill) &&<Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} > email invalide</Text>}
      

            <Button  style={{alignContent:'center' , width:WIDTH}} onPress={() => {
                editProfile()
              }} title="Modifier" />
            
          </View>
         
        </View>
      </TouchableWithoutFeedback>
      <Toast ref={(ref)=>{Toast.setRef(ref)}}/>        
    </KeyboardAvoidingView>
    </ScrollView>
     : null}
   </View>
  );
}