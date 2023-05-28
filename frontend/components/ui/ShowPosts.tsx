/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Icon, {Icons} from '../../components/ui/Icons';
import Colors from '../../constants/Colors';
import {getTimeToNow} from '../../utils/Utils';
import {useDispatch} from 'react-redux';
import {toogleLike} from '../../reducers/StatusPost_reducer';
import MenuStatus from './MenuStatus';

export default function ShowPosts({item, navigation, pressComment}: any) {
  const deviceWidth = Dimensions.get('window').width;
  const dispatch = useDispatch();

  const [showMore, setShowMore] = useState(false);
  const [showOption, setShowOption] = useState(false);

  const [lengthMore, setLengthMore] = useState(false);
  const onTextLayout = useCallback((e: any) => {
    setLengthMore(e.nativeEvent.lines.length >= 3); //to check the text is more than 3 lines or not
  }, []);

  const timeAgo = getTimeToNow(item.updatedAt);

  const [isLike, setIsLike] = useState(false); // check user like this post or not
  // like or unlike
  const handleLike = () => {
    console.log('like');
    dispatch(toogleLike(item));
    setIsLike((prev: any) => !prev);
  };

  const toggleShowOption = () => {
    setShowOption((prev: any) => !prev);
  };

  return (
    <View
      style={{
        backgroundColor: Colors.white,
        marginVertical: 5,
        paddingVertical: 10,
      }}>
      {showOption ? (
        <View style={{position: 'absolute', top: 30, right: 30, zIndex: 1}}>
          <MenuStatus toggleShowOption={toggleShowOption} />
        </View>
      ) : null}

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
              style={{fontSize: 16, color: Colors.black, fontWeight: 'bold'}}>
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

        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <TouchableOpacity
            onPress={toggleShowOption}
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
      </View>

      {item.description ? (
        <TouchableOpacity
          onPress={() => setShowMore(!showMore)}
          style={{marginVertical: 10, paddingHorizontal: 16}}>
          <Text
            onTextLayout={onTextLayout}
            style={{
              color: Colors.black,
              textAlign: 'justify',
            }}
            numberOfLines={showMore ? undefined : 3}>
            {item.description}
          </Text>
          {lengthMore ? (
            <Text style={{lineHeight: 20}}>
              {showMore ? 'Read less...' : 'Read more...'}
            </Text>
          ) : null}
        </TouchableOpacity>
      ) : (
        <View style={{marginTop: 10}} />
      )}

      {item.mediaFiles.length ? (
        <Pressable
          onPress={() =>
            navigation.navigate('imagesPost', {images: item.mediaFiles})
          }>
          <View style={{height: 300, width: deviceWidth, flexDirection: 'row'}}>
            <Image
              source={{uri: item.mediaFiles[0]}}
              style={{flex: 1, marginHorizontal: 0.75}}
            />
            {item.mediaFiles.length > 1 ? (
              <View
                style={{
                  flex: 1,
                  marginHorizontal: 0.75,
                  flexDirection: 'column',
                }}>
                <Image source={{uri: item.mediaFiles[1]}} style={{flex: 1}} />
                {item.mediaFiles.length > 2 ? (
                  <View style={{flex: 1, marginTop: 1.5}}>
                    <Image
                      source={{uri: item.mediaFiles[2]}}
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
        </Pressable>
      ) : null}
      <Pressable
        onPress={pressComment}
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
            {item.comments > 0 ? <Text>{item.comments} comments</Text> : null}
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
        <TouchableOpacity
          onPress={handleLike}
          style={{alignItems: 'center', flexDirection: 'row'}}>
          <Icon
            type={Icons.Entypo}
            name="thumbs-up"
            size={19}
            color={isLike ? Colors.skyBlue : Colors.gray}
          />
          <Text
            style={{
              color: isLike ? Colors.skyBlue : Colors.gray,
              marginHorizontal: 5,
            }}>
            Like
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{alignItems: 'center', flexDirection: 'row'}}
          onPress={pressComment}>
          <Icon
            type={Icons.Ionicons}
            name="chatbubble-ellipses-outline"
            size={19}
            color={Colors.gray}
          />
          <Text style={{marginHorizontal: 5}}>Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginBottom: 10,
    padding: 10,
    paddingBottom: 0,
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
