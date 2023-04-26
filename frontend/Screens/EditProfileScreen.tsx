/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {CheckBox} from '@rneui/themed';
import Icon, {Icons} from '../components/ui/Icons';
function EditProfileScreen(props: any) {
  const toggleModal = () => {
    props.setVisible(!props.isVisible);
  };
  const [checked, setChecked] = useState(true);
  const toggleCheckbox = () => setChecked(!checked);
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
              First name*
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'black',
                color: 'black',
                fontSize: 16,
              }}
              placeholder="Enter your first name"
            />
          </View>
          <View style={{marginHorizontal: 10}}>
            <Text style={{marginTop: 30, color: 'black', fontSize: 16}}>
              Last name*
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'black',
                color: 'black',
                fontSize: 16,
              }}
              placeholder="Enter your last name"
            />
          </View>
          <View style={{marginHorizontal: 10}}>
            <Text style={{marginTop: 30, color: 'black', fontSize: 16}}>
              Additional name
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'black',
                color: 'black',
                fontSize: 16,
              }}
              placeholder="Enter your additional name"
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
            />
          </View>
          <TouchableOpacity>
            <View
              style={{
                marginHorizontal: 10,
                marginTop: 30,
                flexDirection: 'row',
              }}>
              <Icon type={Icons.Entypo} name="plus" color="#1664b1" />
              <Text
                style={{fontSize: 16, color: '#1664b1', fontWeight: 'bold'}}>
                Add new position
              </Text>
            </View>
          </TouchableOpacity>
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
            />
          </View>
          <TouchableOpacity>
            <View
              style={{
                marginHorizontal: 10,
                marginTop: 30,
                flexDirection: 'row',
              }}>
              <Icon type={Icons.Entypo} name="plus" color="#1664b1" />
              <Text
                style={{fontSize: 16, color: '#1664b1', fontWeight: 'bold'}}>
                Add new education
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
            }}>
            <CheckBox
              checked={checked}
              onPress={toggleCheckbox}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="#0f6f3e"
            />
            <Text style={{marginTop: 18}}>Show education in my intro</Text>
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
            />
          </View>
          <TouchableOpacity>
            <View
              style={{
                marginHorizontal: 10,
                marginTop: 30,
              }}>
              <Text
                style={{fontSize: 16, color: '#1664b1', fontWeight: 'bold'}}>
                Use current location
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{marginHorizontal: 10}}>
            <Text style={{marginTop: 30, color: 'black', fontSize: 16}}>
              City
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'black',
                color: 'black',
                fontSize: 16,
              }}
              placeholder="Enter your city"
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
              Contact info
            </Text>
          </View>
          <View style={{marginHorizontal: 10}}>
            <Text style={{marginTop: 10, color: 'black', fontSize: 16}}>
              Add or edit your profile URL, email, and more
            </Text>
          </View>
          <TouchableOpacity>
            <View
              style={{
                marginHorizontal: 10,
                marginTop: 30,
              }}>
              <Text
                style={{fontSize: 16, color: '#1664b1', fontWeight: 'bold'}}>
                Edit contact info
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{height: 100}} />
        </View>
      </ScrollView>
      <View style={styles.bottomView}>
        <TouchableOpacity onPress={toggleModal}>
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
