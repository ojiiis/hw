import {Pressable, StyleSheet,Text,TextInput, View,Image,ScrollView,Dimensions} from 'react-native';
import {useState,useRef,useEffect} from 'react';
import {Img} from '../res/img';
import {Loading} from '../res/loading';
import { ListOptions } from '../res/listoption';
import * as fs from 'expo-file-system'
const { width, height } = Dimensions.get('window');


export function Settings(){
   const [oldValue,setOldValue]= useState(19); 
  const [value,setValue]= useState(oldValue);
  
   useEffect(()=>{
 (
   async ()=>{
      const settings = await fs.readAsStringAsync(`${fs.documentDirectory}settings`);
      //console.log(JSON.parse(settings).fontSize);
      setOldValue(JSON.parse(settings).fontSize)
   }
 )()
   },[]);
    const setNewSelected = async (x)=>{
      setValue(x);
      //console.log(x);
       const settings = await fs.readAsStringAsync(`${fs.documentDirectory}settings`);
       const old = JSON.parse(settings);
       const setNew = {"fontSize":x};
       const newSettings = {...old,...setNew}
       fs.writeAsStringAsync(`${fs.documentDirectory}settings`,JSON.stringify(newSettings));
       //console.log(settings);
    }
return (
     <View>
       <View style={{backgroundColor:'#e443a3',padding:20,flexDirection:'row',justifyContent:'space-between'}}>
       <Text style={{fontSize:20}}>Settings</Text>
       </View>
      <View style={{padding:20}}>
           <Text style={{fontSize:20}}>Novel Reading Settings</Text>
           <View style={{flexDirection:'row'}}>
            <Text>Set font size</Text>
            <View>
                <ListOptions 
            currentValue={value}
            onSelect={setNewSelected}
            options={
                [
                    {"option":"19 Px","value":19},
                    {"option":"30 Px","value":30},
                    {"option":"40 Px","value":40},
                    {"option":"50 Px","value":50}
                ]
            }
            />
            </View>
           </View>
           <Text style={{fontSize:value}}>This is how text will look like while reading novel.</Text>
      </View>
    </View>
    
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