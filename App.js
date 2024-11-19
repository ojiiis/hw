import { Pressable, StyleSheet,KeyboardAvoidingView, Text, TextInput, View ,Platform,SafeAreaView,StatusBar,Dimensions,Image,ScrollView} from 'react-native';
const { width, height } = Dimensions.get('window');
import {NavBar} from './res/navbar';
import {Home} from './pages/home';
import {Search} from './pages/search';
import {Profile} from './pages/profile';
import {Settings} from './pages/settings';
import {Login} from './pages/login';
import * as fs from 'expo-file-system';
import { useState,useEffect } from 'react';
export default function App() {
       
    useEffect(()=>{
    async function getSession() {
     // const info = await fs.getInfoAsync(`${fs.documentDirectory}session.json`);
    //  console.log(info,' working');
     // await fs.writeAsStringAsync(`${fs.documentDirectory}session.json`, '{"status":"2"}');
     //console.log(fs.documentDirectory)
     const session = await fs.readAsStringAsync(`${fs.documentDirectory}session.json`)
      //console.log(session,'hmm');
    }
    getSession();
  },[]);


    const [session,setSession] = useState(false);
  const [page,setPage] = useState(<Home/>);
  const [loginDisplay,setLoginDisplay] = useState(true);
  const [regDisplay,setRegDisplay] = useState(false);
  const [currentPage,setCurrentPage] = useState('home');

  var currentPageStyle = "#f9edfa";
  function c(x,y){
    setPage(x);
//console.log(y)
    updateSelectedTab(y);
   console.log(y)
   //console.log(tabs)
}

function handleRegister(){
// alert(email)
// alert(password)
setRegDisplay(false);
setSession(true);
}



function switchToSignIn(){
setRegDisplay(false);
setLoginDisplay(true);
}
function switchToSignUp(){
setLoginDisplay(false);
setRegDisplay(true);
}



  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="pink" />
    <SafeAreaView style={styles.container}>
         <View style={styles.body}>{session && page}</View>
            <Login />
          
   
       <NavBar
      action={(x)=>{
       setPage(x.view)
      }}
      tabs={
          [
          {
              name:'home',
              view:<Home/>,
              img:require('./assets/home.png')
          },
          {
              name:'search',
              view:<Search/>,
             img:require('./assets/search.png')
          },
          {
              name:'profile',
              view:<Profile data={{}}/>,
             img:require('./assets/user.png')
          },
          {
              name:'settings',
              view:<Settings/>,
             img:require('./assets/settings.png')
          }
          
          ]
      }
      style={styles.footer}
      />
    </SafeAreaView>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9edfa',
    alignItems: 'center',
    justifyContent: 'center',
    position:'relative'
  },
  body:{
    width:"100%",
    height:height * 0.92,
    backgroundColor:'#f9edfa',
    overflowY:"auto"
  },
  footer:{width:"100%",height:height * 0.08,backgroundColor:"#ce198e",flexDirection:"row",justifyContent:"space-evenly",alignItems:"center"},
  fbtn:{
    width:"20%",
    height:"90%",
    backgroundColor:"none",
    justifyContent:"center",
    alignItems:"center"
  },
  formHeader:{
    width:"100%",
    height:50,
    alignItems:"center"
  }
});

