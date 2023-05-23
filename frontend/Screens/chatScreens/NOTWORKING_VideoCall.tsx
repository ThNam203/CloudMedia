import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {
  MediaStream,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
  RTCView,
  mediaDevices,
} from 'react-native-webrtc';

const socket = require('../../utils/socket');
console.debug = () => {};



const VideoCallScreen = ({route}: any) => {
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
  const chatRoomId = 1;
  const {isCaller} = route.params;
  const [remoteMediaStream, setRemoteMediaStream] = useState<any>(null);
  const [localMediaStream, setLocalMediaStream] = useState<MediaStream | null>(
    null,
  );
  const [remoteCandidates, setRemoteCandidates] = useState<RTCIceCandidate[]>(
    [],
  );
  const [negotiationNeeded, setNegotiationNeeded] = useState(false);
  const peerConnection = useRef(new RTCPeerConnection(peerConstraints));
  const [isVoiceOnly, setIsVoiceOnly] = useState(false);

  const sendOfferVideoCall = async () => {
    if (!negotiationNeeded) return;

    let sessionConstraints = {
      mandatory: {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true,
        VoiceActivityDetection: true,
      },
    };
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

  function handleRemoteCandidate(receivedIceCandidate: any) {
    const iceCandidate = new RTCIceCandidate(receivedIceCandidate);
    if (peerConnection.current.remoteDescription == null) {
      return setRemoteCandidates(prevCandidates => [
        ...prevCandidates,
        iceCandidate,
      ]);
    }

    return peerConnection.current.addIceCandidate(iceCandidate);
  }

  function processCandidates() {
    if (remoteCandidates.length < 1) {
      return;
    }

    remoteCandidates.map(candidate =>
      peerConnection.current.addIceCandidate(candidate),
    );
    setRemoteCandidates([]);
  }

  const answerOfferVideoCall = async (receivedOfferDescription: any) => {
    try {
      const offerDescription = new RTCSessionDescription(
        receivedOfferDescription,
      );
      await peerConnection.current.setRemoteDescription(offerDescription);

      const answerDescription = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answerDescription);

      processCandidates();
      socket.emit('answerOfferVideoCall', {answerDescription, chatRoomId});
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

  const stopCall = async () => {
    if (localMediaStream) {
      localMediaStream.getTracks().forEach(track => track.stop());
      localMediaStream.release();

      setLocalMediaStream(null);
    }

    peerConnection.current.close();
  };

  useEffect(() => {
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
      const {offerDescription} = data;
      answerOfferVideoCall(offerDescription);
    });

    socket.on('answerOfferVideoCall', (data: any) => {
      onAnswerOfferVideoCall(data);
    });

    socket.on('iceCandidate', (data: any) => {
      handleRemoteCandidate(data);
    });

    peerConnection.current.addEventListener('connectionstatechange', event => {
      console.error(
        `connectionstatechange ${peerConnection.current.connectionState}`,
      );
      switch (peerConnection.current.connectionState) {
        case 'closed':
          // You can handle the call being disconnected here.

          break;
      }
    });

    peerConnection.current.addEventListener('icecandidate', (event: any) => {
      if (!event.candidate) {
        return;
      }
      socket.emit('iceCandidate', {iceCandidate: event.candidate, chatRoomId});
    });

    peerConnection.current.addEventListener('negotiationneeded', event => {
      if (!negotiationNeeded) setNegotiationNeeded(true);
    });

    peerConnection.current.addEventListener(
      'iceconnectionstatechange',
      event => {
        switch (peerConnection.current.iceConnectionState) {
          case 'failed': {
            peerConnection.current.restartIce();
            break;
          }
          case 'connected':
          case 'completed':
            break;
        }
      },
    );

    peerConnection.current.addEventListener('track', event => {
      try {
        const remoteStream = new MediaStream(undefined);
        event.streams[0].getTracks().forEach((track, index) => {
          remoteStream.addTrack(track);
        });
        setRemoteMediaStream(remoteStream);
      } catch (e) {}
    });

    startCamera();
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
      <TouchableOpacity
        style={styles.sendOfferButton}
        onPress={sendOfferVideoCall}></TouchableOpacity>
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
  sendOfferButton: {
    position: 'absolute',
    top: 64,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stream: {
    flex: 1,
  },
});

export default VideoCallScreen;
