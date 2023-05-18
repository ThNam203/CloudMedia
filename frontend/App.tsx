import React from 'react';
import {Provider} from 'react-redux';
import {Store} from './reducers/Store';
import {NavigationContainer} from '@react-navigation/native';
import Routers from './Navigations/Routers';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
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
