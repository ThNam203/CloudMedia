import React, {useEffect, useState, useRef} from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import TextInputContainer from '../../components/ui/videoCall/TextInputContainer';
import SocketIOClient from 'socket.io-client';
import {
  mediaDevices,
  RTCPeerConnection,
  RTCView,
  RTCIceCandidate,
  RTCSessionDescription,
  MediaStream,
} from 'react-native-webrtc';
import CallEnd from '../../components/ui/videoCall/CallEnd';
import CallAnswer from '../../components/ui/videoCall/CallAnswer';
import MicOn from '../../components/ui/videoCall/MicOn';
import MicOff from '../../components/ui/videoCall/MicOff';
import VideoOn from '../../components/ui/videoCall/VideoOn';
import VideoOff from '../../components/ui/videoCall/VideoOff';
import CameraSwitch from '../../components/ui/videoCall/CameraSwitch';
import IconContainer from '../../components/ui/videoCall//IconContainer';
import InCallManager from 'react-native-incall-manager';

console.debug = function() {}

export default function TestCallScreen({}) {
  const [localStream, setlocalStream] = useState<MediaStream | null>(null);

  const [remoteStream, setRemoteStream] = useState(null);

  const [type, setType] = useState('JOIN');

  const [callerId] = useState(
    Math.floor(100000 + Math.random() * 900000).toString(),
  );
  const otherUserId = useRef(null);

  const socket = SocketIOClient('http://10.0.140.194:3000', {
    transports: ['websocket'],
    query: {
      callerId,
    },
  });

  const [localMicOn, setlocalMicOn] = useState(true);

  const [localWebcamOn, setlocalWebcamOn] = useState(true);

  const peerConnection = useRef(
    new RTCPeerConnection({
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
    }),
  );

  let remoteRTCMessage = useRef(null);

  useEffect(() => {
    socket.on('newCall', data => {
      remoteRTCMessage.current = data.rtcMessage;
      otherUserId.current = data.callerId;
      setType('INCOMING_CALL');
    });

    socket.on('callAnswered', data => {
      remoteRTCMessage.current = data.rtcMessage;
      peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(remoteRTCMessage.current),
      );
      setType('WEBRTC_ROOM');
    });

    socket.on('ICEcandidate', data => {
      let message = data.rtcMessage;

      if (peerConnection.current) {
        peerConnection?.current
          .addIceCandidate(
            new RTCIceCandidate({
              candidate: message.candidate,
              sdpMid: message.id,
              sdpMLineIndex: message.label,
            }),
          )
          .then(data => {
            console.log('SUCCESS');
          })
          .catch(err => {
            console.log('Error', err);
          });
      }
    });

    let isFront = false;

    mediaDevices.enumerateDevices().then(sourceInfos => {
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind == 'videoinput' &&
          sourceInfo.facing == (isFront ? 'user' : 'environment')
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }

      mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            mandatory: {
              minWidth: 500, // Provide your own width, height and frame rate here
              minHeight: 300,
              minFrameRate: 30,
            },
            facingMode: isFront ? 'user' : 'environment',
            optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
          },
        })
        .then((stream: MediaStream) => {
          // Got stream!

          setlocalStream(stream);
          stream.getTracks().forEach(track => {
            peerConnection.current.addTrack(track, stream)
          })
          
        })
        .catch(error => {
          // Log error
        });
    });

    peerConnection.current.addEventListener('track', event => {
      console.error('add track event')
      const remoteStream = new MediaStream(undefined)
      remoteStream.addTrack(event.track)
      setRemoteStream(remoteStream)
    })

    // Setup ice handling
    peerConnection.current.addEventListener('icecandidate', event => {
      console.info('on ice candidate')
      if (event.candidate) {
        sendICEcandidate({
          calleeId: otherUserId.current,
          rtcMessage: {
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
          },
        });
      } else {
        console.log('End of candidates.');
      }
    });

    return () => {
      socket.off('newCall');
      socket.off('callAnswered');
      socket.off('ICEcandidate');
    };
  }, []);

  useEffect(() => {
    InCallManager.start();
    InCallManager.setKeepScreenOn(true);
    InCallManager.setForceSpeakerphoneOn(true);

    return () => {
      InCallManager.stop();
    };
  }, []);

  function sendICEcandidate(data) {
    socket.emit('ICEcandidate', data);
  }

  async function processCall() {
    const sessionDescription = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(sessionDescription);
    sendCall({
      calleeId: otherUserId.current,
      rtcMessage: sessionDescription,
    });
  }

  async function processAccept() {
    peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(remoteRTCMessage.current),
    );
    const sessionDescription = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(sessionDescription);
    answerCall({
      callerId: otherUserId.current,
      rtcMessage: sessionDescription,
    });
  }

  function answerCall(data) {
    socket.emit('answerCall', data);
  }

  function sendCall(data) {
    socket.emit('call', data);
  }

  const JoinScreen = () => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
          backgroundColor: '#050A0E',
          justifyContent: 'center',
          paddingHorizontal: 42,
        }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <View
              style={{
                padding: 35,
                backgroundColor: '#1A1C22',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 14,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#D0D4DD',
                }}>
                Your Caller ID
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 12,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 32,
                    color: '#ffff',
                    letterSpacing: 6,
                  }}>
                  {callerId}
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: '#1A1C22',
                padding: 40,
                marginTop: 25,
                justifyContent: 'center',
                borderRadius: 14,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#D0D4DD',
                }}>
                Enter call id of another user
              </Text>
              <TextInputContainer
                placeholder={'Enter Caller ID'}
                value={otherUserId.current}
                setValue={text => {
                  otherUserId.current = text;
                  console.log('TEST', otherUserId.current);
                }}
                keyboardType={'number-pad'}
              />
              <TouchableOpacity
                onPress={() => {
                  setType('OUTGOING_CALL');
                  processCall();
                }}
                style={{
                  height: 50,
                  backgroundColor: '#5568FE',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 12,
                  marginTop: 16,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#FFFFFF',
                  }}>
                  Call Now
                </Text>
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  };

  const OutgoingCallScreen = () => {
    return (
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
              fontSize: 16,
              color: '#D0D4DD',
            }}>
            Calling to...
          </Text>

          <Text
            style={{
              fontSize: 36,
              marginTop: 12,
              color: '#ffff',
              letterSpacing: 6,
            }}>
            {otherUserId.current}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              setType('JOIN');
              otherUserId.current = null;
            }}
            style={{
              backgroundColor: '#FF5D5D',
              borderRadius: 30,
              height: 60,
              aspectRatio: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CallEnd width={50} height={12} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const IncomingCallScreen = () => {
    return (
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
            {otherUserId.current} is calling..
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              processAccept();
              setType('WEBRTC_ROOM');
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
  };

  function switchCamera() {
    localStream.getVideoTracks().forEach(track => {
      track._switchCamera();
    });
  }

  function toggleCamera() {
    localWebcamOn ? setlocalWebcamOn(false) : setlocalWebcamOn(true);
    localStream.getVideoTracks().forEach(track => {
      localWebcamOn ? (track.enabled = false) : (track.enabled = true);
    });
  }

  function toggleMic() {
    localMicOn ? setlocalMicOn(false) : setlocalMicOn(true);
    localStream.getAudioTracks().forEach(track => {
      localMicOn ? (track.enabled = false) : (track.enabled = true);
    });
  }

  function leave() {
    peerConnection.current.close();
    setlocalStream(null);
    setType('JOIN');
  }

  const WebrtcRoomScreen = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#050A0E',
          paddingHorizontal: 12,
          paddingVertical: 12,
        }}>
        {localStream ? (
          <RTCView
            objectFit={'cover'}
            style={{flex: 1, backgroundColor: '#050A0E'}}
            streamURL={localStream.toURL()}
          />
        ) : null}
        {remoteStream ? (
          <RTCView
            objectFit={'cover'}
            style={{
              flex: 1,
              backgroundColor: '#050A0E',
              marginTop: 8,
            }}
            streamURL={remoteStream.toURL()}
          />
        ) : null}
        <View
          style={{
            marginVertical: 12,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <IconContainer
            backgroundColor={'red'}
            onPress={() => {
              leave();
            }}
            Icon={() => {
              return <CallEnd height={26} width={26} fill="#FFF" />;
            }}
          />
          <IconContainer
            style={{
              borderWidth: 1.5,
              borderColor: '#2B3034',
            }}
            backgroundColor={!localMicOn ? '#fff' : 'transparent'}
            onPress={() => {
              toggleMic();
            }}
            Icon={() => {
              return localMicOn ? (
                <MicOn height={24} width={24} fill="#FFF" />
              ) : (
                <MicOff height={28} width={28} fill="#1D2939" />
              );
            }}
          />
          <IconContainer
            style={{
              borderWidth: 1.5,
              borderColor: '#2B3034',
            }}
            backgroundColor={!localWebcamOn ? '#fff' : 'transparent'}
            onPress={() => {
              toggleCamera();
            }}
            Icon={() => {
              return localWebcamOn ? (
                <VideoOn height={24} width={24} fill="#FFF" />
              ) : (
                <VideoOff height={36} width={36} fill="#1D2939" />
              );
            }}
          />
          <IconContainer
            style={{
              borderWidth: 1.5,
              borderColor: '#2B3034',
            }}
            backgroundColor={'transparent'}
            onPress={() => {
              switchCamera();
            }}
            Icon={() => {
              return <CameraSwitch height={24} width={24} fill="#FFF" />;
            }}
          />
        </View>
      </View>
    );
  };

  switch (type) {
    case 'JOIN':
      return JoinScreen();
    case 'INCOMING_CALL':
      return IncomingCallScreen();
    case 'OUTGOING_CALL':
      return OutgoingCallScreen();
    case 'WEBRTC_ROOM':
      return WebrtcRoomScreen();
    default:
      return null;
  }
}
