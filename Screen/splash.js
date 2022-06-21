import React from 'react'
import LottieView from 'lottie-react-native';
import {Text, View, StyleSheet,TouchableOpacity} from 'react-native'
import 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native'
export function Splash() {
    const navigation = useNavigation()
    return (
        <View  style={styles.view} >
           <TouchableOpacity onPress={() =>navigation.navigate('OnBoardScreenL')}>
            <LottieView 
            source={require('./assets2/splash3.json')} 
            autoPlay
             loop= {false}
     onAnimationFinish ={() => navigation.navigate('OnBoardScreenL')}
       
       style={{
          width: 350,
          height: 280,
        marginLeft: 10}}
             />
             <Text style={styles.title}>AGHSLNI</Text>
             </TouchableOpacity>
        </View>
        
    )
}


const styles = StyleSheet.create({
    anim :{
//height:  "65%",
//width: "30%",
marginTop: "20%",
resizeMode: "contain",
backgroundColor: '#649ea9',


    },
    title: {
        marginTop: '2%',
fontSize: 30,
fontWeight: "bold",
color: 'white',
marginLeft:200



    },
    view : {
        backgroundColor: '#649ea9',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    }
})