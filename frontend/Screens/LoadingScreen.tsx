import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import Colors from '../constants/Colors';
import jwt_decode from 'jwt-decode';
import {getInfoUser} from '../api/userApi';
import {UserInfo, saveUser} from '../reducers/UserReducer';
import {getAllNotifications} from '../api/notificationApi';
import {
  clearNotifications,
  setNotifications,
} from '../reducers/NotificationReducer';
import {setToken} from '../reducers/TokenReducer';
import {setIdFromJwt} from '../reducers/UidReducer';
import {useDispatch, useSelector} from 'react-redux';
import {getAStatusPostById, getAllStatusPostOfUser} from '../api/statusPostApi';
import {
  clearStatusPosts,
  pushStatusPosts,
  pushStatusPostsSub,
} from '../reducers/StatusPostReducer';
import {Toast} from '../components/ui/Toast';
import {RootState} from '../reducers/Store';

export default function LoadingScreen({navigation, route}: any) {
  const {jwt} = route.params;
  const user = useSelector((state: RootState) => state.userInfo);
  const dispatch = useDispatch();

  const saveAllStatusPost = async (jwt: any) => {
    try {
      const json = jwt_decode(jwt) as {id: string};
      const idUser = json.id;
      const response: any = await getAllStatusPostOfUser(idUser, jwt);
      if (response.status === 200) {
        const data = response.data;
        // console.log(data);
        for (const post of data) {
          dispatch(pushStatusPosts(post));
          if (post.sharedLink) {
            const res: any = await getAStatusPostById(jwt, post.sharedLink);
            if (res.status === 200) {
              // console.log(res.data);
              dispatch(pushStatusPostsSub(res.data));
            }
          }
        }
      } else {
        console.log(response.status);
        console.log(response.data.errorMessage);
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
      dispatch(clearNotifications());
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
    // connect socket
    // connectSocket(uid);

    dispatch(setToken(jwt));
    dispatch(setIdFromJwt(jwt));
    dispatch(clearStatusPosts());
    // get some data
    const loadData = async () => {
      try {
        await Promise.all([
          saveInfo(jwt),
          saveNotification(jwt),
          // saveAllStatusPost(jwt),
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
