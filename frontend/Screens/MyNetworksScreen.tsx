import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import Icon, {Icons} from '../components/ui/Icons';
import ShowNetwork from '../components/ui/ShowNetwork';
import {RootState} from '../reducers/Store';
import {useSelector} from 'react-redux';
import {Toast} from '../components/ui/Toast';
import {getInfoUser} from '../api/userApi';

export default function MyNetworksScreen(props: any) {
  const {navigation, isVisible, setVisible} = props;

  const connectionsId = useSelector(
    (state: RootState) => state.userInfo.connections,
  );

  const [connections, setConnection] = useState<any[]>([]);

  const toggleModal = () => {
    setVisible(!isVisible);
  };

  useEffect(() => {
    const getInfoConnection = async () => {
      for (const id of connectionsId) {
        try {
          const response: any = await getInfoUser(id);
          if (response.status === 200) {
            setConnection(prev => [...prev, response.data]);
          } else {
            console.log(response.status);
            throw new Error(response.data.errorMessage);
          }
        } catch (error: any) {
          Toast(error.message);
        }
      }
    };
    getInfoConnection();
  }, []);

  return (
    <Modal
      onBackdropPress={() => setVisible(false)}
      onBackButtonPress={() => setVisible(false)}
      isVisible={isVisible}
      style={{margin: 0}}>
      <View style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.modalContent}>
            <View style={{height: 70}} />
            <View style={{marginHorizontal: 20}}></View>
            <View style={styles.connectionsContainer}>
              {connections.map((item, index) => (
                <ShowNetwork item={item} navigation={navigation} key={index} />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.topView}>
        <View style={{margin: 20, flexDirection: 'row'}}>
          <TouchableOpacity onPress={toggleModal} style={{marginTop: -3}}>
            <Icon type={Icons.Ionicons} name="arrow-back" size={35} />
          </TouchableOpacity>
          <Text style={styles.title}>My Network</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
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
  connectionsContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
