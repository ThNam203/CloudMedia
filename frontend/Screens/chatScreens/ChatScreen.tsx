import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers/Store';
import chatApi from '../../api/chatApi';
import Colors from '../../constants/Colors';
import {getTimeToNow} from '../../utils/Utils';
import Icon, {Icons} from '../../components/ui/Icons';

interface ChatRoom {
  _id: string;
  chatRoomImage: string;
  receiver: any;
  lastMessage: any;
  lastMessageTime: any;
}

const ChatScreen = ({navigation, route}: any) => {
  const {id} = route.params;
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const token = useSelector((state: RootState) => state.token.key);
  const uid = useSelector((state: RootState) => state.uid.id);

  const isFocused = useIsFocused();

  useEffect(() => {
    const getChatRooms = async () => {
      const chatRoomsData = await chatApi.getAllChatRooms(uid, token);
      const chatRooms: ChatRoom[] = chatRoomsData.data.map(
        (chatroomData: any) => {
          const {_id, members, lastMessage, lastMessageTime} = chatroomData;
          const receiver = members.find((member: any) => member._id !== uid);
          return {_id, receiver, lastMessage, lastMessageTime};
        },
      );
      setChatRooms(chatRooms);
    };

    if (isFocused) getChatRooms();
  }, [isFocused]);

  useEffect(() => {
    if (id && chatRooms) {
      for (const room of chatRooms) {
        if (room.receiver._id === id) {
          const imageSource = room.receiver?.profileImagePath
            ? {uri: room.receiver.profileImagePath}
            : require('../../assets/images/Spiderman.jpg');
          navigation.navigate('chatRoom', {
            chatRoomId: room._id,
            imageSource: imageSource,
            title: room.receiver.name,
          });
        }
      }
    }
  }, [chatRooms]);

  const renderItem = ({item}: any) => {
    console.log(JSON.stringify(item));
    const imageSource = item.logoPath
      ? {uri: item.logoPath}
      : item.receiver?.profileImagePath
      ? {uri: item.receiver.profileImagePath}
      : require('../../assets/images/Spiderman.jpg');
    return (
      <TouchableOpacity
        style={styles.userContainer}
        onPress={() => {
          navigation.navigate('chatRoom', {
            chatRoomId: item._id,
            imageSource: imageSource,
            title: item.receiver.name,
          });
        }}>
        <Image style={styles.roomImage} source={imageSource} />
        <View style={{flex: 1, height: '100%'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.roomName}>{item.receiver.name}</Text>
            <Text style={styles.roomTime}>
              {' '}
              {item.lastMessage ? getTimeToNow(item.lastMessageTime) : '12h'}
            </Text>
          </View>
          <Text style={styles.roomLastMessage} numberOfLines={1}>
            {item.lastMessage ? item.lastMessage : 'No message'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{elevation: 5, marginBottom: 5, height: 45}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon type={Icons.Ionicons} name="arrow-back" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: 'black',
              marginLeft: 110,
            }}>
            Chats
          </Text>
        </View>
      </View>
      <FlatList
        style={{width: '100%'}}
        data={chatRooms}
        renderItem={renderItem}
        keyExtractor={(item, index) => 'key' + index}
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: '90%',
              marginVertical: 10,
              borderBottomWidth: 1,
              alignSelf: 'flex-end',
              borderColor: Colors.gray,
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomImage: {
    width: 55,
    height: 55,
    borderRadius: 35,
    marginRight: 8,
  },
  roomName: {
    flex: 1,
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
  roomTime: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  roomLastMessage: {
    fontSize: 16,
    color: Colors.dark,
  },
  button: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007AFF',
    borderRadius: 50,
    padding: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      height: 5,
      width: 5,
    },
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ChatScreen;
