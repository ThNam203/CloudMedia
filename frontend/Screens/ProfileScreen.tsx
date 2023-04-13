/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
function ProfileScreen() {
  const [imgAvatar, setImgAvatar] = useState('');

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      height: 140,
      width: 140,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setImgAvatar(image.path);
      })
      .catch(err => console.log(err));
  };
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      height: 140,
      width: 140,
      cropping: true,
      cropperCircleOverlay: true,
    })
      .then(image => {
        console.log(image);
        setImgAvatar(image.path);
      })
      .catch(err => console.log(err));
  };
  return (
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
              imgAvatar === ''
                ? require('../assets/images/Spiderman.jpg')
                : {uri: imgAvatar}
            }
            style={styles.avatarImage}
          />
          <View style={styles.buttonAddImageOuter}>
            <TouchableOpacity
              style={styles.buttonAddImage}
              onPress={choosePhotoFromLibrary}>
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
          }}>
          <Image
            style={{height: 28, width: 28}}
            source={require('../assets/images/la_pen.png')}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.textName}>Spider man</Text>
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
              <Text style={{textAlign: 'center', fontSize: 18, color: 'white'}}>
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
        <View style={{backgroundColor: '#E9E5DF', height: 10, marginTop: 10}} />
      </View>
    </View>
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
