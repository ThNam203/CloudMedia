/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, Pressable} from 'react-native';
import ItemRequestUser from './ItemRequestUser';
import {createRequestByEmail, getRecommendFr} from '../../api/friendApi';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers/Store';
import {Toast} from './Toast';
import {useIsFocused} from '@react-navigation/native';

const FriendList = ({navigation}: any) => {
  const [friends, setFriends] = useState<any[]>();
  const token = useSelector((state: RootState) => state.token.key);
  const uid = useSelector((stata: RootState) => stata.uid.id);

  const isFocused = useIsFocused();

  const handleAddFr = async (email: any) => {
    // console.log(email);
    createRequestByEmail(email, uid, token)
      .then((response: any) => {
        if (response.status === 200) {
          return response.data;
        } else {
          console.log(response.status);
          throw new Error(response.data.errorMessage);
        }
      })
      .then(data => {
        console.log(data);
        setFriends((prev: any) => {
          return prev.map((item: any) => {
            if (item.email === email) {
              return {
                ...item,
                isFriend: 'pending',
              };
            }
            return item;
          });
        });
      })
      .catch(error => {
        Toast(error.message);
      });
  };

  useEffect(() => {
    const getRecomendFriends = async () => {
      try {
        const response: any = await getRecommendFr(uid, token);
        if (response.status === 200) {
          setFriends(response.data);
        } else {
          throw new Error(response.data.errorMessage);
        }
      } catch (error: any) {
        Toast(error.message);
      }
    };
    if (isFocused) getRecomendFriends();
  }, [isFocused]);

  return (
    <FlatList
      data={friends?.slice(0, 2)}
      renderItem={({item}) => (
        <ItemRequestUser
          item={item}
          navigation={navigation}
          nameRequest={item.isFriend === 'pending' ? 'Pending' : 'Add Friend'}
          nameRequest2="Show Profile"
          pressLeft={() => handleAddFr(item.email)}
          pressRight={() => navigation.navigate('profileOther', {id: item._id})}
        />
      )}
      keyExtractor={item => item._id}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  );
};

export default FriendList;
