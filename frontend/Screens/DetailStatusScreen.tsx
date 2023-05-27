import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  TextInput,
  Keyboard,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Icon, {Icons} from '../components/ui/Icons';
import Colors from '../constants/Colors';
import CustomIcon from '../components/data/CustomIcon';
import {useSelector} from 'react-redux';
import {RootState} from '../reducers/Store';
import {Toast} from '../components/ui/Toast';
import ImagePicker from 'react-native-image-crop-picker';
import {createComment, getAllComments} from '../api/statusComment_api';
import ItemComment from '../components/ui/ItemComment';

interface ImageItem {
  uri: string;
  type: string;
  name: string;
}

export default function DetailStatusScreen({navigation, route}: any) {
  const deviceWidth = Dimensions.get('window').width;

  const user = useSelector((state: RootState) => state.userInfo);
  const uid = useSelector((state: RootState) => state.uid.id);
  const token = useSelector((state: RootState) => state.token.key);

  const {item, timeAgo} = route.params;

  const [showMore, setShowMore] = useState(false);

  const [comment, setComment] = useState('');

  const [mediaFile, setMediaFile] = useState<ImageItem>();

  const [isFocused, setIsFocused] = useState(false);

  const [comments, setComments] = useState<any[]>([]);

  const commentRef = useRef<TextInput>(null);

  const postComment = async () => {
    if (comment === '' && mediaFile === undefined) {
      Toast('Comment is empty');
      return;
    }

    try {
      const response: any = await createComment(
        {mediaFile, content: comment, userId: uid},
        item._id,
        token,
      );
      if (response.status === 200) {
        console.log(response.data);
        const dataComment: any = response.data;
        setComments(prevComments => [...prevComments, dataComment]);
      } else {
        console.log(response.status);
        throw new Error(response.data.errorMessage);
      }
    } catch (error: any) {
      Toast(error.message);
    }

    setComment('');
    setMediaFile(undefined);
    Keyboard.dismiss();
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      // height: 140,
      // width: 140,
      // cropperCircleOverlay: true,
    })
      .then((image: any) => {
        setMediaFile({
          uri: image.path,
          type: image.mime,
          name: image.path.split('/').pop(),
        });
      })
      .catch(error => Toast(error.message));
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      waitAnimationEnd: false,
      compressImageQuality: 0.8,
    })
      .then((image: any) => {
        setMediaFile({
          uri: image.path,
          type: image.mime,
          name: image.path.split('/').pop() || image.path,
        });
      })
      .catch(error => Toast(error.message));
  };

  const handleKeyboardDismiss = () => {
    setIsFocused(false);
    commentRef.current?.blur();
  };

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardDismiss,
    );
    const getComments = async () => {
      try {
        const response: any = await getAllComments(item._id, token);
        if (response.status === 200) {
          setComments(response.data);
        } else {
          console.log(response.status);
          throw new Error(response.data.errorMessage);
        }
      } catch (error: any) {
        Toast(error.message);
      }
    };
    getComments();
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={Styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, marginTop: 57}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: Colors.white,
            marginVertical: 5,
            paddingVertical: 10,
          }}>
          <View style={Styles.flexCenter}>
            <Image
              source={{uri: item.profileImagePath}}
              style={{
                height: 60,
                width: 60,
                borderRadius: 100,
                marginHorizontal: 10,
              }}
            />
            <View>
              <View style={Styles.flexCenter}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Colors.black,
                    fontWeight: 'bold',
                  }}>
                  {item.name}
                </Text>
                <Text style={{fontWeight: 'bold'}}>
                  <Icon
                    type={Icons.Entypo}
                    size={16}
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
              <Text style={{fontSize: 11}}>{timeAgo}</Text>
            </View>
            {
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={{
                    padding: 4,
                  }}>
                  <Icon
                    type={Icons.Entypo}
                    name="dots-three-vertical"
                    size={19}
                    color={Colors.gray}
                  />
                </TouchableOpacity>
              </View>
            }
          </View>

          {item.description ? (
            <TouchableOpacity onPress={() => setShowMore(!showMore)}>
              <Text
                style={{
                  paddingHorizontal: 16,
                  color: Colors.black,
                  marginVertical: 10,
                  textAlign: 'justify',
                }}
                numberOfLines={showMore ? undefined : 3}
                ellipsizeMode="tail">
                {item.description}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={{marginTop: 10}} />
          )}

          {item.mediaFiles.length ? (
            <Pressable
              onPress={() =>
                navigation.navigate('imagesPost', {images: item.mediaFiles})
              }>
              <Image
                source={{uri: item.mediaFiles[0]}}
                style={{height: 300, width: deviceWidth}}
              />
            </Pressable>
          ) : null}
          <Pressable
            onPress={() => {}}
            android_ripple={{color: Colors.gray, borderless: false}}>
            <View
              style={[
                Styles.flexCenter,
                {
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  paddingTop: 5,
                },
              ]}>
              <View style={Styles.flexCenter}>
                <Icon
                  type={Icons.AntDesign}
                  name="like1"
                  color={Colors.irisBlue}
                  style={{height: 25, width: 25, borderRadius: 100}}
                />
                <Text>{item.likeCount} likes</Text>
              </View>
              <View style={Styles.flexCenter}>
                {item.comments > 0 ? (
                  <Text>{item.comments} comments</Text>
                ) : null}
                {item.comments > 0 && item.shares > 0 ? (
                  <Icon
                    type={Icons.Entypo}
                    name="dot-single"
                    size={16}
                    color={Colors.gray}
                  />
                ) : null}
                {item.shares > 0 ? <Text>{item.shares} shares</Text> : null}
              </View>
            </View>

            <View
              style={{
                borderTopColor: Colors.darkGray,
                borderTopWidth: 1,
                marginVertical: 5,
              }}
            />
          </Pressable>

          <View
            style={[
              Styles.flexCenter,
              {
                justifyContent: 'space-between',
                paddingHorizontal: 40,
              },
            ]}>
            <TouchableOpacity onPress={() => {}} style={{alignItems: 'center'}}>
              <Icon
                type={Icons.Entypo}
                name="thumbs-up"
                size={19}
                color={item.likeCount ? Colors.skyBlue : Colors.gray}
              />
              <Text
                style={{color: item.likeCount ? Colors.skyBlue : Colors.gray}}>
                Like
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => {
                commentRef.current?.focus();
              }}>
              <CustomIcon
                name="chatbubble-ellipses-outline"
                size={19}
                color={Colors.gray}
              />
              <Text>comment</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => {
                commentRef.current?.blur();
                console.log(comments);
              }}>
              <Icon
                type={Icons.Entypo}
                name="share"
                size={19}
                color={Colors.gray}
              />
              <Text>share</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{alignItems: 'center'}} onPress={() => {}}>
              <CustomIcon name="send-outline" size={19} color={Colors.gray} />
              <Text>send</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            {comments.map((comment, index) => (
              <ItemComment
                navigation={navigation}
                item={comment}
                IdAuthorOfStatus={item.author}
                key={index}
              />
            ))}
          </View>
          <View style={{height: 160}} />
        </View>
      </ScrollView>
      <View style={Styles.topView}>
        <View style={{margin: 15, flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{marginTop: 3}}>
            <Icon type={Icons.Ionicons} name="arrow-back" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={Styles.bottomView}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <Image
            source={
              user.profileImagePath
                ? {uri: user.profileImagePath}
                : require('../assets/images/Spiderman.jpg')
            }
            style={{
              height: 40,
              width: 40,
              borderRadius: 100,
              alignSelf: 'flex-start',
            }}
          />
          <View style={{marginLeft: 10, flex: 1, maxHeight: 200}}>
            <ScrollView
              style={{flexGrow: 0}}
              showsVerticalScrollIndicator={false}>
              <TextInput
                ref={commentRef}
                value={comment}
                onChangeText={setComment}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Write a comment..."
                multiline={true}
              />
              {mediaFile && (
                <View style={{marginRight: 15}}>
                  <Image
                    style={{
                      borderRadius: 3,
                      margin: 5,
                      height: 200,
                    }}
                    resizeMode="cover"
                    source={{uri: mediaFile.uri}}
                  />
                  <View style={{position: 'absolute', top: 5, right: 10}}>
                    <TouchableOpacity onPress={() => setMediaFile(undefined)}>
                      <Icon
                        type={Icons.FontAwesome}
                        name="close"
                        color={Colors.gray}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </ScrollView>
          </View>

          {!isFocused && !comment && !mediaFile && (
            <View style={{padding: 10}}>
              <TouchableOpacity onPress={postComment}>
                <Text
                  style={{
                    color: Colors.bag10Bg,
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  Post
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {(isFocused || comment || mediaFile) && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderTopWidth: 1,
              borderTopColor: Colors.darkGray,
              paddingHorizontal: 10,
              paddingTop: 5,
            }}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={{marginHorizontal: 10}}
                onPress={takePhotoFromCamera}>
                <Icon type={Icons.Ionicons} name="camera-outline" size={30} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginHorizontal: 10}}
                onPress={choosePhotoFromLibrary}>
                <Icon type={Icons.Ionicons} name="image-outline" size={30} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginHorizontal: 10}}
                onPress={() => {}}>
                <Icon type={Icons.Ionicons} name="videocam-outline" size={30} />
              </TouchableOpacity>
            </View>
            <View style={{padding: 10}}>
              <TouchableOpacity onPress={postComment}>
                <Text
                  style={{
                    color: Colors.bag10Bg,
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  Post
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    elevation: 10,
  },
  title: {
    fontSize: 24,
    color: 'black',
  },
  flexCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    elevation: 10,
    paddingVertical: 10,
  },
});
