/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {CheckBox} from '@rneui/themed';
import Icon, {Icons} from '../components/ui/Icons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../reducers/Store';
import {updateUser} from '../api/userApi';
import {saveUser} from '../reducers/UserReducer';
import {Toast} from '../components/ui/Toast';
function EditProfileScreen(props: any) {
  const [checked, setChecked] = useState(true);
  const toggleCheckbox = () => setChecked(!checked);
  const user = useSelector((state: RootState) => state.userInfo);
  const uid = useSelector((state: RootState) => state.uid.id);
  const token = useSelector((state: RootState) => state.token.key);

  const dispatch = useDispatch();

  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [headline, setHeadline] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hometown, setHometown] = useState('');
  const [workingPlace, setWorkingPlace] = useState('');

  const toggleModal = () => {
    props.setVisible(!props.isVisible);
  };

  const SaveIntro = () => {
    const data = {
      ...user,
      name: fullName,
      location: location,
      phoneNumber: phoneNumber,
      hometown: hometown,
      workingPlace: workingPlace,
      headline: headline,
      company: {
        logoUrl:
          'https://static.vecteezy.com/system/resources/previews/010/353/285/original/colourful-google-logo-on-white-background-free-vector.jpg',
        name: 'Google',
        linkToWebsite: 'google.com',
      },
    };
    updateUser(data, uid, token)
      .then((response: any) => {
        if (response.status === 200) {
          console.log(response.data);
          dispatch(saveUser(response.data));
          toggleModal();
        } else {
          console.log(response.status);
          throw new Error(response.data.errorMessage);
        }
      })
      .catch(error => {
        Toast(error.message);
      });
  };

  useEffect(() => {
    setFullName(user.name);
    setLocation(user.location);
    setPhoneNumber(user.phoneNumber);
    setHometown(user.hometown);
    setWorkingPlace(user.workingPlace);
    setHeadline(user.headline);
  }, []);

  return (
    <Modal
      onBackdropPress={() => props.setVisible(false)}
      onBackButtonPress={() => props.setVisible(false)}
      isVisible={props.isVisible}
      style={{margin: 0}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.modalContent}>
          <View style={{height: 70}} />
          <View style={{marginLeft: 10}}>
            <Text>* Indicates required</Text>
          </View>
          <View style={{marginHorizontal: 10}}>
            <Text style={{marginTop: 30, color: 'black', fontSize: 16}}>
              Full name*
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'black',
                color: 'black',
                fontSize: 16,
              }}
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={text => setFullName(text)}
            />
          </View>

          <View style={{marginHorizontal: 10}}>
            <Text style={{marginTop: 30, color: 'black', fontSize: 16}}>
              Headline*
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'black',
                color: 'black',
                fontSize: 16,
              }}
              placeholder="Enter your headline"
              value={headline}
              onChangeText={text => setHeadline(text)}
            />
          </View>

          <View style={{marginHorizontal: 10}}>
            <Text style={{marginTop: 30, color: 'black', fontSize: 16}}>
              Phone number*
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'black',
                color: 'black',
                fontSize: 16,
              }}
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChangeText={text => setPhoneNumber(text)}
            />
          </View>

          <View style={{marginHorizontal: 10}}>
            <Text
              style={{
                marginTop: 30,
                color: 'black',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Education
            </Text>
          </View>
          <View style={{marginHorizontal: 10}}>
            <Text style={{marginTop: 30, color: 'black', fontSize: 16}}>
              Education*
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'black',
                color: 'black',
                fontSize: 16,
              }}
              placeholder="Enter your education"
              value={workingPlace}
              onChangeText={text => setWorkingPlace(text)}
            />
          </View>

          <View style={{marginHorizontal: 10}}>
            <Text
              style={{
                marginTop: 10,
                color: 'black',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Location
            </Text>
          </View>
          <View style={{marginHorizontal: 10}}>
            <Text style={{marginTop: 30, color: 'black', fontSize: 16}}>
              Country/Region*
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'black',
                color: 'black',
                fontSize: 16,
              }}
              placeholder="Enter your country/region"
              value={location}
              onChangeText={text => setLocation(text)}
            />
          </View>
          <View style={{marginHorizontal: 10}}>
            <Text style={{marginTop: 30, color: 'black', fontSize: 16}}>
              Home Town*
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'black',
                color: 'black',
                fontSize: 16,
              }}
              placeholder="Enter your home town"
              value={hometown}
              onChangeText={text => setHometown(text)}
            />
          </View>

          <View style={{height: 100}} />
        </View>
      </ScrollView>
      <View style={styles.bottomView}>
        <TouchableOpacity onPress={SaveIntro}>
          <View
            style={{
              borderRadius: 30,
              backgroundColor: '#1664b1',
              paddingHorizontal: 150,
              paddingVertical: 6,
              elevation: 5,
            }}>
            <Text style={styles.bottomText}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.topView}>
        <View style={{margin: 20, flexDirection: 'row'}}>
          <TouchableOpacity onPress={toggleModal} style={{marginTop: 3}}>
            <Icon type={Icons.AntDesign} name="close" />
          </TouchableOpacity>
          <Text style={styles.title}>Edit intro</Text>
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
  },
});
