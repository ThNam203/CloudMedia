/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import CustomFTG from '../components/ui/CustomFGT';
import CustomCheckBox from '../components/ui/CustomCheckbox';

function SignUpHrScreen(props: any) {
  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>Get Started</Text>
      </View>
      <View style={styles.textInput}>
        <TextInput style={styles.input} placeholder="Enter full name" />
      </View>
      <View style={styles.textInput}>
        <TextInput style={styles.input} placeholder="Enter email" />
      </View>
      <View
        style={[
          styles.textInput,
          {
            flexDirection: 'row',
            borderColor: '#AFAFAF',
            borderRadius: 15,
            borderWidth: 1,
          },
        ]}>
        <TextInput
          style={[styles.input, {borderWidth: 0}]}
          placeholder="Enter password"
          secureTextEntry={true}
        />
        <View style={{alignSelf: 'center', marginLeft: 120}}>
          <TouchableOpacity>
            <Image
              source={require('../assets/images/eye.png')}
              style={{width: 25, height: 16.67}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.textInput}>
        <TextInput style={styles.input} placeholder="Company name" />
      </View>
      <View style={styles.textInput}>
        <TextInput
          style={styles.input}
          placeholder="Phone number"
          keyboardType="number-pad"
        />
      </View>
      <View style={{marginTop: 15, width: 300, height: 25}}>
        <View style={styles.bottomContainer}>
          <View>
            <CustomCheckBox />
          </View>
          <Text
            style={[styles.fontText, {fontWeight: '400', color: '#808080'}]}>
            I agree to{' '}
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
              Terms & Conditions
            </Text>
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
            Sign Up
          </Text>
        </Pressable>
      </View>
      <View>
        <CustomFTG
          textTitle={'or sign up with'}
          textQuestion1={'Already have an account?'}
          textQuestion2={'Log in'}
          handlePressQues2={props.handleToLogin}
        />
      </View>
    </View>
  );
}

export default SignUpHrScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
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
    borderColor: '#AFAFAF',
    borderRadius: 15,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
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
