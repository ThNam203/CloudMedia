/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import RectangleButton from '../components/ui/RectangleButton';
import SignUpHrScreen from './SignUpScreen';
import LoginScreen from './LoginScreen';

function FirstTimeUseScreen() {
  const [modalHrVisible, setModalHrVisible] = useState(false);
  const [modalLoginVisible, setModalLoginVisible] = useState(false);
  function closeModalLogin() {
    setModalLoginVisible(false);
  }
  function closeModalHr() {
    setModalHrVisible(false);
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode={'stretch'}
        style={styles.image}
        source={require('../assets/images/xiao.png')}>
        <View style={[styles.viewSurround, {marginTop: 100}]}>
          <Text style={styles.title}>
            Everything about a job becomes easier
          </Text>
        </View>

        <View style={[styles.viewSurround, {marginTop: 30}]}>
          <Text style={styles.textOut}>
            {'              '}Employment process become faster than ever and
            getting a job is never easier than now
          </Text>
        </View>
        <View style={[styles.buttonContainer, {marginTop: 250}]}>
          <RectangleButton
            style={styles.button}
            onPress={() => {
              setModalHrVisible(true);
            }}>
            <View style={styles.centering}>
              <Text style={[styles.textOut, {marginBottom: 10}]}>Sign up</Text>
            </View>
          </RectangleButton>
        </View>

        <View style={styles.lastView}>
          <Text style={styles.loginText}>
            Already have an account?{' '}
            <Text
              onPress={() => {
                setModalLoginVisible(true);
              }}
              style={[styles.loginText, {textDecorationLine: 'underline'}]}>
              Log in
            </Text>
          </Text>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalHrVisible}
          onRequestClose={() => {
            setModalHrVisible(!modalHrVisible);
          }}>
          <TouchableOpacity
            style={{flex: 1}}
            activeOpacity={1}
            onPressOut={closeModalHr}
          />
          <View style={{flex: 13}}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <SignUpHrScreen
                handleToLogin={() => {
                  closeModalHr();
                  setModalLoginVisible(true);
                }}
              />
            </ScrollView>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalLoginVisible}
          onRequestClose={() => {
            setModalLoginVisible(!modalLoginVisible);
          }}>
          <TouchableOpacity
            style={{flex: 4}}
            activeOpacity={1}
            onPressOut={closeModalLogin}
          />
          <View style={{flex: 7}}>
            <LoginScreen handleToSignUp={() => closeModalLogin()} />
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
}
export default FirstTimeUseScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewSurround: {
    width: 320,
  },
  image: {
    flex: 1,
    resizeMode: 'stretch',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#fff',
  },
  textOut: {
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'right',
  },
  buttonContainer: {
    margin: 10,
  },
  button: {
    width: 100,
    height: 40,
  },
  lastView: {
    borderColor: 'white',
    borderTopWidth: 2,
    padding: 20,
    width: 350,
    alignItems: 'center',
    marginTop: 50,
  },
  loginText: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#fff',
  },
  centering: {
    flex: 1,
    alignSelf: 'center',
    alignContent: 'center',
  },
});
