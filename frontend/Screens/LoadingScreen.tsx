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
import {getAllStatusPostOfUser} from '../api/statusPost_api';
import {pushStatusPosts} from '../reducers/StatusPost_reducer';

export default function LoadingScreen({navigation, route}: any) {
  const {jwt} = route.params;

  const dispatch = useDispatch();

  const saveAllStatusPost = async (jwt: any) => {
    try {
      const json = jwt_decode(jwt) as {id: string};
      const idUser = json.id;

      const response: any = await getAllStatusPostOfUser(idUser, jwt);
      if (response.status === 200) {
        const data = response.data;

        for (const post of data) {
          const userInfoResponse: any = await user_info(post.author);
          if (userInfoResponse.status === 200) {
            const infoUser = userInfoResponse.data;

            dispatch(
              pushStatusPosts({
                ...post,
                name: infoUser.name,
                profileImagePath: infoUser.profileImagePath,
              }),
            );
          } else {
            console.log(userInfoResponse.response.status);
            throw new Error(userInfoResponse.response.data.errorMessage);
          }
        }
      } else {
        console.log(response.response.status);
        throw new Error(response.response.data.errorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveInfo = async (jwt: any) => {
    try {
      const json = jwt_decode(jwt) as {id: string};
      const idUser = json.id;

      const response: any = await user_info(idUser);
      if (response.status === 200) {
        const user: UserInfo = response.data;
        dispatch(saveUser(user));
      } else {
        console.log(response.response.status);
        throw new Error(response.response.data.errorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveNotification = async (jwt: any) => {
    try {
      const json = jwt_decode(jwt) as {id: string};
      const idUser = json.id;

      const response: any = await getAllNotifications(idUser, jwt);
      if (response.status === 200) {
        const data = response.data;
        dispatch(setNotifications(data));
      } else {
        console.log(response.response.status);
        throw new Error(response.response.data.errorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveJobs = async (jwt: any) => {
    try {
      const json = jwt_decode(jwt) as {id: string};
      const idUser = json.id;

      const response: any = await getAllJobOfUser(idUser, jwt);
      if (response.status === 200) {
        const data = response.data;
        dispatch(setJobs(data));
      } else {
        console.log(response.response.status);
        throw new Error(response.response.data.errorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(setToken(jwt));
    dispatch(setIdFromJwt(jwt));
    // get some data
    const loadData = async () => {
      try {
        await Promise.all([
          saveInfo(jwt),
          saveNotification(jwt),
          saveJobs(jwt),
          saveAllStatusPost(jwt),
        ]);

        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'main'}],
          });
        }, 1500);
      } catch (error) {
        console.error(error);
      }
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
