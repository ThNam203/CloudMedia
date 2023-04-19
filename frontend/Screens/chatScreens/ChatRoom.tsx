import {
  View,
  TextInput,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import ChatMessageComponent from '../../components/ui/ChatMessageComponent';

const ChatRoom = ({route, navigation}: any) => {
  const handleNewMessage = () => {
    console.log('handle new message here');
  };

  const chatMessages = [1, 2, 3];

  return (
    <View style={styles.messagingscreen}>
      <View
        style={[
          styles.messagingscreen,
          {paddingVertical: 15, paddingHorizontal: 10},
        ]}>
        {chatMessages[0] ? (
          <FlatList
            data={chatMessages}
            renderItem={() => <ChatMessageComponent />}
            keyExtractor={item => item.toString()}
          />
        ) : (
          'Start messaging to each other'
        )}
      </View>

      <View style={styles.messaginginputContainer}>
        <TextInput style={styles.messaginginput} />
        <Pressable
          style={styles.messagingbuttonContainer}
          onPress={handleNewMessage}>
          <View>
            <Text style={{color: '#f2f0f1', fontSize: 20}}>SEND</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messagingscreen: {
    flex: 1,
  },
  messaginginputContainer: {
    width: '100%',
    minHeight: 100,
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 15,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  messaginginput: {
    borderWidth: 1,
    padding: 15,
    flex: 1,
    marginRight: 10,
    borderRadius: 20,
  },
  messagingbuttonContainer: {
    width: '30%',
    backgroundColor: 'green',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatRoom;
