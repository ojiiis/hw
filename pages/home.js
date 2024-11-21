import {Alert,Pressable, StyleSheet,Text,TextInput, View,Image,ScrollView,Dimensions,Linking} from 'react-native';
import {useState,useRef,useEffect} from 'react';
import {Img} from '../res/img';
import {Loading} from '../res/loading';
const { width, height } = Dimensions.get('window');


export function Home(){
       const [pageNo, setPageNo] = useState(1);
       const [show,setShow] = useState(true);
       const [data, setData] = useState([]);
      useEffect(()=>{
    async function getSession() {
    //  const info = await fs.getInfoAsync('./res/session');
   //   console.log(info)
 //  const session = await fs.readAsStringAsync('./res/session')
  // console.log(session);
   try{
    setGetItem(false);
    const getGata = await fetch('https://lin.com.ng/h/index.php?novels&page='+pageNo);
    const homeData = await getGata.json();
    setData(data => {
      var nd =    data.concat(homeData)
return nd.reduce((acc, current) => {
  const x = acc.find(item => item.title === current.title);
  if (!x) {
    acc.push(current);
  }
  return acc;
}, []);
    });
    setShow(false);
    setGetItem(true);
   }catch(e){
    //console.log(e)
   }
    }
    getSession();
  },[pageNo]);
    const scrollViewRef = useRef();
    const [ModalDisplay,setModalDisplay] = useState(false);
    const [ModalContent,setModalContent] = useState('');
    const [readNovelModalDisplay,setReadNovelModalDisplay]=useState(false);
    const [scrollToEnd,setScrollToEnd] = useState(false);
    const [currentNovel,setCurrentNovel] = useState('');
    const [NovelContent, setNovelContent] = useState('');
    const [currentNovelPage,setCurrentNovelPage] = useState(0)
    const [getItem,setGetItem] = useState(false);
    const [canread,setcanread] = useState(false);
    const [hasPrevious,setHasPrevious] = useState(false);
    const [hasNext,setHasNext] = useState(true);

  //  const [chap,setChapter] = useState(1);
  const handleScroll = (event) => {
    // Get the scroll position
    let yOffset = event.nativeEvent.contentOffset.y;
    // Get the height of the entire content
    let contentHeight = event.nativeEvent.contentSize.height;
    // Get the height of the visible part
    let layoutHeight = event.nativeEvent.layoutMeasurement.height;

    // Check if we are at the end
    if (yOffset + layoutHeight >= contentHeight - 20) {
         if(getItem){
        setGetItem(false);
        setPageNo(pageNo => pageNo + 1);
         }
 //  console.log(pageNo)
    }else{
     setScrollToEnd(false)
    }
  };


function showModal(a){
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

async function makePayment(){
  const data = new FormData();
  data.append('amount',1000);
  data.append('email','official.ojingirisamuel@gmail.com');
   const req = await fetch(`https://api.paystack.co/transaction/initialize`,{
    method:"POST",
    headers:{
     "Authorization":"Bearer sk_test_834380bd84dca053fcb797ae85b6b3b131f7157e"
    },
    body:data
   });
   const res = await res.json();
   console.log(res);
   
   if(Linking.canOpenURL(res.data.authorization_url)){
    Linking.openURL(res.data.authorization_url)
   }else{
Alert.alert("Unable to process your information!");
   }
}
    return (
        // <Text>AA</Text>
        <>
        <Loading display={show} />
        <ScrollView 
        ref={scrollViewRef} 
        onScroll={handleScroll} // Attach the onScroll event
        scrollEventThrottle={16} // Controls how often the scroll event is fired (16ms = 60fps)
        style={styles.scrollview}
        >
            <View style={styles.home}>
                {
                data.map((book,i)=>(
                <Pressable key={book.title} style={styles.homeChild} onPress={()=>showModal(i)}>
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
            </View>
        </ScrollView>
        {ModalDisplay && 
        <View style={styles.modal}>
            <View style={{height:'7%',width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingLeft:20,paddingRight:20}}>
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
                {canread && <Pressable onPress={()=>readNovel(ModalContent.novel_id)} style={{width:'80%',backgroundColor:'#e443a3',padding:10,borderRadius:10,alignItems:'center',justifyContent:'center'}}><Text style={{color:'#303030'}}>Read Novel</Text></Pressable>}
                {
                !canread && 
                <Pressable 
                style={{width:'80%',backgroundColor:'#e443a3',padding:10,borderRadius:10,alignItems:'center',justifyContent:'center'}}
                onPress={()=>makePayment()}
                >
                  <Text style={{color:'#303030'}}>Buy Novel (N200)</Text>
                </Pressable>
                }
            </View>
        </View>
      }
      {
        readNovelModalDisplay && 
        <View style={styles.modal}>
            <View style={{height:'7%',width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingLeft:20,paddingRight:20}}>
                <Pressable onPress={()=>hideReadModal()}><Image source={require('../assets/back.png') } style={{width:30,height:20,resizeMode:'contain'}}/></Pressable>
            <Text>{ModalContent.title}</Text>
            </View>
            <ScrollView style={{width:'100%',height:'83%',paddingLeft:20,paddingRight:20}}>
               <Text>
               {NovelContent}
               </Text>
             
            </ScrollView>
            <View style={{height:'10%',width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}>
            <View>{hasPrevious && <Pressable onPress={()=>previousChapter()}><Image source={require('../assets/back.png') } style={{width:30,height:20,resizeMode:'contain'}}/></Pressable>}</View>
            <View>{hasNext && <Pressable onPress={()=>nextChapter()}><Image source={require('../assets/forward.png') } style={{width:30,height:20,resizeMode:'contain'}}/></Pressable>}</View>
            </View>
        </View>
      }
        </>
    );
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
   bookImg:{width: "100%",height: "80%", resizeMode: 'cover'},
   bookTitle:{
padding:6,
fontSize:width * 0.04,
color:'#303030'
   },
   modal:{
    width:"100%",
    height:"100%",
    backgroundColor:"#f9edfa"
   },
   navigation:{height:"6%",flexDirection:"row",justifyContent:"space-evenly",alignItems:"center",padding:5},
   navigationBtn:{paddingLeft:10,paddingRight:10,backgroundColor:'green',borderRadius:2,height:"100%",justifyContent:'center'}
});