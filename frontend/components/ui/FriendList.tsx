/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, FlatList, Image, Pressable} from 'react-native';
import ItemRequestUser from './ItemRequestUser';

const friendsData = [
  {
    id: '1',
    name: 'John Doe',
    connection: 'Friend',
    avatar: require('../../assets/images/Spiderman.jpg'),
  },
  {
    id: '2',
    name: 'Jane Smith',
    connection: 'Family',
    avatar: require('../../assets/images/Spiderman.jpg'),
  },
  {
    id: '3',
    name: 'Bob Johnson',
    connection: 'Colleague',
    avatar: require('../../assets/images/Spiderman.jpg'),
  },
];

const FriendList = () => {
  const [friends, setFriends] = useState(friendsData);

  return (
    <FlatList
      data={friends.slice(0, 2)}
      renderItem={({item}) => (
        <ItemRequestUser item={item} nameRequest="Add friend" />
      )}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  );
};

export default FriendList;
