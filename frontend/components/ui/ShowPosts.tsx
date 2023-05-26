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
import React, {useState} from 'react';
import Icon, {Icons} from '../../components/ui/Icons';
import CustomIcon from '../data/CustomIcon';
import Colors from '../../constants/Colors';

export default function ShowPosts({item, navigation}: any) {
  const deviceWidth = Dimensions.get('window').width;

  const [showMore, setShowMore] = useState(false);

  const timeAgo = () => {
    const dateNow = new Date();
    const date = new Date(item.updatedAt);
    const diffInMilliseconds = dateNow.getTime() - date.getTime();
    const diffInSeconds = Math.round(diffInMilliseconds / 1000);
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    }
    const diffInMinutes = Math.round(diffInMilliseconds / 60000);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    }
    const diffInHours = Math.round(diffInMilliseconds / 3600000);
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    }
    const diffInDays = Math.round(diffInMilliseconds / 86400000);
    if (diffInDays < 30) {
      return `${diffInDays} days ago`;
    }
    const diffInMonths = Math.round(diffInMilliseconds / 2592000000);
    if (diffInMonths < 12) {
      return `${diffInMonths} months ago`;
    }
    const diffInYears = Math.round(diffInMilliseconds / 31536000000);
    return `${diffInYears} years ago`;
  };

  return (
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
          <Text style={{fontSize: 11}}>{timeAgo()}</Text>
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
        onPress={() => {
          navigation.navigate('detailStatus', {item, timeAgo: timeAgo()});
        }}
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
        <TouchableOpacity onPress={() => {}} style={{alignItems: 'center'}}>
          <Icon
            type={Icons.Entypo}
            name="thumbs-up"
            size={19}
            color={item.likeCount ? Colors.skyBlue : Colors.gray}
          />
          <Text style={{color: item.likeCount ? Colors.skyBlue : Colors.gray}}>
            Like
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() =>
            navigation.navigate('detailStatus', {item, timeAgo: timeAgo()})
          }>
          <CustomIcon
            name="chatbubble-ellipses-outline"
            size={19}
            color={Colors.gray}
          />
          <Text>comment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{alignItems: 'center'}} onPress={() => {}}>
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
});
