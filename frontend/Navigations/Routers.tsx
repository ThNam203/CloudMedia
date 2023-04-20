import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import FirstTimeUseScreen from '../Screens/FirstTimeUseScreen';

const Stack = createNativeStackNavigator();

export default function Routers() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="login" component={FirstTimeUseScreen} />
      <Stack.Screen name="main" component={BottomTabs} />
    </Stack.Navigator>
  );
}
