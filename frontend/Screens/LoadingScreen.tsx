import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import Colors from '../constants/Colors';
import jwt_decode from 'jwt-decode';
import {getInfoUser} from '../api/userApi';
import {UserInfo, saveUser} from '../reducers/UserReducer';
import {getAllNotifications} from '../api/notificationApi';
import {setNotifications} from '../reducers/NotificationReducer';
import {setToken} from '../reducers/TokenReducer';
import {setIdFromJwt} from '../reducers/UidReducer';
import {useDispatch} from 'react-redux';
import {getAllStatusPostOfUser} from '../api/statusPostApi';
import {clearStatusPosts, pushStatusPosts} from '../reducers/StatusPostReducer';
import {Toast} from '../components/ui/Toast';

export default function LoadingScreen({navigation, route}: any) {
  const {jwt} = route.params;

  const dispatch = useDispatch();

  const saveAllStatusPost = async (jwt: any) => {
    try {
      const json = jwt_decode(jwt) as {id: string};
      const idUser = json.id;
      dispatch(clearStatusPosts());

      const response: any = await getAllStatusPostOfUser(idUser, jwt);
      if (response.status === 200) {
        const data = response.data;

        for (const post of data) {
          const userInfoResponse: any = await getInfoUser(post.author);
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
            console.log(userInfoResponse.status);
            throw new Error(userInfoResponse.data.errorMessage);
          }
        }
      } else {
        console.log(response.status);
        throw new Error(response.data.errorMessage);
      }
    } catch (error: any) {
      Toast(error.message);
    }
  };

  const saveInfo = async (jwt: any) => {
    try {
      const json = jwt_decode(jwt) as {id: string};
      const idUser = json.id;

      const response: any = await getInfoUser(idUser);
      if (response.status === 200) {
        const user: UserInfo = response.data;
        dispatch(saveUser(user));
      } else {
        console.log(response.status);
        throw new Error(response.data.errorMessage);
      }
    } catch (error: any) {
      Toast(error.message);
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
        console.log(response.status);
        throw new Error(response.data.errorMessage);
      }
    } catch (error: any) {
      Toast(error.message);
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
