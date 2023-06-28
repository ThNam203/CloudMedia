import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Icon, {Icons} from '../../components/ui/Icons';

function CallScreen(props: any) {
  const toggleModal = () => {
    props.setVisible(!props.isVisible);
  };
  const [iconVideo, setIconVideo] = useState('video');
  const [iconMic, setIconMic] = useState('microphone');

  const toggleIconVideo = () => {
    const newIconName = iconVideo === 'video' ? 'video-slash' : 'video';
    setIconVideo(newIconName);
  };
  const toggleIconMic = () => {
    const newIconMic =
      iconMic === 'microphone' ? 'microphone-slash' : 'microphone';
    setIconMic(newIconMic);
  };
  return (
    <Modal
      onBackdropPress={() => props.setVisible(false)}
      onBackButtonPress={() => props.setVisible(false)}
      style={{margin: 0}}
      isVisible={props.isVisible}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.topView}>
          <View style={{marginHorizontal: 10}}>
            <TouchableOpacity onPress={toggleModal}>
              <Icon name="arrowleft" color="black" type={Icons.AntDesign} />
            </TouchableOpacity>
          </View>
          <Text style={styles.textTopView}>Son truong</Text>
        </View>
        <View style={styles.middleView}>
          <Image
            style={{width: 100, height: 100, borderRadius: 50, marginTop: 200}}
            source={require('../../assets/images/Spiderman.jpg')}
          />
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginTop: 20,
              color: 'black',
            }}>
            Son truong
          </Text>
          <Text style={{fontSize: 18, marginTop: 10, color: 'black'}}>
            Is calling...
          </Text>
        </View>
        <View style={styles.bottomView}>
          <View style={{flex: 1}}>
            <View style={{marginHorizontal: 30}}>
              <TouchableOpacity onPress={toggleIconVideo}>
                <Icon
                  name={iconVideo}
                  color="white"
                  type={Icons.FontAwesome5}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}>
            <View>
              <TouchableOpacity onPress={toggleIconMic}>
                <Icon name={iconMic} color="white" type={Icons.FontAwesome} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={{
                marginHorizontal: 30,
                height: 46,
                width: 46,
                borderRadius: 23,
                backgroundColor: '#FF3B32',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={toggleModal}>
              <View>
                <Icon
                  name="phone-hangup"
                  color="white"
                  type={Icons.MaterialCommunityIcons}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
export default CallScreen;
const styles = StyleSheet.create({
  topView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    height: 100,
    flexDirection: 'row',
    margin: 10,
  },
  textTopView: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  middleView: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },
  bottomView: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: '#565253',
    height: 70,
    flexDirection: 'row',
    borderRadius: 50,
    marginHorizontal: 40,
    alignItems: 'center',
  },
});
