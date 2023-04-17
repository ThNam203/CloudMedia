import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ChatHomeScreen from './ChatHomeScreen';
import ChatMessagesScreen from './ChatMessagesScreen';

const Stack = createStackNavigator();

const ChatScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ChatHomeScreen">
        <Stack.Screen
          name="ChatHomeScreen"
          component={ChatHomeScreen}
          options={{title: 'Chats'}}
        />
        <Stack.Screen
          name="ChatMessagesScreen"
          component={ChatMessagesScreen}
          options={{title: 'Messages'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ChatScreen;
