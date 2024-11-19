   
   import {Dimensions,Platform,StyleSheet,Pressable,KeyboardAvoidingView,View,Text,TextInput,Image,ScrollView} from 'react-native';
   import {useState,useEffect} from 'react';
   const { width, height } = Dimensions.get('window');
   
   export function Login(){
    const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [fullname,setFullname] = useState('');
  function handleLogin(){
setLoginDisplay(false);
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
        <KeyboardAvoidingView 
          style={{flex:1,width:'100%',height:height,position:'absolute',marginTop:0}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
  <ScrollView contentContainerStyle={{
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }}>
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
    borderWidth: Platform.OS === 'ios' ? 2 : 3, // Adjust for platform-specific behavior
    borderColor: 'blue',
    padding: 12,
    width:"80%",
    backgroundColor:'#f9edfa'
  },
  formGroup:{
    width:'100%',
    paddingLeft:10,
    paddingRight:10,
    marginBottom:20
  },
  btn:{backgroundColor:'#e443a3',borderRadius:5,width:"100%",height:35,justifyContent:"center",alignItems:"center"}
 
})