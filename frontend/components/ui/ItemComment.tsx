import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Colors from '../../constants/Colors';
import Icon, {Icons} from './Icons';
import {getTimeToNow} from '../../utils/Utils';

export default function ItemComment({navigation, item, IdAuthorOfStatus}: any) {
  const [showMore, setShowMore] = useState(false);
  const {author, content, mediaFile, createdAt} = item;
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likeCount);
  const [lengthMore, setLengthMore] = useState(false);
  const onTextLayout = useCallback((e: any) => {
    setLengthMore(e.nativeEvent.lines.length >= 3); //to check the text is more than 3 lines or not
  }, []);

  const timeAgo = getTimeToNow(createdAt);

  const toogleLike = () => {
    if (isLike) {
      setLikeCount((prev: any) => prev - 1);
    } else {
      setLikeCount((prev: any) => prev + 1);
    }
    setIsLike((prev: any) => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={{marginTop: 7}}>
        <Image
          source={
            author.profileImagePath
              ? {uri: author.profileImagePath}
              : require('../../assets/images/Spiderman.jpg')
          }
          style={{width: 50, height: 50, borderRadius: 25}}
        />
      </View>
      <View style={styles.mainContent}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.textName}>{author.name || 'Lalalie'}</Text>
              {author._id === IdAuthorOfStatus && (
                <Text style={styles.author}>Author</Text>
              )}
            </View>
            <Text style={{fontSize: 11}}>{timeAgo}</Text>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: -5,
              }}>
              <TouchableOpacity style={{padding: 3}}>
                <Icon
                  type={Icons.Entypo}
                  name="dots-three-vertical"
                  size={15}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={{width: 180, fontSize: 11}}
            numberOfLines={1}
            ellipsizeMode="tail">
            {/* {item.title} */}
            UIT Student
          </Text>
          {/* time ago */}

          <View style={{height: 10}} />
          {content && (
            <View style={{marginVertical: 5}}>
              <Text
                style={{color: Colors.black, lineHeight: 20}}
                onTextLayout={onTextLayout}
                numberOfLines={showMore ? undefined : 3}>
                {content}
              </Text>
              {lengthMore ? (
                <Text
                  onPress={() => {
                    setShowMore(!showMore);
                  }}
                  style={{lineHeight: 21}}>
                  {showMore ? 'Read less...' : 'Read more...'}
                </Text>
              ) : null}
            </View>
          )}
          {mediaFile && (
            <Pressable
              onPress={() => {
                navigation.navigate('imagesPost', {images: [mediaFile]});
              }}>
              <Image source={{uri: mediaFile}} style={{height: 200}} />
            </Pressable>
          )}
        </View>
        <View style={styles.likeView}>
          <Text
            onPress={toogleLike}
            style={{
              fontSize: 15,
              fontWeight: '600',
              fontFamily: 'inherit',
              color: isLike ? Colors.bluePrimary : Colors.grayPrimary,
            }}>
            Like
          </Text>
          {likeCount > 0 && (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', marginHorizontal: 5}}>
                <Icon
                  type={Icons.Entypo}
                  size={16}
                  name="dot-single"
                  color={Colors.gray}
                />
              </Text>
              <Icon
                type={Icons.AntDesign}
                size={16}
                name="like1"
                color={Colors.irisBlue}
              />
              <Text style={{fontWeight: '200', marginHorizontal: 5}}>
                {likeCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 10,
  },
  mainContent: {
    flex: 1,
    marginLeft: 10,
  },
  content: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  author: {
    color: '#F2F2F2',
    backgroundColor: '#56687A',
    marginLeft: 5,
    padding: 2,
    borderRadius: 3,
    fontSize: 13,
    fontWeight: 'normal',
  },
  textName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  likeView: {
    flexDirection: 'row',
    marginTop: 5,
    paddingLeft: 10,
    alignItems: 'center',
  },
});
