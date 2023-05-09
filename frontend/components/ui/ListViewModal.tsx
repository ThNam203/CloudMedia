/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {CheckBox} from '@rneui/themed';
import Modal from 'react-native-modal';
function ListViewModal(props: any) {
  const toggleModal = () => {
    props.setVisible(!props.isVisible);
  };
  const [selectedIndex, setIndex] = useState(props.selectedItem);
  const list = props.listData;
  const ListItem = ({item}: any) => (
    <TouchableOpacity
      onPress={() => {
        setIndex(item.title);
        props.setSelectedItem(item.title);
      }}
      style={{
        display: 'flex',
        marginVertical: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Text
        style={{
          color: '#323232',
          fontSize: 16,
          marginLeft: 20,
        }}>
        {item.title}
      </Text>
      <CheckBox
        checked={selectedIndex === item.title}
        onPress={() => {
          setIndex(item.title);
          props.setSelectedItem(item.title);
        }}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
      />
    </TouchableOpacity>
  );
  return (
    <Modal
      onBackdropPress={() => props.setVisible(false)}
      onBackButtonPress={() => props.setVisible(false)}
      isVisible={props.isVisible}
      swipeDirection="down"
      onSwipeComplete={toggleModal}
      animationIn="bounceInUp"
      animationOut="bounceOutDown"
      backdropOpacity={0.4}
      animationInTiming={900}
      animationOutTiming={500}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={500}
      style={styles.modal}>
      <View style={styles.modalContent}>
        <View style={styles.barIcon} />
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <Text style={{color: 'black', fontSize: 20}}>{props.title}</Text>
        </View>
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
export default ListViewModal;
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
    minHeight: 300,
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
