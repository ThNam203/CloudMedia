import React from 'react';
import {Provider} from 'react-redux';
import {Store} from './reducers/Store';
import {NavigationContainer} from '@react-navigation/native';
import Routers from './Navigations/Routers';

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Routers />
      </NavigationContainer>
    </Provider>
  );
};
export default App;
