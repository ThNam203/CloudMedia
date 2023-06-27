import {StyleSheet, View} from 'react-native';
import React from 'react';

import LottieView from 'lottie-react-native';

export default function AppLoader() {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <LottieView
        source={require('../../assets/images/sub-loader.json')}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 100,
  },
  animation: {
    marginTop: 30,
    width: 75,
    height: 75,
  },
});
