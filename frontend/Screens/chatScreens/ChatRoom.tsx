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
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers/Store';
import chatApi from '../../api/chatApi';

const socket = require('../../utils/socket');

class Message {
  public id: string;
  public message: string;
  public senderId: string;
  public createdAt: string;

  constructor(
    id: string,
    message: string,
    senderId: string,
    createdAt: string,
  ) {
    this.id = id;
    this.message = message;
    this.senderId = senderId;
    this.createdAt = createdAt;
  }
}

const ChatRoom = ({route}: any) => {
  const {chatRoomId} = route.params;
  const uid = useSelector((state: RootState) => state.uid.id);
  const jwt = useSelector((state: RootState) => state.token.key);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    setTimeout(() => {
      if (flatListRef.current !== null) {
        console.log('scroll to end');
        flatListRef.current.scrollToEnd();
      }
    }, 2000);
  }, [chatMessages]);

  useEffect(() => {
    const getAllMessages = async () => {
      const rawMessages = await chatApi.getMessagesFromAChatRoom(
        jwt,
        chatRoomId,
      );
      const messages: Message[] = rawMessages.data.map((rawMessage: any) => {
        const {_id, message, senderId, createdAt} = rawMessage;
        return {_id, message, senderId, createdAt};
      });
      setChatMessages(messages);
    };

    socket.emit('joinRoom', {chatRoomId});

    socket.on('newMessage', (newRawMessage: any) => {
      const newMessage = new Message(
        newRawMessage._id,
        newRawMessage.message,
        newRawMessage.senderId,
        newRawMessage.createdAt,
      );
      setChatMessages(prevChatMessages => [...prevChatMessages, newMessage]);
    });

    getAllMessages();
  }, []);

  const handleNewMessage = () => {
    const newMessage = {
      chatRoomId: chatRoomId,
      message,
      senderId: uid,
    };

    socket.emit('newMessage', newMessage);
    setMessage('');
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.parentView}>
        {chatMessages[0] ? (
          <FlatList
            data={chatMessages}
            renderItem={({item}) => (
              <MessageComponent chat={item} userId={uid} />
            )}
            ref={flatListRef}
            keyExtractor={(item, index) => 'key' + index}
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
