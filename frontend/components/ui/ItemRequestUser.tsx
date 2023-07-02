/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import {TouchableOpacity} from 'react-native';

export default function ItemRequestUser({
  item,
  navigation,
  pressLeft,
  pressRight,
  nameRequest,
  nameRequest2,
}: any) {
  const {_id, name, profileImagePath, isFriend} = item;

  const navigateToProfile = () => {
    navigation.navigate('profileOther', {id: _id});
  };

  return (
    <TouchableOpacity
      onPress={navigateToProfile}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
      }}>
      <Image
        source={
          profileImagePath
            ? {uri: profileImagePath}
            : require('../../assets/images/Spiderman.jpg')
        }
        style={{width: 60, height: 60, borderRadius: 40, marginRight: 10}}
      />
      <View style={{flex: 1}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
          {name}
        </Text>
        {item.datebetween && (
          <Text style={{color: 'gray'}}>{`${item.datebetween}`}</Text>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              borderRadius: 10,
              backgroundColor:
                isFriend == 'false' ||
                nameRequest == 'Accept' ||
                nameRequest == 'Add Friend'
                  ? '#000ed2'
                  : Colors.gray,
              overflow: 'hidden',
            }}>
            <Pressable
              disabled={
                isFriend == 'false' ||
                nameRequest == 'Accept' ||
                nameRequest == 'Add Friend'
                  ? false
                  : true
              }
              onPress={pressLeft}
              android_ripple={{color: '#0073ff'}}
              style={{
                backgroundColor: 'transparent',
                elevation: 2,
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                {nameRequest}
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              borderRadius: 10,
              backgroundColor: '#eeeeee',
              overflow: 'hidden',
              marginLeft: 10,
            }}>
            <Pressable
              onPress={pressRight}
              android_ripple={{color: '#cccccc'}}
              style={{
                backgroundColor: 'transparent',
                elevation: 2,
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                {nameRequest2}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
