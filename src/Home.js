import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  SafeAreaView,
  Linking,
} from 'react-native';
import {NewsData} from '../data/new';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

const API_KEY = '4b26308a16544d93a664b4483f6696d6';

export default function Home() {
  console.log('Render HomeScreen');

  const [isLoading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  const [page, setPage] = useState(1);
  console.log('State', isLoading);

  // chỉ gọi api 1 lần trong lần đầu render component
  useEffect(() => {
    if (page <= 5) {
      console.log('get data from ' + page);
      getNews = async () => {
        try {
          const response = await fetch(
            `https://newsapi.org/v2/top-headlines?sources=bbc-news,cbc-news,nbc-news,fox-news,mtv-news=&page=${page}&pageSize=10&apiKey=${API_KEY}`,
          );
          const jsonData = await response.json();
          // console.log(jsonData);

          setArticles(articles.concat(jsonData.articles));

          //sau khi load setLoadding bằng flase
          setLoading(false);
        } catch (e) {
          console.log(e);
        }
      };

      getNews();

      console.log('get News');
    }
  }, [page]);

  async function loadmorarticles() {
    if(page<5){
      console.log('loadmorarticles');
      // goi len api de lay du lieu trang tiep theo
      // console.log('get data from'+page)
      // const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news,cbc-news,nbc-news,fox-news,mtv-news=&page=${page+1}&pageSize=10&apiKey=${API_KEY}`);
      // const jsonData = await response.json();
      // setArticles(articles.concat(jsonData.articles))
        setPage((page) => page + 1);
    }
    
    
  }

  async function openArticles(url) {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }
  const footer = ()=> {
    return(
      <View >
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{alignItems: 'center', justifyContent: 'center'}}
        /> 
          
      </View>);
  }

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.newsp}
        onPress={() => openArticles(item.url)}>
        <Image source={{uri: item.urlToImage}} style={styles.imagestyle} />
        <View style={{marginLeft: 8, width: '65%'}}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.author}</Text>

          <Text style={{color: 'gray'}} numberOfLines={3}>
            {item.description}
          </Text>
          <Text style={{color: 'gray'}}>
            <Icon name="clock" size={18} />
            <Text> </Text>
            {moment(item.publishedAt).fromNow()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderSeparator = () => <View style={styles.line} />;

  return (
    <SafeAreaView>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{alignItems: 'center', justifyContent: 'center'}}
        />
      ) : (
        <FlatList
          data={articles}
          renderItem={renderItem}
          keyExtractor={(item) => item.url}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={renderSeparator}
          onEndReached={loadmorarticles}
          onEndReachedThreshold={0.5}
          ListFooterComponent={footer}
        />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  imagestyle: {
    height: 100,
    width: '35%',
    borderRadius: 4,
  },
  newsp: {
    flexDirection: 'row',
    padding: 8,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#bdc3c7',
  },
});
