import {View, FlatList} from 'react-native';
import React from 'react';
import {Posts} from '../components/data/Posts';
import ShowPosts from '../components/ui/ShowPosts';
import {useSelector} from 'react-redux';
import {RootState} from '../reducers/Store';

export default function HomeScreen({navigation}: any) {
  const StatusData = useSelector((state: RootState) => state.statusPost.arr);

  return (
    <View>
      <FlatList
        data={StatusData}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <ShowPosts navigation={navigation} item={item} />
        )}
      />
    </View>
  );
}
