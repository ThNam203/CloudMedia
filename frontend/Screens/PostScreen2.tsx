/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import {CheckBox} from '@rneui/themed';
import Icon, {Icons} from '../components/ui/Icons';
import ChoosePostTemplate from '../components/ui/ChoosePostTemplate';
import UploadPhoto from '../components/ui/UploadPhoto';
function EditProfileScreen(props: any) {
  const toggleModal = () => {
    props.setVisible(!props.isVisible);
  };

  const [choosePostTemplate, setChoosePostTemplate] = useState(true);
  return (
    <Modal
      onBackdropPress={() => props.setVisible(false)}
      onBackButtonPress={() => props.setVisible(false)}
      isVisible={props.isVisible}
      style={{margin: 0}}>
      <View style={styles.modalContent}>
        <View style={{height: 70}} />
        <View style={{backgroundColor: 'white', flex: 1}}>
          <View
            style={{
              paddingHorizontal: 20,
              marginTop: 20,
              height: 250,
              flex: 1,
            }}>
            <Image
              source={require('../assets/images/Spiderman.jpg')}
              style={{height: 70, width: 70, borderRadius: 35}}
            />
            <TextInput
              style={{color: 'black', fontSize: 19, paddingTop: 16}}
              placeholder="What do you want to talk about?"
            />
          </View>
          <View style={{flexDirection: 'row', padding: 20}}>
            <TouchableOpacity>
              <Icon type={Icons.Entypo} name="camera" size={25} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                type={Icons.Ionicons}
                name="ios-videocam"
                size={25}
                style={{marginLeft: 20}}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft: 20}}>
              <Icon type={Icons.FontAwesome} name="photo" size={25} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginLeft: 20}}
              onPress={() => setChoosePostTemplate(!choosePostTemplate)}>
              <Icon
                type={Icons.Entypo}
                name="dots-three-horizontal"
                size={25}
              />
            </TouchableOpacity>
            <View style={{marginLeft: 'auto'}}>
              <TouchableOpacity style={{flexDirection: 'row'}}>
                <Icon type={Icons.Ionicons} name="chatbox-ellipses" size={25} />
                <Text style={{marginLeft: 10}}>Anyone</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ChoosePostTemplate
            isVisible={choosePostTemplate}
            setVisible={setChoosePostTemplate}
          />
        </View>
      </View>

      <View style={styles.topView}>
        <View
          style={{
            margin: 20,
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={toggleModal} style={{marginTop: 3}}>
            <Icon type={Icons.AntDesign} name="close" />
          </TouchableOpacity>
          <View
            style={{
              marginTop: 3,
              marginLeft: 'auto',
              flexDirection: 'row',
            }}>
            <TouchableOpacity style={{marginTop: 5}}>
              <Icon type={Icons.Feather} name="clock" />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal} style={{marginLeft: 20}}>
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
    </Modal>
  );
}
export default EditProfileScreen;
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
  bottomView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    backgroundColor: 'white',
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