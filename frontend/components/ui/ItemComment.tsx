import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import Icon, {Icons} from './Icons';

export default function ItemComment({navigation, item, IdAuthorOfStatus}: any) {
  const {author, content, mediaFile, createdAt} = item;

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
        <View style={styles.header}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity>
              <Text style={styles.textName}>{author.name || 'Alalalaa'}</Text>
            </TouchableOpacity>
            {author._id === IdAuthorOfStatus && (
              <Text style={styles.author}>Author</Text>
            )}
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: -5,
            }}>
            <TouchableOpacity style={{padding: 3}}>
              <Icon type={Icons.Entypo} name="dots-three-vertical" size={15} />
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
        <Text style={{fontSize: 11}}>11h</Text>
        <View style={{height: 10}} />
        {content && (
          <Text style={{color: Colors.black, marginVertical: 5}}>
            {content}
          </Text>
        )}
        {mediaFile && (
          <Image
            source={{uri: mediaFile}}
            style={{height: 200}}
            resizeMode="contain"
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 10,
  },
  mainContent: {
    flex: 1,
    marginLeft: 10,
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
});
