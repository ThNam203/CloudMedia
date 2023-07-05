import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import Icon, {Icons} from './Icons';
import Colors from '../../constants/Colors';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers/Store';
import {getTimeToNow} from '../../utils/Utils';
import VideoPlayer from 'react-native-video-controls';

export default function PostShared(props: any) {
  const Width = Dimensions.get('window').width - 30;
  const {sharedLink, navigation} = props;

  const item: any = useSelector((state: RootState) => {
    return (
      state.statusPost.HomePage.find(item => item._id === sharedLink) ||
      state.statusPost.sub.find(item => item._id === sharedLink)
    );
  });

  const timeAgo = getTimeToNow(item?.createdAt);

  const navigateToPostShared = () => {
    navigation.push('detailStatus', {idPost: sharedLink});
  };
  const navigateToProfile = () => {
    navigation.navigate('profileOther', {id: item.author._id});
  };

  if (item === undefined) {
    return (
      <View style={Styles.container}>
        <Text
          style={{
            marginHorizontal: 10,
            color: Colors.gray,
            fontWeight: '800',
            fontSize: 22,
          }}>
          This post has been deleted
        </Text>
      </View>
    );
  } else {
    return (
      <View style={Styles.container}>
        <TouchableOpacity onPress={navigateToPostShared}>
          <View style={Styles.flexCenter}>
            <TouchableOpacity onPress={navigateToProfile}>
              <Image
                source={
                  item.author.profileImagePath
                    ? {uri: item.author.profileImagePath}
                    : require('../../assets/images/Spiderman.jpg')
                }
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 100,
                  marginHorizontal: 10,
                }}
              />
            </TouchableOpacity>
            <View>
              <View style={Styles.flexCenter}>
                <Text
                  onPress={navigateToProfile}
                  style={{
                    fontSize: 14,
                    color: Colors.black,
                    fontWeight: 'bold',
                  }}>
                  {item.author.name}
                </Text>
                <Text style={{fontWeight: 'bold'}}>
                  <Icon
                    type={Icons.Entypo}
                    size={14}
                    name="dot-single"
                    color={Colors.gray}
                  />
                </Text>
              </View>
              <Text style={{width: 180}} numberOfLines={1} ellipsizeMode="tail">
                {/* {item.title} */}
                UIT Student
              </Text>
              {/* time ago */}
              <Text style={{fontSize: 10}}>{timeAgo}</Text>
            </View>
          </View>
          {item.description ? (
            <View style={{marginVertical: 10, paddingHorizontal: 16}}>
              <Text
                style={{
                  color: Colors.black,
                  textAlign: 'justify',
                }}
                numberOfLines={3}>
                {item.description}
              </Text>
            </View>
          ) : (
            <View style={{marginTop: 10}} />
          )}
          {item.mediaFiles.length ? (
            <Pressable
              style={{alignSelf: 'center'}}
              onPress={() =>
                navigation.navigate('imagesPost', {images: item.mediaFiles})
              }>
              {item.mediaFiles[0].fileType === 'Image' ? (
                <View style={{height: 280, width: Width, flexDirection: 'row'}}>
                  <Image
                    source={{uri: item.mediaFiles[0].location}}
                    style={{flex: 1, marginHorizontal: 0.75}}
                  />
                  {item.mediaFiles.length > 1 ? (
                    <View
                      style={{
                        flex: 1,
                        marginHorizontal: 0.75,
                        flexDirection: 'column',
                      }}>
                      <Image
                        source={{uri: item.mediaFiles[1].location}}
                        style={{flex: 1}}
                      />
                      {item.mediaFiles.length > 2 ? (
                        <View style={{flex: 1, marginVertical: 1}}>
                          <Image
                            source={{uri: item.mediaFiles[2].location}}
                            style={{flex: 1}}
                          />
                          {item.mediaFiles.length > 3 ? (
                            <Text style={Styles.textImageMore}>
                              +{item.mediaFiles.length - 3}
                            </Text>
                          ) : null}
                        </View>
                      ) : null}
                    </View>
                  ) : null}
                </View>
              ) : (
                <View style={{height: 230, width: Width}}>
                  <VideoPlayer
                    source={{uri: item.mediaFiles[0].location}}
                    style={{width: '100%', height: '100%'}}
                    disableBack={true}
                    paused={true}
                    thumbnail={require('../../assets/images/Thumbnail.png')}
                  />
                </View>
              )}
            </Pressable>
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginVertical: 5,
    marginHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  flexCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textImageMore: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    marginTop: 1.5,
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
