import React from 'react';
import {StyleSheet, View} from 'react-native';
import FirstTimeUseScreen from './Screens/FirstTimeUseScreen';

const App = () => {
  let screen = <FirstTimeUseScreen />;
  return <View style={styles.container}>{screen}</View>;
};
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
