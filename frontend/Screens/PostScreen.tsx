/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon, {Icons} from '../components/ui/Icons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../reducers/Store';
import {setPostShow} from '../reducers/UtilsReducer';
import Colors from '../constants/Colors';
import ImagePicker from 'react-native-image-crop-picker';
import {createNewPost} from '../api/statusPostApi';
import {Toast} from '../components/ui/Toast';
import {setStatus} from '../reducers/LoadingReducer';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';

interface ImageItem {
  uri: string;
  type: string;
  name: string;
}

function PostScreen() {
  const [mediaFiles, setMediaFiles] = useState<ImageItem[]>([]);

  const [description, setDescription] = useState('');

  const user = useSelector((state: RootState) => state.userInfo);
  const postVisible = useSelector((state: RootState) => state.Utils.postShow);
  const token = useSelector((state: RootState) => state.token.key);
  const uid = useSelector((state: RootState) => state.uid.id);

  const dispatch = useDispatch();

  const toggleModal = () => {
    dispatch(setPostShow(!postVisible));
  };

  const postStatus = () => {
    if (description === '' && mediaFiles.length === 0) {
      Toast('Please enter something');
      return;
    }
    dispatch(setStatus(true));
    createNewPost({mediaFiles, description}, uid, token)
      .then((response: any) => {
        if (response.status === 200) {
          console.log(response.data);
          return response.data;
        } else {
          console.log(response.response.status);
          throw new Error(response.response.data.errorMessage);
        }
      })
      .then((data: any) => {
        dispatch(setStatus(false));
      })
      .catch(error => console.error(error));
    toggleModal();
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      // height: 140,
      // width: 140,
      // cropperCircleOverlay: true,
    })
      .then((image: any) => {
        console.log(image);
        setMediaFiles([
          ...mediaFiles,
          {
            uri: image.path,
            type: image.mime,
            name: image.path.split('/').pop(),
          },
        ]);
      })
      .catch(error => Toast(error.message));
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      compressImageQuality: 0.8,
      maxFiles: 10,
      mediaType: 'photo',
    })
      .then(images => {
        console.log(images);
        const selectedImages = images.map(image => ({
          uri: image.path,
          type: image.mime,
          name: image.path.split('/').pop() || image.path,
        }));
        setMediaFiles([...mediaFiles, ...selectedImages]);
      })
      .catch(error => Toast(error.message));
  };

  const selectVideo = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    })
      .then((video: any) => {
        console.log(video);
        setMediaFiles([
          ...mediaFiles,
          {
            uri: video.path,
            type: video.mime,
            name: video.path.split('/').pop(),
          },
        ]);
      })
      .catch(error => Toast(error.message));
  };

  useEffect(() => {
    setDescription('');
    setMediaFiles([]);
  }, [postVisible]);

  // item
  const MedifafileView = ({item}: any) => {
    return (
      <View style={{flex: 1, borderWidth: 2}}>
        {/* <Image
          style={{
            height: 120,
            width: 160,
            borderRadius: 3,
            margin: 5,
          }}
          source={{uri: item.uri}}
        /> */}
        <View style={{height: 200, backgroundColor: 'gray', width: 300}}>
          <VideoPlayer
            controls={true}
            source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            backgroundColor: Colors.white,
            borderRadius: 50,
          }}>
          <TouchableOpacity
            onPress={() =>
              setMediaFiles(mediaFiles.filter(i => i.uri != item.uri))
            }>
            <Icon
              type={Icons.AntDesign}
              name="closecircle"
              color={Colors.darkOverlayColor}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Modal
      onBackdropPress={() => dispatch(setPostShow(false))}
      onBackButtonPress={() => dispatch(setPostShow(false))}
      isVisible={postVisible}
      style={{margin: 0}}>
      <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.modalContent}>
          <View style={{height: 70}} />
          <View style={{backgroundColor: 'white', flex: 1}}>
            <View
              style={{
                paddingHorizontal: 20,
                marginTop: 20,
                flex: 1,
              }}>
              <TextInput
                value={description}
                onChangeText={setDescription}
                style={{
                  color: 'black',
                  fontSize: 19,
                  paddingTop: 16,
                  flex: 1,
                  textAlignVertical: 'top',
                }}
                placeholder="What do you want to talk about?"
                multiline={true}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {mediaFiles.length > 0 && (
        <View style={{backgroundColor: Colors.white}}>
          <FlatList
            data={mediaFiles}
            renderItem={({item}) => <MedifafileView item={item} />}
            keyExtractor={(_, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
      <View style={{height: 65}} />

      <View style={styles.topView}>
        <View
          style={{
            margin: 20,
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={toggleModal} style={{marginTop: 3}}>
            <Icon type={Icons.AntDesign} name="close" />
          </TouchableOpacity>
          <Image
            source={
              user.profileImagePath === ''
                ? require('../assets/images/Spiderman.jpg')
                : {uri: user.profileImagePath}
            }
            style={{
              height: 40,
              width: 40,
              borderRadius: 35,
              marginHorizontal: 20,
            }}
          />
          <View
            style={{
              marginTop: 3,
              marginLeft: 'auto',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{marginTop: 5}}
              onPress={() => {
                console.log(mediaFiles);
              }}>
              <Icon type={Icons.Feather} name="clock" />
            </TouchableOpacity>
            <TouchableOpacity onPress={postStatus} style={{marginLeft: 20}}>
              <View
                style={{
                  backgroundColor: '#0085f1',
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  borderRadius: 15,
                }}>
                <Text
                  style={{fontSize: 16, color: 'white', fontWeight: 'bold'}}>
                  Post
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: Colors.white,
        }}>
        <View style={{flexDirection: 'row', padding: 20}}>
          <TouchableOpacity onPress={takePhotoFromCamera}>
            <Icon type={Icons.Entypo} name="camera" size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={selectVideo}>
            <Icon
              type={Icons.Ionicons}
              name="ios-videocam"
              size={25}
              style={{marginLeft: 20}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={choosePhotoFromLibrary}
            style={{marginLeft: 20}}>
            <Icon type={Icons.FontAwesome} name="photo" size={25} />
          </TouchableOpacity>
          <View style={{marginLeft: 'auto'}}>
            <TouchableOpacity style={{flexDirection: 'row'}}>
              <Icon type={Icons.Ionicons} name="chatbox-ellipses" size={25} />
              <Text style={{marginLeft: 10}}>Anyone</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
export default PostScreen;
const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: 'black',
    marginLeft: 30,
    fontWeight: 'bold',
  },
  bottomText: {
    color: 'white',
    fontSize: 18,
  },
  topView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    elevation: 5,
  },
});
