import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../constants/Colors';
import {useDispatch} from 'react-redux';
import ActivitySection from '../components/ui/ActivitySection';
import {getInfoUser} from '../api/userApi';
import {Toast} from '../components/ui/Toast';

const screenWidth = Dimensions.get('window').width;

export default function ProfileOfUserScreen(props: any) {
  const {navigation, route} = props;
  const {id} = route.params;

  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response: any = await getInfoUser(id);
        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.log(response.status);
          throw new Error(response.data.errorMessage);
        }
      } catch (error: any) {
        Toast(error.message);
      }
    };
    getUserInfo();
  }, []);
  // return null;
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
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
                onPress={() => {
                  navigation.goBack();
                }}
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
                onPress={() => {}}
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
