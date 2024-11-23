import {Platform,Keyboard,Pressable, StyleSheet,Text,TextInput, View,Image,ScrollView,Dimensions, KeyboardAvoidingView} from 'react-native';
import {useState,useRef,useEffect} from 'react';
import {Img} from '../res/img';
import {Loading} from '../res/loading';
import { getUser } from '../res/func';
import {Errors} from '../res/errors';

const { width, height } = Dimensions.get('window');


export function Profile({logout}){
   const [user,setUser]= useState([]);
     const [keyboardHeight, setKeyboardHeight] = useState(0);
   const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
   const [show,setShow] = useState(true);
       const [data, setData] = useState([]);
       const [readFontSize,setreadFontSize] = useState(19);
      const [displayError,setDisplayError] = useState(false);
      const [error, setError] = useState({
          "message":"internal error",
          "image":require('../assets/no-network.png'),
          "btn":{
              "value":"Retry",
              "action":()=>{Alert.alert("hello world!")}
              
          }
      });
      
   useEffect(()=>{
           (
            async ()=>{
          const getuser = await getUser();
          
           setUser((old)=>{
            
   
            return getuser;
           });
           
       // const url = `https://lin.com.ng/h/index.php?novels&page=1&user_id=${getuser?.user_id}`;
       async function  fetchData(){
            try{
                const url = `https://lin.com.ng/h/index.php?users_novel=${getuser?.user_id}`;
                console.log(url);
        const getMyNovel = await fetch(url);
        const gdata = await getMyNovel.json();
        
        if(gdata.status){
         setData((old)=>{
             return gdata.data;
         });
         
        }
        //setUser(gdata,"gdata");
        
        setShow(false);
        console.log(data,'after request.');
            }catch(e){
               setShow(false);
       const er ={
             "message":e.message,
          "btn":{
              "value":"Retry",
              "action":()=>{
                  setDisplayError(false);
                  setShow(true);
                  fetchData();
              }
              
          }
       }
       setError((old)=>{
           return {...old,...er}
       });
      setDisplayError(true);
     
            }
        }
        fetchData();
 var userSettings;
           
            const getUserSettings = await fs.getInfoAsync(`${fs.documentDirectory}settings`);
              
            
            if(!getUserSettings.exists){
              userSettings = {
                "fontSize":19
              };
              var usd = JSON.stringify(userSettings);
              
              await fs.writeAsStringAsync(`${fs.documentDirectory}settings`,usd);
           setreadFontSize(userSettings.fontSize);
   
            }else{
               userSettingsGet = await fs.readAsStringAsync(`${fs.documentDirectory}settings`);
               userSettings = JSON.parse(userSettingsGet);
               setreadFontSize(userSettings.fontSize);
            }

           } 
           )();

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


   },[keyboardHeight,screenHeight,data]);
    const [ModalDisplay,setModalDisplay] = useState(false);
    const [ModalContent,setModalContent] = useState('');
    const [readNovelModalDisplay,setReadNovelModalDisplay]=useState(false);
    const [currentNovel,setCurrentNovel] = useState('');
    const [NovelContent, setNovelContent] = useState('');
    const [currentNovelPage,setCurrentNovelPage] = useState(0)
    const [getItem,setGetItem] = useState(false);
    

    const [hasPrevious,setHasPrevious] = useState(false);
    const [hasNext,setHasNext] = useState(true);

   function sendLogout(){
    logout(true);
   }



   function showModal(a){
    console.log(data,'from modal');
  Keyboard.dismiss();
   setModalContent(data[a])
    // alert(data[a].)
    setModalDisplay(true);
}
    function hideModal(){
    setModalDisplay(false);
}
async function readNovel(novelId){
setShow(true);
setModalDisplay(false);
const getChapter = await fetch(`https://lin.com.ng/h/?readnovel&novel_id=${novelId}`);
const chapters = await getChapter.json();
chapterContent = chapters[currentNovelPage];
chapterContent.replaceAll("<br />", "\n")
setNovelContent(chapterContent);
setReadNovelModalDisplay(true);
setShow(false);
setCurrentNovel(chapters); 
}
function hideReadModal(){
    setReadNovelModalDisplay(false);
}
function nextChapter(){
setShow(true);
setCurrentNovelPage((lastPage) =>{
    if((lastPage + 1) == currentNovel.length){
        setHasNext(false);
       return currentNovel.length - 1;
    }else{
        const newPage = lastPage + 1;
return newPage;
    }
    
});
setNovelContent(currentNovel[currentNovelPage]);
setReadNovelModalDisplay(true);
setShow(false);
setHasPrevious(true)
}
function previousChapter(){
setShow(true);
setCurrentNovelPage((lastPage) =>{
    if((lastPage - 1) < 0){
         setHasPrevious(false);
        return 0;
    }else{
        const newPage = lastPage - 1;
return newPage; 
    }
    
});

setNovelContent(currentNovel[currentNovelPage]);
setReadNovelModalDisplay(true);
setShow(false);
setHasNext(true)
}


return (
  <>
          {displayError && <Errors 
        message={error.message}
        btn={error.btn}
        image={error.image}
        />}
              {ModalDisplay && 
        <View style={styles.modal}>
            <View style={{backgroundColor:'#e443a3',height:'7%',width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingLeft:20,paddingRight:20}}>
                <Pressable onPress={()=>hideModal()}><Image source={require('../assets/back.png') } style={{width:30,height:20,resizeMode:'contain'}}/></Pressable>
            <Text>{ModalContent.title}</Text>
            </View>
            <View style={{width:'100%',height:'83%'}}>
                <Img 
                  url={'https://lin.com.ng/h/'+ModalContent.cover}
                  style={{width:'100%',height:'100%',resizeMode:'cover'}} 
                />
              
            </View>
            <View style={{height:'10%',width:'100%',alignItems:'center',justifyContent:'center'}}>
                {ModalContent.can_read && <Pressable onPress={()=>readNovel(ModalContent.novel_id)} style={{width:'80%',backgroundColor:'#e443a3',padding:10,borderRadius:10,alignItems:'center',justifyContent:'center'}}><Text style={{color:'#303030'}}>Read Novel</Text></Pressable>}
                
            </View>
        </View>
      }
      {
        readNovelModalDisplay && 
        <View style={styles.modal}>
            <View style={{backgroundColor:'#e443a3',height:'7%',width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingLeft:20,paddingRight:20}}>
                <Pressable onPress={()=>hideReadModal()}><Image source={require('../assets/back.png') } style={{width:30,height:20,resizeMode:'contain'}}/></Pressable>
            <Text>{ModalContent.title}</Text>
            </View>
            <ScrollView style={{width:'100%',height:'83%',paddingLeft:20,paddingRight:20}}>
               <Text style={{fontSize:readFontSize}}>
               {NovelContent}
               </Text>
             
            </ScrollView>
            <View style={{height:'10%',width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}>
            <View>{hasPrevious && <Pressable onPress={()=>previousChapter()}><Image source={require('../assets/back.png') } style={{width:30,height:20,resizeMode:'contain'}}/></Pressable>}</View>
            <View>{hasNext && <Pressable onPress={()=>nextChapter()}><Image source={require('../assets/forward.png') } style={{width:30,height:20,resizeMode:'contain'}}/></Pressable>}</View>
            </View>
        </View>
      }
      <KeyboardAvoidingView 
      style={{height:screenHeight,paddingTop:(keyboardHeight/2)}}
     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
   <View style={{padding:5,paddingTop:10}}>
    <View style={{marginBottom:15,height:40,flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
       <View style={{flexDirection:'row',alignItems:'center'}}>
          <Image source={require('../assets/user.png')}
          style={{width:40,height:40,resizeMode:'contain',marginRight:3}}
          />
          <View><Text style={{fontSize:22}}>{user.fullname}</Text><Text>{user.email}</Text></View>
       </View>
       
       <View>
         <Pressable onPress={()=>sendLogout()}>
         <Image 
         source={require('../assets/logout.png')}
         style={{width:31,height:25,resizeMode:'cover'}}
         />
         </Pressable>
       </View>
    </View>
 
       <View>
         <Text style={{fontWeight:'bold',fontSize:18}}>My Novel's List</Text>
         <TextInput
           placeholder="Search your novel's list"
         />
       </View>
       <ScrollView style={styles.scrollview}>
      <Loading display={show} />
        <View style={styles.home}>
           
        
                  {
             data.length > 0 &&   data.map((book,i)=>(
                <Pressable key={book.id} style={styles.homeChild} onPress={()=>showModal(i)}>
                    <View style={{width:"100%",height:"100%"}}>
                        <Img
                        url={'https://lin.com.ng/h/'+book.cover}
                        style={styles.bookImg}
                        />
                      
                        <Text style={styles.bookTitle}>{book.title}</Text>
                    </View>
                </Pressable>
                )) 
                }
                
                                  {
             data.length % 2 != 0 &&    <View key="spacer" style={styles.homeChildSpc}
             >
                    <View style={{width:"100%",height:"100%"}}>
                     
                    </View>
                </View>
                }
            </View>
       </ScrollView>
    </View>
    </KeyboardAvoidingView>

    </>
)
}
//style
const styles = StyleSheet.create({
  scrollview:{
   height:"95%"
  },
    scrollviewSearch:{
   height:"90%"
  },
   home:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"space-evenly"
   },
   homeChild:{
    width:"48%",
    height:height * 0.40,
    flexShrink:1,
    backgroundColor:"#e443a3",
    marginBottom:"2%"
   },
   homeChildSpc:{
width:"48%",
    height:height * 0.40,
    flexShrink:1,
    marginBottom:"2%"
   },
   bookImg:{width: "100%",height: "80%", resizeMode: 'cover'},
   bookTitle:{
padding:6,
fontSize:width * 0.04,
color:'#303030'
   },
   modal:{
    width:"100%",
    height:"100%",
    backgroundColor:"#f9edfa",
   },
   navigation:{height:"6%",flexDirection:"row",justifyContent:"space-evenly",alignItems:"center",padding:5},
   navigationBtn:{paddingLeft:10,paddingRight:10,backgroundColor:'green',borderRadius:2,height:"100%",justifyContent:'center'}
});