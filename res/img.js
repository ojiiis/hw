import React, { useState } from 'react';
import { Image, View, Alert, StyleSheet } from 'react-native';

export function Img({ url,style ={} }) {
  const [loading, setLoading] = useState(true);
  const [image, showImage] = useState('none');
  function setImage() {
    //console.log('Image is ready');
   // setLoading('none');
    //showImage('flex');
     setLoading(false);
  }

  function failedLoad() {
   // console.log('Failed to load image');
   // Alert.alert('Error', 'Failed to load image');
   // setLoading(false); // Hide loading indicator if image fails to load
  }



  return (
    <View style={[styles.container,style]}>
    
      <Image
          source={{ uri: url }}
          onLoad={() => setImage()}
          onError={() => failedLoad()}
          style={styles.mainImage}
        />
    {
        loading && 
        <View style={{width:'100%',height:'100%',backgroundColor:'#f9edfa',justifyContent:'center',alignItems:'center', position:'absolute',top:0,left:0}}>
        <Image 
          source={require('./loading.gif')}
          style={styles.loadingImage}
        />
     </View>
     }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position:'relative'
  },
  loadingImage: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',


  },
});
