/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View, TextInput} from 'react-native';
import CustomCheckBox from '../components/ui/CustomCheckbox';
import CustomFTG from '../components/ui/CustomFGT';
import {user_login} from '../api/user_api';
import {nameStorage, storeData} from '../reducers/AsyncStorage';
import {useDispatch} from 'react-redux';
import {setToken} from '../reducers/Token_reducer';
import {setIdFromJwt} from '../reducers/Uid_reducer';
import {setStatus} from '../reducers/Loading_reducer';

function LoginScreen(props: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSelected, setSelection] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    dispatch(setStatus(true));
    user_login({
      email: username,
      password: password,
    })
      .then((response: any) => {
        console.log(response.data)
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error(response.errorMessage);
        }
      })
      .then(data => {
        // connect to socket
        require('../utils/socket')
        
        // do something with the JWT token
        const jwtToken = data;
        storeData(jwtToken, nameStorage.jwtToken);
        dispatch(setToken(jwtToken));
        dispatch(setIdFromJwt(jwtToken));
        props.saveInfo(jwtToken);
        // console.log(jwtToken);
        storeData(isSelected, nameStorage.isLogin);
        props.handleNavigate();
      })
      .catch(error => {
        console.error(error);
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
      <View style={{marginTop: 15, width: 300, height: 25}}>
        <View style={styles.bottomContainer}>
          <View style={{flexDirection: 'row'}}>
            <CustomCheckBox
              isSelected={isSelected}
              setSelection={setSelection}
            />
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
      <View>
        <CustomFTG
          textTitle={'or sign in with'}
          textQuestion1={'Don’t have an account?'}
          textQuestion2={'Sign up'}
          handlePressQues2={props.handleToSignUp}
        />
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
