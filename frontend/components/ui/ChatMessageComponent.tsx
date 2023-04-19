import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function ChatMessageComponent() {
  const status = false; // check if the message's sender is same or not to the current user

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
            <Text>this is the mesesage</Text>
          </View>
        </View>
        <Text style={{marginLeft: 40}}>time here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
