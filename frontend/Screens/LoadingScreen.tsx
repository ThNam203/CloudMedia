import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import Colors from '../constants/Colors';
import jwt_decode from 'jwt-decode';
import {user_info} from '../api/user_api';
import {UserInfo, saveUser} from '../reducers/User_reducer';
import {getAllNotifications} from '../api/notification_api';
import {setNotifications} from '../reducers/Notification_reducer';
import {getAllJobOfUser} from '../api/job_api';
import {setJobs} from '../reducers/Job_reducer';
import {setToken} from '../reducers/Token_reducer';
import {setIdFromJwt} from '../reducers/Uid_reducer';
import {useDispatch} from 'react-redux';

export default function LoadingScreen({navigation, route}: any) {
  const {jwt} = route.params;

  const dispatch = useDispatch();

  const saveInfo = async (jwt: any) => {
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

  const saveNotification = async (jwt: any) => {
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

  const saveJobs = async (jwt: any) => {
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
      .then(data => dispatch(setJobs(data)))
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    dispatch(setToken(jwt));
    dispatch(setIdFromJwt(jwt));
    // get some data
    const loadData = async () => {
      await saveInfo(jwt);
      await saveNotification(jwt);
      await saveJobs(jwt);
      setTimeout(() => {
        //   make the back button disappear
        navigation.reset({
          index: 0,
          routes: [{name: 'main'}],
        });
      }, 1500);
    };
    loadData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Text style={styles.textLoading}>Workwise</Text>
      <View style={[StyleSheet.absoluteFillObject, {alignItems: 'center'}]}>
        <LottieView
          source={require('../assets/images/data-loader.json')}
          autoPlay
          loop
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textLoading: {
    alignSelf: 'center',
    fontSize: 36,
    marginTop: 50,
    color: Colors.moodyBlue,
    fontWeight: 'bold',
  },
});
