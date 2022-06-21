import { StyleSheet, View, ScrollView, Button, TextInput, Text, Image, TouchableOpacity, Icon , Dimensions } from 'react-native';
import React, { useEffect, useState } from "react";
import { getUserData, LogoutUser, storeUserData, updateUserData } from "../utils/AsyncStorageFunctions";
import * as ImagePicker from 'expo-image-picker';
import {Picker} from "@react-native-picker/picker";
import Toast from 'react-native-toast-message';
import MapView ,{ PROVIDER_GOOGLE, Marker }from 'react-native-maps';
const {width:WIDTH} =Dimensions.get('window')
import * as FilesSystem from 'expo-file-system';
export default function Update({ navigation }) {
  const [station, setStation] = useState('')
  const [email, setEmail] = useState('')
  const [Nom_station, setNom_station] = useState('')
  const [ville, setVille] = useState('')
  const [adresse, setAdresse] = useState('')
  const[longitude , setLongitude]=useState()  
  const[latitude , setLatitude]=useState()
  const [avatar, setAvatar] = useState('')
  const[error , setError]=useState(false);

  const [avatarFile, setAvatarFile] = useState();

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === 'granted') {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect : [4,3],
        quality:1,
        base64 : true
      });
     
      if (!response.cancelled) {
        setAvatar(response.uri);
        FilesSystem.uploadAsync('http://192.168.43.230:3001/utilisateur/upload-avatar', response.uri, {
          fieldName : "avatar",
          uploadType : FilesSystem.FileSystemUploadType.MULTIPART
        }).then((res)=> setAvatarFile(res.body) )
      }
    }
  };
  const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
  const editProfile = async () => {
    console.log(station.data)
    if(  !Nom_station  ||!ville|| !adresse ||(!regEx.test(email) && email!="") ){
      setError(true);
      return false;
        
    }
    fetch("http://192.168.43.230:3001/utilisateur/ms/" + station.data.station._id, {
      method: "PUT",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        Nom_station,
        email,
        ville,
        adresse,
        avatar:avatarFile,
        longitude,
        latitude

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
            text2:'Modifications validée',
            autoHide: true,
            visibilityTime: 1000,
            autoHide: true,
            onHide: () =>{ navigation.navigate("Dashboard")},
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
    setEmail(data.data.station.emaill)
    setNom_station(data.data.station.Nom_station)
    setVille(data.data.station.ville)
    setAdresse(data.data.station.adresse)
    setAvatar(data.data.station.avatar)
 
    setLatitude(data.data.station.latitude)
    setLongitude(data.data.station.longitude)
    console.warn(data.data.station.longitude)
 
 
  }, []);
  const [mapRegion, setmapRegion] = useState({

    latitude: station?.data?.station?.latitude,
    longitude: station?.data?.station?.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  onChangeValue = mapRegion =>{
    
    setmapRegion({
      mapRegion
    })
 setLongitude(mapRegion.longitude);
 setLatitude(mapRegion.latitude);
  }
  
  return (
    <>
      {station != undefined ?
        <ScrollView>
          <View style={styles.containerr}>
          <View style= {{width: WIDTH, backgroundColor: 	'#427CA2', height:180 }}>
          <Toast ref={(ref)=>{Toast.setRef(ref)}}/>
          </View>
           
               
            <View>
            
            <TouchableOpacity
              onPress={openImageLibrary}
              style={styles.uploadBtnContainer}
            >
              {avatar ? (
                <Image
                  source={{ uri: avatar}}
                  style={{ width: '100%', height: '100%' }}
                />
              ) : (
                <Text style={styles.uploadBtn} onChangeText={(text) => setProfileImage(text)}>Cliquer pour choisir une image</Text>
              )}
            </TouchableOpacity>
            </View>
          </View>

          <View style={styles.container1}>

            <View style={styles.wrapper}>

            <Text style={styles.a}>Nom de station </Text>
              <TextInput
                style={styles.input}
                editable={true}
                defaultValue={station?.data?.station?.Nom_station}
                placeholder="Nouvelle nom de station"
                onChangeText={text => setNom_station(text)}
               
              />
            {error && !Nom_station && <Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}

            <Text style={styles.a}>Email </Text>
              <TextInput
                style={styles.input}
                defaultValue={station?.data?.station.email}
                placeholder="Nouvelle  email"
                onChangeText={text => setEmail(text)}

              />
            {error && !email && <Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}
            {error && !regEx.test(email) &&<Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} > email invalide</Text>}
      

                <View style={styles.emailInput}>
                <Text style={styles.a}>Adresse </Text>
              <TextInput
                style={styles.input}
                defaultValue={station?.data?.station.adresse}
                placeholder="Nouvelle adresse"
                onChangeText={text => setAdresse(text)}

              /></View>
              {error && !adresse && <Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}


      <Picker
                selectedValue={ville}
                style={{ height: 30, width: 270, marginLeft: -8}}
                defaultValue={station?.data?.station.ville}

                onValueChange={(itemValue) => setVille(itemValue)}
                  mode="dropdown"
                
              >
         
         <Picker.Item label="Ariana" value="	Ariana" />
          <Picker.Item label="Béja" value="Béja" />
          <Picker.Item label="Ben Arous" value="Ben Arous" />
          <Picker.Item label="Bizerte" value="Bizerte" />
          <Picker.Item label="Gabès" value="Gabès" />
          <Picker.Item label="Gafsa" value="Gafsa" />
          <Picker.Item label="Jendouba" value="Jendouba" />
          <Picker.Item label="Kairouan" value="Kairouan" />
          <Picker.Item label="Kasserine" value="Kasserine" />
          <Picker.Item label="Kébili" value="Kébili" />
          <Picker.Item label="Le Kef" value="Le Kef" />
          <Picker.Item label="Mahdia" value="Mahdia" />
          <Picker.Item label="La Manouba" value="La Manouba" />
          <Picker.Item label="Médenine" value="Médenine" />
          <Picker.Item label="Monastir" value="Monastir" />
          <Picker.Item label="Nabeul" value="Nabeul" />
          <Picker.Item label="Sfax" value="Sfax" />
          <Picker.Item label="Sidi Bouzid" value="Sidi Bouzid" />
          <Picker.Item label="Siliana" value="Siliana" />
          <Picker.Item label="Sousse" value="Sousse" />
          <Picker.Item label="Tataouine" value="Tataouine" />
          <Picker.Item label="Tozeur" value="Tozeur" />
          <Picker.Item label="Tunis" value="Tunis" />
          <Picker.Item label="Zaghouan" value="Zaghouan" />
        </Picker> 
       
        <Text style={styles.a}>longitude </Text>
              <TextInput
                style={styles.input}
                
               
                placeholder="Nouvelle longitude"
                onChangeText={text => setLongitude(text)}
                defaultValue={`${longitude}`}
                editable = {false}
              />
              <Text style={styles.a}>Latitude</Text>
              <TextInput
                style={styles.input}
              
                defaultValue={`${latitude}`}
                placeholder="Nouvelle latitude"
                onChangeText={text => setLatitude(text)}
                editable = {false}
         
              />
               <View >
        <MapView
      
              style={styles.mapp}
              onRegionChangeComplete= {onChangeValue}
                provider={PROVIDER_GOOGLE}

            region= {{
              
                latitude: latitude,
                longitude: longitude,
                latitudeDelta:mapRegion.latitudeDelta,
                longitudeDelta:mapRegion.longitudeDelta,}}
          
              />
          <View style={{top: '50%', left: '50%', marginLeft:-24,marginTop:-48,position:'absolute'}}>
          <Image style={{height:48, width:48}} source= {require('../assets/marque.png')}/>
          </View>

          </View>

              <TouchableOpacity style={styles.btnLogin} onPress={() => {
                editProfile()
              }}>
                <Text style={styles.TextBtn}>update</Text>

              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>

        : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
  
    marginTop: 20
  },
  input: {
  
        width: 250,
        marginTop: 20,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        marginBottom: 8,
        borderColor: '#427CA2',
  },
  btnLogin: {
  
    borderColor: '#007BFF',
    backgroundColor: '#427CA2',
    padding: 15,
    borderRadius:10,
    margin: 5,
    width: 250,
    marginRight:30
  },
  TextBtn: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  uploadBtnContainer: {
    height: 125,
    width: 125,
    borderRadius: 125 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    marginTop: -60,
    overflow: 'hidden',
    marginRight:15
  },
  uploadBtn: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.3,
    fontWeight: 'bold',
  },
  mapp: {
    alignSelf: 'stretch', 
    height: 250,
    width: 300,
   
  },
  containers: {
    flex: 1,
    backgroundColor: "white",
  },
  containerr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ac : {
    width: 10,
  height: 50,
  flexDirection: "row",
 
   
    
  },
});