import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import ActivitySection from '../components/ui/ActivitySection';
import {followUser, getInfoUser, unfollowUser} from '../api/userApi';
import {Toast} from '../components/ui/Toast';
import {clearStatusPostsSub} from '../reducers/StatusPostReducer';
import Header from '../components/ui/Header';
import {RootState} from '../reducers/Store';
import {SearchUsersByEmail} from '../api/Utils';
import Icon, {Icons} from '../components/ui/Icons';
import {createRequestByEmail, unfriendApi} from '../api/friend_api';

const screenWidth = Dimensions.get('window').width;

export default function ProfileOfUserScreen(props: any) {
  const {navigation, route} = props;
  const {id} = route.params;

  const [user, setUser] = useState<any>({});
  const [nameTage1, setNameTage1] = useState('');
  const [nameTage2, setNameTage2] = useState('Follow');
  const dispatch = useDispatch();

  const uid = useSelector((state: RootState) => state.uid.id);
  const jwt = useSelector((state: RootState) => state.token.key);

  const addFriend = async () => {
    try {
      const response: any = await createRequestByEmail(user.email, uid, jwt);
      if (response.status === 200) {
        changeNameTag1('pending');
      } else {
        console.log(response.status);
        throw new Error(response.data.errorMessage);
      }
    } catch (error: any) {
      Toast(error.message);
    }
  };

  const removeFriend = async () => {
    try {
      const response: any = await unfriendApi(user._id, uid, jwt);
      if (response.status === 200) {
        changeNameTag1('false');
        setNameTage2('Follow');
      } else {
        console.log(response.status);
        throw new Error(response.data.errorMessage);
      }
    } catch (error: any) {
      Toast(error.message);
      console.log(error.message);
    }
  };

  const handleFollow = async () => {
    try {
      const response: any = await followUser(user._id, uid, jwt);
      if (response.status === 204) {
        setNameTage2('Following✓');
      } else {
        console.log(response.status);
        throw new Error(response.data.errorMessage);
      }
    } catch (error: any) {
      Toast(error.message);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response: any = await unfollowUser(user._id, uid, jwt);
      if (response.status === 204) {
        setNameTage2('Follow');
      } else {
        console.log(response.status);
        throw new Error(response.data.errorMessage);
      }
    } catch (error: any) {
      Toast(error.message);
    }
  };

  const handleLeftButton = () => {
    if (nameTage1 === 'Add Friend') {
      addFriend();
    } else if (nameTage1 === 'Unfriend') {
      Alert.alert('Unfriend', 'Are you sure you want to unfriend this user?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            removeFriend();
          },
        },
      ]);
    }
  };

  const handleRightButton = () => {
    if (nameTage2 === 'Follow') {
      handleFollow();
    } else {
      handleUnfollow();
    }
  };

  const changeNameTag1 = (isFriend: string) => {
    setNameTage1(
      isFriend === 'pending'
        ? 'Pending'
        : isFriend === 'true'
        ? 'Unfriend'
        : 'Add Friend',
    );
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response: any = await getInfoUser(id);
        if (response.status === 200) {
          const data = response.data;
          setUser(data);
          data.followers.forEach((item: any) => {
            if (item === uid) {
              setNameTage2('Following✓');
            }
          });
        } else {
          console.log(response.status);
          throw new Error(response.data.errorMessage);
        }
      } catch (error: any) {
        Toast(error.message);
      }
    };

    // dispatch(clearStatusPostsSub());
    getUserInfo();
  }, []);

  useEffect(() => {
    const checkFriend = async () => {
      try {
        if (!user.email) return;
        const response: any = await SearchUsersByEmail(user.email, uid, jwt);
        if (response.status === 200) {
          const data = response.data;
          data.forEach((item: any) => {
            if (item.email === user.email) {
              changeNameTag1(item.isFriend);
            }
          });
        } else {
          console.log(response.status);
          throw new Error(response.data.errorMessage);
        }
      } catch (error: any) {
        Toast(error.message);
      }
    };
    checkFriend();
  }, [user.email]);

  // return null;
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Header navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.backgroundAvatarContainer}>
          <Image
            source={
              user.backgroundImagePath
                ? {uri: user.backgroundImagePath}
                : require('../assets/images/DefaultBackgroundAvatar.jpg')
            }
            style={styles.backgroundAvatarImage}
          />
        </View>
        <View
          style={{
            height: 100,
            width: screenWidth,
            flexDirection: 'row-reverse',
          }}>
          <View style={styles.avatarContainer}>
            <Image
              source={
                user.profileImagePath
                  ? {uri: user.profileImagePath}
                  : require('../assets/images/Spiderman.jpg')
              }
              style={styles.avatarImage}
            />
          </View>
        </View>
        <View>
          <Text style={styles.textName}>{user.name}</Text>
          <Text style={[styles.textName, {fontSize: 18, fontWeight: 'normal'}]}>
            Attended Multiverse of Madness
          </Text>
          <Text
            style={[
              styles.textName,
              {fontSize: 18, fontWeight: 'normal', marginTop: 10},
            ]}>
            {user.workingPlace}
          </Text>
          {/* Chỗ này nó k chỉnh font weight được nên t phải để cái này, sau này tự thêm font của mình vào r thì ms chỉnh font weight được */}
          <Text
            style={[
              styles.textName,
              {fontSize: 18, fontWeight: 'normal', color: '#000000a2'},
            ]}>
            {user.location}
          </Text>
          <Text
            style={[
              styles.textName,
              {
                fontSize: 18,
                fontWeight: 'normal',
                color: '#000000a2',
                marginTop: 10,
              },
            ]}>
            {`${user.connections?.length} connections`}
          </Text>
          <View
            style={{flexDirection: 'row', marginTop: 20, marginHorizontal: 15}}>
            <View
              style={{
                height: 35,
                width: 150,
                borderRadius: 30,
                overflow: 'hidden',
                backgroundColor:
                  nameTage1 === 'Add Friend'
                    ? '#0A66C2'
                    : nameTage1 === 'Unfriend'
                    ? Colors.red
                    : 'gray',
                alignItems: 'center',
              }}>
              <Pressable
                onPress={handleLeftButton}
                android_ripple={{color: '#00043d'}}
                style={{
                  backgroundColor: 'transparent',
                  width: 150,
                  height: 35,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{textAlign: 'center', fontSize: 18, color: 'white'}}>
                  {nameTage1}
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                height: 35,
                width: 150,
                borderRadius: 30,
                borderWidth: 1,
                borderColor: '#0A66C2',
                overflow: 'hidden',
                backgroundColor: 'white',
                marginHorizontal: 10,
              }}>
              <Pressable
                onPress={handleRightButton}
                android_ripple={{color: '#0d8fe0ff'}}
                style={{
                  backgroundColor: 'transparent',
                  width: 150,
                  height: 35,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{textAlign: 'center', fontSize: 18, color: '#0A66C2'}}>
                  {nameTage2}
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                height: 35,
                width: 35,
                borderRadius: 17.5,
                borderWidth: 1,
                borderColor: '#727272',
                overflow: 'hidden',
                backgroundColor: 'white',
                marginHorizontal: 10,
              }}>
              <Pressable
                onPress={() => {}}
                android_ripple={{color: '#0d8fe0ff'}}
                style={{
                  backgroundColor: 'transparent',
                  width: 35,
                  height: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  type={Icons.AntDesign}
                  name="message1"
                  size={20}
                  color="#727272"
                />
              </Pressable>
            </View>
          </View>
          <View
            style={{backgroundColor: '#E9E5DF', height: 10, marginTop: 10}}
          />
          <View>
            <ActivitySection navigation={navigation} userId={id} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundAvatarContainer: {
    height: 120,
    width: screenWidth,
  },
  backgroundAvatarImage: {
    height: 120,
    width: screenWidth,
    opacity: 0.75,
  },
  avatarContainer: {
    height: 140,
    width: 140,
    position: 'absolute',
    backgroundColor: '#ccc',
    bottom: 0,
    left: screenWidth - 155,
    borderRadius: 70,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'white',
  },
  avatarImage: {
    height: 130,
    width: 130,
    borderRadius: 65,
  },
  buttonAddImage: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonAddImageOuter: {
    position: 'absolute',
    bottom: 5,
    left: 100,
    backgroundColor: '#0A66C2',
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 5,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textName: {
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 25,
  },
  btnLogout: {
    backgroundColor: Colors.skyBlue,
    padding: 18,
    elevation: 3,
  },
  fontText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 19,
  },
});
