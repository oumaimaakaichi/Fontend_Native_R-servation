import React , {useState} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  ScrollView,
  Alert,
  Image
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import login from '../assets/lo1.png'
import { useTheme } from "react-native-paper";
import axios from "axios";
import { storeUserData } from "../utils/AsyncStorageFunctions";

import Toast from 'react-native-toast-message';

const Signin = ({ navigation }) => {
  
  const [data, setData] = React.useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { colors } = useTheme();

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };
  const[error , setError]=useState(false);
  const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
  const loginHandle =  () => {
    if( !data.email || !data.password ||(!regEx.test(data.email) && data.email!="")){
      setError(true);
      return false;
        
    }
    axios
      .post("http://192.168.43.230:3001/utilisateur/loginST", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        storeUserData(res.data)
        if(res){
          Toast.show({
            type: 'success',
            position: 'top',
            text1:'Succès',
            text2:'Connexion validé',
            autoHide: true,
            visibilityTime: 500,
            autoHide: true,
            color:'green',
            onHide: () =>{navigation.navigate('Dashboard')  },
            onShow: () =>{},
          })  
        }
        
          
      })
     .catch((err)=>{
       
      Toast.show({
        type: 'error',
        text1:'Connexion éroner',
        text2:'vérifier votre champs',
        visibilityTime: 1000,

      })   
      console.log(err)})
       
      
  };

  return (
    <View style={styles.container}>
      <ScrollView>
   
      <StatusBar backgroundColor="white" barStyle="light-content" />
      <Toast ref={(ref)=>{Toast.setRef(ref)}}/>
       <Image source={login} style={{width:230 , height:180 , alignSelf:'center' , marginTop:100} } />
    
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: 'white'
          },
        ]}
      >
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              fontSize:16,
              marginTop: 20,
            },
          ]}
        >
          Email
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" style = {styles.icon} color={colors.text}   size={20} />
          <TextInput
            placeholder="Email de station lavage"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
      
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={15} />
            </Animatable.View>
          ) : null}
        </View>{error && !data.email &&<Text style={{color:'red' ,marginLeft:10,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}
        {error && !regEx.test(data.email) &&<Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} > email invalide</Text>}
      
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username doit contenir minimum 3 caractéres
            </Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              marginTop: 35,
              fontSize:16
            },
            
          ]}
        >
          Mot de Passe
        </Text>
        <View style={styles.action}>
          <Feather name="lock" style = {styles.icon}  color={colors.text} size={20} />
          <TextInput
            placeholder="MotPasse de station lavage"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {error && !data.password &&<Text style={{color:'red' ,marginLeft:10,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}

        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password doit contenir minimum 6 caractéres
            </Text>
          </Animatable.View>
        )}

       
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              loginHandle();
            }}
          >
            <LinearGradient
              colors={["#427CA2", "#427CA2"]}
              style={styles.signIn}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Se connecter
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
           onPress={() => navigation.navigate('Register')}
            style={[
              styles.signIn,
              {
                borderColor: "#427CA2",
                borderWidth: 1,
                marginTop: 20,
                marginBottom:90
              },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#427CA2",

                },
              ]}
            >
              Créer nouveau compte
            </Text>
          </TouchableOpacity>
   

        </View>
      </Animatable.View>
      
      </ScrollView>
    </View>
  );
};

export default Signin;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 100,
 
  },
  icon: {
    height: 35,
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
  },
  text_footer: {
    color: "#4A919E",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#4A919E",
    paddingBottom: 5,

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
    marginTop: Platform.OS === "ios" ? 0 : -12,
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
});