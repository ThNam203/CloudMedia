/* eslint-disable react-native/no-inline-styles */
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {FlatList, StyleSheet, Text, Image, View, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setPostShow} from '../../reducers/UtilsReducer';
import {Toast} from './Toast';
import {
  getAStatusPostById,
  getAllStatusPostOfUser,
} from '../../api/statusPostApi';
import {RootState} from '../../reducers/Store';
import {getTimeToNow} from '../../utils/Utils';
import {useFocusEffect} from '@react-navigation/native';
import {
  clearStatusPostsSub,
  pushStatusPostsSub,
} from '../../reducers/StatusPostReducer';
const screenWidth = Dimensions.get('screen').width;

const Post = ({navigation, item}: any) => {
  const navigateToDetail = () => {
    navigation.push('detailStatus', {idPost: item._id});
  };

  return (
    <Pressable style={styles.post} onPress={navigateToDetail}>
      <Text style={styles.time}>{getTimeToNow(item.createdAt)}</Text>
      <Text style={styles.user}>
        {item.author.name}{' '}
        <Text style={{fontWeight: 'normal', color: '#999'}}>
          {item.sharedLink ? 'shared' : 'posted'}{' '}
        </Text>
      </Text>

      <View style={{flexDirection: 'row'}}>
        {item.mediaFiles[0] &&
          (item.mediaFiles[0].fileType === 'Image' ? (
            <Image
              style={styles.image}
              source={{uri: item.mediaFiles[0].location}}
            />
          ) : (
            <Image
              style={styles.image}
              source={require('../../assets/images/Thumbnail.png')}
            />
          ))}
        <View style={{flex: 1}}>
          <Text style={styles.content} numberOfLines={5}>
            {item.description}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const ActivitySection = (props: any) => {
  const dispatch = useDispatch();
  const {navigation, userId, followCount} = props;
  const [posts, setPosts] = useState<any[]>([]);

  const jwt = useSelector((state: RootState) => state.token.key);

  const getPostById = async (id: any) => {
    try {
      const response: any = await getAStatusPostById(jwt, id);
      if (response.status === 200) {
        const data = response.data;
        dispatch(pushStatusPostsSub(data));
      }
    } catch (error: any) {
      Toast(error.message);
    }
  };

  const getPosts = async () => {
    try {
      const response: any = await getAllStatusPostOfUser(userId, jwt);
      if (response.status === 200) {
        setPosts(response.data.reverse());
        for (const postsub of response.data) {
          dispatch(pushStatusPostsSub(postsub));
          if (postsub.sharedLink) {
            getPostById(postsub.sharedLink);
          }
        }
      } else throw new Error(response.data.errorMessage);
    } catch (error: any) {
      Toast(error.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getPosts();
      // dispatch(clearStatusPostsSub());

      return () => {
        // Cleanup or cancel any pending requests if needed
      };
    }, []),
  );

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
        <Text style={styles.numFollow}>{`${followCount} followers`} </Text>
      </View>
      <FlatList
        data={posts.slice(0, 2)}
        renderItem={({item}) => <Post navigation={navigation} item={item} />}
        keyExtractor={(item, index) => 'key' + index}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('postOfUser', {userId: userId})}
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
    padding: 5,
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
