/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Icon, {Icons} from '../components/ui/Icons';
import ItemRequestUser from '../components/ui/ItemRequestUser';
import {useSelector} from 'react-redux';
import {RootState} from '../reducers/Store';
import {SearchUsersByEmail, SearchUsersByName} from '../api/Utils';
import {createRequestByEmail} from '../api/friend_api';
import {Toast} from '../components/ui/Toast';
import {useIsFocused} from '@react-navigation/native';

export default function SearchScreen({navigation}: any) {
  const [text, setText] = useState('');

  const token = useSelector((state: RootState) => state.token.key);
  const uid = useSelector((stata: RootState) => stata.uid.id);

  const [listData, setListData] = useState([]);
  const isFocused = useIsFocused();

  const searchRef = useRef<TextInput>(null);

  const clearText = () => {
    setText('');
  };

  setTimeout(() => {
    searchRef.current?.focus();
  }, 100);

  const handleAddFr = async (email: any) => {
    // console.log(email);
    createRequestByEmail(email, uid, token)
      .then((response: any) => {
        if (response.status === 200) {
          return response.data;
        } else {
          console.log(response.status);
          throw new Error(response.data.errorMessage);
        }
      })
      .then(data => {
        console.log(data);
        setListData((prev: any) => {
          return prev.map((item: any) => {
            if (item.email === email) {
              return {
                ...item,
                isFriend: 'pending',
              };
            }
            return item;
          });
        });
      })
      .catch(error => {
        Toast(error.message);
      });
  };

  useEffect(() => {
    const filtertext = async () => {
      try {
        if (/\S+@\S+\.\S+/.test(text)) {
          const response: any = await SearchUsersByEmail(text, uid, token);
          if (response.status === 200) {
            // console.log(response.data);
            setListData(response.data);
          } else {
            console.log(response.status);
            throw new Error(response.data.errorMessage);
          }
        } else {
          const response: any = await SearchUsersByName(text, uid, token);
          if (response.status === 200) {
            // console.log(response.data);
            setListData(response.data);
          } else {
            console.log(response.status);
            throw new Error(response.data.errorMessage);
          }
        }
      } catch (error: any) {
        Toast(error.message);
      }
    };
    filtertext();
  }, [text, isFocused]);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.topView}>
        <View style={{margin: 20, flexDirection: 'row'}}>
          <TouchableOpacity
            style={{marginTop: 3}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon type={Icons.AntDesign} name="arrowleft" />
          </TouchableOpacity>
          <TextInput
            ref={searchRef}
            style={styles.input}
            placeholder="Search"
            onChangeText={textinput => setText(textinput)}
            value={text}
          />
          {text.length > 0 && (
            <TouchableOpacity onPress={clearText} style={styles.clearButton}>
              <Icon type={Icons.AntDesign} name="closecircle" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <FlatList
        data={listData}
        renderItem={({item}: any) => (
          <ItemRequestUser
            item={item}
            navigation={navigation}
            nameRequest={
              item.isFriend == 'true'
                ? 'Friend'
                : item.isFriend == 'false'
                ? 'Add Friend'
                : 'Sent Request'
            }
            nameRequest2="Show Profile"
            pressLeft={() => handleAddFr(item.email)}
            pressRight={() =>
              navigation.navigate('profileOther', {id: item._id})
            }
          />
        )}
        keyExtractor={(item, index) => 'key' + index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topView: {
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
    marginHorizontal: 10,
  },
  clearButton: {
    marginLeft: 5,
  },
});
