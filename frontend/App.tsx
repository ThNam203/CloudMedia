import React, { useEffect } from 'react';
import {Provider} from 'react-redux';
import {Store} from './reducers/Store';
import {NavigationContainer} from '@react-navigation/native';
import Routers from './Navigations/Routers';
import { registerGlobals } from 'react-native-webrtc';

const App = () => {
  useEffect(() => {
    registerGlobals();
  }, [])

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Routers />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
