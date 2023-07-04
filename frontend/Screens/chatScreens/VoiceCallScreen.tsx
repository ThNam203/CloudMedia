import React, {useEffect, useRef, useState} from 'react';
import Svg, {Path} from 'react-native-svg';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Icon, {Icons} from '../../components/ui/Icons';
import {
  MediaStream,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
  RTCView,
  mediaDevices,
} from 'react-native-webrtc';

function VoiceCallScreen(props: any) {


  return isCaller === true || acceptedCall ? (
    <Modal
      onBackdropPress={() => props.setVisible(false)}
      onBackButtonPress={() => props.setVisible(false)}
      style={{margin: 0}}
      isVisible={props.isVisible}>
      {remoteAudioStream && (
        <RTCView
          streamURL={remoteAudioStream.toURL()}
          style={{width: 0, height: 0}}
        />
      )}
      {localAudioStream && (
        <RTCView
          streamURL={localAudioStream.toURL()}
          style={{width: 0, height: 0}}
        />
      )}
      <View style={{flex: 1, backgroundColor: 'white'}}>
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
            Calling
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
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: '#050A0E',
      }}>
      <View
        style={{
          padding: 35,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 14,
        }}>
        <Text
          style={{
            fontSize: 36,
            marginTop: 12,
            color: '#ffff',
          }}>
          {props.callerName} is calling..
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            answerOfferVideoCall();
          }}
          style={{
            backgroundColor: 'green',
            borderRadius: 30,
            height: 60,
            aspectRatio: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CallAnswer height={28} fill={'#fff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const CallAnswer = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={66.667}
    height={66.667}
    viewBox="0 0 50 50"
    {...props}>
    <Path d="M6.4 6.4C4.5 8.3 3 10.6 3 11.6 3.1 21.9 28.1 46.9 38.3 47c2.3 0 8.7-6.2 8.7-8.4 0-.9-2.5-3.2-5.5-5.3-5.5-3.6-5.6-3.6-8.9-2l-3.3 1.5-6.1-6.1-6-6.2 1.6-3.2c1.5-3.2 1.5-3.3-2.1-8.8-2.1-3-4.4-5.5-5.3-5.5-.9 0-3.1 1.5-5 3.4zM25 5.7c0 .5 2.1 1.4 4.6 2.1 6.1 1.6 11 6.5 12.6 12.6 1.5 5.5 3.3 6.2 2.3.8-.9-5.1-4.1-9.9-8.4-12.7C32.3 6 25 4.2 25 5.7z" />
    <Path d="M25 12c0 .5 1.2 1 2.6 1 1.6 0 3.9 1.3 6 3.4 2.1 2.1 3.4 4.4 3.4 6 0 1.4.5 2.6 1 2.6 1.7 0 1.1-4.3-1-7.7-2-3.4-6.6-6.3-10-6.3-1.1 0-2 .4-2 1zM25 17c0 .5.6 1 1.3 1 1.6 0 5.7 4.2 5.7 5.8 0 .7.5 1.2 1 1.2 2 0 1-3.2-1.9-6.1C28.2 16 25 15 25 17z" />
  </Svg>
);

const styles = StyleSheet.create({
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
