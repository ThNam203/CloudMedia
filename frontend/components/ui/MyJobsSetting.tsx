/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import Icon, {Icons} from './Icons';
function MyJobsSetting(props: any) {
  const toggleModal = () => {
    props.setVisible(!props.isVisible);
  };
  const list = [
    {title: 'Send in a message', icon: 'send'},
    {title: 'Share via..', icon: 'share-alt'},
    {title: 'Unsave', icon: 'bookmark-o'},
  ];
  const ListItem = ({item}: any) => (
    <TouchableOpacity
      onPress={() => {}}
      style={{
        display: 'flex',
        marginVertical: 7,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={{width: 50}}>
        <Icon
          name={item.icon}
          type={Icons.FontAwesome}
          size={25}
          color={'gray'}
          style={{marginLeft: 20}}
        />
      </View>

      <Text
        style={{
          color: 'gray',
          fontWeight: 'bold',
          fontSize: 16,
          marginLeft: 20,
        }}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
  return (
    <Modal
      onBackdropPress={() => props.setVisible(false)}
      onBackButtonPress={() => props.setVisible(false)}
      isVisible={props.isVisible}
      swipeDirection="down"
      onSwipeComplete={toggleModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.4}
      style={styles.modal}>
      <View style={styles.modalContent}>
        <View style={styles.barIcon} />
        <View
          style={{
            elevation: 1,
            paddingVertical: 20,
          }}>
          <FlatList data={list} renderItem={ListItem} />
        </View>
      </View>
    </Modal>
  );
}
export default MyJobsSetting;
const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: 150,
    paddingBottom: 20,
    elevation: 5,
  },
  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: '#bbb',
    borderRadius: 3,
    alignSelf: 'center',
  },
});
