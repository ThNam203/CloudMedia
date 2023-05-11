/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  FlatList,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Icon, {Icons} from '../components/ui/Icons';
import FriendList from '../components/ui/FriendList';

function NetworkScreen({navigation}: any) {
  const [icon_1] = useState(new Animated.Value(40));
  const [icon_2] = useState(new Animated.Value(40));
  const [icon_3] = useState(new Animated.Value(40));

  const [friends, setFriends] = useState(friendsData);

  const [pop, setPop] = useState(false);

  const friendsData = [
    {
      id: '1',
      name: 'John Doe',
      connection: 'Friend',
      avatar: require('../assets/images/DefaultAvatar.png'),
    },
    {
      id: '2',
      name: 'Jane Smith',
      connection: 'Family',
      avatar: require('../assets/images/DefaultAvatar.png'),
    },
    {
      id: '3',
      name: 'Bob Johnson',
      connection: 'Colleague',
      avatar: require('../assets/images/DefaultAvatar.png'),
    },
  ];

  const renderItem = ({item}) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
      }}>
      <Image
        source={item.avatar}
        style={{width: 50, height: 50, borderRadius: 25, marginRight: 10}}
      />
      <View>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.name}</Text>
        <Text style={{color: 'gray'}}>{item.connection}</Text>
      </View>
    </View>
  );

  const popIn = () => {
    setPop(true);
    Animated.timing(icon_1, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 110,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const popOut = () => {
    setPop(false);
    Animated.timing(icon_1, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, {bottom: icon_1}]}>
        <TouchableOpacity>
          <Icon
            type={Icons.FontAwesome}
            name="address-book-o"
            size={25}
            color="#0A66C2"
          />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.circle, {bottom: icon_2, right: icon_2}]}>
        <TouchableOpacity>
          <Icon
            type={Icons.AntDesign}
            name="qrcode"
            size={25}
            color="#0A66C2"
          />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.circle, {right: icon_3}]}>
        <TouchableOpacity>
          <Icon
            type={Icons.MaterialIcons}
            name="group-add"
            size={25}
            color="#0A66C2"
          />
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity
        style={[styles.circle, {backgroundColor: '#0A66C2'}]}
        onPress={() => {
          pop === false ? popIn() : popOut();
        }}>
        <Icon type={Icons.AntDesign} name="adduser" size={25} color="#FFFF" />
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.manageNetworkView}>
          <Text style={styles.title}>Manage my network</Text>
          <Icon type={Icons.AntDesign} name={'right'} />
        </View>
      </TouchableOpacity>
      <View style={{backgroundColor: '#eeeeee', height: 10}} />
      <TouchableOpacity>
        <View style={styles.manageNetworkView}>
          <Text style={styles.title}>Invitation</Text>
          <Icon type={Icons.AntDesign} name={'right'} />
        </View>
      </TouchableOpacity>
      <View style={{backgroundColor: '#eeeeee', height: 10}} />
      <View>
        <View style={styles.manageNetworkView}>
          <Text style={styles.title}>People you may know</Text>
        </View>
        <View style={{marginLeft: 20}}>
          <FriendList />
        </View>
      </View>
    </View>
  );
}

export default NetworkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  manageNetworkView: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#0A66C2',
    fontSize: 20,
    fontWeight: 'bold',
  },
  circle: {
    backgroundColor: 'white',
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 40,
    right: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
