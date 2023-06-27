import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import Colors from '../../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {setShareShow} from '../../reducers/UtilsReducer';
import {RootState} from '../../reducers/Store';
import {setStatus} from '../../reducers/LoadingReducer';
import {createNewPost} from '../../api/statusPostApi';
import {Toast} from './Toast';

export default function SharePost() {
  const shareData = useSelector((state: RootState) => state.Utils.share);
  const user = useSelector((state: RootState) => state.userInfo);
  const token = useSelector((state: RootState) => state.token.key);
  const uid = useSelector((state: RootState) => state.uid.id);
  const dispatch = useDispatch();

  const [description, setDescription] = useState('');

  const toggleModal = () => {
    dispatch(setShareShow(!shareData.visible));
  };

  const sharePost = () => {
    toggleModal();
    dispatch(setStatus(true));
    const dataForm = new FormData();
    dataForm.append('description', description);
    dataForm.append('sharedLink', shareData.link);

    createNewPost(dataForm, uid, token)
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
        Toast('Shared!');
      })
      .catch(error => console.error(error));
  };

  return (
    <Modal
      onBackdropPress={() => dispatch(setShareShow(false))}
      onBackButtonPress={() => dispatch(setShareShow(false))}
      isVisible={shareData.visible}
      swipeDirection="down"
      onSwipeComplete={toggleModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.4}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={500}
      style={styles.modal}>
      <View style={styles.modalContent}>
        <View style={styles.barIcon} />
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Image
            source={
              user.profileImagePath
                ? {uri: user.profileImagePath}
                : require('../../assets/images/Spiderman.jpg')
            }
            style={styles.avatar}
          />
          <Text style={styles.textName}>{user.name}</Text>
        </View>

        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Write about this post..."
          style={styles.textInput}
          multiline={true}
        />
        <View style={styles.btnView}>
          <Pressable
            onPress={sharePost}
            style={styles.btnShare}
            android_ripple={{color: Colors.moodyBlue, borderless: true}}>
            <Text style={styles.textShare}>Share Now</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: 180,
    height: 'auto',
    paddingBottom: 20,
    elevation: 5,
  },

  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: '#bbb',
    borderRadius: 3,
    alignSelf: 'center',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  textName: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginLeft: 10,
    color: Colors.dark,
  },
  textInput: {
    color: 'black',
    fontSize: 19,
    padding: 10,
    maxHeight: 135,
  },
  btnView: {
    marginTop: 10,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    elevation: 25,
    borderRadius: 7,
  },
  btnShare: {
    backgroundColor: Colors.bluePrimary,
    padding: 10,
  },
  textShare: {
    color: 'white',
    fontWeight: '800',
  },
});
