import React, {useRef, createRef} from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Animated,
  Pressable,
  TouchableOpacity,
} from 'react-native';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const {width, height} = Dimensions.get('window');

import {useSelector} from 'react-redux';
import {RootState} from '../../reducers/Store';

const CreateStoryComponent = (props: any) => {
  const {x, navigation, avatarUrl} = props;

  const color = x.interpolate({
    inputRange: [0, 100],
    outputRange: ['rgb(69, 69, 69)', 'rgb(50, 50, 50)'],
    extrapolate: 'clamp',
  });

  const handlePressCreate = () => {
    navigation.navigate('postStory');
  };

  return (
    <Pressable style={{position: 'absolute'}} onPress={handlePressCreate}>
      <Animated.View
        style={[
          styles.createStoryContainer,
          {
            borderTopRightRadius: x.interpolate({
              inputRange: [0, 100],
              outputRange: [8, 80],
              extrapolate: 'clamp',
            }),
            borderBottomRightRadius: x.interpolate({
              inputRange: [0, 100],
              outputRange: [8, 80],
              extrapolate: 'clamp',
            }),
            backgroundColor: color,
            transform: [
              {
                scaleX: x.interpolate({
                  inputRange: [0, 100],
                  outputRange: [1, 0.45],
                  extrapolate: 'clamp',
                }),
              },
              {
                scaleY: x.interpolate({
                  inputRange: [0, 100],
                  outputRange: [1, 0.25],
                  extrapolate: 'clamp',
                }),
              },
              {
                translateX: x.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, -100],
                  extrapolateRight: 'clamp',
                }),
              },
            ],
          },
        ]}
      />
      <Animated.Image
        source={
          avatarUrl
            ? {uri: avatarUrl}
            : require('../../assets/images/Spiderman.jpg')
        }
        resizeMode="cover"
        style={[
          styles.profile_avatar,
          {
            borderTopLeftRadius: x.interpolate({
              inputRange: [0, 100],
              outputRange: [8, 65],
              extrapolate: 'clamp',
            }),
            borderTopRightRadius: x.interpolate({
              inputRange: [0, 100],
              outputRange: [8, 65],
              extrapolate: 'clamp',
            }),
            borderBottomLeftRadius: x.interpolate({
              inputRange: [0, 100],
              outputRange: [0, 65],
              extrapolate: 'clamp',
            }),
            borderBottomRightRadius: x.interpolate({
              inputRange: [0, 100],
              outputRange: [0, 65],
              extrapolate: 'clamp',
            }),
            transform: [
              {
                scaleX: x.interpolate({
                  inputRange: [0, 100],
                  outputRange: [1, 0.25],
                  extrapolate: 'clamp',
                }),
              },
              {
                scaleY: x.interpolate({
                  inputRange: [0, 100],
                  outputRange: [1, 0.217],
                  extrapolate: 'clamp',
                }),
              },
              {
                translateX: x.interpolate({
                  inputRange: [0, 30, 60, 100],
                  outputRange: [0, -30, -80, -170],
                  extrapolateRight: 'clamp',
                }),
              },
              {
                translateY: x.interpolate({
                  inputRange: [0, 30, 60, 100],
                  outputRange: [0, 10, 40, 125],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.plus,
          {
            borderColor: color,
            transform: [
              {
                scale: x.interpolate({
                  inputRange: [0, 100],
                  outputRange: [1, 0.5],
                  extrapolate: 'clamp',
                }),
              },
              {
                translateX: x.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, -65],
                  extrapolateRight: 'clamp',
                }),
              },
              {
                translateY: x.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, -45],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}>
        <Text style={[styles.plusIcon]}>+</Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.createStoryTxtContainer,
          {
            opacity: x.interpolate({inputRange: [0, 30], outputRange: [1, 0]}),
            transform: [
              {
                scale: x.interpolate({
                  inputRange: [0, 30],
                  outputRange: [1, 0.9],
                  extrapolate: 'clamp',
                }),
              },
              {
                translateX: x.interpolate({
                  inputRange: [0, 30],
                  outputRange: [0, -30],
                  extrapolateRight: 'clamp',
                }),
              },
              {
                translateY: x.interpolate({
                  inputRange: [0, 30],
                  outputRange: [0, -25],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}>
        <Text style={styles.createStoryTxt}>New story</Text>
      </Animated.View>
    </Pressable>
  );
};

const Story = (props: any) => {
  const {content, index, navigation} = props;
  const uid = useSelector((state: RootState) => state.uid.id);
  const viewProfile = () => {
    if (content.author._id !== uid)
      navigation.navigate('profileOther', {id: content.author._id});
  };
  const viewStory = () => {
    navigation.navigate('story', {index, type: 0});
  };
  return (
    <TouchableOpacity onPress={viewStory}>
      <Image
        source={{uri: content.mediaFiles[1].location}}
        style={styles.imageStory}
        resizeMode="cover"
      />
      <TouchableOpacity style={styles.avatarContainer} onPress={viewProfile}>
        <Image
          source={
            content.author.profileImagePath
              ? {uri: content.author.profileImagePath}
              : require('../../assets/images/Spiderman.jpg')
          }
          style={styles.avatar}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <Text style={styles.name}>{content?.name}</Text>
    </TouchableOpacity>
  );
};

const StoriesList = ({navigation}: any) => {
  const token = useSelector((state: RootState) => state.token.key);
  const uid = useSelector((state: RootState) => state.uid.id);
  const user = useSelector((state: RootState) => state.userInfo);
  const stories = useSelector((state: RootState) => state.story.Main);

  const scrollStories = createRef<FlatList>();
  const x = useRef(new Animated.Value(0)).current;

  function onScrollEndDrag(e: any) {
    const {contentOffset} = e.nativeEvent;
    if (contentOffset.x < 50) {
      if (scrollStories.current) {
        scrollStories.current.scrollToIndex({
          animated: true,
          index: 0,
          viewOffset: 120,
        });
      }
    } else if (contentOffset.x < 100) {
      if (scrollStories.current) {
        scrollStories.current.scrollToIndex({
          animated: true,
          index: 0,
          viewOffset: 0,
        });
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.storiesContainer}>
        <AnimatedFlatList
          data={stories}
          ref={scrollStories}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingLeft: 112}}
          keyExtractor={(item, index) => index.toString()}
          scrollEventThrottle={16}
          onScroll={Animated.event([{nativeEvent: {contentOffset: {x}}}], {
            useNativeDriver: false,
          })}
          onScrollEndDrag={onScrollEndDrag}
          renderItem={({item, index}) => (
            <Story content={item} index={index} navigation={navigation} />
          )}
        />
        <CreateStoryComponent
          x={x}
          navigation={navigation}
          avatarUrl={user.profileImagePath}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 205,
  },
  titleContainer: {
    backgroundColor: 'white',
    padding: 12,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  storiesContainer: {
    backgroundColor: 'white',
    paddingVertical: 12,
    marginTop: 12,
  },
  imageStory: {
    height: 170,
    width: 100,
    backgroundColor: '#ccc',
    marginLeft: 5,
    borderRadius: 8,
  },
  overlay: {
    height: 170,
    width: 100,
    marginLeft: 5,
    borderRadius: 8,
    position: 'absolute',
  },
  avatarContainer: {
    height: 44,
    width: 44,
    borderRadius: 22,
    position: 'absolute',
    backgroundColor: '#3b5998',
    justifyContent: 'center',
    alignItems: 'center',
    left: 12,
    top: 12,
  },
  avatar: {
    height: 36,
    width: 36,
    borderRadius: 18,
  },
  name: {
    color: '#FFF',
    position: 'absolute',
    bottom: 12,
    left: 24,
    fontSize: 12,
    fontWeight: 'bold',
    width: 70,
  },
  createStoryContainer: {
    height: 170,
    width: 100,
    borderRadius: 8,
    position: 'absolute',
    top: 12,
    left: 10,
    backgroundColor: '#454545',
  },
  profile_avatar: {
    height: 115,
    width: 100,
    position: 'absolute',
    top: 12,
    left: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  plus: {
    backgroundColor: '#3b5998',
    height: 26,
    width: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    position: 'absolute',
    left: 48,
    top: 115,
    borderWidth: 2,
  },
  plusIcon: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    top: -3,
    left: 6,
  },
  createStoryTxtContainer: {
    width: 100,
    left: 10,
    position: 'absolute',
    top: 145,
  },
  createStoryTxt: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: 3,
  },
});

export default StoriesList;
