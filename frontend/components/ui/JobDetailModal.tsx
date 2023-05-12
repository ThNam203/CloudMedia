/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {CheckBox} from '@rneui/themed';
import Modal from 'react-native-modal';
import {Image} from 'react-native-animatable';
import Icon, {Icons} from './Icons';
import {Pressable} from 'react-native';

function JobDetailModal(props: any) {
  const job = props.jobData;
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  const toggleModal = () => {
    props.setVisible(!props.isVisible);
  };
  return (
    <Modal
      onBackdropPress={() => props.setVisible(false)}
      onBackButtonPress={() => props.setVisible(false)}
      isVisible={props.isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.modal}>
      <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.modalContent}>
          <View style={{height: 50}} />
          <View style={{marginTop: 20, marginHorizontal: 12}}>
            <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
              {job.title}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 10,
              marginHorizontal: 12,
            }}>
            <Image style={{width: 40, height: 40}} source={{uri: job.logo}} />
            <View style={{marginHorizontal: 20}}>
              <Text style={styles.text}>{job.company}</Text>
              <Text style={styles.text}>{job.location}</Text>
            </View>
          </View>
          <Text style={{color: 'grey', fontSize: 14, marginHorizontal: 12}}>
            {job.dateAgo}
          </Text>
          <View style={{marginVertical: 20, marginHorizontal: 12}}>
            <View style={{flexDirection: 'row'}}>
              <Icon type={Icons.Entypo} name="briefcase" />
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  marginHorizontal: 10,
                  marginTop: 3,
                }}>
                {job.jobType}
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginVertical: 10}}>
              <Icon type={Icons.FontAwesome} name="building" />
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  marginHorizontal: 10,
                  marginTop: 3,
                }}>
                {job.workplaceType}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                overflow: 'hidden',
                borderRadius: 20,
                backgroundColor: '#0f3774',
                marginHorizontal: 12,
                marginBottom: 20,
              }}>
              <Pressable
                android_ripple={{color: '#001562'}}
                style={{paddingHorizontal: 65, paddingVertical: 10}}>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                  Apply
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                overflow: 'hidden',
                borderRadius: 20,
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#0f3774',
                marginHorizontal: 12,
                marginBottom: 20,
              }}>
              <Pressable
                android_ripple={{color: '#2450f1'}}
                style={{paddingHorizontal: 65, paddingVertical: 10}}>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', color: '#0f3774'}}>
                  Apply
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={{height: 5, backgroundColor: '#ccc'}} />
          <View style={{marginHorizontal: 12, marginTop: 10}}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
              Job Description
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                lineHeight: 22,
              }}
              numberOfLines={expanded ? undefined : 15}>
              {job.jobDescription}
            </Text>
            {!expanded && (
              <TouchableOpacity onPress={toggleExpanded}>
                <Text style={{color: '#007AFF', marginTop: 5}}>Show more</Text>
              </TouchableOpacity>
            )}
            {expanded && (
              <TouchableOpacity onPress={toggleExpanded}>
                <Text style={{color: '#007AFF', marginTop: 5}}>Show less</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.topView}>
        <View style={{margin: 20, flexDirection: 'row'}}>
          <TouchableOpacity onPress={toggleModal} style={{marginTop: 3}}>
            <Icon type={Icons.AntDesign} name="close" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
export default JobDetailModal;
const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingTop: 12,
    minHeight: 300,
    paddingBottom: 20,
    elevation: 5,
    flex: 1,
  },
  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: '#bbb',
    borderRadius: 3,
    alignSelf: 'center',
  },
  text: {
    color: 'black',
  },
  topView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    elevation: 10,
  },
});
