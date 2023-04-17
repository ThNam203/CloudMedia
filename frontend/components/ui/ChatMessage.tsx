import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function ChatMessage({item, user}: any) {
  const status = item.user !== user;

  return (
    <View>
      <View
        style={
          status
            ? styles.mmessageWrapper
            : [styles.mmessageWrapper, {alignItems: 'flex-end'}]
        }>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={
              status
                ? styles.mmessage
                : [styles.mmessage, {backgroundColor: 'rgb(194, 243, 194)'}]
            }>
            <Text>{item.message}</Text>
          </View>
          <Text style={{marginLeft: 8}}>{item.time}</Text>
        </View>
      </View>
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
