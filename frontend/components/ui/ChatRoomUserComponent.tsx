import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ChatRoomUserComponent = ({item}: any) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate('ChatRoom');
  };

  return (
    <Pressable style={styles.cchat} onPress={handleNavigation}>
      <View style={styles.crightContainer}>
        <View>
          <Text style={styles.cusername}>{item.user}</Text>
          <Text style={styles.cmessage}>this is the lastest message</Text>
        </View>
        <View>
          <Text style={styles.ctime}>this is message time</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cchat: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    height: 80,
    marginBottom: 10,
  },
  cavatar: {
    marginRight: 15,
  },
  crightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  cusername: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  cmessage: {
    fontSize: 14,
    opacity: 0.7,
  },
  ctime: {
    opacity: 0.5,
  },
});

export default ChatRoomUserComponent;
