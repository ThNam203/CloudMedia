/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */

import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useEffect} from 'react';
import Icon, {Icons} from '../components/ui/Icons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../reducers/Store';
import {getTimeToNow} from '../utils/Utils';
import {getAStatusPostById} from '../api/statusPostApi';
import {Toast} from '../components/ui/Toast';
import {pushStatusPostsSub} from '../reducers/StatusPostReducer';
import {readNotification} from '../api/notificationApi';

export default function NotificationsScreen({navigation}: any) {
  const NotificationsData = useSelector(
    (state: RootState) => state.notifications.arr,
  );

  const uid = useSelector((state: RootState) => state.uid.id);
  const jwt = useSelector((state: RootState) => state.token.key);
  const dispatch = useDispatch();

  const navigateToDetail = (id: any) => {
    getAStatusPostById(jwt, id)
      .then((res: any) => {
        if (res.status === 200) {
          dispatch(pushStatusPostsSub(res.data));
          return res.data;
        } else {
          throw new Error(res.data.errorMessage);
        }
      })
      .then((data: any) => {
        navigation.push('detailStatus', {idPost: id});
      })
      .catch((error: any) => {
        Toast(error.message);
      });
  };

  useEffect(() => {
    const readNotifi = async () => {
      const response: any = await readNotification(uid, jwt);
      if (response.status !== 204) {
        console.log(response.status);
        console.log(response.data.errorMessage);
      }
    };
    readNotifi();
  }, []);

  const CTA = ({title, item}: any) => (
    <TouchableOpacity
      onPress={() => {
        if (item.notificationType === 'Comment') navigateToDetail(item.link);
        if (item.notificationType === 'FriendRequest')
          navigation.navigate('invitations');
      }}
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
      <View
        style={{
          height: 70,
          width: 70,
          marginRight: 20,
          borderRadius: 35,
          elevation: 5,
        }}>
        <Image
          source={
            item.sender?.profileImagePath
              ? {uri: item.sender.profileImagePath}
              : require('../assets/images/Spiderman.jpg')
          }
          style={{
            flex: 1,
            borderRadius: 35,
            height: undefined,
            width: undefined,
          }}
        />
      </View>
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
          <CTA title="View request" item={item} />
        ) : item.notificationType === 'Comment' ? (
          <CTA title="See all comment" item={item} />
        ) : item.notificationType === 'Like' ? (
          <CTA title="See like" item={item} />
        ) : null}
      </View>
      <View>
        <Text style={{fontSize: 13, marginBottom: 5}}>
          {getTimeToNow(item.createdAt)}
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
        paddingHorizontal: 5,
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
