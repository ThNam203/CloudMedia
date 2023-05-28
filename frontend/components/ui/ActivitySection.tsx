/* eslint-disable react-native/no-inline-styles */
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import {FlatList, StyleSheet, Text, Image, View, Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {setPostShow} from '../../reducers/PostReducer';
const screenWidth = Dimensions.get('screen').width;

const Post = ({type, content, image, time, user}: any) => {
  const renderImage = () => {
    if (image) {
      return <Image style={styles.image} source={{uri: image}} />;
    }
    return null;
  };

  return (
    <View style={styles.post}>
      <Text style={styles.time}>{time}</Text>
      <Text style={styles.user}>
        {user}{' '}
        <Text style={{fontWeight: 'normal', color: '#999'}}>posted this</Text>
      </Text>
      {renderImage()}
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

const ActivitySection = () => {
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([
    {
      type: 'text',
      content: 'This is a text post.',
      time: '12:00 PM',
      user: 'John Doe',
    },
    {
      type: 'image',
      content: 'Hello',
      image: 'https://upload.wikimedia.org/wikipedia/vi/2/2c/Nobita.png',
      time: '1:00 PM',
      user: 'Jane Doe',
    },
    {
      type: 'text',
      content: 'This is another text post.',
      time: '2:00 PM',
      user: 'John Smith',
    },
  ]);

  return (
    <View style={{margin: 25}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.title}>Activity</Text>
        <View
          style={{
            borderRadius: 20,
            borderWidth: 1,
            overflow: 'hidden',
            borderColor: '#0565a0ff',
          }}>
          <Pressable
            onPress={() => dispatch(setPostShow(true))}
            android_ripple={{color: '#7fc1ebff'}}
            style={{
              backgroundColor: 'transparent',
              width: 150,
              height: 35,
              justifyContent: 'center',
            }}>
            <Text style={{textAlign: 'center', fontSize: 18, color: '#0A66C2'}}>
              Start a post
            </Text>
          </Pressable>
        </View>
      </View>
      <View>
        <Text style={styles.numFollow}>0 followers</Text>
      </View>
      <FlatList
        data={posts.slice(0, 2)}
        renderItem={({item}) => (
          <Post
            type={item.type}
            content={item.content}
            image={item.image}
            time={item.time}
            user={item.user}
          />
        )}
        keyExtractor={item => item.time}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
      <TouchableOpacity
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={[styles.title, {fontWeight: 'normal', marginVertical: 20}]}>
          Show all activity ➔
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    marginTop: 10,
    borderBottomColor: '#999',
    borderBottomWidth: 0.5,
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  user: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  content: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  numFollow: {
    fontWeight: 'bold',
    color: '#4228e8',
  },
});

export default ActivitySection;
