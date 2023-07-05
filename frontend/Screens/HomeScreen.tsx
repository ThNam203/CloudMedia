import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import ShowPosts from '../components/ui/ShowPosts';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../reducers/Store';
import {Toast} from '../components/ui/Toast';
import LottieView from 'lottie-react-native';
import {
  pushStatusPosts,
  pushStatusPostsSub,
} from '../reducers/StatusPostReducer';
import {
  getAStatusPostById,
  getAllStatusPostOfUser,
  getNewsFeed,
} from '../api/statusPostApi';

export default function HomeScreen({navigation}: any) {
  const token = useSelector((state: RootState) => state.token.key);
  const uid = useSelector((state: RootState) => state.uid.id);

  const StatusData = useSelector(
    (state: RootState) => state.statusPost.HomePage,
  );

  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const saveAllStatusPost = async () => {
    try {
      setIsLoading(true);
      const response: any = await getNewsFeed(uid, token, currentPage);
      if (response.status === 200) {
        const data = response.data;
        // console.log(currentPage);
        for (const post of data) {
          // console.log(post);
          dispatch(pushStatusPosts(post));
          if (post.sharedLink) {
            const res: any = await getAStatusPostById(token, post.sharedLink);
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
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    saveAllStatusPost();
  }, [currentPage]);

  return (
    <View>
      <FlatList
        data={StatusData}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <ShowPosts
            item={item}
            navigation={navigation}
            pressComment={() => {
              navigation.navigate('detailStatus', {idPost: item._id});
            }}
          />
        )}
        keyExtractor={(item, index) => 'key ' + index}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
});
