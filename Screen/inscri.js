import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, SafeAreaView, Image, TextInput, TouchableOpacity , ToastAndroid, Alert} from 'react-native';
import MapView ,{ PROVIDER_GOOGLE, Marker }from 'react-native-maps';
import logo from '../assets/loggg.jpg'
import { Dimensions, input } from 'react-native-web';
const { width: WIDTH } = Dimensions.get('window')
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import Feather from "react-native-vector-icons/Feather";
import {Picker} from "@react-native-picker/picker";
import Toast from 'react-native-toast-message';
import axios from 'axios';
import * as FilesSystem from 'expo-file-system';
const {height:HEIGHT} =Dimensions.get('window')
function dataURLtoFile(dataurl, filename) {
 
  var bstr = atob(dataurl), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
      
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename);
}

const Register = ({ navigation }) => {
  const [Nom_station, setNom_station] = useState('');

  const [ville, setVille] = useState();
  const [adresse, setAdresse] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [latitudeDelta,setlatitudeDelta]= useState('');
  const [longitudeDelta, setlongitudeDelta] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarFile, setAvatarFile] = useState();
  
  const[error , setError]=useState(false);
  const [mapRegion, setmapRegion] = useState({

    latitude: 36.8002068,
    longitude: 	10.1857757,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  onChangeValue = mapRegion =>{
   
    setmapRegion({
      mapRegion
    })
    setLongitude(mapRegion.longitude);
    setLatitude(mapRegion.latitude);
    setlatitudeDelta(mapRegion.latitudeDelta);
    setlongitudeDelta(mapRegion.longitudeDelta);
  }
 
  const { colors } = useTheme();
  const [dataa, setDataa] = React.useState({
  
    secureTextEntry: true,
   
  });
  const updateSecureTextEntry = () => {
    setDataa({
      ...dataa,
      secureTextEntry: !dataa.secureTextEntry,
    });
  };
  const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
  function Add() {
    if(!Nom_station  || !email || !password || !longitude ||!ville || !adresse || !latitude   || password.length<6 ||(!regEx.test(email) && email!="") ){
      console.log("Erreur")
      setError(true);
      return false;
        
    }
    console.log("Inscription mobile");
    

    const data =  {
      Nom_station, 
      
      ville, 
      adresse, 
      longitude, 
      latitude, 
      email, 
      password, 
      avatar : avatarFile,
      longitudeDelta,
      latitudeDelta,
      Role : "lavage"
    }
    

    axios.post("http://192.168.43.230:3001/utilisateur/register", data)
      .then( ({data}) => {
        if (data) {
          if (data.email != '' && data.password != '') {
            {
              Toast.show({
                position: 'top',
                type: 'success',
              
                text1:'Inscription',
                text2:'Inscription validée',
               
                autoHide: true,
                visibilityTime: 500,
                autoHide: true,
                onHide: () =>{ navigation.navigate('signin')},
                onShow: () =>{},
              })  
            }
           
          }
        }
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1:'Inscription ',
          text2:'Inscription  éroner',
          visibilityTime: 1000,
        
        })  
        console.log(err.response)
      });
  }

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

  const uploadProfileImage = async () => {
    const formData = new FormData();
    formData.append('profile', {
      name: new Date() + '_profile',
      uri: `data:image/gif;base64,${avatar}`,
      type: 'image/jpg',
    });
  }
  return (
    <>
      {mapRegion != undefined?
    <SafeAreaView style={{ backgroundColor: 'white', }}>
      <ScrollView style={styles.scrollView}>
      <Toast />
        <View style={{ alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: '#427CA2', fontWeight: 'bold', marginBottom: 30, fontSize: 22 , marginTop:5}}>S'inscrire</Text>
         
        </View>
        
        <View style={styles.containerr}>
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
        <View style={styles.action}>
        
          <TextInput
            placeholder="Nom Station"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {marginTop: 30,
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={text => setNom_station(text)}
          
          />
        
       
        </View>
           {error && !Nom_station &&<Text style={{color:'red' ,marginLeft:20,fontSize:10  ,fontWeight:'bold'}} > champ obligatoire *</Text>}
           
          <View style={styles.action}>
          
          <TextInput
            placeholder="Adresse"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={text => setAdresse(text)}
          
          />
        
       
        </View>
         {error && !adresse &&<Text style={{color:'red' ,marginLeft:20,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}
    
        <View style={styles.action}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={text => setEmail(text)}
          
          />
        
        </View>
         {error && !email &&<Text style={{color:'red' ,marginLeft:20,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}
         {error && !regEx.test(email) &&<Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} > email invalide</Text>}
      
      
         <View style={styles.action}>
       
          <TextInput
            placeholder="MotPasse"
            placeholderTextColor="#666666"
            secureTextEntry={dataa.secureTextEntry ? true : false}
       
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={text => setPassword(text)}
          />
          
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {dataa.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {error && !password &&<Text style={{color:'red' ,marginLeft:20,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}
        {error && password.length<6 && <Text style={{color:'red' ,marginLeft:20,fontSize:10 , fontWeight:'bold'}} > Mot de passe doit contenir minimum 6 caractére</Text>}
        <View style={styles.action}>
       
          <TextInput
            placeholder="longitude"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={text => setLongitude(text)}
            defaultValue={`${longitude}`}
            editable = {false}
          />
        
       
        </View>
        <View style={styles.action}>
      
          <TextInput
            placeholder="Latitude"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={text => setLatitude(text)}
            defaultValue={`${latitude}`}
            editable = {false}
          />
        
       
        </View>

    
      
        <View style={styles.ac}>
            <View>
        <Picker
          selectedValue={ville}
          style={{ height: 30, width:200 , fontSize:18 }}
          //mode={"dialog"}
          onValueChange={(itemValue) => setVille(itemValue)}
            mode="dropdown"
          
        >
         
         <Picker.Item label="choisir une ville" value={null} style={{ display : "none" }}/>
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
        </Picker>{error && !ville &&<Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}
        </View>
         
    </View>

        <View style={styles.container}>
        <MapView
      
        style={styles.mapp}
        onRegionChangeComplete= {onChangeValue}
        provider={PROVIDER_GOOGLE}

     region= {{
       
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude,
        latitudeDelta:mapRegion.latitudeDelta,
        longitudeDelta:mapRegion.longitudeDelta,}}
  
      />
        <View style={{top: '50%', left: WIDTH+250, marginLeft:-24,marginTop:-48,position:'absolute'}}>
          <Image style={{height:44, width:45}} source= {require('../assets/marque.png')}/>
        </View>

    </View>

        <TouchableOpacity style={styles.btnLogin} onPress={() => {
          Add();
        }}>
          <Text style={styles.TextBtn}>S'inscrire</Text>

        </TouchableOpacity>
        <View style={{
          flexDirection: 'row', marginTop: 20, marginBottom: 30, alignItems: 'center',
          alignSelf: 'center'
        }}>
          <Text>Vous avez déjà un compte?</Text>
          <TouchableOpacity >
            <Text style={styles.link} onPress={() => navigation.navigate('signin')}>connexion</Text>
          </TouchableOpacity>
        </View>



      </ScrollView>
    </SafeAreaView>
    :null}
    </>

);
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    backgroundColor: 'white',
    marginVertical: 10,
  },
  icon: {

    top: 8,
    left: 37,
  },
  btnLogin: {
    width: 200,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#427CA2',
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center'
  },
  TextBtn: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  link: {
    color: 'blue',
  },
  input: {
    width: 300,
    height: 45,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 25,
    fontSize: 10,
    paddingLeft: 45,
    backgroundColor: '#f5f5f5',
    color: 'black',
    marginHorizontal: 15,
    alignSelf: 'center',
    alignItems: 'center'

  },
  logoContainer: {
    alignItems: 'center'
  },
  btnEye: {

    top: 17,
    right: 60,
  }
  ,
  logoText: {
    color: 'black',
    fontWeight: 600,
    fontSize: 20,
    fontWeight: '400',
    marginTop: 10,
    opacity: 0.5,
    marginBottom: 10
  },
  logo: {
    width: 150,
    height: 180,
    marginBottom: 20
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  wrapper: {
    width: '80%',
  },

  link: {
    color: '#427CA2',
  },
  uploadBtnContainer: {
    height: 125,
    width: 125,
    borderRadius: 125 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderColor: '#427CA2',
    borderWidth: 1,
    overflow: 'hidden',
    marginTop: HEIGHT+50
  },
  uploadBtn: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.3,
    fontWeight: 'bold',
  },
  skip: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    opacity: 0.5,
  },
  containerr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapp: {
    alignSelf: 'stretch', 
    height: 250,
    width: 500,
   
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 100,
    paddingBottom: 40,
    marginTop:10
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#4A919E",
    fontWeight: "bold",
    fontSize: 25,
    alignSelf:'center'
  },
  text_footer: {
    color: "#4A919E",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 0.8,
    borderBottomColor: "#427CA2",


    marginBottom:30,
    marginLeft:15,
    marginRight:15
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#4A919E",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
   
    paddingLeft: 10,
    color: "#4A919E",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 12,
  },
  button: {
    alignItems: "center",
    marginTop: 40,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
ac : {
  width: 20,
  height: 50,
  flexDirection: "row",
  marginBottom:30,
    marginLeft:15,
    marginRight:15
}
});
export default Register;