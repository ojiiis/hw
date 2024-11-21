import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Keyboard,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';

export const Settings = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
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
  }, []);

  return (
   //  <View style={styles.container}>
   //    <TextInput style={styles.searchInput} placeholder="Search..." />
   //    <View
   //      style={[
   //        styles.resultsContainer,
   //        { height: screenHeight - 100 }, // Adjust dynamically
   //      ]}
   //    >
   //      <Text style={styles.resultText}>
   //        Keyboard Height: {keyboardHeight} px{'\n'}
   //        Available Screen Height: {screenHeight} px
   //      </Text>
   //    </View>
   //  </View>
   <KeyboardAvoidingView style={{height:screenHeight,paddingTop:(keyboardHeight/2)}}
     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
   >
    
        <View style={{height:screenHeight}}>
            <View style={{height:50,flexDirection:'column',justifyContent:'center',paddingLeft:10,paddingRight:10,backgroundColor:''}}>
            <TextInput 
            placeholder="Search novel..."
            />
            </View>
         <View style={{height:screenHeight - 50,backgroundColor:'orange'}}>
           <ScrollView style={{flex:1}}>
               
           </ScrollView>
         </View>
        </View>
   </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f48fb1',
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  resultsContainer: {
    backgroundColor: '#f48fb1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
});


