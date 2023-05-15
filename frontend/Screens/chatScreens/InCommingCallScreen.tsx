import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Svg, {Path} from 'react-native-svg';

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

export default function InCommingCallScreen({ callerName, navigation }: any) {
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
            {callerName} is calling..
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
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
    //
  }