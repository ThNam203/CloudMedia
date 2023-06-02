import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Toast} from './Toast';
import Colors from '../../constants/Colors';
import Icon, {Icons} from './Icons';

export default function ShowNetwork(props: any) {
  const {item, navigation} = props;

  const navigateToProfile = () => {
    navigation.navigate('profileOther', {id: item._id});
  };

  return (
    <View
      style={{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.gray,
        margin: 7,
        width: 160,
        height: 270,
        alignItems: 'center',
      }}>
      <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
        <Image
          source={require('../../assets/images/DefaultBackgroundAvatar.jpg')}
          style={{
            width: '100%',
            height: 70,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}
        />
        <Image
          source={
            item.profileImagePath
              ? {uri: item.profileImagePath}
              : require('../../assets/images/Spiderman.jpg')
          }
          style={{borderRadius: 100, height: 100, width: 100, marginTop: -50}}
        />
        <Text
          style={{
            fontSize: 19,
            color: Colors.black,
            fontWeight: 'bold',
            paddingHorizontal: 7,
            marginTop: 5,
            textAlign: 'center',
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            fontSize: 15,
            paddingHorizontal: 7,
            textAlign: 'center',
            marginBottom: 10,
            height: 35,
          }}>
          {item.userRole}
        </Text>
      </View>
      <View style={{height: 65, alignItems: 'center'}}>
        {item.connections.length > 0 ? (
          <View style={styles.flexCenter}>
            <Icon
              icon="ellipsis-horizontal-circle"
              type={Icons.Ionicons}
              size={16}
              color={Colors.gray}
            />
            <Text style={{fontSize: 13, marginLeft: 2}}>
              {item.connections.length} connections
            </Text>
          </View>
        ) : (
          <View style={{height: 20}} />
        )}
        <TouchableOpacity
          onPress={navigateToProfile}
          style={{
            bottom: 10,
            borderWidth: 1,
            borderColor: Colors.bluePrimary,
            borderRadius: 50,
            paddingHorizontal: 30,
            paddingVertical: 2,
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontSize: 19,
              fontWeight: 'bold',
              color: Colors.bluePrimary,
            }}>
            View
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flexCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
