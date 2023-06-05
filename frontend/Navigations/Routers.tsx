import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import FirstTimeUseScreen from '../Screens/FirstTimeUseScreen';
import {RootState} from '../reducers/Store';
import {useSelector} from 'react-redux';
import AppLoader from '../components/ui/AppLoader';
import ProfileScreen from '../Screens/ProfileScreen';
import PostScreen from '../Screens/PostScreen';
import SearchScreen from '../Screens/SearchScreen';
import ChatScreen from '../Screens/chatScreens/ChatScreen';
import ChatRoom from '../Screens/chatScreens/ChatRoom';

import LoadingScreen from '../Screens/LoadingScreen';
import ImagesPostScreen from '../Screens/ImagesPostScreen';
import DetailStatusScreen from '../Screens/DetailStatusScreen';

import VideoCallScreen from '../Screens/chatScreens/NOTWORKING_VideoCall';
import TestCallScreen from '../Screens/chatScreens/TestCallScreen';
import EditPostScreen from '../Screens/EditPostScreen';

const Stack = createNativeStackNavigator();

export default function Routers() {
  const isLoading = useSelector((state: RootState) => state.loading.status);
  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="login" component={FirstTimeUseScreen} />

        <Stack.Screen name="main" component={BottomTabs} />
        <Stack.Screen
          name="detailStatus"
          component={DetailStatusScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="imagesPost"
          component={ImagesPostScreen}
          options={{
            // presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'none',
          }}
        />
        <Stack.Screen
          name="editPost"
          component={EditPostScreen}
          options={{
            animation: 'none',
          }}
        />

        <Stack.Screen name="profile" component={ProfileScreen} />
        <Stack.Screen
          name="search"
          component={SearchScreen}
          options={{
            animation: 'none',
          }}
        />
        <Stack.Screen name="chat" component={ChatScreen} />
        <Stack.Screen name="chatRoom" component={ChatRoom} />

        <Stack.Screen name="loading" component={LoadingScreen} />

        <Stack.Screen name="videoCall" component={VideoCallScreen} />
      </Stack.Navigator>
      {isLoading ? <AppLoader /> : null}
      <PostScreen />
    </>
  );
}
