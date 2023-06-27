import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Keyboard,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import MessageComponent from '../../components/ui/ChatMessage';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers/Store';
import chatApi from '../../api/chatApi';
import Icon, {Icons} from '../../components/ui/Icons';
import Colors from '../../constants/Colors';
import ImagePicker from 'react-native-image-crop-picker';
import {Toast} from '../../components/ui/Toast';
import CallScreen from './CallScreen';

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

interface MediaItem {
  uri: string;
  type: string;
  name: string;
}

const ChatRoom = ({navigation, route}: any) => {
  const {chatRoomId, imageSource, title} = route.params;
  const uid = useSelector((state: RootState) => state.uid.id);
  const jwt = useSelector((state: RootState) => state.token.key);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');

  const [isFocused, setIsFocused] = useState(false);
  const [mediaFile, setMediaFile] = useState<MediaItem>();
  const messageRef = useRef<TextInput>(null);

  const flatListRef = useRef<FlatList>(null);

  const [callScreen, setCallScreen] = useState(false);

  useEffect(() => {
    if (flatListRef.current !== null) {
      console.log('scroll to end');
      flatListRef.current.scrollToEnd();
    }
  }, [chatMessages]);

  const handleKeyboardDismiss = () => {
    setIsFocused(false);
    messageRef.current?.blur();
  };

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardDismiss,
    );
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      // height: 140,
      // width: 140,
      // cropperCircleOverlay: true,
    })
      .then((image: any) => {
        setMediaFile({
          uri: image.path,
          type: image.mime,
          name: image.path.split('/').pop(),
        });
      })
      .catch(error => Toast(error.message));
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      waitAnimationEnd: false,
      compressImageQuality: 0.8,
    })
      .then((image: any) => {
        setMediaFile({
          uri: image.path,
          type: image.mime,
          name: image.path.split('/').pop() || image.path,
        });
      })
      .catch(error => Toast(error.message));
  };

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
      <CallScreen isVisible={callScreen} setVisible={setCallScreen} />
      <View style={styles.topView}>
        <View style={{margin: 15, flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{marginRight: 10}}>
            <Icon type={Icons.Ionicons} name="arrow-back" />
          </TouchableOpacity>
          <Image style={styles.roomImage} source={imageSource} />
          <Text style={styles.roomName}>{title}</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginHorizontal: 30}}>
              <TouchableOpacity
                onPress={() => {
                  setCallScreen(!callScreen);
                }}>
                <Icon type={Icons.Ionicons} name="call" />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <Icon type={Icons.Ionicons} name="videocam" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
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

      <View style={styles.bottomView}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <View style={{marginLeft: 10, flex: 1, maxHeight: 200}}>
            <ScrollView
              style={{flexGrow: 0}}
              showsVerticalScrollIndicator={false}>
              <TextInput
                ref={messageRef}
                value={message}
                onChangeText={setMessage}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Write a message..."
                multiline={true}
              />
              {mediaFile && (
                <View style={{marginRight: 15}}>
                  <Image
                    style={{
                      borderRadius: 3,
                      margin: 5,
                      height: 200,
                    }}
                    resizeMode="cover"
                    source={{uri: mediaFile.uri}}
                  />
                  <View style={{position: 'absolute', top: 5, right: 10}}>
                    <TouchableOpacity onPress={() => setMediaFile(undefined)}>
                      <Icon
                        type={Icons.FontAwesome}
                        name="close"
                        color={Colors.gray}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </ScrollView>
          </View>

          {!isFocused && !message && !mediaFile && (
            <View style={{padding: 10}}>
              <TouchableOpacity onPress={handleNewMessage}>
                <Text
                  style={{
                    color: Colors.bag10Bg,
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  Send
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {(isFocused || message || mediaFile) && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderTopWidth: 1,
              borderTopColor: Colors.darkGray,
              paddingHorizontal: 10,
              paddingTop: 5,
            }}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={{marginHorizontal: 10}}
                onPress={takePhotoFromCamera}>
                <Icon type={Icons.Ionicons} name="camera-outline" size={30} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginHorizontal: 10}}
                onPress={choosePhotoFromLibrary}>
                <Icon type={Icons.Ionicons} name="image-outline" size={30} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginHorizontal: 10}}
                onPress={() => {}}>
                <Icon type={Icons.Ionicons} name="videocam-outline" size={30} />
              </TouchableOpacity>
            </View>
            <View style={{padding: 10}}>
              <TouchableOpacity onPress={handleNewMessage}>
                <Text
                  style={{
                    color: Colors.bag10Bg,
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  Send
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  topView: {
    backgroundColor: 'white',
    elevation: 10,
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
  bottomView: {
    backgroundColor: 'white',
    elevation: 10,
    paddingVertical: 10,
  },
  roomImage: {
    width: 30,
    height: 30,
    borderRadius: 35,
    marginRight: 8,
  },
  roomName: {
    flex: 1,
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
});

export default ChatRoom;