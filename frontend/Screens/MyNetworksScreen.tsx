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
import {useDispatch, useSelector} from 'react-redux';
import {Toast} from '../components/ui/Toast';
import {getInfoUser} from '../api/userApi';
import {getAllFrOfUser} from '../api/friend_api';
import {setStatus} from '../reducers/LoadingReducer';

export default function MyNetworksScreen({navigation}: any) {
  const uid = useSelector((state: RootState) => state.uid.id);
  const jwt = useSelector((state: RootState) => state.token.key);

  const dispatch = useDispatch();

  const [connections, setConnection] = useState<any[]>([]);

  const navigateBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const getInfoConnection = async () => {
      // for (const id of connectionsId) {
      try {
        dispatch(setStatus(true));
        // const response: any = await getInfoUser(id);
        const response: any = await getAllFrOfUser(uid, jwt);
        dispatch(setStatus(false));
        if (response.status === 200) {
          setConnection(prev => response.data);
        } else {
          console.log(response.status);
          throw new Error(response.data.errorMessage);
        }
      } catch (error: any) {
        Toast(error.message);
      }
      // }
    };
    getInfoConnection();
  }, []);

  if (connections.length === 0) {
    return (
      <View>
        <View style={styles.topView}>
          <View style={{margin: 10, flexDirection: 'row'}}>
            <TouchableOpacity onPress={navigateBack} style={{marginTop: -3}}>
              <Icon type={Icons.Ionicons} name="arrow-back" size={35} />
            </TouchableOpacity>
            <Text style={styles.title}>My Network</Text>
          </View>
        </View>
        <Text
          style={{
            marginTop: 50,
            fontSize: 25,
            alignSelf: 'center',
            color: 'gray',
          }}>
          You have no connections
        </Text>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.modalContent}>
              <View style={{height: 70}} />
              <View style={{marginHorizontal: 20}}></View>
              <View style={styles.connectionsContainer}>
                {connections.map((item, index) => (
                  <ShowNetwork
                    item={item}
                    navigation={navigation}
                    key={index}
                  />
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.topView}>
          <View style={{margin: 10, flexDirection: 'row'}}>
            <TouchableOpacity onPress={navigateBack} style={{marginTop: -3}}>
              <Icon type={Icons.Ionicons} name="arrow-back" size={35} />
            </TouchableOpacity>
            <Text style={styles.title}>My Network</Text>
          </View>
        </View>
      </View>
    );
  }
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
    elevation: 10,
  },
  connectionsContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
