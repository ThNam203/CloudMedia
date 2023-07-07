import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  SectionList,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ShowPosts from '../components/ui/ShowPosts';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../reducers/Store';
import {Toast} from '../components/ui/Toast';
import LottieView from 'lottie-react-native';
import {
  clearStatusPosts,
  deleteAStatusPost,
  pushStatusPosts,
  pushStatusPostsSub,
} from '../reducers/StatusPostReducer';
import {
  deleteAStatusPostApi,
  getAStatusPostById,
  getAllStatusPostOfUser,
  getNewsFeed,
} from '../api/statusPostApi';
import {Image} from 'react-native-animatable';
import StoriesList from '../components/ui/StoriesList';
import {clearStory, pushStory} from '../reducers/StoryReducer';
import {getStoryFeed} from '../api/storyApi';

export default function HomeScreen({navigation}: any) {
  const token = useSelector((state: RootState) => state.token.key);
  const uid = useSelector((state: RootState) => state.uid.id);

  const StatusData = useSelector(
    (state: RootState) => state.statusPost.HomePage,
  );

  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  const saveAllStatusPost = async () => {
    try {
      setIsLoading(true);
      const response: any = await getNewsFeed(uid, token, currentPage);
      if (response.status === 200) {
        const data = response.data;
        for (const post of data) {
          dispatch(pushStatusPosts(post));
          if (post.sharedLink) {
            const res: any = await getAStatusPostById(token, post.sharedLink);
            if (res.status === 200) {
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

  const handleDelete = async (idPost: any) => {
    try {
      const response: any = await deleteAStatusPostApi(uid, token, idPost);
      if (response.status === 204) {
        dispatch(deleteAStatusPost(idPost));
        Toast('Delete Success');
      } else {
        Toast('Delete Fail');
      }
    } catch (error: any) {
      Toast(error);
    }
  };

  const saveAllStory = async () => {
    try {
      const response: any = await getStoryFeed(uid, token);
      if (response.status === 200) {
        const data = response.data;
        for (const story of data) {
          dispatch(pushStory(story));
        }
      } else {
        console.log(response.data.errorMessage);
        throw new Error(response.data.errorMessage);
      }
    } catch (error: any) {
      Toast(error.message);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(clearStatusPosts());
    dispatch(clearStory());
    saveAllStory();
    setCurrentPage(0);
    setRefreshing(false);
  };

  useEffect(() => {
    saveAllStatusPost();
  }, [currentPage]);

  const sections = [
    {title: 'Stories', data: [{}]},
    {title: 'Posts', data: StatusData},
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      {refreshing ? (
        <ActivityIndicator />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => 'key ' + index}
          renderItem={({item, section}: any) => {
            if (section.title === 'Stories') {
              return <StoriesList navigation={navigation} />;
            } else {
              return (
                <ShowPosts
                  item={item}
                  navigation={navigation}
                  pressComment={() => {
                    navigation.navigate('detailStatus', {idPost: item._id});
                  }}
                  pressDelete={() => {
                    handleDelete(item._id);
                  }}
                />
              );
            }
          }}
          renderSectionFooter={({section}) => {
            if (section.title === 'Posts') {
              return renderLoader();
            } else {
              return null;
            }
          }}
          onEndReached={() => {
            if (!isLoading) loadMoreItem();
          }}
          onEndReachedThreshold={0}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
});
