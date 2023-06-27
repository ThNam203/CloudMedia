/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon, {Icons} from '../components/ui/Icons';
import InvitationsList from '../components/ui/InvitationsList';

function InvitationsScreen({navigation}: any) {
  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={styles.modalContent}>
          <View style={{height: 70}} />
          <View style={{marginHorizontal: 20}}>
            <InvitationsList navigation={navigation} />
          </View>
        </View>
      </View>
      <View style={styles.topView}>
        <View style={{margin: 15, flexDirection: 'row'}}>
          <TouchableOpacity onPress={navigateBack} style={{marginTop: -3}}>
            <Icon type={Icons.Ionicons} name="arrow-back" size={35} />
          </TouchableOpacity>
          <Text style={styles.title}>Invitations</Text>
        </View>
      </View>
    </View>
  );
}
export default InvitationsScreen;
const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: 'black',
    marginLeft: 30,
    fontWeight: 'bold',
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    backgroundColor: 'white',
  },
  bottomText: {
    color: 'white',
    fontSize: 18,
  },
  topView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    elevation: 5,
  },
});
