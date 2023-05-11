import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {TextInput} from 'react-native-gesture-handler';
import Icon, {Icons} from './Icons';
import Colors from '../../constants/Colors';
import ItemRequestUser from './ItemRequestUser';
import AppLoader from './AppLoader';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers/Store';
import {createRequestByEmail} from '../../api/friend_api';
import {user_info_email} from '../../api/user_api';

export default function AddFriendEmail(props: any) {
  const [infoEmail, setInfoEmail] = useState({
    id: '1',
    name: '',
    avatar: require('../../assets/images/Spiderman.jpg'),
  });
  const [isloading, setIsloading] = useState(false);

  const [email, setEmail] = useState('');
  const [nameHandle, setNameHandle] = useState('Add friend');

  const token = useSelector((state: RootState) => state.token.key);
  const uid = useSelector((state: RootState) => state.uid.id);

  const toggleModal = () => {
    props.setVisible(!props.isVisible);
  };

  const handleFindEmail = async () => {
    setIsloading(true);
    user_info_email(email, token)
      .then((response: any) => {
        if (response.status === 200) {
          return response.data;
        } else {
          console.log(response.response.status);
          throw new Error(response.response.data.errorMessage);
        }
      })
      .then(data => {
        console.log(data);
        if (data.profileImagePath !== undefined) {
          setInfoEmail({
            ...infoEmail,
            name: data.name,
            avatar: {uri: data.profileImagePath},
          });
        } else {
          setInfoEmail({
            ...infoEmail,
            name: data.name,
          });
          setNameHandle('Add friend');
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  const handleAddFr = async () => {
    setIsloading(true);
    createRequestByEmail(email, uid, token)
      .then((response: any) => {
        if (response.status === 200) {
          return response.data;
        } else {
          console.log(response.response.status);
          throw new Error(response.response.data.errorMessage);
        }
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setIsloading(false);
        setNameHandle('Sent');
      });
  };

  return (
    <Modal
      onBackdropPress={() => props.setVisible(false)}
      onBackButtonPress={() => props.setVisible(false)}
      isVisible={props.isVisible}
      swipeDirection="down"
      onSwipeComplete={toggleModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.4}
      animationInTiming={900}
      animationOutTiming={500}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={500}
      style={styles.modal}>
      {isloading ? <AppLoader /> : null}
      <View style={styles.modalContent}>
        <View style={styles.headerSearch}>
          <TextInput
            style={styles.txtInput}
            placeholder="Enter email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TouchableOpacity onPress={handleFindEmail}>
            <Icon
              style={styles.ic}
              type={Icons.MaterialCommunityIcons}
              name={'send'}
              color={Colors.irisBlue}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          {infoEmail.name && (
            <ItemRequestUser
              item={infoEmail}
              nameRequest={nameHandle}
              pressLeft={handleAddFr}
              pressRight={toggleModal}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingHorizontal: 12,
    borderRadius: 15,
    height: 250,
    paddingBottom: 20,
    elevation: 5,
    width: '100%',
  },
  headerSearch: {
    borderBottomWidth: 1,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  txtInput: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.skyBlue,
    borderRadius: 10,
    fontSize: 23,
  },
  ic: {
    padding: 10,
  },
});
