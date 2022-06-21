import React , {useState , useEffect} from "react";
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
  Image,
  Dimensions
} from "react-native";
const {width:WIDTH} =Dimensions.get('window')
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "react-native-paper";
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';
const InscriC = ({ navigation }) => {
  
      const [data, setData] = React.useState({
        
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
      });

      const { colors } = useTheme();

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
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [Num_tel, setNumero] = useState('');
  const [email, setEmail] = useState('');
  const [Adr, setUsename] = useState('');
  const [MPass, setPassword] = useState('');
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
    async function AddClient(){

      if(  !MPass || !Adr ||!nom|| !prenom|| !Num_tel ||Num_tel<0  || MPass.length<6 || Num_tel.length!=8 ||(!regEx.test(email) && email!="") ){
        setError(true);
        return false;
          
      }
      
    fetch("http://192.168.43.230:3001/utilisateur/register" , {
        method: 'POST',
        headers:{
            "Content-Type" : 'application/json',
           
        },
        body:JSON.stringify({
         
          nom:nom,
          prenom:prenom,
          Num_tel:Num_tel,
          emaill:email,
          Adr:Adr,
          MPass:MPass,
          role:'client'
        }),
    }).then(res=>res.json())
    .then(async data=>{
      if(data){
       if(data.Adr!='' && data.MPass!=''){
        {
          Toast.show({
            type: 'success',
            position: 'top',
            text1:'Succès',
            text2:'Inscription validée',
            autoHide: true,
            visibilityTime: 5000,
            autoHide: true,
            onHide: () =>{navigation.navigate('LoginC')},
            onShow: () =>{},
          })  
        }
    
      }}
      
    })
    .catch(err=>{
      Toast.show({
        type: 'error',
        text1:'Inscription ',
        text2:'Inscription  éroner',
        visibilityTime: 1000,
        position: 'top',
      })   
      console.log(err)
    });
   
}
  return (
    <View style={styles.container}>
    <ScrollView   showsVerticalScrollIndicator={false}
    >
          
      <StatusBar backgroundColor="white"  />
      <Toast ref={(ref)=>{Toast.setRef(ref)}}/>
      <Text style={styles.text_header}>S'inscrire</Text>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
            marginLeft:10,
            marginRight:10,
           
          },
        ]}
      >
  
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              fontSize:15,
              marginTop: 25,
              marginBottom: 15,
            },
          ]}
        >
          Nom
        </Text>
        <View style={styles.action}>
          
        <Icon name="user" color="black" size={20} style={{
            marginTop: -10,
          }} />
         
          <TextInput
            placeholder="nom du client"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => setNom(val)}
           
          />
         
        </View>
        {error && !nom  && <Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              fontSize:15,
              marginTop: 35,
              marginBottom: 15,
            },
          ]}
        >
          Prenom
        </Text>
        <View style={styles.action}>
          <Icon name="user" style={{
            marginTop: -10,
          }} color={colors.text} size={20} />
          <TextInput
            placeholder="prenom du client"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => setPrenom(val)}
           
          />
         
        </View>
        {error && !prenom &&<Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}
    
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              fontSize:15,
              marginTop: 35,
              marginBottom: 15,
            },
          ]}
        >
          Email
        </Text>
        <View style={styles.action}>
        <Icon name="mail" color="black"  size={20} style={{
            marginTop: -10,
          }} />
          <TextInput
            placeholder="email du client"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => setEmail(val)}
           
          />
         
        </View>
        {error && !email &&<Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}
      
        {error && !regEx.test(email) &&<Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} > email invalide</Text>}
      

        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              fontSize:15,
              marginTop: 35,
              marginBottom: 15,
            },
          ]}
        >
          Numéro du téléphone
        </Text>
        <View style={styles.action}>
        <Icon name="phone" color="black"  size={20} style={{
            marginTop: -10,
          }}/>
          <TextInput
            placeholder=" Numéro  du client"
            placeholderTextColor="#666666"
            keyboardType="numeric"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => setNumero(val)}
           
          />
         
        </View>
        {error && !Num_tel &&<Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}
        {error && Num_tel.length!=8 &&<Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} >Numéro du téléphone doit contenir 8 chiffres</Text>}
        {error && Num_tel<0 &&<Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} >Numéro du téléphone doit  etre positive</Text>}
       
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              fontSize:15,
              marginTop: 35,
              marginBottom: 15,
            },
          ]}
        >
          Adresse
        </Text>
        <View style={styles.action}>
          <Icon name="user" color={colors.text} size={20} style={{
            marginTop: -10,
          }} />
          <TextInput
            placeholder="Adresse du client"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,

              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => setUsename(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {error && !Adr &&<Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}
  
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              marginTop: 35,
              fontSize:15,
              marginBottom: 15,
            },
            
          ]}
        >
          Mot de passe 
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20}  style={{
            marginTop: -10,
          }}/>
          <TextInput
            placeholder="Mot de passe du client"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => setPassword(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {error && !MPass &&<Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}
        {error && MPass.length<6 &&<Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} > Mot de passe doit contenir minimum 6 caractéres </Text>}
    
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
                AddClient();
            }}
          >
            <LinearGradient
                colors={["#4A919E", "#4A919E"]}
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
              S'inscrire

              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
           onPress={() => navigation.navigate('LoginC')}
            style={[
              styles.signIn,
              {
                borderColor: "#4A919E",
                borderWidth: 1,
                marginTop: 30,
                marginBottom:50,
              },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                   color: "#4A919E",


                },
              ]}
            >
              Connexion
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
      </ScrollView>
    </View>
  );
};

export default InscriC;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A919E",
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
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    alignSelf:'center',
    marginBottom:40,
    marginTop:40
  },
  text_footer: {
    color: "#4A919E",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
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
   borderRadius:15
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },

});
