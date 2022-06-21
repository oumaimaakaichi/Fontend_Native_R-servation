import React, { useRef, useState , useEffect } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View ,ScrollView } from 'react-native';
import profile from '../../assets/profile.png';
import { getClientData, LogoutClient  , updateClientData} from "../../utils/AsyncStorageClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Tab ICons...
import home from '../../assets/home.png';
import mesresrvations from '../../assets/l.png'
import logout from '../../assets/logout.png';
// Menu
import p from '../../assets/cjt.png'
import { Table, Row, Rows } from 'react-native-table-component';
import menu from '../../assets/menu.png';
import close from '../../assets/close.png';
import Profile from './profile';
import photo from '../../assets/photo.jpg';
export default function DahboardProfile({ navigation }) {
  const [currentTab, setCurrentTab] = useState("Home");
  // To get the curretn Status of menu ...
  const [showMenu, setShowMenu] = useState(false);
 
  // Animated Properties...

  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  
const[client, setClient]=useState('')

useEffect(async () => {
  setClient(await getClientData());
  
}, []);

useEffect(async () => {
  
  if(client){
  if(client.data.utilisateur.role != "client"){
    navigation.navigate('LoginC')
  }}

}, []);

return (
    <>
    {client  != undefined ?
    <SafeAreaView style={styles.container}>
<ScrollView style={styles.s}>
      <View style={{ justifyContent: 'flex-start', padding: 15, alignItems: 'center', marginBottom:20, marginTop:30}}>
        <Image source={p} style={{
           width: 80,
          height: 80,
          borderRadius: 10,
          marginTop: 10,
          marginEnd:20
        }}></Image>

        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
          marginTop: 20,
          marginEnd:20
        }}>{client?.data?.utilisateur.nom} {client?.data?.utilisateur.prenom}</Text>

        <View style={{ flexGrow: 1, marginTop: 30 }}>
          {
            // Tab Bar Buttons....
          }

          <TouchableOpacity onPress={() => {
      if (title == "LogOut") {
        // Do your Stuff...
      } else {
        setCurrentTab(title)
      }
    }}>
    <TouchableOpacity onPress={() => {navigation.navigate("espaceClient")}}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 25
      }}>

        <Image source={home} style={{
          width: 25, height: 25,
          tintColor: "white"
        }}></Image>

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: "white"
        }}>Acceuil</Text>

      </View>
    </TouchableOpacity>
    

    <TouchableOpacity >
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: 'white',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 25
      }}>

        <Image source={profile} style={{
          width: 25, height: 25,
          tintColor: "#4A919E"
        }}></Image>

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: '#4A919E'
        }}>Profile</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => {navigation.navigate("Rerse")}}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 25
      }}>

        <Image source={mesresrvations} style={{
          width: 25, height: 25,
          tintColor: "white"
        }}></Image>

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: "white"
        }}>Mes reservations</Text>
      </View>
    </TouchableOpacity>
   
    
    <TouchableOpacity onPress={() => {
         LogoutClient(client.data.token)
         // pour tester que  async storage est vide
         navigation.navigate('LoginC')
console.log(AsyncStorage.getItem("client"))
          }}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 25
      }}>

        <Image source={logout} style={{
          width: 25, height: 25,
          tintColor: "white",
          marginLeft: 4
        }}></Image>

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: "white"
        }}>Déconnexion</Text>
      </View>
    </TouchableOpacity>
    </TouchableOpacity>

        </View>

        

      </View>
      
      </ScrollView>
      {
        // Over lay View...
      }

      <Animated.View style={{
        flexGrow: 1,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: showMenu ? 15 : 0,
        // Transforming View...
        transform: [
          { scale: scaleValue },
          { translateX: offsetValue }
        ]
      }}>
        <ScrollView  style={{marginVertical: 0}}>
        <Animated.View style={{
          transform: [{
            translateY: closeButtonOffset
          }],
          marginTop: 10
        }}>
          <TouchableOpacity onPress={() => {
            // Do Actions Here....
            // Scaling the view...
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.88,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(offsetValue, {
              // YOur Random Value...
              toValue: showMenu ? 0 : 230,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(closeButtonOffset, {
              // YOur Random Value...
              toValue: !showMenu ? -30 : 0,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            setShowMenu(!showMenu);
          }}>

            <Image source={showMenu ? close : menu} style={{
              width: 25,
              height: 25,
              tintColor: '#4A919E',
              marginTop: 20,

            }}></Image>

          </TouchableOpacity>
          
          <ScrollView  horizontal={true} >
          
          
        
          <Profile navigation={navigation}/>
         
          </ScrollView>
        </Animated.View>
        </ScrollView>
      </Animated.View>

    </SafeAreaView>
: null}
</>

  );
}

// For multiple Buttons...
const TabButton = (currentTab, setCurrentTab, title, image) => {
  return (

    <TouchableOpacity onPress={() => {


LogoutUser(station.data.token)

     
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: currentTab == title ? 'white' : 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>

        <Image source={image} style={{
          width: 25, height: 25,
          tintColor: currentTab == title ? "#4682b4" : "white"
        }}></Image>

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: currentTab == title ? "#4682b4" : "white"
        }}>{title}</Text>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A919E',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  
});