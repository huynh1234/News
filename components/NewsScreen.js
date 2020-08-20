// import React, { useState, useEffect } from 'react'
// import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Button, ActivityIndicator, SafeAreaView } from 'react-native'
// import { NewsData } from '../data/new';
// // import { NewsData } from '../data/new';

// const API_KEY = 'b2c5768c9c594acc8a92656a7468a288';



// export default function NewsScreen() {

//     console.log('Render NewsScreen')

//     const [isLoading, setLoading] = useState(true)
//     const [articles,setArticles]= useState([])
//     console.log('State', isLoading)

//      // chỉ gọi api 1 lần trong lần đầu render component 
//     useEffect(() => {

//         async function getNews() {
            
//                 const response = await fetch('http://newsapi.org/v2/everything?q=bitcoin&from=2020-07-18&sortBy=publishedAt&apiKey=b2c5768c9c594acc8a92656a7468a288')
//                 console.log(response);
//                 const jsonData = await response.json();
//                 console.log(jsonData);
                
//                 setArticles(jsonData.articles)
    
//                 //sau khi load setLoadding bằng flase 
//                 setLoading(false);
            
            
//         };



//         console.log('Call API')
//         getNews();
//     }, [])

//     const renderItem = ({ item, index }) => {
//         return (
//             <View style={styles.newsp}>
//                 <Image source={{ uri: item.thumbnail }} style={styles.imagestyle} />
//                 <View style={{ marginLeft: 8, width: "65%" }}>
                    
//                         <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.title}</Text>
                    
//                     <Text style={{ color: "gray" }}>
//                         {item.description}
//                     </Text>
                    

//                 </View>

//             </View>
//         );
//     }
//     const renderSeparator = () => (
//         <View style={styles.line} />
//     )
//     return (
//         <SafeAreaView>
//             {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
//             <Button title="test" onPress={() => setLoading((prevState) => !prevState)} />
//             <FlatList
//                 data={NewsData}
//                 renderItem={renderItem}
//                 keyExtractor={item => item.id}
//                 showsVerticalScrollIndicator={false}
//                 ItemSeparatorComponent={renderSeparator}
//             />
            
//         </SafeAreaView>

//     )
// }
// const styles = StyleSheet.create({
//     imagestyle: {
//         height: 100,
//         width: "35%",
//         borderRadius: 4
//     },
//     newsp: {
//         flexDirection: "row",
//         padding: 8,
//     },
//     line: {
//         borderBottomWidth: 1,
//         borderBottomColor: "#bdc3c7",
//     }
// });
