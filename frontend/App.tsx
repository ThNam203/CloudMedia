import React from 'react';
import {StyleSheet, View} from 'react-native';
import FirstTimeUseScreen from './Screens/FirstTimeUseScreen';
import ProfileScreen from './Screens/ProfileScreen';
import ChatScreen from './Screens/chatScreens/ChatScreen';

const App = () => {
  let screen = <ProfileScreen />;
  //return <View style={styles.container}>{screen}</View>;
  return <ChatScreen />;
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
