import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {setStatus} from '../reducers/LoadingReducer';
import {Toast} from '../components/ui/Toast';
import {resetPassword} from '../api/Utils';

export default function ForgetPassScreen(props: any) {
  const {handleCloseModal} = props;

  const [email, setEmail] = useState('');
  const [emailWarning, setEmailWarning] = useState(false);

  function isValidEmail(mail: any) {
    return /\S+@\S+\.\S+/.test(mail);
  }

  const checkInfo = () => {
    let imail = false;
    if (!isValidEmail(email)) {
      setEmailWarning(true);
      imail = true;
    }

    if (emailWarning || imail) {
      return false;
    }
    return true;
  };

  const dispatch = useDispatch();

  const handleForet = async () => {
    if (!checkInfo()) return;
    try {
      dispatch(setStatus(true));
      const response: any = await resetPassword({email: email});
      if (response.status === 204) {
        Toast('Success. Please check your email to reset password');
      } else {
        Toast('Something went wrong');
      }
      handleCloseModal();
    } catch (error) {
      Toast('Something went wrong');
    } finally {
      dispatch(setStatus(false));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>Forget Password</Text>
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
          {overflow: 'hidden', borderRadius: 15, marginTop: 10},
        ]}>
        <Pressable
          style={styles.button}
          onPress={handleForet}
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
            Submit
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
