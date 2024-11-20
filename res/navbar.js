import {useState,useEffect} from 'react';
import {StyleSheet,Pressable, View, Text,Dimensions,Image} from 'react-native'
const {width,height} = Dimensions.get('window');
var tabLenght = 0;
export function NavBar({tabs,active="",style =null,action,activeBackground = 'green',activeForground='green'}){
    
const [main,setMain] = useState(active);
    
    useEffect(()=>{
 if(active !== ""){
         for(i in tabs){
             console.log(tabs[i]);
             if(tabs[i].name==active){
                 setActive(tabs[i]);
                 
             }
         }
        
    }
    },[active]);
var tabLenght = tabs.length;    
   function setActive(tab){
        setMain(tab.name)
        if(typeof action == "function"){ action(tab)
        }
    }
    var ew = (width/tabLenght) - 10
    return (
    <View style={style}>
{
    tabs.map((tab,i)=>(
      <Pressable
        onPress={()=>setActive(tab)}
        style={[sty.tab,{width:ew}]}
        key={i}
        >
        
           <View
        style={[sty.active,{backgroundColor:tab.name == main?activeBackground:''}]}
           >
             <Image 
             source={tab.name == main?tab.activeImg:tab.img}
             style={{width:'100%',height:'60%',resizeMode:'contain'}}
             />
             <Text style={{height:'40%',fontSize:12,fontWeight:'condensedBold',textAlign:'center',color:tab.name == main?activeForground:style?.color}}>{tab.name}</Text>
           </View>
        </Pressable>
        
    ))
}
    </View>
        );
        
        
}


const sty = StyleSheet.create({
    active:{
        width:'100%',//
        
        height:'100%',
        justifyContent:'space-between' 
    },
    tab:{
        height:'80%'
    }
});
