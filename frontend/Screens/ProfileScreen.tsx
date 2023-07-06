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
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../reducers/Store';
import {postAvatarImg, postBackgrImg, userLogout} from '../api/userApi';
import {nameStorage, storeData} from '../reducers/AsyncStorage';
import {setStatus} from '../reducers/LoadingReducer';
import {updateAvatar, updateBackground} from '../reducers/UserReducer';
import Colors from '../constants/Colors';
import {Toast} from '../components/ui/Toast';
import {clearStatusPostsSub} from '../reducers/StatusPostReducer';
import Icon, {Icons} from '../components/ui/Icons';
import {clearStorySub, pushStorySub} from '../reducers/StoryReducer';
import {getAllStory} from '../api/storyApi';
import {useIsFocused} from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

function ProfileScreen({navigation}: any) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModelBackGrVisible, setIsModelBackGrVisible] = useState(false);

  const [editProfile, setEditProfile] = useState(false);

  const user = useSelector((state: RootState) => state.userInfo);
  const token = useSelector((state: RootState) => state.token.key);
  const uid = useSelector((state: RootState) => state.uid.id);

  const dispatch = useDispatch();
  const [followCount, setFollowCount] = useState(user.followers.length);
  const isFocused = useIsFocused();

  const handleLogout = async () => {
    userLogout(token)
      .then((response: any) => {
        if (response.status === 204) {
          console.log(response);
          storeData(false, nameStorage.isLogin)
            .then(() => {
              navigation.reset({
                index: 0,
                routes: [{name: 'login'}],
              });
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          throw new Error('Logout failed.');
        }
      })
      .catch(error => {
        Toast(error.message);
      });
  };

  const postImage = (image: any) => {
    const dataForm = new FormData();
    dataForm.append('profile-image', {
      uri: image.path,
      type: image.mime,
      name: image.filename || 'profile-image',
    });
    dispatch(setStatus(true));
    postAvatarImg(dataForm, uid, token)
      .then((response: any) => {
        if (response.status === 200) {
          console.log(response.data);
          return response.data;
        } else {
          console.log(response.status);
          throw new Error(response.data.errorMessage);
        }
      })
      .then((data: any) => {
        dispatch(updateAvatar(data.imagePath));
      })
      .catch(error => Toast(error.message))
      .finally(() => {
        dispatch(setStatus(false));
      });
  };

  const postBackgroundImage = (image: any) => {
    const dataForm = new FormData();
    dataForm.append('background-image', {
      uri: image.path,
      type: image.mime,
      name: image.filename || 'profile-image',
    });
    dispatch(setStatus(true));
    postBackgrImg(dataForm, uid, token)
      .then((response: any) => {
        if (response.status === 200) {
          console.log(response.data);
          return response.data;
        } else {
          console.log(response.status);
          throw new Error(response.data.errorMessage);
        }
      })
      .then((data: any) => {
        dispatch(updateBackground(data.backgroundImagePath));
      })
      .catch(error => Toast(error.message))
      .finally(() => {
        dispatch(setStatus(false));
      });
  };

  useEffect(() => {
    const getStory = async () => {
      const response: any = await getAllStory(uid, token);
      if (response.status === 200) {
        const data = response.data;
        for (const story of data) {
          dispatch(pushStorySub(story));
        }
      } else {
        console.log(response.status);
      }
    };
    if (isFocused) {
      dispatch(clearStorySub());
      getStory();
    }
  }, [isFocused]);

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <UploadPhoto
          isVisible={isModalVisible}
          setVisible={setModalVisible}
          height={140}
          width={140}
          isCirle={true}
          postImage={postImage}
        />
        <UploadPhoto
          isVisible={isModelBackGrVisible}
          setVisible={setIsModelBackGrVisible}
          height={120}
          width={screenWidth}
          isCirle={false}
          postImage={postBackgroundImage}
        />
        <EditProfileScreen
          isVisible={editProfile}
          setVisible={setEditProfile}
        />
        <View style={styles.backgroundAvatarContainer}>
          <Image
            source={
              user.backgroundImagePath
                ? {uri: user.backgroundImagePath}
                : require('../assets/images/DefaultBackgroundAvatar.jpg')
            }
            style={styles.backgroundAvatarImage}
          />
          <View style={{position: 'absolute', top: 10, right: 5}}>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.white,
                borderRadius: 50,
                padding: 5,
                elevation: 5,
              }}
              onPress={() => {
                setIsModelBackGrVisible(!isModelBackGrVisible);
              }}>
              <Icon
                name="camera"
                type={Icons.Entypo}
                style={{width: 25, height: 25}}
              />
            </TouchableOpacity>
          </View>
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
            {user.headline}
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
            {`${user.connections.length} connections`}
          </Text>

          <View
            style={{backgroundColor: '#E9E5DF', height: 5, marginTop: 10}}
          />
          <View>
            <ActivitySection
              navigation={navigation}
              userId={uid}
              followCount={followCount}
            />
          </View>
        </View>
        <View
          style={{
            overflow: 'hidden',
            borderRadius: 15,
            width: 300,
            alignSelf: 'center',
            marginBottom: 10,
          }}>
          <Pressable
            onPress={handleLogout}
            style={styles.btnLogout}
            android_ripple={{color: '#613FC2', borderless: false}}>
            <Text
              style={[
                styles.fontText,
                {
                  fontWeight: '700',
                  lineHeight: 20,
                  alignSelf: 'center',
                  color: '#ffffff',
                },
              ]}>
              Log out
            </Text>
          </Pressable>
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
