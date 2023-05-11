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

const Stack = createNativeStackNavigator();

export default function Routers() {
  const isLoading = useSelector((state: RootState) => state.loading.status);
  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="login" component={FirstTimeUseScreen} />
        <Stack.Screen name="main" component={BottomTabs} />
        <Stack.Screen name="profile" component={ProfileScreen} />
        <Stack.Screen name="search" component={SearchScreen} />
      </Stack.Navigator>
      {isLoading ? <AppLoader /> : null}
      <PostScreen />
    </>
  );
}
