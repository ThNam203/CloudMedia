/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon, {Icons} from '../components/ui/Icons';
import ChoosePostTemplate from '../components/ui/ChoosePostTemplate';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../reducers/Store';
import {setPostShow} from '../reducers/Post_reducer';
function PostScreen() {
  const postVisible = useSelector((state: RootState) => state.post.show);

  const dispatch = useDispatch();

  const toggleModal = () => {
    dispatch(setPostShow(!postVisible));
  };

  const [choosePostTemplate, setChoosePostTemplate] = useState(false);
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
                height: 250,
                flex: 1,
              }}>
              <TextInput
                style={{color: 'black', fontSize: 19, paddingTop: 16}}
                placeholder="What do you want to talk about?"
                multiline={true}
              />
            </View>
          </View>
          <View style={{height: 130}} />
        </View>
      </ScrollView>

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
            source={require('../assets/images/Spiderman.jpg')}
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

      <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
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
            <Icon type={Icons.Entypo} name="dots-three-horizontal" size={25} />
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
