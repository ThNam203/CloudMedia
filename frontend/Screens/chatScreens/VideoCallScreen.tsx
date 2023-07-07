import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Icon, {Icons} from '../../components/ui/Icons';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers/Store';
import {setCallShow} from '../../reducers/UtilsReducer';
import {Toast} from '../../components/ui/Toast';
import {
  MediaStream,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
  RTCView,
  mediaDevices,
} from 'react-native-webrtc';
import socket, { emitEvent } from '../../utils/socket';
import {Path, Svg} from 'react-native-svg';

export default function VideoCallScreen() {
  const callMer = useSelector((state: RootState) => state.Utils.call);
  const user = useSelector((state: RootState) => state.userInfo);
  const token = useSelector((state: RootState) => state.token.key);
  const uid = useSelector((state: RootState) => state.uid.id);
  const dispatch = useDispatch();

  let offer: any = null;
  offer = useSelector((state: RootState) => state.Utils.call.data);

  const [remoteUserName, setRemoteUserName] = useState<string>('');
  const [remoteUserProfileImage, setRemoteUserProfileImage] =
    useState<string>('');

  let peerConstraints = {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302',
      },
      {
        urls: 'stun:stun1.l.google.com:19302',
      },
      {
        urls: 'stun:stun2.l.google.com:19302',
      },
    ],
  };

  const [intervalId, setIntervalId] = useState<null | number>(null);
  const startTimer = () => {
    if (!intervalId) {
      const id = setInterval(() => {
        setCallLength(prevTime => prevTime + 1);
      }, 1000);
      setIntervalId(id);
    }
  };
  const endTimer = () => {
    if (intervalId != null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const [callLength, setCallLength] = useState(0);
  const [acceptedCall, setAcceptedCall] = useState(false);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  let unprocessedRemoteCandidates = useRef<RTCIceCandidate[]>([]);
  const peerConnection = useRef<null | RTCPeerConnection>(null);

  function onOpenModal() {
    try {
      setCallLength(0);
      peerConnection.current = new RTCPeerConnection(peerConstraints);
      peerConnection.current!.addEventListener(
        'connectionstatechange',
        event => {
          switch (peerConnection.current!.connectionState) {
            case 'disconnected':
              Toast('Call ended');
              dispatch(setCallShow(false));
              break;
            case 'failed':
              Toast('Something went wrong, please try again');
              dispatch(setCallShow(false));
              break;
            case 'connected':
              startTimer();
              break;
          }
        },
      );

      peerConnection.current!.addEventListener('icecandidate', (event: any) => {
        if (!event.candidate) {
          return;
        }
        socket.emitEvent('iceCandidate', {
          iceCandidate: event.candidate,
          chatRoomId: callMer.data.chatRoomId,
          userId: uid,
        });
      });

      peerConnection.current!.addEventListener('track', (event: any) => {
        try {
          const rawRemoteStream = new MediaStream(undefined);
          event.streams[0].getTracks().forEach((track: any, index: Number) => {
            rawRemoteStream.addTrack(track);
          });
          setRemoteStream(rawRemoteStream);
        } catch (e) {}
      });

      if (callMer.data.isCaller) {
        socket.subscribeToEvent('answerOfferVideoCall', (data: any) => {
          onAnswerOfferVideoCall(data);
        });

        socket.subscribeToEvent('noOneInRoom', (data: any) => {
          Toast("Other user is not online")
          dispatch(setCallShow(false))
        });

        socket.subscribeToEvent('callDenied', (data: any) => {
          Toast("Other user denied call")
          dispatch(setCallShow(false))
        })
      }

      socket.subscribeToEvent('iceCandidate', (data: any) => {
        handleRemoteCandidate(data);
      });

      if (callMer.data.isCaller) {
        setRemoteUserName(callMer.data.calleeName);
        setRemoteUserProfileImage(callMer.data.calleeImageSource);
      } else {
        setRemoteUserName(callMer.data.callerName);
        setRemoteUserProfileImage(callMer.data.callerProfileImage);
      }
    } catch (e) {}
  }

  function onCloseModal() {
    unprocessedRemoteCandidates.current.splice(
      0,
      unprocessedRemoteCandidates.current.length,
    );
    socket.unsubscribeToEvent('iceCandidate');
    if (callMer.data.isCaller)
      socket.unsubscribeToEvent('answerOfferVideoCall');
    localStream?.release();
    remoteStream?.release();
    setRemoteStream(null);
    setLocalStream(null);
    peerConnection.current?.close();
    endTimer();
    setAcceptedCall(false);
  }

  function handleRemoteCandidate(receivedIceCandidate: any) {
    try {
      const iceCandidate = new RTCIceCandidate(receivedIceCandidate);
      if (peerConnection.current!.remoteDescription == null) {
        unprocessedRemoteCandidates.current.push(iceCandidate);
      } else {
        peerConnection.current!.addIceCandidate(iceCandidate);
      }
    } catch (e) {}
  }

  function processCandidates() {
    if (unprocessedRemoteCandidates.current.length < 1) return;
    try {
      unprocessedRemoteCandidates.current.forEach(candidate => {
        peerConnection.current!.addIceCandidate(candidate).catch(e => {});
      });
      unprocessedRemoteCandidates.current.splice(
        0,
        unprocessedRemoteCandidates.current.length,
      );
    } catch (e) {}
  }

  const answerOfferVideoCall = async () => {
    try {
      const offerDescription = new RTCSessionDescription(
        offer.offerDescription,
      );

      await peerConnection.current!.setRemoteDescription(offerDescription);
      const answerDescription = await peerConnection.current!.createAnswer();
      await peerConnection.current!.setLocalDescription(answerDescription);

      processCandidates();
      socket.emitEvent('answerOfferVideoCall', {
        answerDescription,
        chatRoomId: callMer.data.chatRoomId,
      });
    } catch (err) {}
  };

  const onAnswerOfferVideoCall = async (answer: any) => {
    try {
      const answerDescription = new RTCSessionDescription(answer);
      await peerConnection.current!.setRemoteDescription(answerDescription);
      processCandidates()
    } catch (err) {}
  };

  const [iconVideo, setIconVideo] = useState('video');
  const [iconMic, setIconMic] = useState('microphone');

  const toggleIconVideo = () => {
    const newIconName = iconVideo === 'video' ? 'video-slash' : 'video';

    if (localStream != null)
      if (newIconName === 'video')
        localStream.getVideoTracks()[0].enabled = true;
      else localStream.getVideoTracks()[0].enabled = false;

    setIconVideo(newIconName);
  };

  const toggleIconMic = () => {
    const newIconMic =
      iconMic === 'microphone' ? 'microphone-slash' : 'microphone';

    if (localStream != null)
      if (newIconMic === 'microphone')
        localStream.getAudioTracks()[0].enabled = true;
      else localStream.getAudioTracks()[0].enabled = false;

    setIconMic(newIconMic);
  };

  useEffect(() => {
    const sendOfferVoiceCall = async () => {
      let sessionConstraints = {
        mandatory: {
          OfferToReceiveVideo: !callMer.data.isVoiceCall,
          OfferToReceiveAudio: true,
          VoiceActivityDetection: true,
        },
      };
      try {
        const offerDescription = await peerConnection.current!.createOffer(
          sessionConstraints,
        );
        await peerConnection.current!.setLocalDescription(offerDescription);
        socket.emitEvent('offerVideoCall', {
          offerDescription,
          chatRoomId: callMer.data.chatRoomId,
          isVoiceCall: callMer.data.isVoiceCall,
          callerId: uid,
        });
      } catch (err) {}
    };

    const startCapturing = async () => {
      let mediaConstraints = {
        audio: true,
        video: !callMer.data.isVoiceCall,
      };

      const mediaStream = await mediaDevices.getUserMedia(mediaConstraints);

      // Add our stream to the peer connection.
      mediaStream.getTracks().forEach(track => {
        peerConnection.current!.addTrack(track, mediaStream);
      });

      setLocalStream(mediaStream);
    };

    const onModalVisible = async () => {
      onOpenModal();
      await startCapturing();
      if (callMer.data.isCaller) sendOfferVoiceCall();
    };

    if (!callMer.visible) onCloseModal();
    else onModalVisible();
  }, [callMer.visible]);

  function convertSecondsToTime(seconds: number) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = seconds % 60;
  
    var timeString = '';
  
    if (hours > 0) {
      timeString += hours.toString().padStart(2, '0') + ':';
    }
  
    timeString += minutes.toString().padStart(2, '0') + ':' +
                  remainingSeconds.toString().padStart(2, '0');
  
    return timeString;
  }

  return (
    <Modal
      onBackdropPress={() => dispatch(setCallShow(false))}
      onBackButtonPress={() => dispatch(setCallShow(false))}
      isVisible={callMer.visible}
      swipeDirection="down"
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={{margin: 0}}>
      <React.Fragment>
        {callMer.data.isCaller === true || acceptedCall ? (
          <View style={{flex: 1}}>
            <View style={{flex: 1, backgroundColor: 'white'}}>
              {remoteStream &&
              !callMer.data
                .isVoiceCall /* !isVoiceOnlyStream(remoteStream)*/ ? (
                <RTCView
                  streamURL={remoteStream.toURL()}
                  style={{...styles.middleView}}
                />
              ) : (
                <View style={styles.middleView}>
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      marginTop: 200,
                    }}
                    source={
                      callMer.data.calleeImageSource ||
                      require('../../assets/images/Spiderman.jpg')
                    }
                  />
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: 'bold',
                      marginTop: 20,
                      color: 'black',
                    }}>
                    {remoteUserName}
                  </Text>
                  <Text style={{fontSize: 18, marginTop: 10, color: 'black'}}>
                    {intervalId ? convertSecondsToTime(callLength) : 'Calling...'}
                  </Text>
                </View>
              )}
              <View style={styles.bottomView}>
                <View style={{flex: 1}}>
                  <View style={{marginHorizontal: 30}}>
                    {callMer.data.isVoiceCall ? null : (
                      <TouchableOpacity onPress={toggleIconVideo}>
                        <Icon
                          name={iconVideo}
                          color="white"
                          type={Icons.FontAwesome5}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity onPress={toggleIconMic}>
                    <Icon
                      name={iconMic}
                      color="white"
                      type={Icons.FontAwesome}
                    />
                  </TouchableOpacity>
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
                    onPress={() => {
                      dispatch(setCallShow(false));
                    }}>
                    <Icon
                      name="phone-hangup"
                      color="white"
                      type={Icons.MaterialCommunityIcons}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/*localStream && !callMer.data.isVoiceCall ? (
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  zIndex: 100,
                  backgroundColor: 'green'
                }}>
                <RTCView
                  streamURL={localStream.toURL()}
                  style={{
                    width: 200,
                    height: 200,
                  }}
                />
              </View>
            ) : null*/}
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
              }}>
              {
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    marginTop: 200,
                  }}
                  source={
                    remoteUserProfileImage ||
                    require('../../assets/images/Spiderman.jpg')
                  }
                />
              }
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  marginTop: 20,
                  color: 'black',
                }}>
                {remoteUserName}
              </Text>
              <Text style={{fontSize: 18, marginTop: 10, color: 'black'}}>
                Calling...
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'space-around',
                alignItems: 'center',
                flexDirection: 'row',
                marginBottom: 64,
              }}>
              <TouchableOpacity
                onPress={() => {
                  emitEvent("callDenied", { chatRoomId: callMer.data.chatRoomId })
                  dispatch(setCallShow(false))
                }}
                style={{
                  backgroundColor: '#d62828',
                  borderRadius: 30,
                  height: 60,
                  aspectRatio: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CallDeny height={28} fill={'#fff'} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  answerOfferVideoCall();
                  setAcceptedCall(true);
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
        )}
      </React.Fragment>
    </Modal>
  );
}

const CallAnswer = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={66}
    height={66}
    viewBox="0 0 50 50"
    {...props}>
    <Path d="M6.4 6.4C4.5 8.3 3 10.6 3 11.6 3.1 21.9 28.1 46.9 38.3 47c2.3 0 8.7-6.2 8.7-8.4 0-.9-2.5-3.2-5.5-5.3-5.5-3.6-5.6-3.6-8.9-2l-3.3 1.5-6.1-6.1-6-6.2 1.6-3.2c1.5-3.2 1.5-3.3-2.1-8.8-2.1-3-4.4-5.5-5.3-5.5-.9 0-3.1 1.5-5 3.4zM25 5.7c0 .5 2.1 1.4 4.6 2.1 6.1 1.6 11 6.5 12.6 12.6 1.5 5.5 3.3 6.2 2.3.8-.9-5.1-4.1-9.9-8.4-12.7C32.3 6 25 4.2 25 5.7z" />
    <Path d="M25 12c0 .5 1.2 1 2.6 1 1.6 0 3.9 1.3 6 3.4 2.1 2.1 3.4 4.4 3.4 6 0 1.4.5 2.6 1 2.6 1.7 0 1.1-4.3-1-7.7-2-3.4-6.6-6.3-10-6.3-1.1 0-2 .4-2 1zM25 17c0 .5.6 1 1.3 1 1.6 0 5.7 4.2 5.7 5.8 0 .7.5 1.2 1 1.2 2 0 1-3.2-1.9-6.1C28.2 16 25 15 25 17z" />
  </Svg>
);

const CallDeny = (props: any) => (
  <Svg width={40} height={24} viewBox="0 0 22.882 7.844" {...props}>
    <Path
      d="M11.441 1.771a15.2 15.2 0 00-4.386.637v2.749a.889.889 0 01-.534.8A11.116 11.116 0 003.98 7.595a.991.991 0 01-.667.252.969.969 0 01-.672-.261L.281 5.392a.843.843 0 010-1.257A16.829 16.829 0 0111.441 0 16.829 16.829 0 0122.6 4.134a.846.846 0 01.281.629.836.836 0 01-.281.624l-2.36 2.191a.989.989 0 01-.672.261 1 1 0 01-.667-.252 11.117 11.117 0 00-2.541-1.638.889.889 0 01-.534-.8V2.4a15.349 15.349 0 00-4.385-.629z"
      fill="#fff"
    />
  </Svg>
);

const styles = StyleSheet.create({
  middleView: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
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
