import React from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const userList = [
  {
    id: 1,
    name: 'John Doe',
    image: 'https://reactnative.dev/img/tiny_logo.png',
  },
  {
    id: 2,
    name: 'Jane Smith',
    image: 'https://reactnative.dev/img/tiny_logo.png',
  },
  {
    id: 3,
    name: 'Alex Johnson',
    image: 'https://reactnative.dev/img/tiny_logo.png',
  },
];

const ChatRooms = () => {
  const navigation = useNavigation();

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.userContainer}
      onPress={() => {
        navigation.navigate('ChatRoom', {user: item});
      }}>
      <Image source={{uri: item.image}} style={styles.userImage} />
      <Text style={styles.userName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={userList}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
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
});

export default ChatRooms;
