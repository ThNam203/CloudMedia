import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Animated,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Colors from '../constants/Colors';
import VideoPlayer from 'react-native-video';
import Icon, {Icons} from '../components/ui/Icons';

export default function StoriesScreen({navigation: {goBack}, route}: any) {
  let {width: windowWidth, height: windowHeight} = useWindowDimensions();
  windowHeight = windowHeight - 150;

  const flatListRef = useRef<FlatList<any>>(null);

  const stories = [
    {
      id: '1',
      name: 'John Doe kjasd kasjh dkjashd jklash klajshd',
      image: 'https://picsum.photos/200/300',
      uri: 'https://vjs.zencdn.net/v/oceans.mp4',
      seen: false,
    },
    {
      id: '2',
      name: 'Jane Doe',
      image: 'https://picsum.photos/200/300',
      uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      seen: true,
    },
  ];

  useEffect(() => {
    // Scroll to the second item in the FlatList
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({animated: false, index: 0});
    }
  }, []);

  const getItemLayout = (data: any, index: number) => ({
    length: windowWidth,
    offset: windowWidth * index,
    index,
  });

  const Video = ({source}: any) => {
    return (
      <View style={{width: windowWidth}}>
        <VideoPlayer
          source={{uri: source}}
          style={{flex: 1, width: '99%'}}
          resizeMode="contain"
          repeat={true}
        />
      </View>
    );
  };

  const Story = ({item}: any) => {
    return (
      <View
        style={{
          width: windowWidth,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <Image
          source={{uri: item.image}}
          style={{flex: 1, width: '99%'}}
          resizeMode="contain"
        />
        <View style={styles.header}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.row}>
              <Image source={{uri: item.image}} style={styles.avatar} />
              <Text style={styles.name}>
                {item.name.length < 18
                  ? `${item.name}`
                  : `${item.name.substring(0, 15)}...`}
              </Text>
            </TouchableOpacity>
            <Text style={{color: Colors.white, fontSize: 16, marginLeft: 5}}>
              {item.seen ? 'seen' : 'not seen'}
            </Text>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => {}} style={{padding: 5}}>
              <Icon
                type={Icons.Feather}
                name="delete"
                color={Colors.white}
                size={25}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goBack()} style={{padding: 5}}>
              <Icon
                type={Icons.AntDesign}
                name="close"
                color={Colors.white}
                size={25}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity style={{padding: 5}}>
            <Icon
              type={Icons.FontAwesome}
              name="heart"
              color={Colors.white}
              size={30}
              onPress={() => goBack()}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: windowHeight}}>
        <FlatList
          ref={flatListRef}
          pagingEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={stories}
          keyExtractor={(item, index) => 'key ' + index}
          renderItem={({item}) => <Story item={item} />}
          getItemLayout={getItemLayout} // Add getItemLayout prop
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    top: 0,
    left: 0,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.black,
  },
  name: {
    color: Colors.white,
    fontSize: 16,
    marginLeft: 6,
    fontFamily: 'Roboto-Medium',
    fontWeight: 'bold',
  },
  bottom: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
