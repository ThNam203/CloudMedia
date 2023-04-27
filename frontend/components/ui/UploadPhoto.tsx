/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import Colors from '../../constants/Colors';

function UploadPhoto(props: any) {
  const toggleModal = () => {
    props.setVisible(!props.isVisible);
  };

  const takePhotoFromCamera = () => {
    toggleModal();
    ImagePicker.openCamera({
      height: 140,
      width: 140,
      cropping: true,
      cropperCircleOverlay: true,
    })
      .then(image => {
        props.postImage(image);
        // console.log(image);
        // props.setPhoto(image.path);
      })
      .catch(err => console.log(err));
  };
  const choosePhotoFromLibrary = () => {
    toggleModal();
    ImagePicker.openPicker({
      height: 140,
      width: 140,
      cropping: true,
      cropperCircleOverlay: true,
    })
      .then(image => {
        props.postImage(image);
        // console.log(image);
        // props.setPhoto(image.path);
      })
      .catch(err => console.log(err));
  };

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
        <View style={{alignItems: 'center'}}>
          <Text style={styles.panelTitle}>Upload Photo</Text>
          <Text style={styles.panelSubtitle}>Choose Yout Profile Picture</Text>
        </View>
        <View style={styles.viewButton}>
          <Pressable
            android_ripple={{color: Colors.moodyBlue}}
            style={styles.panelButton}
            onPress={takePhotoFromCamera}>
            <Text style={styles.panelButtonTitle}>Take Photo</Text>
          </Pressable>
        </View>
        <View style={styles.viewButton}>
          <Pressable
            android_ripple={{color: Colors.moodyBlue}}
            style={styles.panelButton}
            onPress={choosePhotoFromLibrary}>
            <Text style={styles.panelButtonTitle}>Choose From Library</Text>
          </Pressable>
        </View>
        <View style={styles.viewButton}>
          <Pressable
            android_ripple={{color: Colors.moodyBlue}}
            style={styles.panelButton}
            onPress={toggleModal}>
            <Text style={styles.panelButtonTitle}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default UploadPhoto;

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

  panelTitle: {
    marginTop: 20,
    fontSize: 24,
    color: Colors.black,
    fontWeight: '500',
  },
  panelSubtitle: {
    fontSize: 13,
    color: Colors.darkGray,
    marginBottom: 40,
  },
  viewButton: {
    marginVertical: 7,
    borderRadius: 13,
    overflow: 'hidden',
    backgroundColor: Colors.irisBlue,
    alignItems: 'center',
  },
  panelButton: {
    backgroundColor: 'transparent',
    width: '100%',
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
  },
  panelButtonTitle: {
    fontSize: 17,
  },
});
