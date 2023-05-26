/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import FriendList from '../components/ui/FriendList';
import Icon, {Icons} from '../components/ui/Icons';
import InvitationsList from '../components/ui/InvitationsList';

function InvitationsScreen(props: any) {
  const toggleModal = () => {
    props.setVisible(!props.isVisible);
  };

  return (
    <Modal
      onBackdropPress={() => props.setVisible(false)}
      onBackButtonPress={() => props.setVisible(false)}
      isVisible={props.isVisible}
      style={{margin: 0}}>
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.modalContent}>
            <View style={{height: 70}} />
            <View style={{marginHorizontal: 20}}>
              <InvitationsList />
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.topView}>
        <View style={{margin: 20, flexDirection: 'row'}}>
          <TouchableOpacity onPress={toggleModal} style={{marginTop: -3}}>
            <Icon type={Icons.Ionicons} name="arrow-back" size={35} />
          </TouchableOpacity>
          <Text style={styles.title}>Invitations</Text>
        </View>
      </View>
    </Modal>
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
  },
});
