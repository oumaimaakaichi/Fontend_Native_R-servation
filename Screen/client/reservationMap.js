import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground,Platform, StatusBar, LogBox  , ScrollView, SafeAreaView, Image, TextInput, TouchableOpacity , Dimensions} from 'react-native';
import { useTheme } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import datee from'../../assets/62920calendar_109276.png'
import timee from'../../assets/iconfinder-document09-1622827_121958.png'
import { getClientData, updateClientData } from "../../utils/AsyncStorageClient";
import DatePicker from 'react-native-datepicker';
const {width:WIDTH} =Dimensions.get('window')
const {height:HEIGHT} =Dimensions.get('window')
import logo from '../../assets/res.png';
import Toast from 'react-native-toast-message';
LogBox.ignoreAllLogs(true)
import DateTimePicker from "@react-native-community/datetimepicker";
import {Picker} from "@react-native-picker/picker";
export default function NewReservationMap({ route, navigation }) {
    const { itemId, getStation } = route.params;
    const [Nature_vehicule, setNatureVehicule] = useState('');
    const [client, setClient] = useState('')
    const [station, setStation] = useState()
    const[error , setError]=useState(false);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('');
    useEffect(async () => {
        setClient(await getClientData());
        if (getStation) {
            setStation(getStation)
        }
    }, []);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let fTime =   tempDate.getHours() + ': '+tempDate.getMinutes();
        setText('Date : '+fDate + ' | Heure : '+ fTime)
        console.log(text);
      
      }   
      const showMode = (currentMode) =>{
        setShow(true);
        setMode(currentMode);
      }
      
    const { colors } = useTheme();

    async function addReservatoin() {
        if(!text || !Nature_vehicule ){
                    setError(true);
                    return false;
                    
                }
        fetch("http://192.168.43.230:3001/reservation/addres", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                idStation: itemId,
                date_heure: text,
                Nature_vehicule: Nature_vehicule,
                Nom_client: client.data.utilisateur.nom,
                Prenom_client: client.data.utilisateur.prenom,
                Utilistauer:client.data.utilisateur._id,
                Num_Client:client.data.Num_tel,
                Station:getStation._id
            }),
        }).then(res => res.json())
        .then(async res => {
            Toast.show({
                type: 'success',
                position: 'top',
                text1:'Réservation',
                text2:'Votre réservation est validée',
                autoHide: true,
                visibilityTime: 500,
                autoHide: true,
                onHide: () =>{ navigation.navigate('espaceClient')},
                onShow: () =>{},
              }) 
                 
                
            })
            .catch(err => {
                Toast.show({
                    type: 'error',
                    text1:'Réservation',
                    text2:'Echec de réservation',
                    visibilityTime: 1000,
                    position: 'top',})
                console.log(err)
            });
    }

    return (

        <SafeAreaView style={{ backgroundColor: 'white',height: HEIGHT  }}>
            <ScrollView >
            <Text style={{color:'#0594D0' , fontWeight:'bold' , fontSize:20, marginStart:20 ,marginTop:100 , fontFamily: 'sans-serif', alignSelf:'center' }}>Faire une réservation</Text>
            <Image source={logo}  style={styles.logo}/>
            <Toast/>
           
        <View style={{flexDirection:'row' , alignContent:'center' , alignItems:'center' ,marginBottom:10, alignSelf:'center'}}>
            <Text style={{fontWeight:'bold' , fontSize:16}}>Choisir une date :      </Text>
            <TouchableOpacity onPress={() => showMode('date')}>
                <Image source={datee}  style={{width:40 , height:40}} />
            </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row' , alignContent:'center' , alignItems:'center' , alignSelf:'center'}}>
            <Text style={{fontWeight:'bold' , fontSize:16}}> Choisir une heure :   </Text>
            <TouchableOpacity onPress={() => showMode('time')}>
                <Image source={timee}  style={{width:50 , height:50 , alignSelf:'center' , alignItems:'center'}} />

            </TouchableOpacity>
        </View>

    <View>
        <Picker
          selectedValue={Nature_vehicule}
          style={{ height: 30, width: 230 , marginStart:30 ,marginLeft:WIDTH-315 }}
          onValueChange={(itemValue) => setNatureVehicule(itemValue)}
          placeholder='select me ' mode="dropdown"
        >
         <Picker.Item label="Nature de véicule" value={null} style={{ display : "none" , width: 400}}/>
         
          
          <Picker.Item label="Voiture" value="Voiture" />
          <Picker.Item label="Taxi" value="Taxi" />
          <Picker.Item label="Bus" value="Bus" />
          <Picker.Item label="Minibus" value="Minibus" />
          <Picker.Item label="Camion" value="Camion" />
          <Picker.Item label="Mini Camion" value="Mini Camion" />
          <Picker.Item label="Scooter" value="Scooter" />
          </Picker>
          {error && !Nature_vehicule && <Text style={{color:'red' ,fontSize:10 , fontWeight:'bold' , marginStart:20}} > champ obligatoire *</Text>}
    </View>
{show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <StatusBar style="auto" />
    <View style={{
            flexDirection:'row',
            alignItems:"center",
            marginHorizontal:25,
            borderWidth:2,
            marginTop:50,
            paddingHorizontal:10,
            borderColor:"black",
        
            paddingVertical:2,
            width:WIDTH-20,
            alignSelf:'center'
            
        }

        }  >
            <TextInput  style={{paddingHorizontal:10 , color:'black'}} 
                value={text}
                placeholderTextColor={'grey'}
                onChangeText={date=>setText(date)} 
                editable = {false}
                placeholder="date et heure"
                />
    

    </View>
            {error && !text  && <Text style={{color:'red' ,fontSize:10 , fontWeight:'bold' , marginStart:20}} > champ obligatoire *</Text>}


                <TouchableOpacity style={styles.btnLogin} 
                onPress={() => {
                    addReservatoin();
                }}>
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
        width:WIDTH-20,
        height: 45,
      
        backgroundColor: '#0594D0',
        justifyContent: 'center',
        marginTop:30,
  
        alignItems: 'center',
       
        marginBottom:80,
        alignSelf:'center'
    },
    TextBtn: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontWeight:'bold'
    },
  
    logo: {
        width: 180,
        height: 180,
    alignSelf:'center',
    marginBottom:80,
    marginTop: 30
   
  
    },
 
      datePickerStyle: {
        width: 300,
        alignSelf:'center',
        marginTop:50,
        marginBottom:20
      },
      text: {
        textAlign: 'left',
        width: 230,
        fontSize: 16,
        color : "#000"
      },

});