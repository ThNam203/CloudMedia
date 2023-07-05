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
import React, {useEffect, useState} from 'react';
import RectangleButton from '../components/ui/RectangleButton';
import SignUpHrScreen from './SignUpScreen';
import LoginScreen from './LoginScreen';
import {nameStorage, retrieveData} from '../reducers/AsyncStorage';

import {useDispatch, useSelector} from 'react-redux';
import {setStatus} from '../reducers/LoadingReducer';
import {RootState} from '../reducers/Store';
import AppLoader from '../components/ui/AppLoader';
import {Toast} from '../components/ui/Toast';

function FirstTimeUseScreen({navigation}: any) {
  const [modalHrVisible, setModalHrVisible] = useState(false);
  const [modalLoginVisible, setModalLoginVisible] = useState(false);
  const isLoading = useSelector((state: RootState) => state.loading.status);
  const dispatch = useDispatch();
  function closeModalLogin() {
    setModalLoginVisible(false);
  }
  function closeModalHr() {
    setModalHrVisible(false);
  }

  const navigateToMain = (jwt: any) => {
    navigation.navigate('loading', {jwt});
  };

  useEffect(() => {
    const checkLogin = async () => {
      dispatch(setStatus(true));
      retrieveData(nameStorage.isLogin)
        .then((isLogin: boolean) => {
          if (isLogin === true) {
            retrieveData(nameStorage.jwtToken).then((jwt: any) => {
              navigateToMain(jwt);
            });
          }
        })
        .catch(error => {
          Toast(error.message);
        })
        .finally(() => {
          dispatch(setStatus(false));
        });
    };

    checkLogin();
  }, []);

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
          {isLoading ? <AppLoader /> : null}
          <TouchableOpacity
            style={{flex: 1}}
            activeOpacity={1}
            onPressOut={closeModalHr}
          />
          <View style={{flex: 2}}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <SignUpHrScreen
                handleCloseModal={setModalHrVisible}
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
          {isLoading ? <AppLoader /> : null}
          <TouchableOpacity
            style={{flex: 1}}
            activeOpacity={1}
            onPressOut={closeModalLogin}
          />
          <View style={{flex: 1}}>
            <LoginScreen
              handleToSignUp={() => {
                closeModalLogin();
                setModalHrVisible(true);
              }}
              handleNavigate={navigateToMain}
            />
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
    width: 200,
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
