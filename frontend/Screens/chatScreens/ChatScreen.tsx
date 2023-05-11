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

interface ChatRoom {
  _id: string;
  name: string;
  logoPath: 'https://reactnative.dev/img/tiny_logo.png';
}

const ChatScreen = () => {
  const navigation = useNavigation();
  const chatRooms: ChatRoom[] = [];

  useEffect(() => {
    const getChatRooms = async () => {
      
    }
  })

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.userContainer}
      onPress={() => {
        navigation.navigate('chatRoom', {user: item});
      }}>
      <Image style={styles.userImage} source={{uri: item.logoPath}} />
      <Text style={styles.userName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chatRooms}
        renderItem={renderItem}
        keyExtractor={item => item._id}
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
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  userName: {
    fontSize: 16,
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
