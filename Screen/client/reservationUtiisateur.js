import React  , {useState , useEffect}from "react";
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
  FlatList,
  Dimensions
} from "react-native";
const {width:WIDTH} =Dimensions.get('window')
import { AntDesign } from '@expo/vector-icons'; 
import { getClientData, LogoutClient  , updateClientData} from "../../utils/AsyncStorageClient";
  const ReservationUtilisateur = ({ navigation }) => {
          
          const[data , setData]=useState('')
          useEffect(async () => {
            const data =await getClientData();

            fetch("http://192.168.43.230:3001/reservation/getByU/"+data.data.utilisateur._id)
            .then((res) => res.json())
            .then((resJSON) => {
              setData(resJSON);
            
            })
            .catch((err) => console.log(err));
          }, []);
 
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#EEECF2",
        width:WIDTH-30,
        marginBottom:30
        

      }}
    >
      <View style={StyleSheet.container}>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <>
               

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    backgroundColor: "#E0F2F7",
                    marginBottom: 10,
                    marginTop:10,
                    borderRadius: 10,
                    backgroundColor: "#fff",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 10,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 20,
                    padding: 10,
                    marginStart:7,
                    marginEnd:8

                  }}
                >
                  
                 
                     <View style={{ flex: 1, flexDirection: "column" , padding:10}}>
                     <Text style={{fontSize:19 , fontWeight:'bold' , marginBottom:10}}>Reservation:</Text>
                 
                     <View style={{
      
                         flexDirection: "row"
                    }}>
                        <Text style={{fontWeight:'bold' }}>Client: </Text>
                        <Text style={styles.WrapText}>{item.Nom_client} </Text>
                        <Text style={styles.WrapText}>{item.Prenom_client} </Text>
              

                     </View>
                    <View style={{flexDirection:'row' , alignSelf:'center'}}>
                            <Text style={{fontWeight:'bold' , marginStart:5}}> {item.etat == "confirme"? (
                            <Text style={{color:'green'}}> Acceptée</Text>
                         
                            ) : item.etat == "attente" ? (
                            
                                <Text style={{color:'blue'}}>En Attente...</Text>
                            
                            ) : (<Text style={{color:'red'}}>Refusée</Text>)}</Text>

                            <TouchableOpacity  onPress={() => {
                            navigation.navigate('resclient', {
                              itemId: item._id,
                              getReservations: item,
                            });
                            }} >
                                 <View>
                                  <AntDesign name="eyeo" size={30} color="black" style={{marginStart:30 }}/></View>
                              </TouchableOpacity>
                                 </View>
                     </View>
                 
                   </View>
               
                <View
                  style={{
                    height: 1,
                    backgroundColor: "#F0F0F0",
                  }}
                ></View>
              </>
            );
          }}
        />
      </View>
    </View>
        
  );
};

export default ReservationUtilisateur;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    marginBottom:30
  },

  WrapText: {
    
    marginStart:2,
    marginEnd:0,
    fontSize:13,
    marginBottom:15
  },
 
});
