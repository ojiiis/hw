import { Image,View,Text,Pressable,Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');
export function Errors({image,btn,message}){
    
      return (
     <View style={{width:'100%',height:'100%',backgroundColor:'#f9edfa',justifyContent:'center',alignItems:'center'}}>
              
              <View style={{width:'100%',alignItems:'center'}}>
              <Text style={{fontSize:25}}>{message}</Text>
                 {
                 image && image !== "undefined"   &&  <Image
                 source={image}
                 style={{width: 150,height: 130, resizeMode: 'cover',marginTop:20}}
                />
                 }
                {
                    btn && btn !== "undefined" && <Pressable 
                    onPress={()=>{btn.action()}}
                style={{width:'80%',backgroundColor:'#e443a3',padding:10,borderRadius:10,alignItems:'center',justifyContent:'center',marginTop:20}}    
                    >
                  <Text style={{color:'#303030'}}>{btn.value}</Text>
                </Pressable>
                }
              </View>
                
            </View>
        
      );
}