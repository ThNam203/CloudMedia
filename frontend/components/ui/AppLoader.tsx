import {StyleSheet, View} from 'react-native';
import React from 'react';

import LottieView from 'lottie-react-native';

export default function AppLoader() {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <LottieView
        source={require('../../assets/images/cat-loader.json')}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1,
  },
});
