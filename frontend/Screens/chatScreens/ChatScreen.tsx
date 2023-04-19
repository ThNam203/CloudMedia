import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ChatRooms from './ChatRooms';
import ChatRoom from './ChatRoom';

const Stack = createStackNavigator();

const ChatScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ChatRooms">
        <Stack.Screen
          name="ChatRooms"
          component={ChatRooms}
          options={{title: 'Chats'}}
        />
        <Stack.Screen
          name="ChatRoom"
          component={ChatRoom}
          options={{title: 'Messages'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ChatScreen;
