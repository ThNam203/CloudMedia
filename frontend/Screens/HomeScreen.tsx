import {View, Text} from 'react-native';
import React from 'react';
import {Posts} from '../components/data/Posts';
import ShowPosts from '../components/ui/ShowPosts';
// connect to socketio
require('../utils/socket')

export default function HomeScreen({navigation}: any) {
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
}
