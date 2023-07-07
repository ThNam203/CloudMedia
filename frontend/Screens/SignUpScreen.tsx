/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import CustomCheckBox from '../components/ui/CustomCheckbox';
import {Dropdown} from 'react-native-element-dropdown';
import {userSignup} from '../api/userApi';
import {useDispatch} from 'react-redux';
import {setStatus} from '../reducers/LoadingReducer';
import {Toast} from '../components/ui/Toast';
function SignUpHrScreen(props: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userRole, setUserRole] = useState('Being Idle');

  const [showPassword, setShowPassword] = useState(false);

  const [nameWarning, setNameWarning] = useState(false);
  const [emailWarning, setEmailWarning] = useState(false);
  const [passwordWarning, setPasswordWarning] = useState(false);
  const [phoneWarning, setPhoneWarning] = useState(false);

  const dispatch = useDispatch();

  const [isSelected, setSelection] = useState(false);

  function isValidEmail(mail: any) {
    return /\S+@\S+\.\S+/.test(mail);
  }

  const checkInfo = () => {
    let iname = false;
    let imail = false;
    let ipass = false;
    let iphone = false;

    if (name === '') {
      setNameWarning(true);
      iname = true;
    }
    if (!isValidEmail(email)) {
      setEmailWarning(true);
      imail = true;
    }
    if (password.length < 8) {
      setPasswordWarning(true);
      ipass = true;
    }
    if (phoneNumber.length < 10) {
      setPhoneWarning(true);
      iphone = true;
    }

    if (
      nameWarning ||
      emailWarning ||
      passwordWarning ||
      phoneWarning ||
      iname ||
      imail ||
      ipass ||
      iphone
    ) {
      return false;
    }
    return true;
  };

  const handleSignUp = () => {
    if (!checkInfo()) {
      return;
    }
    dispatch(setStatus(true));
    userSignup({
      name,
      email,
      password,
      phoneNumber,
      userRole,
      createdDate: new Date(),
    })
      .then((response: any) => {
        if (response.status === 204) {
          return response;
        } else {
          console.log(response.status);
          throw new Error(response.data.errorMessage);
        }
      })
      .then(data => {
        // console.log(data);
        Toast('Signup success!');
        props.handleCloseModal(false);
      })
      .catch(error => Toast(error.message))
      .finally(() => {
        dispatch(setStatus(false));
      });
  };

  const renderItem = (item: any) => {
    return (
      <View
        style={{
          padding: 17,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{flex: 1, fontSize: 16}}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>Get Started</Text>
      </View>
      <View style={styles.textInput}>
        {nameWarning && (
          <Text style={styles.textWarning}>Name is invalid!</Text>
        )}
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={text => {
            if (text !== '') {
              setNameWarning(false);
            }
            setName(text);
          }}
          placeholder="Enter full name"
        />
      </View>
      <View style={styles.textInput}>
        {emailWarning && (
          <Text style={styles.textWarning}>Email is invalid!</Text>
        )}
        <TextInput
          value={email}
          onChangeText={text => {
            if (isValidEmail(text)) {
              setEmailWarning(false);
            }
            setEmail(text);
          }}
          style={styles.input}
          placeholder="Enter email"
        />
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
        {passwordWarning && (
          <Text style={styles.textWarning}>
            Password must be at least 8 characters long!
          </Text>
        )}
        <TextInput
          style={[styles.input, {borderWidth: 0, flex: 1}]}
          placeholder="Enter password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={text => {
            if (text.length >= 8) {
              setPasswordWarning(false);
            }
            setPassword(text);
          }}
        />
        <View
          style={{
            padding: 6,
            alignSelf: 'center',
            marginHorizontal: 5,
          }}>
          <TouchableOpacity
            onPressIn={() => setShowPassword(true)}
            onPressOut={() => setShowPassword(false)}>
            <Image
              source={require('../assets/images/eye.png')}
              style={{width: 25, height: 16.67}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.textInput}>
        {phoneWarning && (
          <Text style={styles.textWarning}>
            Phone number must be at least 10 digits long!
          </Text>
        )}
        <TextInput
          value={phoneNumber}
          onChangeText={text => {
            if (text.length >= 10) {
              setPhoneWarning(false);
            }
            setPhoneNumber(text);
          }}
          style={styles.input}
          placeholder="Phone number"
          keyboardType="number-pad"
        />
      </View>

      <View
        style={[
          styles.textInput,
          {overflow: 'hidden', borderRadius: 15, marginTop: 40},
        ]}>
        <Pressable
          style={styles.button}
          onPress={handleSignUp}
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
    borderRadius: 12,
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
  textWarning: {
    position: 'absolute',
    color: 'red',
    fontSize: 12,
    marginTop: -18,
    marginLeft: 10,
  },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    borderColor: '#AFAFAF',
    borderWidth: 1,
  },
});
