/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
function CustomFTG({
  textTitle,
  textQuestion1,
  textQuestion2,
}: {
  textTitle: any;
  textQuestion1: any;
  textQuestion2: any;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.firstView}>
        <View style={styles.line} />
        <Text>{textTitle}</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.secondView}>
        <View style={styles.button}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/Facebook.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/Gmail.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/Twitter.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.lastView}>
        <Text style={styles.textTitle}>
          {textQuestion1}{' '}
          <Text
            style={[
              styles.textTitle,
              {color: '#416FDF', textDecorationLine: 'underline'},
            ]}>
            {textQuestion2}
          </Text>
        </Text>
      </View>
    </View>
  );
}
export default CustomFTG;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  firstView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  secondView: {
    marginTop: 20,
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 40,
  },
  image: {
    width: 25,
    height: 25,
  },
  textTitle: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 14,
  },
  lastView: {
    alignItems: 'center',
    marginTop: 20,
  },
});
