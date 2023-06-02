import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Icon, {Icons} from '../components/ui/Icons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../reducers/Store';
import Colors from '../constants/Colors';
import {Toast} from '../components/ui/Toast';
import {updateStatusPostApi} from '../api/statusPostApi';
import {updateAStatusPost} from '../reducers/StatusPostReducer';

export default function EditPostScreen({navigation, route}: any) {
  const {item} = route.params;
  const [description, setDescription] = useState(item.description);
  const user = useSelector((state: RootState) => state.userInfo);

  const uid = useSelector((state: RootState) => state.uid.id);
  const jwt = useSelector((state: RootState) => state.token.key);

  const [isFocused, setIsFocused] = useState(false);
  const descriptionRef = useRef<TextInput>(null);
  const dispatch = useDispatch();

  const navigateBack = () => {
    navigation.goBack();
  };

  const handleKeyboardDismiss = () => {
    setIsFocused(false);
    descriptionRef.current?.blur();
  };

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardDismiss,
    );
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const updateStatus = async () => {
    try {
      const response: any = await updateStatusPostApi(
        {description: description},
        uid,
        jwt,
        item._id,
      );

      console.log(response);
      if (response.status === 200) {
        Toast('Update successfully');
        dispatch(updateAStatusPost({...item, description}));
      } else {
        console.log(response.status);
        throw new Error(response.data.errorMessage);
      }
    } catch (error: any) {
      Toast(error.message);
    }
    navigateBack();
  };

  return (
    <View style={{flex: 1}}>
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
                ref={descriptionRef}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
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

      {item.mediaFiles.length && !isFocused ? (
        <View
          style={{
            height: 200,
            width: '100%',
            flexDirection: 'row',
            opacity: 0.8,
          }}>
          <Image
            source={{uri: item.mediaFiles[0]}}
            style={{flex: 1, marginHorizontal: 0.75}}
          />
          {item.mediaFiles.length > 1 ? (
            <View
              style={{
                flex: 1,
                marginHorizontal: 0.75,
                flexDirection: 'column',
              }}>
              <Image source={{uri: item.mediaFiles[1]}} style={{flex: 1}} />
              {item.mediaFiles.length > 2 ? (
                <View style={{flex: 1, marginVertical: 1.5}}>
                  <Image source={{uri: item.mediaFiles[2]}} style={{flex: 1}} />
                  {item.mediaFiles.length > 3 ? (
                    <Text style={styles.textImageMore}>
                      +{item.mediaFiles.length - 3}
                    </Text>
                  ) : null}
                </View>
              ) : null}
            </View>
          ) : null}
          <View
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              top: 0,
              left: 0,
              backgroundColor: Colors.gray,
            }}
          />
        </View>
      ) : null}

      <View style={{height: 10}} />
      <View style={styles.topView}>
        <View
          style={{
            margin: 20,
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={navigateBack} style={{marginTop: 3}}>
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
            <TouchableOpacity style={{marginTop: 5}} onPress={() => {}}>
              <Icon type={Icons.Feather} name="clock" />
            </TouchableOpacity>
            <TouchableOpacity onPress={updateStatus} style={{marginLeft: 20}}>
              <View
                style={{
                  backgroundColor: '#0085f1',
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  borderRadius: 15,
                }}>
                <Text
                  style={{fontSize: 16, color: 'white', fontWeight: 'bold'}}>
                  Save
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

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
  textImageMore: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    marginTop: 1.5,
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
