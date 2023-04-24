/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, FlatList, Image, Pressable} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

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

  const renderItem = ({item}) => (
    <View
      style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 10}}>
      <Image
        source={item.avatar}
        style={{width: 80, height: 80, borderRadius: 40, marginRight: 10}}
      />
      <View>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
          {item.name}
        </Text>
        <Text style={{color: 'gray'}}>{item.connection}</Text>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              borderRadius: 10,
              backgroundColor: '#000ed2',
              overflow: 'hidden',
              width: 130,
            }}>
            <Pressable
              android_ripple={{color: '#0073ff'}}
              style={{
                backgroundColor: 'transparent',
                elevation: 2,
                padding: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Chấp nhận
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              borderRadius: 10,
              backgroundColor: '#eeeeee',
              overflow: 'hidden',
              width: 130,
              marginLeft: 10,
            }}>
            <Pressable
              android_ripple={{color: '#cccccc'}}
              style={{
                backgroundColor: 'transparent',
                elevation: 2,
                padding: 10,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Xóa
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={friends.slice(0, 2)}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  );
};

export default FriendList;
