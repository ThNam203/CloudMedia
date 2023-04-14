import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import BottomTabs from './Navigations/BottomTabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <BottomTabs />
    </SafeAreaProvider>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
