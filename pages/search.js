import {Pressable, StyleSheet,Text,TextInput, View,Image,ScrollView,Dimensions} from 'react-native';
import {useState,useRef,useEffect} from 'react';
import {Img} from '../res/img';
import {Loading} from '../res/loading';
const { width, height } = Dimensions.get('window');


export function Search(){
    const [key,setKey] = useState('')
   // const [searchData,setSearchData] = useState([])
            const scrollViewRef = useRef();
                   const [show,setShow] = useState(true);
       const [data, setData] = useState([]);
    const [ModalDisplay,setModalDisplay] = useState(false);
    const [ModalContent,setModalContent] = useState('');
    const [readNovelModalDisplay,setReadNovelModalDisplay]=useState(false);
    const [scrollToEnd,setScrollToEnd] = useState(false);
    const [currentNovel,setCurrentNovel] = useState('');
    const [NovelContent, setNovelContent] = useState('');
    const [currentNovelPage,setCurrentNovelPage] = useState(0)
    const [getItem,setGetItem] = useState(false);
    const [canread,setcanread] = useState(true);
    const [hasPrevious,setHasPrevious] = useState(false);
    const [hasNext,setHasNext] = useState(true);
      function handleKeyPress({ nativeEvent }) {
    const pressedKey = nativeEvent.key;
    
    // Only capture single letters (ignoring keys like Control, Shift, etc.)
    if (/^[a-zA-Z ]$/.test(pressedKey)) {
      setKey((prevKey) => {
        const updatedKey = prevKey + pressedKey;
        searchFunc(updatedKey);
         //console.log(updatedKey)
        return updatedKey;
       
      });
    } else if (pressedKey === 'Backspace') {
      // Remove the last character if the backspace key is pressed
      setKey((prevKey) => {
        const updatedKey = prevKey.slice(0, -1);
         searchFunc(updatedKey);
        console.log(updatedKey);
        return updatedKey;
      });
    }
  }
   async function searchFunc(updatedKey){
        const getSearch = await fetch('https://lin.com.ng/h/index.php?search='+updatedKey);
        const search = await getSearch.json();
        setData(search);
    }


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
    return (
      <>
    <View style={{height:'100%',width:'100%',backgroundColor:'#f9edfa' }}>
      <View style={{ paddingLeft: 20,paddingRight: 20,marginTop:20,height:'10%',justifyContent:'center' }}>
        <TextInput
          placeholder="Search for Novel..."
          onKeyPress={handleKeyPress}
          value={key}
        />
      </View>
      <ScrollView
      style={styles.scrollviewSearch}
      >
            <View style={styles.home}>
                { data.length > 0 && 
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
    </View>
    
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
                {!canread && <Pressable style={{width:'80%',backgroundColor:'#e443a3',padding:10,borderRadius:10,alignItems:'center',justifyContent:'center'}}><Text style={{color:'#303030'}}>Buy Novel (N200)</Text></Pressable>}
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
    backgroundColor:"#f9edfa",
   },
   navigation:{height:"6%",flexDirection:"row",justifyContent:"space-evenly",alignItems:"center",padding:5},
   navigationBtn:{paddingLeft:10,paddingRight:10,backgroundColor:'green',borderRadius:2,height:"100%",justifyContent:'center'}
});