import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Image} from 'react-native-animatable';

export default function ChatMessage({chat, userId}: any) {
  const status = chat.senderId !== userId;
  const rawTime = new Date(chat.createdAt);
  const time = rawTime.toLocaleString();

  return (
    <View
      style={
        status
          ? styles.mmessageWrapper
          : [styles.mmessageWrapper, {alignItems: 'flex-end'}]
      }>
      <View style={{flexDirection: 'row'}}>
        {status && (
          <Image
            style={{width: 50, height: 50, borderRadius: 25, marginRight: 10}}
            source={{
              uri: 'data:image/jpeg;base64,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',
            }}
          />
        )}
        <View
          style={
            status
              ? styles.mmessage
              : [styles.mmessage, {backgroundColor: 'rgb(194, 243, 194)'}]
          }>
          <Text>{chat.message}</Text>
          { chat.imageLink ? <Image source={{uri: chat.imageLink}} style={{width: 150, height: 150}}/> : null}
        </View>
      </View>

      <Text style={{marginLeft: 8}}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mavatar: {
    width: 10,
    height: 10,
  },
  mmessageWrapper: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  mmessage: {
    maxWidth: '50%',
    backgroundColor: '#f5ccc2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 2,
  },
});
