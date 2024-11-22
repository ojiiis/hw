import { Pressable, StyleSheet, KeyboardAvoidingView, Text, TextInput, View, Platform, SafeAreaView, StatusBar, Dimensions, Image, ScrollView } from 'react-native';
const { width, height } = Dimensions.get('window');
import { NavBar } from './res/navbar';
import { Home } from './pages/home';
import { Search } from './pages/search';
import { Profile } from './pages/profile';
import { Settings } from './pages/settings';
import { Login } from './pages/login';
import { SearchPage } from './pages/t';

import * as fs from 'expo-file-system';
import { useState, useEffect } from 'react';
export default function App() {




  const [session, setSession] = useState(false);
  const [page, setPage] = useState(<Home />);
  const [active, setActive] = useState("");
  const [currentPage, setCurrentPage] = useState('home');
  useEffect(() => {

    async function getSession() {
   const ses_id = await fs.readAsStringAsync(`${fs.documentDirectory}session`);
      const user = await fs.readAsStringAsync(`${fs.documentDirectory}user`);

      if (ses_id != "") {
        setSession(ses_id);
        setActive("home");
      }else{
        setSession(false);
        setActive("");
      }
 
    }
    getSession();
  }, []);


  function c(x, y) {
    setPage(x);
    updateSelectedTab(y);
  }

  const handleAuth = async (id) => {
    if (id !== "") {
      await fs.writeAsStringAsync(`${fs.documentDirectory}session`, id);
      const req = await fetch('https://lin.com.ng/h/?getuser=' + id);
      const data = await req.json();
      fs.writeAsStringAsync(`${fs.documentDirectory}user`, JSON.stringify(data.data));
    //  console.log(data)
    setSession(id);
    setActive("home");
    }
   
  }
const checkLogout = async (token)=>{
if(token){
  await fs.writeAsStringAsync(`${fs.documentDirectory}session`, '');
  await fs.writeAsStringAsync(`${fs.documentDirectory}user`, '')
   setSession('');
   setActive("");
}
}
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#e443a3" />
      <SafeAreaView style={styles.container}>
        <View style={styles.body}>{session && page}</View>

        {!session && <Login onAuth={handleAuth} />}


        <NavBar
          action={(x) => {
            setPage(x.view)
          }}
          active={active}
          activeBackground=""
          activeForground="#ff89c6"
          tabs={
            [
              {
                name: 'home',
                view: <Home />,
                img: require('./assets/home.png'),
                activeImg: require('./assets/activehome.png')
              },
              {
                name: 'search',
                view: <Search />,
                img: require('./assets/search.png'),
                activeImg: require('./assets/activesearch.png')
              },
              {
                name: 'profile',
                view: <Profile logout={checkLogout} />,
                img: require('./assets/user.png'),
                activeImg: require('./assets/activeuser.png')
              },
              {
                name: 'settings',
                view: <Settings  />,
                img: require('./assets/settings.png'),
                activeImg: require('./assets/activesettings.png')
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
    position: 'relative'
  },
  body: {
    width: "100%",
    height: height * 0.94,
    backgroundColor: '#f9edfa',
    overflowY: "auto"
  },
  footer: { width: "100%", height: height * 0.06, backgroundColor: "#ce198e", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" },
  fbtn: {
    width: "20%",
    height: "90%",
    backgroundColor: "none",
    justifyContent: "center",
    alignItems: "center"
  },
  formHeader: {
    width: "100%",
    height: 50,
    alignItems: "center"
  }
});

