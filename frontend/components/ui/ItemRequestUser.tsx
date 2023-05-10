/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';

export default function ItemRequestUser({
  item,
  nameRequest,
  pressLeft,
  pressRight,
}: any) {
  return (
    <View
      style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 10}}>
      <Image
        source={item.avatar}
        style={{width: 80, height: 80, borderRadius: 40, marginRight: 10}}
      />
      <View>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
          {item.name}
        </Text>
        <Text style={{color: 'gray'}}>{item.connection}</Text>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              borderRadius: 10,
              backgroundColor: nameRequest === 'Sent' ? Colors.gray : '#000ed2',
              overflow: 'hidden',
              width: 130,
            }}>
            <Pressable
              disabled={nameRequest === 'Sent' ? true : false}
              onPress={pressLeft}
              android_ripple={{color: '#0073ff'}}
              style={{
                backgroundColor: 'transparent',
                elevation: 2,
                padding: 10,
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
              width: 130,
              marginLeft: 10,
            }}>
            <Pressable
              onPress={pressRight}
              android_ripple={{color: '#cccccc'}}
              style={{
                backgroundColor: 'transparent',
                elevation: 2,
                padding: 10,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Cancle
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
