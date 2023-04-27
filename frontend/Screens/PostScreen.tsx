/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import Icon, {Icons} from '../components/ui/Icons';
import ChoosePostTemplate from '../components/ui/ChoosePostTemplate';
import PostScreen2 from './PostScreen2';

export default function PostScreen({navigation}: any) {
  const [open, setOpen] = useState(true);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Button title="Hello" onPress={() => setOpen(!open)} />
      <PostScreen2 isVisible={open} setVisible={setOpen} />
    </View>
  );
}
