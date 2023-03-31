/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

function LoginScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>Welcome Back</Text>
      </View>
      <View style={styles.textInput}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          // onChangeText={text => setUsername(text)}
          // value={username}
        />
      </View>
      <View style={styles.textInput}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          // onChangeText={text => setPassword(text)}
          // value={password}
        />
      </View>
      <View style={{marginTop: 15, width: 300, height: 25}}>
        <View style={styles.bottomContainer}>
          <View>
            <Text
              style={[styles.fontText, {fontWeight: '400', color: '#808080'}]}>
              Remember me
            </Text>
          </View>
          <Text
            onPress={() => {}}
            style={[
              styles.fontText,
              {
                textDecorationLine: 'underline',
                fontWeight: '700',
                color: '#416FDF',
              },
            ]}>
            Forget password?
          </Text>
        </View>
      </View>
      <View style={[styles.textInput, {overflow: 'hidden', borderRadius: 15}]}>
        <Pressable
          style={styles.button}
          android_ripple={{color: '#613FC2', borderless: false}}>
          <Text
            style={[
              styles.fontText,
              {
                fontWeight: '700',
                lineHeight: 20,
                alignSelf: 'center',
                color: '#ffffff',
              },
            ]}>
            Sign In
          </Text>
        </Pressable>
      </View>
      <View></View>
    </View>
  );
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 200, // fix
    backgroundColor: '#ffffff',
    height: 665,
    borderRadius: 50,
  },
  titleView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 33,
  },
  titleText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 38,
    color: '#416FDF',
  },
  textInput: {
    marginTop: 26,
    width: 300,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderBottomColor: '#AFAFAF',
    borderRadius: 15,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fontText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 19,
  },
  button: {
    backgroundColor: '#416FDF',
    padding: 18,
    elevation: 3,
  },
});
