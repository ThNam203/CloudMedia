import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon, {Icons} from '../components/ui/Icons';
import Colors from '../constants/Colors';
import CustomIcon from '../components/data/CustomIcon';

export default function DetailStatusScreen({navigation, route}: any) {
  const deviceWidth = Dimensions.get('window').width;

  const {item} = route.params;

  const [showMore, setShowMore] = useState(false);
  return (
    <View>
      <ScrollView contentContainerStyle={{flexGrow: 1, marginTop: 57}}>
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
              <Text style={{fontSize: 11}}>3 hr</Text>
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
              // ) : (
              //   <TouchableOpacity onPress={() => {}} style={Styles.flexCenter}>
              //     <Icon
              //       type={Icons.Entypo}
              //       name="plus"
              //       color={Colors.irisBlue}
              //       size={22}
              //     />
              //     <Text
              //       style={{
              //         fontSize: 19,
              //         fontWeight: 'bold',
              //         color: Colors.skyBlue,
              //         marginLeft: 5,
              //       }}>
              //       Follow
              //     </Text>
              //   </TouchableOpacity>
              // )
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

            <TouchableOpacity style={{alignItems: 'center'}} onPress={() => {}}>
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
          {/* <Text style={[styles.title, {marginLeft: 30}]}>My Jobs</Text> */}
        </View>
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
});
