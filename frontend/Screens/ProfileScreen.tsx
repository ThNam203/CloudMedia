/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ActivitySection from '../components/ui/ActivitySection';
import UploadPhoto from '../components/ui/UploadPhoto';

import EditProfileScreen from './EditProfileScreen';

import {useSelector} from 'react-redux';
import {RootState} from '../reducers/Store';
import {user_logout} from '../api/user_api';
import {nameStorage, storeData} from '../reducers/AsyncStorage';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
function ProfileScreen({navigation}: any) {
  const [imgAvatar, setImgAvatar] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const [editProfile, setEditProfile] = useState(false);

  const user = useSelector((state: RootState) => state.userInfo);
  const token = useSelector((state: RootState) => state.token.key);

  useEffect(() => {
    console.log(user);
  }, []);

  const handleLogout = async () => {
    user_logout(token)
      .then((response: any) => {
        if (response.status === 204) {
          console.log(response);
          storeData(false, nameStorage.isLogin)
            .then(() => {
              navigation.navigate('login');
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          throw new Error('Logout failed.');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <UploadPhoto
          isVisible={isModalVisible}
          setVisible={setModalVisible}
          setPhoto={setImgAvatar}
        />
        <EditProfileScreen
          isVisible={editProfile}
          setVisible={setEditProfile}
        />
        <View style={styles.backgroundAvatarContainer}>
          <Image
            source={require('../assets/images/DefaultBackgroundAvatar.jpg')}
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
                imgAvatar === ''
                  ? require('../assets/images/Spiderman.jpg')
                  : {uri: imgAvatar}
              }
              style={styles.avatarImage}
            />
            <View style={styles.buttonAddImageOuter}>
              <TouchableOpacity
                style={styles.buttonAddImage}
                onPress={() => setModalVisible(!isModalVisible)}>
                <Image
                  source={require('../assets/images/Add.png')}
                  style={{width: 25, height: 25, marginTop: 3}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-start',
              margin: 10,
            }}
            onPress={() => setEditProfile(!editProfile)}>
            <Image
              style={{height: 28, width: 28}}
              source={require('../assets/images/la_pen.png')}
            />
          </TouchableOpacity>
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
            Academy of Heros (AOF)
          </Text>
          {/* Chỗ này nó k chỉnh font weight được nên t phải để cái này, sau này tự thêm font của mình vào r thì ms chỉnh font weight được */}
          <Text
            style={[
              styles.textName,
              {fontSize: 18, fontWeight: 'normal', color: '#000000a2'},
            ]}>
            Da Nang, Viet Nam
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
            0 connections
          </Text>
          <View
            style={{flexDirection: 'row', marginTop: 20, marginHorizontal: 15}}>
            <View
              style={{
                height: 35,
                width: 150,
                borderRadius: 30,
                overflow: 'hidden',
                backgroundColor: '#0A66C2',
                alignItems: 'center',
              }}>
              <Pressable
                android_ripple={{color: '#00043d'}}
                style={{
                  backgroundColor: 'transparent',
                  width: 150,
                  height: 35,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{textAlign: 'center', fontSize: 18, color: 'white'}}>
                  Open to
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
                android_ripple={{color: '#0d8fe0ff'}}
                style={{
                  backgroundColor: 'transparent',
                  width: 150,
                  height: 35,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{textAlign: 'center', fontSize: 18, color: '#0A66C2'}}>
                  Add section
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
                onPress={handleLogout}
                android_ripple={{color: '#0d8fe0ff'}}
                style={{
                  backgroundColor: 'transparent',
                  width: 35,
                  height: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/images/3Dot.png')}
                  style={{width: 25, height: 25}}
                />
              </Pressable>
            </View>
          </View>
          <View
            style={{backgroundColor: '#E9E5DF', height: 10, marginTop: 10}}
          />
          <View>
            <ActivitySection />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundAvatarContainer: {
    height: 90,
    width: screenWidth,
  },
  backgroundAvatarImage: {
    height: 90,
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
});
