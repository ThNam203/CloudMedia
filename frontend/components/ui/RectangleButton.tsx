import React from 'react';
import {Pressable, StyleSheet, View, Text} from 'react-native';

function RectangleButton({
  children,
  onPress,
  style,
}: {
  children: any;
  onPress: any;
  style: any;
}) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        android_ripple={{color: '#ccc'}}
        onPress={onPress}
        style={({pressed}) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed, style]
            : [styles.buttonInnerContainer, style]
        }>
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default RectangleButton;
const styles = StyleSheet.create({
  buttonOuterContainer: {
    margin: 4,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 2,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});
