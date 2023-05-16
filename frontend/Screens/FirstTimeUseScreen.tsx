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
import {user_info} from '../api/user_api';
import jwt_decode from 'jwt-decode';
import {useDispatch, useSelector} from 'react-redux';
import {UserInfo, saveUser} from '../reducers/User_reducer';
import {setStatus} from '../reducers/Loading_reducer';
import {setToken} from '../reducers/Token_reducer';
import {setIdFromJwt} from '../reducers/Uid_reducer';
import {RootState} from '../reducers/Store';
import AppLoader from '../components/ui/AppLoader';
import {getAllNotifications} from '../api/notification_api';
import {setNotifications} from '../reducers/Notification_reducer';
import {getAllJobOfUser} from '../api/job_api';
import {setJobs} from '../reducers/Job_reducer';

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

  const navigateToMain = () => {
    navigation.navigate('main');
  };

  const saveInfo = (jwt: any) => {
    const json = jwt_decode(jwt) as {id: string};
    const idUser = json.id;
    user_info(idUser)
      .then((response: any) => {
        if (response.status === 200) {
          return response.data;
        } else {
          console.log(response.response.status);
          throw new Error(response.response.data.errorMessage);
        }
      })
      .then(data => {
        const user: UserInfo = {...data};
        // miss info
        dispatch(saveUser(user));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const saveNotification = (jwt: any) => {
    const json = jwt_decode(jwt) as {id: string};
    const idUser = json.id;
    getAllNotifications(idUser, jwt)
      .then((response: any) => {
        if (response.status === 200) {
          return response.data;
        } else {
          console.log(response.response.status);
          throw new Error(response.response.data.errorMessage);
        }
      })
      .then(data => {
        dispatch(setNotifications(data));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const saveJobs = (jwt: any) => {
    const json = jwt_decode(jwt) as {id: string};
    const idUser = json.id;
    getAllJobOfUser(idUser, jwt)
      .then((response: any) => {
        if (response.status === 200) {
          return response.data;
        } else {
          console.log(response.response.status);
          throw new Error(response.response.data.errorMessage);
        }
      })
      .then(data => {
        dispatch(setJobs(data));
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    const checkLogin = async () => {
      const islogin = await retrieveData(nameStorage.isLogin);
      if (islogin) {
        try {
          dispatch(setStatus(true));
          const jwt = await retrieveData(nameStorage.jwtToken);
          dispatch(setToken(jwt));
          dispatch(setIdFromJwt(jwt));
          // get some data
          saveInfo(jwt);
          saveNotification(jwt);
          saveJobs(jwt);
          // navigate
          navigateToMain();
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(setStatus(false));
        }
      }
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
          <View style={{flex: 13}}>
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
            style={{flex: 4}}
            activeOpacity={1}
            onPressOut={closeModalLogin}
          />
          <View style={{flex: 7}}>
            <LoginScreen
              handleToSignUp={() => {
                closeModalLogin();
                setModalHrVisible(true);
              }}
              handleNavigate={navigateToMain}
              saveInfo={saveInfo}
              saveNotification={saveNotification}
              saveJobs={saveJobs}
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
