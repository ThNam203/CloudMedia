/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import CustomIcon from '../data/CustomIcon';
import Colors from '../../constants/Colors';

export default function ShowPosts({item}: any) {
  const deviceWidth = Dimensions.get('window').width;
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        marginVertical: 5,
        paddingVertical: 10,
      }}>
      <View style={Styles.flexCenter}>
        <Image
          source={{uri: item.profile_picture}}
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
            {item.connection ? (
              <Text style={{fontWeight: 'bold'}}>
                <Icon size={16} name="dot-single" color={Colors.gray} />
                {item.connection}
              </Text>
            ) : null}
          </View>
          <Text style={{width: 180}} numberOfLines={1} ellipsizeMode="tail">
            {item.title}
          </Text>
          <Text style={{fontSize: 11}}>{item.timeAgo} hr</Text>
        </View>
        {item.connection ? (
          <TouchableOpacity
            onPress={() => {}}
            style={{width: 80, alignItems: 'flex-end'}}>
            <Icon name="dots-three-vertical" size={19} color={Colors.gray} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => {}} style={Styles.flexCenter}>
            <Icon name="plus" color={Colors.irisBlue} size={22} />
            <Text
              style={{
                fontSize: 19,
                fontWeight: 'bold',
                color: Colors.skyBlue,
                marginLeft: 5,
              }}>
              Follow
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {item.content ? (
        <Text
          style={{
            paddingHorizontal: 16,
            color: Colors.black,
            marginVertical: 10,
            textAlign: 'justify',
          }}
          numberOfLines={3}
          ellipsizeMode="tail">
          {item.content}
        </Text>
      ) : (
        <View style={{marginTop: 10}} />
      )}

      {item.hasImage ? (
        <Image
          source={{uri: item.postImage}}
          style={{height: 300, width: deviceWidth}}
        />
      ) : null}

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
          <Image
            style={{height: 25, width: 25, borderRadius: 100}}
            source={{
              uri: 'data:image/png;base64,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',
            }}
          />
          <Text>{item.likes} likes</Text>
        </View>
        <View style={Styles.flexCenter}>
          {item.comments > 0 ? <Text>{item.comments} comments</Text> : null}
          {item.comments > 0 && item.shares > 0 ? (
            <Icon name="dot-single" size={16} color={Colors.gray} />
          ) : null}
          {item.shares > 0 ? <Text>{item.shares} shares</Text> : null}
        </View>
      </View>

      <View
        style={{
          borderTopColor: Colors.darkGray,
          borderTopWidth: 1,
          margin: 10,
        }}
      />

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
            name="thumbs-up"
            size={19}
            color={item.isLiked ? Colors.skyBlue : Colors.gray}
          />
          <Text style={{color: item.isLiked ? Colors.skyBlue : Colors.gray}}>
            Like
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{alignItems: 'center'}} onPress={() => {}}>
          <CustomIcon
            name="chatbubble-ellipses-outline"
            size={19}
            color={Colors.gray}
          />
          <Text>comment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{alignItems: 'center'}} onPress={() => {}}>
          <Icon name="share" size={19} color={Colors.gray} />
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
