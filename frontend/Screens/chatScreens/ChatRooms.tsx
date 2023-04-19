import React from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from 'react-native';

import ChatUserComponent from '../../components/ui/ChatRoomUserComponent';

const ChatRooms = () => {
  const rooms = ['1', '2', '3'];

  return (
    <SafeAreaView style={styles.chatscreen}>
      <View style={styles.chattopContainer}>
        <View style={styles.chatheader}>
          <Text style={styles.chatheading}>Chats</Text>

          {/* 👇🏻 Logs "ButtonPressed" to the console when the icon is clicked */}
          <Pressable onPress={() => console.log('Button Pressed!')}></Pressable>
        </View>
      </View>

      <View style={styles.chatlistContainer}>
        {rooms.length > 0 ? (
          <FlatList
            data={rooms}
            renderItem={() => <ChatUserComponent />}
            keyExtractor={item => item}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.chatemptyText}>No rooms created!</Text>
            <Text>Click the icon above to create a Chat room</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  chatscreen: {
    backgroundColor: '#F7F7F7',
    flex: 1,
    padding: 10,
    position: 'relative',
  },
  chattopContainer: {
    backgroundColor: '#F7F7F7',
    height: 70,
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 2,
  },
  chatheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatheading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
  },
  chatlistContainer: {
    paddingHorizontal: 10,
  },
  chatemptyContainer: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatemptyText: {fontWeight: 'bold', fontSize: 24, paddingBottom: 30},
});

export default ChatRooms;
