import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Pressable
} from "react-native";
import { SearchBar } from 'react-native-elements';
import { Constants } from "expo-constants";
const {height:HEIGHT} =Dimensions.get('window')
import Icon from "react-native-vector-icons/FontAwesome5";
const { width: WIDTH } = Dimensions.get('window')
var iconHeight = 26;
var iconWidth= 26;
export default function Liste_stas({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://192.168.43.230:3001/utilisateur/getAll")
      .then((res) => res.json())
      .then((resJSON) => {
        setData(resJSON);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  async function filtreData(key) {
      console.warn(key);
      let result = await fetch("http://192.168.43.230:3001/search/" + key);
      result = await result.json();
      console.warn(result);
      setData(result);
  }
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: "white",
          width: WIDTH - 30

        }}
      >
      
    <SearchBar
      
        containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
        placeholderTextColor={'#fff'}
        placeholder={'Rechercher'}
        onChangeText={text=>filtreData(text)} onClear={text => filtreData('')}
        value={data}
    />
        <View style={StyleSheet.container}>
            
          <FlatList
            data={data}
            style={{backgroundColor:'#D5D4E5'}}
            renderItem={({ item }) => {
           
              
              return (
                <>
                  
                  <TouchableOpacity onPress={() => {
                        navigation.navigate('newreservation', {
                          itemId: item._id,
                          getStation: item,
                        });
                      }} >
                  <View
                  
                    style={{
                      flex: 1,
                      flexDirection: "row",
                 
                      marginBottom: 10,
                      marginTop: 10,
                      borderRadius: 10,
                      backgroundColor: "white",
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 10,
                      },
                      shadowOpacity: 0.3,
                      shadowRadius: 20,
                      padding: 10,
                      marginStart: 7,
                      marginEnd: 8

                    }}
                  >
                    <Image
                      source={{ uri: item.avatar }}
                      style={{ width: WIDTH/2-30, height: 100 }}
                      
                    ></Image>
                    <View style={{ flex: 1, flexDirection: "column" , alignContent:'center' }}>
                      <Text style={styles.WrapText}>{item.Nom_station}</Text>
                      <Text style={styles.WrapText}>{item.ville}</Text>
            
                    </View>
                    <View>
                    </View>
                   
                  </View>

                  <View
                    style={{
                      height: 1,
                      backgroundColor: "#F0F0F0",
                    }}
                  ></View>
                  </TouchableOpacity>
                </>
              );
            }}
            
          />
        </View>
        <View style={styles.NavContainer}>
      <View style={styles.NavBar}>
<Pressable onPress={() =>  navigation.navigate('espaceClient') } style={styles.IconBehave} 
          android_ripple={{borderless: true, radius:50}}>

          <Icon name="map" color="white" size={20} style={{
            marginTop:-4,
          }} >&nbsp;&nbsp;&nbsp;<Text height= {iconHeight} width={iconWidth} style={styles.text}>carte</Text></Icon>

</Pressable>
      </View>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
   
  },

  WrapText: {
    flex: 1,
    marginLeft: 30,
   
    fontWeight: 'bold',
    fontSize: 15
  },
  btnLogin: {
    width: 90,
    height: 25,
    borderRadius: 20,
    backgroundColor: '#0594D0',
    justifyContent: 'center',
    marginTop: 10,
    marginStart: 25
  },
  TextBtn: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  input: {
    width: 200,
    height: 45,
    marginTop: 10,
    marginBottom: 10,
    
    fontSize: 10,
    paddingLeft: 45,
    backgroundColor: 'white',
    color: 'black',
    marginHorizontal: 15,
    alignSelf: 'center',
    alignItems: 'center'

},
NavContainer:{
  position: 'absolute',
  alignItems: 'center',
  bottom:20,
  
},
NavBar: {
  flexDirection: 'row',
  backgroundColor: '#23262E',
  width: '50%',
  justifyContent: 'space-evenly',

  borderRadius: 40,
  marginLeft: 90,
  marginTop:20
},
IconBehave: {
  padding:14
},
text:{
  color: 'white',
 
}
});
