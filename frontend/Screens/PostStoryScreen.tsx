import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Toast} from '../components/ui/Toast';
import ImagePicker from 'react-native-image-crop-picker';
import {createThumbnail} from 'react-native-create-thumbnail';
import Icon, {Icons} from '../components/ui/Icons';
import VideoPlayer from 'react-native-video';
import Colors from '../constants/Colors';
import {createStory} from '../api/storyApi';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../reducers/Store';
import {setStatus} from '../reducers/LoadingReducer';

interface MediaItem {
  uri: string;
  type: string;
  name: string;
}

export default function PostStoryScreen({navigation}: any) {
  const screenWidth = Dimensions.get('window').width;
  const [mediaFiles, setMediaFiles] = useState<MediaItem>();
  const token = useSelector((state: RootState) => state.token.key);
  const uid = useSelector((state: RootState) => state.uid.id);

  const dispatch = useDispatch();

  const navigateBack = () => {
    navigation.goBack();
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      waitAnimationEnd: false,
      compressImageQuality: 0.8,
      maxFiles: 10,
    })
      .then(images => {
        const selectedMedia = {
          uri: images.path,
          type: images.mime,
          name: images.path.split('/').pop() || images.path,
        };
        console.log(selectedMedia);
        setMediaFiles(selectedMedia);
        // image/jpeg
        // video/mp4
      })
      .catch(error => {
        navigateBack();
        Toast(error.message);
      });
  };

  useEffect(() => {
    choosePhotoFromLibrary();
  }, []);

  const handleClose = () => {
    Alert.alert('Discard photo?', 'You can select another media to post', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Discard', onPress: navigateBack},
    ]);
  };

  const shareStory = async () => {
    navigateBack();
    dispatch(setStatus(true));
    const data = new FormData();
    data.append('media-files', mediaFiles);
    if (mediaFiles?.type === 'video/mp4') {
      const thumbnail = await createThumbnail({
        url: mediaFiles.uri,
        timeStamp: 1000,
      });
      data.append('media-files', {
        uri: thumbnail.path,
        type: thumbnail.mime,
        name: thumbnail.path.split('/').pop() || thumbnail.path,
      });
    } else {
      data.append('media-files', mediaFiles);
    }
    createStory(data, uid, token)
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
        Toast('Post successfully!');
      })
      .catch((error: any) => Toast(error.message))
      .finally(() => dispatch(setStatus(false)));
  };

  const renderImage = (image: any) => {
    return (
      <Image
        style={{
          flex: 1,
          width: '100%',
          marginVertical: 10,
          overflow: 'hidden',
        }}
        source={{uri: image.uri}}
        resizeMode="contain"
      />
    );
  };

  const renderVideo = (video: any) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'gray',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <VideoPlayer
          source={{uri: video.uri}}
          style={{flex: 1, width: '100%'}}
          resizeMode="contain"
        />
      </View>
    );
  };

  if (mediaFiles) {
    return (
      <View style={styles.container}>
        {mediaFiles?.type === 'video/mp4'
          ? renderVideo(mediaFiles)
          : renderImage(mediaFiles)}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose}>
            <Icon
              type={Icons.AntDesign}
              name="close"
              color={Colors.white}
              size={30}
              borderColor={Colors.black}
              borderWidth={1}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={choosePhotoFromLibrary}>
            <Icon
              type={Icons.MaterialIcons}
              name="perm-media"
              color={Colors.white}
              size={30}
              borderColor={Colors.black}
              borderWidth={1}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btn} onPress={shareStory}>
          <Text style={{color: Colors.white}}>Share</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    paddingHorizontal: 10,
  },
  btn: {
    position: 'absolute',
    backgroundColor: Colors.bluePrimary,
    borderRadius: 5,
    padding: 10,
    bottom: 20,
    right: 20,
  },
});
