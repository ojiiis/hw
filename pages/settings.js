import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Keyboard,
  Dimensions,
  Platform,
  KeyboardAvoidingView
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
   <KeyboardAvoidingView style={{width:'100%',height:screenHeight,background:'orange'}}
     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // Adjust offset for iOS
   >
        <View style={{height:screenHeight}}>
            <View style={{height:'50%',backgroundColor:'pink'}}>
            <TextInput 
            placeholder="Testing 123"
            />
            </View>
         <View style={{height:'50%',backgroundColor:'orange'}}></View>
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


