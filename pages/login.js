import {Alert,Dimensions,Platform,StyleSheet,Pressable,KeyboardAvoidingView,View,Text,TextInput,Image,ScrollView} from 'react-native';
   import {useState,useEffect} from 'react';
   import * as fs from 'expo-file-system';
   import { Loading } from '../res/loading';
   const { width, height } = Dimensions.get('window');
   
export function Login({onAuth}){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [fullname,setFullname] = useState('');
  const [loginDisplay,setLoginDisplay] = useState(true);
  const [regDisplay,setRegDisplay] = useState(false);
    const [loading,setLoading] = useState(false);
       useEffect(()=>{
    async function getSession() {
     // const info = await fs.getInfoAsync(`${fs.documentDirectory}session.json`);
    //  console.log(info,' working');
     // await fs.writeAsStringAsync(`${fs.documentDirectory}session.json`, '{"status":"2"}');
     //console.log(fs.documentDirectory)
     const ses = await fs.readAsStringAsync(`${fs.documentDirectory}session`)
     onAuth(ses);
    }
    getSession();
  },[]);
 async function  handleLogin(){
 setLoading(true);
const req = await fetch(`https://lin.com.ng/h/?login&email=${email}&password=${password}`);
const res = await req.json();

if(res.status){
setLoginDisplay(false);
onAuth(res.data.user_id);
}else{
   Alert.alert("Invalid Login");
  setLoading(false);
}

}

async function handleRegister(){
   setLoading(true);
   const emailRegex = /[w]+@[w]+.[w+]/
   if(fullname.length < 1 || email.length < 1 || password.length < 1){
    Alert.alert("You must fill all feilds.");
    setLoading(false);
    return;
   }
 if(!emailRegex.test(email)){
    Alert.alert("You must enter a valid email address.");
    setLoading(false);
    return;
   }
   if(!/[ ]/.test(fullname)){
    Alert.alert("You must enter a valid fullname address.");
    setLoading(false);
    return;
   }
  const req = await fetch(`https://lin.com.ng/h/?register&fullname=${fullname}&email=${email}&password=${password}`);
const res = await req.json();
if(res.status){
  setRegDisplay(false);
  onAuth(res.user_id);
}else{
   Alert.alert("Internal Error");
  setLoading(false);
}
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
  <KeyboardAvoidingView 
          style={{flex:1,width:'100%',height:height,position:'absolute',marginTop:0}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <Loading display={loading} />
  <ScrollView contentContainerStyle={{
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }}>
          {
           loginDisplay && <>
            <View style={styles.formHeader}>
            
              <Image 
              source={require('../assets/hw.png')}
              style={{width:100,height:50,resizeMode:'contain'}}
              />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email address</Text>
          <TextInput
              styles={[styles.input,{borderColor:"black"}]}
              placeholder="Enter your email"
              value={email}
              inputMode="email-address"
              onChangeText={setEmail}
          />
          </View>
          <View style={styles.formGroup}>
              <Text style={styles.label}>Password</Text>
            <TextInput
                styles={styles.input}
                placeholder="Enter your password"
                value={password}
                inputMode="password"
                onChangeText={setPassword}
                secureTextEntry
            />
            </View>
            <View style={styles.formGroup}>
              <Pressable title="Login" onPress={handleLogin} style={styles.btn}>
                <Text style={{color:"#303030"}}>Login</Text>
              </Pressable>
            </View>
            <View style={styles.formGroup}>
             <Text style={{marginBottom:5}}>Don't have an account?</Text>
            <Pressable title="Login" onPress={switchToSignUp} style={styles.btn}>
                <Text style={{color:"#303030"}}>Sign up</Text>
            </Pressable>
            </View>

            </>
          }
          
          {
            regDisplay && 
            <>
                      <View style={styles.formHeader}>
              <Image 
              source={require('../assets/hw.png')}
              style={{width:100,height:50,resizeMode:'contain'}}
              />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Fullname</Text>
          <TextInput
              styles={[styles.input,{borderColor:"black"}]}
              placeholder="Enter your fullname"
              value={fullname}
              inputMode="text"
              onChangeText={setFullname}
          />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email address</Text>
          <TextInput
              styles={[styles.input,{borderColor:"black"}]}
              placeholder="Enter your email"
              value={email}
              inputMode="email-address"
              onChangeText={setEmail}
          />
          </View>
          <View style={styles.formGroup}>
              <Text style={styles.label}>Password</Text>
            <TextInput
                styles={styles.input}
                placeholder="Enter your password"
                value={password}
                inputMode="email-address"
                onChangeText={setPassword}
                secureTextEntry
            />
            </View>
            <View style={styles.formGroup}>
              <Pressable title="Login" onPress={handleRegister} style={styles.btn}>
                <Text style={{color:"#303030"}}>Register</Text>
              </Pressable>
            </View>
            <View style={styles.formGroup}>
            <Text style={{marginBottom:5}}>Already have an account?</Text>
            <Pressable title="Login" onPress={switchToSignIn} style={styles.btn}>
                <Text style={{color:"#303030"}}>Sign in</Text>
            </Pressable>
            </View>
            </>
          }
      </ScrollView>
      </KeyboardAvoidingView>
    );
   }
   
   {
    /*
            <KeyboardAvoidingView 
          style={{flex:1,width:'100%',height:height,backgroundColor:'green',position:'absolute',marginTop:0}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
  <ScrollView contentContainerStyle={{
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }}>
        <TextInput
          style={{
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 20,
  }}
          placeholder="Type here"
        />
      </ScrollView>
      </KeyboardAvoidingView>
    */
    /*
        loginDisplay && 
      <ScrollView style={{width:"100%",height:'100%'}}>
         <View style={styles.login}>
          <View style={styles.formHeader}>
            
              <Image 
              source={require('./assets/hw.png')}
              style={{width:100,height:50,resizeMode:'contain'}}
              />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email address</Text>
          <TextInput
              styles={[styles.input,{borderColor:"black"}]}
              placeholder="Enter your email"
              value={email}
              inputMode="email-address"
              onChangeText={setEmail}
          />
          </View>
          <View style={styles.formGroup}>
              <Text style={styles.label}>Password</Text>
            <TextInput
                styles={styles.input}
                placeholder="Enter your password"
                value={password}
                inputMode="password"
                onChangeText={setPassword}
                secureTextEntry
            />
            </View>
            <View style={styles.formGroup}>
              <Pressable title="Login" onPress={handleLogin} style={styles.btn}>
                <Text style={{color:"#303030"}}>Login</Text>
              </Pressable>
            </View>
            
             <Text style={{marginBottom:5}}>Don't have an account?</Text>
            <Pressable title="Login" onPress={switchToSignUp} style={styles.btn}>
                <Text style={{color:"#303030"}}>Sign up</Text>
            </Pressable>

            {/* <Pressable title="Login" onPress={closeLogin} style={styles.btn}>
                <Text style={{color:"white"}}>Next</Text>
            </Pressable> */}
        /* </View>
      </ScrollView>
      *///}
    
const styles = StyleSheet.create({
     login:{
    width:"100%",
    height:"100%",
    backgroundColor:'#f9edfa',
    position:"fixed",
    marginTop:'0',
    alignItems:'center',
    justifyContent:"center",
    padding:16
  },
  label:{
     marginTop:3
  },
  input:{
   // borderWidth: Platform.OS === 'ios' ? 2 : 3, // Adjust for platform-specific behavior
    padding: 12,
    width:"80%",
    backgroundColor:'#f9edfa',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5
  },
  formGroup:{
    width:'90%',
    paddingLeft:10,
    paddingRight:10,
    marginBottom:20
  },
  btn:{backgroundColor:'#e443a3',borderRadius:5,width:"100%",height:35,justifyContent:"center",alignItems:"center"}
 
})