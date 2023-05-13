/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */

import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Icon, {Icons} from '../components/ui/Icons';
import {useSelector} from 'react-redux';
import {RootState} from '../reducers/Store';

export default function NotificationsScreen({navigation}: any) {
  const NotificationsData = useSelector(
    (state: RootState) => state.notifications.arr,
  );

  const getTimeToNow = (time: any) => {
    const dateNow = new Date();
    const date = new Date(time);
    const diffInMilliseconds = dateNow.getTime() - date.getTime();
    return Math.round(diffInMilliseconds / 3600000);
  };

  const CTA = ({title}: any) => (
    <TouchableOpacity
      onPress={() => {}}
      style={{
        borderRadius: 50,
        borderColor: '#0077B5',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 10,
        alignSelf: 'flex-start',
        width: 'auto',
      }}>
      <Text style={{fontSize: 16, color: '#0077B5'}}>{title}</Text>
    </TouchableOpacity>
  );
  const NotificationItem = ({item}: any) => (
    <View
      style={{
        justifyContent: 'space-evenly',
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Image
        source={require('../assets/images/Spiderman.jpg')}
        style={{height: 70, width: 70, marginRight: 20, borderRadius: 35}}
      />
      <View>
        <Text
          style={{
            width: 240,
            fontSize: 16,
            color: 'black',
            paddingRight: 5,
          }}>
          {item.content}
        </Text>
        {item.notificationType === 'FriendRequest' ? (
          <CTA title="View request" />
        ) : item.notificationType === 'Comment' ? (
          <CTA title="See all comment" />
        ) : item.notificationType === 'Like' ? (
          <CTA title="See like" />
        ) : null}
      </View>
      <View>
        <Text style={{fontSize: 13, marginBottom: 5}}>
          {getTimeToNow(item.updatedAt)}h
        </Text>
        <TouchableOpacity onPress={() => {}}>
          <Icon
            type={Icons.Ionicons}
            name="ellipsis-vertical"
            size={22}
            color={'black'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  const ShowAllFooter = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderTopColor: 'gray',
          borderTopWidth: 1,
          paddingVertical: 10,
        }}>
        <TouchableOpacity
          onPress={() => {}}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: '#0077B5', fontWeight: 'bold', fontSize: 17}}>
            Show All
          </Text>
          <Icon
            type={Icons.Ionicons}
            name="arrow-forward"
            size={19}
            color={'#0077B5'}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View
      style={{
        marginTop: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
      }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={NotificationsData}
        renderItem={NotificationItem}
        ListFooterComponent={() => <ShowAllFooter />}
      />
    </View>
  );
}
