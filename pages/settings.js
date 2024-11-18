import {Pressable, StyleSheet,Text,TextInput, View,Image,ScrollView,Dimensions} from 'react-native';
import {useState,useRef,useEffect} from 'react';
import {Img} from '../res/img';
import {Loading} from '../res/loading';
const { width, height } = Dimensions.get('window');


export function Settings(){
return (
    <>
    <Text>Hello world</Text>
    </>
)
}
//style
const styles = StyleSheet.create({
  scrollview:{
   height:"95%"
  },
    scrollviewSearch:{
   height:"90%"
  },
   home:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"space-evenly"
   },
   homeChild:{
    width:"48%",
    height:height * 0.40,
    flexShrink:1,
    backgroundColor:"#e443a3",
    marginBottom:"2%"
   },
   bookImg:{width: "100%",height: "80%", resizeMode: 'cover'},
   bookTitle:{
padding:6,
fontSize:width * 0.04,
color:'#303030'
   },
   modal:{
    width:"100%",
    height:"100%",
    backgroundColor:"#f9edfa",
   },
   navigation:{height:"6%",flexDirection:"row",justifyContent:"space-evenly",alignItems:"center",padding:5},
   navigationBtn:{paddingLeft:10,paddingRight:10,backgroundColor:'green',borderRadius:2,height:"100%",justifyContent:'center'}
});