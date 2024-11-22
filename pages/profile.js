import {Platform,Keyboard,Pressable, StyleSheet,Text,TextInput, View,Image,ScrollView,Dimensions, KeyboardAvoidingView} from 'react-native';
import {useState,useRef,useEffect} from 'react';
import {Img} from '../res/img';
import {Loading} from '../res/loading';
import { getUser } from '../res/func';
const { width, height } = Dimensions.get('window');


export function Profile({logout}){
   const [user,setUser]= useState({});
     const [keyboardHeight, setKeyboardHeight] = useState(0);
   const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
   
   useEffect(()=>{
           (
            async ()=>{
          const getuser = await getUser();
           setUser((old)=>{
            return {...old,...getuser}
           });
           } 
           )();

             const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
        setScreenHeight(Dimensions.get('window').height - event.endCoordinates.height);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
        setScreenHeight(Dimensions.get('window').height);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };

   },[keyboardHeight,screenHeight]);
   function sendLogout(){
    logout(true);
   }
return (
      <KeyboardAvoidingView 
      style={{height:screenHeight,paddingTop:(keyboardHeight/2)}}
     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
   <View style={{padding:20}}>
    <View style={{marginBottom:15,height:40,flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
       <View>
          <Image source={require('../assets/user.png')}
          style={{width:40,height:40,resizeMode:'contain'}}
          />
       </View>
       <View><Text style={{fontSize:22}}>{user.fullname}</Text><Text>{user.email}</Text></View>
       <View>
         <Pressable onPress={()=>sendLogout()}>
         <Image 
         source={require('../assets/logout.png')}
         style={{width:31,height:25,resizeMode:'cover'}}
         />
         </Pressable>
       </View>
    </View>
 
       <View>
         <Text style={{fontWeight:'bold',fontSize:18}}>My Novel's List</Text>
         <TextInput
           placeholder="Search your novel's list"
         />
       </View>
       <ScrollView style={{}}>
           
       </ScrollView>
    </View>
    </KeyboardAvoidingView>
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