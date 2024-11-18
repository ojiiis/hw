import { Image,View,Dimensions} from 'react-native';
import {useEffect, useState} from 'react';
const { width, height } = Dimensions.get('window');
export function Loading({display}){
    const [show,setShow] = useState(display);
    useEffect(()=>{
setShow(display);
    },[display])
    
      return (
    
        
            show &&
            (<View style={{width:'100%',height:'100%',backgroundColor:'#f9edfa',justifyContent:'center',alignItems:'center'}}>
                <Image
                 source={require('./loading.gif')}
                 style={{width: 30,height: 30, resizeMode: 'cover'}}
                />
            </View>)
        
      );
}