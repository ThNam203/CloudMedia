import React, { useEffect } from 'react';
import {Provider} from 'react-redux';
import {Store} from './reducers/Store';
import {NavigationContainer} from '@react-navigation/native';
import Routers from './Navigations/Routers';
import {GestureHandlerRootView} from 'react-native-gesture-handler';


const App = () => {
  useEffect(() => {
    registerGlobals();
  }, [])

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={Store}>
        <NavigationContainer>
          <Routers />
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
