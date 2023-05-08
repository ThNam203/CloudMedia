/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, FlatList, Image, Pressable} from 'react-native';

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

  const renderItem = ({item}) => (
    <View
      style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 10}}>
      <Image
        source={item.avatar}
        style={{width: 80, height: 80, borderRadius: 40, marginRight: 10}}
      />
      <View>
        <View
          style={{
            marginBottom: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: 'black',
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: 'grey',
              marginHorizontal: 20,
            }}>
            {item.datebetween}
          </Text>
        </View>

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
      data={invitations}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  );
};

export default InvitationsList;
