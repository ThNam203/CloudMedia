import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import FirstTimeUseScreen from '../Screens/FirstTimeUseScreen';
import ChatScreen from '../Screens/chatScreens/ChatScreen';
import ChatRoom from '../Screens/chatScreens/ChatRoom';

const Stack = createNativeStackNavigator();

export default function Routers() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="main">
      <Stack.Screen name="login" component={FirstTimeUseScreen} />
      <Stack.Screen name="main" component={BottomTabs} />
      <Stack.Screen name="chat" component={ChatScreen} />
      <Stack.Screen name="chatRoom" component={ChatRoom} />
    </Stack.Navigator>
  );
}
