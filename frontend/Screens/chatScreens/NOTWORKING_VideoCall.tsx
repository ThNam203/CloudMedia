import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {
  MediaStream,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
  RTCView,
  mediaDevices,
  permissions,
} from 'react-native-webrtc';

const socket = require('../../utils/socket');
console.debug = () => {};

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

const VideoCallScreen = ({route}: any) => {
  // const { chatRoomId } = route.params
  const {isCaller = false} = route.params;
  const chatRoomId = 1;
  const [remoteMediaStream, setRemoteMediaStream] = useState(
    new MediaStream(undefined),
  );
  const [localMediaStream, setLocalMediaStream] = useState<MediaStream | null>(
    null,
  );
  const peerConnection = useRef(new RTCPeerConnection(peerConstraints));
  const [isVoiceOnly, setIsVoiceOnly] = useState(false);

  const stopCall = async () => {
    if (localMediaStream) {
      localMediaStream.getTracks().forEach(track => track.stop());
      localMediaStream.release();

      setLocalMediaStream(null);
    }

    peerConnection.current.close();
  };

  const sendOfferVideoCall = async () => {
    let sessionConstraints = {
      mandatory: {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true,
        VoiceActivityDetection: true,
      },
    };
    console.log('send offer');
    try {
      const offerDescription = await peerConnection.current.createOffer(
        sessionConstraints,
      );
      await peerConnection.current.setLocalDescription(offerDescription);
      socket.emit('offerVideoCall', {offerDescription, chatRoomId});
    } catch (err) {
      // Handle Errors
    }
  };

  const answerOfferVideoCall = async (
    receivedOfferDescription: any,
    callerSocketId: string,
  ) => {
    try {
      const offerDescription = new RTCSessionDescription(receivedOfferDescription);
      await peerConnection.current.setRemoteDescription(offerDescription);

      const answerDescription = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answerDescription);

      socket.emit('answerOfferVideoCall', {answerDescription, callerSocketId});
    } catch (err) {}
  };

  const onAnswerOfferVideoCall = async (receivedAnswerDescription: any) => {
    try {
      const answerDescription = new RTCSessionDescription(
        receivedAnswerDescription,
      );
      await peerConnection.current.setRemoteDescription(answerDescription);
    } catch (err) {}
  };

  useEffect(() => {
    setInterval(function () {
      if (peerConnection.current)
        console.log(
          `IS ICE GATHERING ${peerConnection.current.iceGatheringState}`,
        );
    }, 5000);

    const startCamera = async () => {
      let mediaConstraints = {
        audio: true,
        video: {
          frameRate: 30,
          facingMode: 'user',
        },
      };

      const mediaStream = await mediaDevices.getUserMedia(mediaConstraints);

      if (isVoiceOnly) {
        let videoTrack = await mediaStream.getVideoTracks()[0];
        videoTrack.enabled = false;
      }

      // Add our stream to the peer connection.
      mediaStream.getTracks().forEach(track => {
        peerConnection.current.addTrack(track, mediaStream);
      });

      setLocalMediaStream(mediaStream);
    };

    socket.on('offerVideoCall', (data: any) => {
      const {offerDescription, callerSocketId} = data;
      answerOfferVideoCall(offerDescription, callerSocketId);
    });

    socket.on('answerOfferVideoCall', (data: any) => {
      onAnswerOfferVideoCall(data);
    });

    socket.on('iceCandidate', (data: any) => {
      if (peerConnection.current) {
        peerConnection?.current
          .addIceCandidate(new RTCIceCandidate(data))
          .then(data => {
            console.log('Added ICE candidate');
          })
          .catch(err => {
            console.log('Unable to add ICE candidate');
          });
      }
    });

    peerConnection.current.addEventListener('connectionstatechange', event => {
      console.log('connection state chaneged');
      switch (peerConnection.current.connectionState) {
        case 'closed':
          // You can handle the call being disconnected here.

          break;
      }
    });

    peerConnection.current.addEventListener('icecandidate', (event: any) => {
      console.log('icecandidate event triggered');
      if (!event.candidate) {
        return;
      }
      socket.emit('iceCandidate', {iceCandidate: event.candidate, chatRoomId});
    });

    peerConnection.current.addEventListener(
      'iceconnectionstatechange',
      event => {
        console.log('iceconnectionstatechange event triggered');
        switch (peerConnection.current.iceConnectionState) {
          case 'connected':
          case 'completed':
            break;
        }
      },
    );

    peerConnection.current.addEventListener('signalingstatechange', event => {
      console.log(
        'signalingstatechange event triggered' +
          peerConnection.current.signalingState,
      );
      switch (peerConnection.current.signalingState) {
        case 'closed':
          // You can handle the call being disconnected here.

          break;
      }
    });

    peerConnection.current.addEventListener('track', event => {
      console.log('track event triggered');
      const newRemoteMediaStream = new MediaStream(undefined);
      newRemoteMediaStream.addTrack(event.track);
      setRemoteMediaStream(newRemoteMediaStream);
    });

    startCamera();
    sendOfferVideoCall();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.remoteVideoContainer}>
        {remoteMediaStream && (
          <RTCView
            streamURL={remoteMediaStream.toURL()}
            style={styles.remoteVideoContainer}
          />
        )}
      </View>
      <View style={styles.localVideoContainer}>
        {localMediaStream && (
          <RTCView
            streamURL={localMediaStream.toURL()}
            style={styles.remoteVideoContainer}
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.endCallButton}
        onPress={stopCall}></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  remoteVideoContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  localVideoContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 120,
    height: 180,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endCallButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stream: {
    flex: 1,
  },
});

export default VideoCallScreen;
