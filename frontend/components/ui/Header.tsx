/* eslint-disable react-native/no-inline-styles */
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  Text,
} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import Icon, {Icons} from './Icons';

export default function Header({navigation}: any) {
  return (
    <View style={styles.container}>
      <View style={{paddingLeft: 10}}>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('videoCall', { isCaller: false });
            // navigation.navigate('profile')
            navigation.navigate('main', {screen: 'Home'});
          }}>
          <Image
            source={require('../../assets/images/wordpress.png')}
            style={{height: 35, width: 35, borderRadius: 100}}
          />
        </TouchableOpacity>
      </View>
      <Pressable
        style={styles.textInput}
        onPress={() => {
          navigation.navigate('search');
        }}>
        <Icon type={Icons.Feather} name="search" />
        <Text style={{marginHorizontal: 10, fontSize: 18}}>Search</Text>
      </Pressable>
      <TouchableOpacity
        style={{
          padding: 5,
          marginRight: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('chat');
          //navigation.navigate('videoCall', { isCaller: true })\
        }}>
        <Icon type={Icons.Ionicons} name="chatbox-ellipses-outline" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    elevation: 4,
    paddingVertical: 7,
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
    height: 40,
    backgroundColor: Colors.skyBlue,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: Colors.black,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
