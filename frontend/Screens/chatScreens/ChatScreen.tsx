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
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers/Store';
import chatApi from '../../api/chatApi';

interface ChatRoom {
  _id: string;
  members: string[];
}

const ChatScreen = ({navigation}: any) => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const token = useSelector((state: RootState) => state.token.key);
  const uid = useSelector((state: RootState) => state.uid.id);

  useEffect(() => {
    const getChatRooms = async () => {
      const chatRoomsData = await chatApi.getAllChatRooms(uid, token);
      console.log(chatRoomsData.data);
      const chatRooms: ChatRoom[] = chatRoomsData.data.map(
        (chatroomData: any) => {
          const {_id, members} = chatroomData;
          return {_id, members};
        },
      );
      setChatRooms(chatRooms);
    };

    getChatRooms();
  }, []);

  const renderItem = ({item}: any) => {
    const imageSource = item.logoPath
      ? {uri: item.logoPath}
      : {
          uri: 'https://images.unsplash.com/photo-1683339708262-b1208394ffec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        };
    return (
      <TouchableOpacity
        style={styles.userContainer}
        onPress={() => {
          navigation.navigate('chatRoom', {chatRoomId: item._id});
        }}>
        <Image style={styles.roomImage} source={imageSource} />
        <Text style={styles.roomName}>THIS IS A ROOM</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chatRooms}
        renderItem={renderItem}
        keyExtractor={(item, index) => 'key' + index}
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
    marginBottom: 16,
  },
  roomImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 8,
  },
  roomName: {
    fontSize: 18,
    color: 'black',
    marginStart: 16,
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
