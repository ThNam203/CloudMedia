/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, FlatList, Image, Pressable} from 'react-native';
import ItemRequestUser from './ItemRequestUser';

const invitationsData = [
  {
    id: '1',
    name: 'John Doe',
    datebetween: '1d',
    avatar: require('../../assets/images/Spiderman.jpg'),
  },
  {
    id: '2',
    name: 'Jane Smith',
    datebetween: '345d',
    avatar: require('../../assets/images/Spiderman.jpg'),
  },
  {
    id: '3',
    name: 'Bob Johnson',
    datebetween: '1d',
    avatar: require('../../assets/images/Spiderman.jpg'),
  },
];

const InvitationsList = () => {
  const [invitations, setInvitation] = useState(invitationsData);

  return (
    <FlatList
      data={invitations}
      renderItem={({item}) => (
        <ItemRequestUser item={item} nameRequest="Accept" />
      )}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  );
};

export default InvitationsList;
