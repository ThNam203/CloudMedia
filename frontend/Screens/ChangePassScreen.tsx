import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Toast} from '../components/ui/Toast';
import {changePassword} from '../api/Utils';
import {useDispatch} from 'react-redux';
import {setStatus} from '../reducers/LoadingReducer';

export default function ChangePassCreen(props: any) {
  const {handleCloseModal} = props;

  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [showPassCurrent, setShowPassCurrent] = useState(false);

  const [passwordNew, setPasswordNew] = useState('');
  const [showPassNew, setShowPassNew] = useState(false);
  const [passwordNewWarn, setPasswordNewWarn] = useState(false);

  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassConfirm, setShowPassConfirm] = useState(false);
  const [passwordConfirmWarn, setPasswordConfirmWarn] = useState(false);

  const [email, setEmail] = useState('');
  const [emailWarning, setEmailWarning] = useState(false);

  function isValidEmail(mail: any) {
    return /\S+@\S+\.\S+/.test(mail);
  }

  const checkInfo = () => {
    let imail = false;
    let ipass = false;
    let ipassconfirm = false;
    if (!isValidEmail(email)) {
      setEmailWarning(true);
      imail = true;
    }

    if (passwordNew.length < 8) {
      setPasswordNewWarn(true);
      ipass = true;
    }

    if (passwordConfirm !== passwordNew) {
      setPasswordConfirmWarn(true);
      ipassconfirm = true;
    }

    if (
      emailWarning ||
      passwordNewWarn ||
      passwordConfirmWarn ||
      imail ||
      ipass ||
      ipassconfirm
    ) {
      return false;
    }
    return true;
  };

  const dispatch = useDispatch();

  const handleChange = async () => {
    if (!checkInfo()) return;

    dispatch(setStatus(true));
    try {
      const data = {
        email: email,
        oldPassword: passwordCurrent,
        newPassword: passwordNew,
      };
      const response: any = await changePassword(data);
      if (response.status === 204) {
        Toast('Change password successfully!');
        handleCloseModal();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      Toast(error.message);
    } finally {
      dispatch(setStatus(false));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>Change password</Text>
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
        <TextInput
          style={[styles.input, {borderWidth: 0, flex: 1}]}
          placeholder="Enter current password"
          secureTextEntry={!showPassCurrent}
          value={passwordCurrent}
          onChangeText={text => {
            setPasswordCurrent(text);
          }}
        />
        <View
          style={{
            padding: 6,
            alignSelf: 'center',
            marginHorizontal: 5,
          }}>
          <TouchableOpacity
            onPressIn={() => setShowPassCurrent(true)}
            onPressOut={() => setShowPassCurrent(false)}>
            <Image
              source={require('../assets/images/eye.png')}
              style={{width: 25, height: 16.67}}
            />
          </TouchableOpacity>
        </View>
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
        {passwordNewWarn && (
          <Text style={styles.textWarning}>
            Password must be at least 8 characters long!
          </Text>
        )}
        <TextInput
          style={[styles.input, {borderWidth: 0, flex: 1}]}
          placeholder="Enter new password"
          secureTextEntry={!showPassNew}
          value={passwordNew}
          onChangeText={text => {
            if (text.length >= 8) {
              setPasswordNewWarn(false);
            }
            setPasswordNew(text);
          }}
        />
        <View
          style={{
            padding: 6,
            alignSelf: 'center',
            marginHorizontal: 5,
          }}>
          <TouchableOpacity
            onPressIn={() => setShowPassNew(true)}
            onPressOut={() => setShowPassNew(false)}>
            <Image
              source={require('../assets/images/eye.png')}
              style={{width: 25, height: 16.67}}
            />
          </TouchableOpacity>
        </View>
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
        {passwordConfirmWarn && (
          <Text style={styles.textWarning}>
            Password is not match with new password!
          </Text>
        )}
        <TextInput
          style={[styles.input, {borderWidth: 0, flex: 1}]}
          placeholder="Enter password confirmation"
          secureTextEntry={!showPassConfirm}
          value={passwordConfirm}
          onChangeText={text => {
            setPasswordConfirmWarn(false);

            setPasswordConfirm(text);
          }}
        />
        <View
          style={{
            padding: 6,
            alignSelf: 'center',
            marginHorizontal: 5,
          }}>
          <TouchableOpacity
            onPressIn={() => setShowPassConfirm(true)}
            onPressOut={() => setShowPassConfirm(false)}>
            <Image
              source={require('../assets/images/eye.png')}
              style={{width: 25, height: 16.67}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={[
          styles.textInput,
          {overflow: 'hidden', borderRadius: 15, marginTop: 10},
        ]}>
        <Pressable
          style={styles.button}
          onPress={handleChange}
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
            Confirm
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

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
});
