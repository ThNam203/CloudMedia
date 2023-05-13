/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Icon, {Icons} from '../components/ui/Icons';
import ItemRequestUser from '../components/ui/ItemRequestUser';

export default function SearchScreen({navigation}: any) {
  const [text, setText] = useState('');
  const friendsData = [
    {
      id: '1',
      name: 'John Doe',
      connection: 'Friend',
      avatar: require('../assets/images/Spiderman.jpg'),
    },
    {
      id: '2',
      name: 'Jane Smith',
      connection: 'Family',
      avatar: require('../assets/images/Spiderman.jpg'),
    },
    {
      id: '3',
      name: 'Bob Johnson',
      connection: 'Colleague',
      avatar: require('../assets/images/Spiderman.jpg'),
    },
    {
      id: '4',
      name: 'Sarah Lee',
      connection: 'Friend',
      avatar: require('../assets/images/Spiderman.jpg'),
    },
    {
      id: '5',
      name: 'David Brown',
      connection: 'Classmate',
      avatar: require('../assets/images/Spiderman.jpg'),
    },
    {
      id: '6',
      name: 'Karen Chen',
      connection: 'Friend',
      avatar: require('../assets/images/Spiderman.jpg'),
    },
    {
      id: '7',
      name: 'Alex Nguyen',
      connection: 'Coworker',
      avatar: require('../assets/images/Spiderman.jpg'),
    },
    {
      id: '8',
      name: 'Maria Rodriguez',
      connection: 'Friend',
      avatar: require('../assets/images/Spiderman.jpg'),
    },
    {
      id: '9',
      name: 'Daniel Kim',
      connection: 'Friend',
      avatar: require('../assets/images/Spiderman.jpg'),
    },
    {
      id: '10',
      name: 'Jessica Wong',
      connection: 'Friend',
      avatar: require('../assets/images/Spiderman.jpg'),
    },
  ];

  const clearText = () => {
    setText('');
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.topView}>
        <View style={{margin: 20, flexDirection: 'row'}}>
          <TouchableOpacity
            style={{marginTop: 3}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon type={Icons.AntDesign} name="arrowleft" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Search"
            onChangeText={textinput => setText(textinput)}
            value={text}
          />
          {text.length > 0 && (
            <TouchableOpacity onPress={clearText} style={styles.clearButton}>
              <Icon type={Icons.AntDesign} name="closecircle" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <FlatList
        data={friendsData}
        renderItem={({item}) => (
          <ItemRequestUser
            item={item}
            nameRequest="Add friend"
            nameRequest2="Cancel"
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topView: {
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
    marginHorizontal: 10,
  },
  clearButton: {
    marginLeft: 5,
  },
});
