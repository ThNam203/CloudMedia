/* eslint-disable react-native/no-inline-styles */
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {FlatList, StyleSheet, Text, Image, View, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setPostShow} from '../../reducers/UtilsReducer';
import {Toast} from './Toast';
import {getAllStatusPostOfUser} from '../../api/statusPostApi';
import {RootState} from '../../reducers/Store';
import {getTimeToNow} from '../../utils/Utils';
const screenWidth = Dimensions.get('screen').width;

const Post = ({content, mediaFiles, time, user}: any) => {
  return (
    <View style={styles.post}>
      <Text style={styles.time}>{time}</Text>
      <Text style={styles.user}>
        {user.name}{' '}
        <Text style={{fontWeight: 'normal', color: '#999'}}>posted this</Text>
      </Text>
      {mediaFiles ? (
        <View style={{flexDirection: 'row'}}>
          {mediaFiles.map((image: any, index: number) => (
            <Image
              key={index}
              style={[
                styles.image,
                {width: screenWidth / mediaFiles.length - 10},
              ]}
              source={{uri: image}}
            />
          ))}
        </View>
      ) : null}
      <Text style={styles.content} numberOfLines={2}>
        {content}
      </Text>
    </View>
  );
};

const ActivitySection = (props: any) => {
  const dispatch = useDispatch();
  const {navigation, userId} = props;
  const [posts, setPosts] = useState<any[]>([]);

  const jwt = useSelector((state: RootState) => state.token.key);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response: any = await getAllStatusPostOfUser(userId, jwt);
        if (response.status === 200) setPosts(response.data.reverse());
        else throw new Error(response.data.errorMessage);
      } catch (error: any) {
        Toast(error.message);
      }
    };
    getPosts();
  }, []);

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
            content={item.description}
            mediaFiles={item.mediaFiles}
            time={getTimeToNow(item.createdAt)}
            user={item.author}
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
