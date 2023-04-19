import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import MessageComponent from '../../components/ui/ChatMessage';

const socket = require('../../utils/socket');

class Message {
  public id: string;
  public message: string;
  public time: string;
  public user: string;

  constructor(id: string, message: string, time: string, user: string) {
    this.id = id;
    this.message = message;
    this.time = time;
    this.user = user;
  }
}

const ChatRoom = (props: any) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');

  const flatListRef = useRef(null);

  useEffect(() => {
    setUser(socket.id);

    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  }, [chatMessages]);

  useEffect(() => {
    socket.on('serverSendMessage', (newMessage: Message) => {
      setChatMessages(prevChatMessages => [...prevChatMessages, newMessage]);
    });
  }, [socket]);

  const handleNewMessage = () => {
    const date = new Date();

    const newMessage = new Message(
      Date.now().toString(),
      message,
      `${date.getHours()}:${date.getMinutes()}`,
      user,
    );

    socket.emit('clientSendMessage', newMessage);
    setMessage('');
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.parentView}>
        {chatMessages[0] ? (
          <FlatList
            data={chatMessages}
            renderItem={({item}) => (
              <MessageComponent item={item} user={user} />
            )}
            ref={flatListRef}
            keyExtractor={item => item.id}
            contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end'}}
          />
        ) : (
          <Text>"Currently no message"</Text>
        )}
      </View>

      <View style={styles.messageInputContainer}>
        <TextInput
          style={styles.messageInput}
          value={message}
          onChangeText={value => setMessage(value)}
        />
        <Pressable style={styles.btnSendMessage} onPress={handleNewMessage}>
          <View>
            <Text style={{color: '#f2f0f1', fontSize: 20}}>SEND</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  messageInputContainer: {
    width: '100%',
    minHeight: 100,
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 15,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  messageInput: {
    borderWidth: 1,
    padding: 15,
    flex: 1,
    marginRight: 10,
    borderRadius: 20,
  },
  btnSendMessage: {
    width: '30%',
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});

export default ChatRoom;
