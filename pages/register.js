        {regDisplay && 
        <ScrollView style={{width:"100%",height:"100%"}}>
         <View style={styles.login}>
          <View style={styles.formHeader}>
              <Image 
              source={require('./assets/hw.png')}
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
                <Text style={{color:"white"}}>Register</Text>
              </Pressable>
            </View>
            <Text style={{marginBottom:5}}>Already have an account?</Text>
            <Pressable title="Login" onPress={switchToSignIn} style={styles.btn}>
                <Text style={{color:"white"}}>Sign in</Text>
            </Pressable>

            {/* <Pressable title="Login" onPress={closeLogin} style={styles.btn}>
                <Text style={{color:"white"}}>Next</Text>
            </Pressable> */}
            </View>
      </ScrollView>
       }