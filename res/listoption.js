import {Style,View,Text,ScrollView, Pressable, TouchableOpacity} from 'react-native'
import {useEffect, useState} from 'react'

export function ListOptions({currentValue,options ={},onSelect,style}){
    const [showOption,setShowOption] = useState(false);
    const [value,setValue] = useState(currentValue);
    useEffect(()=>{
setValue(currentValue);
    },[currentValue]);
    function handleSelection(data){
setValue(data.value);
onSelect(data.value);
setShowOption(false); 
    }
    function handleClose(){
       setShowOption(false); 
    }
    return (
        <>
          
            {
                !showOption &&  <TouchableOpacity onPress={()=>setShowOption(true)} style={style}>
                <Text>{value}</Text>
               </TouchableOpacity>
              }
           
            {
                showOption && 
                <ScrollView>
                    <Pressable style={{justifyContent:'right'}} onPress={()=>handleClose()}><Text>Close</Text></Pressable>
                     {
                        options.map((data,i)=>(
                          <TouchableOpacity onPress={()=>handleSelection(data)} key={i}>
                            <Text>{data.value}</Text>
                          </TouchableOpacity>
                        ))
                     }
                </ScrollView>
            }
        </>
    );
}