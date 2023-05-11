/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon, {Icons} from '../components/ui/Icons';
import FriendList from '../components/ui/FriendList';
import friendApi from '../api/friendApi';
import { useSelector } from 'react-redux';
import { AxiosError } from 'axios';

function NetworkScreen({navigation}: any) {
  const [icon_1] = useState(new Animated.Value(40));
  const [icon_2] = useState(new Animated.Value(40));
  const [icon_3] = useState(new Animated.Value(40));

  const userId = useSelector((state: any) => state.uid.id)
  const jwt = useSelector((state: any) => state.token.key)

  const friendsData = [
    {
      id: '1',
      name: 'John Doe',
      connection: 'Friend',
      avatar: require('../assets/images/DefaultAvatar.png'),
    },
    {
      id: '2',
      name: 'Jane Smith',
      connection: 'Family',
      avatar: require('../assets/images/DefaultAvatar.png'),
    },
    {
      id: '3',
      name: 'Bob Johnson',
      connection: 'Colleague',
      avatar: require('../assets/images/DefaultAvatar.png'),
    },
  ];

  const [friends, setFriends] = useState(friendsData);
  const [friendRequests, setFriendRequests] = useState([]);

  const [pop, setPop] = useState(false);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      friendApi.getFriendRequests(userId, jwt).then(response => {
        console.log('concac')
        console.log(JSON.stringify(response, null, 2))
      }).catch((error: any) => {
        console.log(error)
      })
        
      // setFriendRequests(friendRequests.data)
      // console.log(friendRequests.data)
      // console.log('end of friend requests')
    }

    fetchFriendRequests()
  })

  const renderItem = ({item}) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
      }}>
      <Image
        source={item.avatar}
        style={{width: 50, height: 50, borderRadius: 25, marginRight: 10}}
      />
      <View>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.name}</Text>
        <Text style={{color: 'gray'}}>{item.connection}</Text>
      </View>
    </View>
  );

  const popIn = () => {
    setPop(true);
    Animated.timing(icon_1, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 110,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const popOut = () => {
    setPop(false);
    Animated.timing(icon_1, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View>
      <Text>NetworkScreen</Text>
    </View>
  );
}
