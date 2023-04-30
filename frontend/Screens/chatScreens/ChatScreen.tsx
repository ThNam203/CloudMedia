import React, {useState} from 'react';
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
  const chatRoomList: ChatRoom[] = [];
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');

  const addFriend = () => {
    setModalVisible(true);
  };

  const saveFriend = () => {
    setEmail('');
    setModalVisible(false);
  };

  const cancelFriend = () => {
    setEmail('');
    setModalVisible(false);
  };

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
        data={chatRoomList}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
      <TouchableOpacity style={styles.button} onPress={addFriend}>
        <Text style={styles.buttonText}>Add Friend</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              onChangeText={text => setEmail(text)}
              value={email}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={saveFriend}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={cancelFriend}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ChatScreen;
