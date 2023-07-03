import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers/Store';
import {setCallShow} from '../../reducers/UtilsReducer';
import Modal from 'react-native-modal';

export default function VideoCallScreen() {
  const callMer = useSelector((state: RootState) => state.Utils.call);
  // get data from redux
  // callMer.data is the data that you want to get
  const user = useSelector((state: RootState) => state.userInfo);
  const token = useSelector((state: RootState) => state.token.key);
  const uid = useSelector((state: RootState) => state.uid.id);
  const dispatch = useDispatch();
  const toggleModal = () => {
    dispatch(setCallShow(!callMer.visible));
  };
  return (
    <Modal
      onBackdropPress={() => dispatch(setCallShow(false))}
      onBackButtonPress={() => dispatch(setCallShow(false))}
      isVisible={callMer.visible}
      swipeDirection="down"
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={{margin: 0}}>
      <View style={styles.container}>
        <Text>{callMer.data?.alo || 'video nè'}</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
