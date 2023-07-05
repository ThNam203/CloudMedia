/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View, TextInput} from 'react-native';
import CustomCheckBox from '../components/ui/CustomCheckbox';
import CustomFTG from '../components/ui/CustomFGT';
import {userLogin} from '../api/userApi';
import {nameStorage, storeData} from '../reducers/AsyncStorage';
import {useDispatch} from 'react-redux';
import {setToken} from '../reducers/TokenReducer';
import {setIdFromJwt} from '../reducers/UidReducer';
import {setStatus} from '../reducers/LoadingReducer';
import {Toast} from '../components/ui/Toast';

function LoginScreen(props: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSelected, setSelection] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    console.log('login iden ' + username + password);
    dispatch(setStatus(true));
    userLogin({
      email: username,
      password: password,
    })
      .then((response: any) => {
        if (response.status === 200) {
          return response.data;
        } else {
          console.log(response.status);
          throw new Error(response.data.errorMessage);
        }
      })
      .then(data => {
        // connect to socket
        // require('../utils/socket');

        // do something with the JWT token
        const jwtToken = data;
        storeData(jwtToken, nameStorage.jwtToken);

        storeData(isSelected, nameStorage.isLogin);
        props.handleNavigate(jwtToken);
      })
      .catch(error => {
        Toast(error.message);
      })
      .finally(() => {
        dispatch(setStatus(false));
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>Welcome Back</Text>
      </View>
      <View style={styles.textInput}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => setUsername(text)}
          value={username}
        />
      </View>
      <View style={styles.textInput}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          value={password}
        />
      </View>
      <View style={{width: 300, height: 70}}>
        <View style={styles.bottomContainer}>
          <View style={{flexDirection: 'row'}}>
            <CustomCheckBox
              isSelected={isSelected}
              setSelection={setSelection}
              title={'Remember me'}
            />
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
      <View
        style={[
          styles.textInput,
          {overflow: 'hidden', borderRadius: 15, marginTop: 0},
        ]}>
        <Pressable
          onPress={handleLogin}
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
    </View>
  );
}
export default LoginScreen;

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
    justifyContent: 'space-between',
    alignItems: 'center',
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
