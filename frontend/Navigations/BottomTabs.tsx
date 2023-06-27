/* eslint-disable react/no-unstable-nested-components */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Icon, {Icons} from '../components/ui/Icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import NetworkScreen from '../Screens/NetworkScreen';
import PostScreen from '../Screens/PostScreen';
import NotificationsScreen from '../Screens/NotificationsScreen';
import Colors from '../constants/Colors';
import * as Animatable from 'react-native-animatable';

import Header from '../components/ui/Header';
import {useDispatch, useSelector} from 'react-redux';
import {setPostShow} from '../reducers/UtilsReducer';
import {RootState} from '../reducers/Store';
import ProfileScreen from '../Screens/ProfileScreen';
import {setNumberNoti} from '../reducers/NotificationReducer';

const TabArr = [
  {
    route: 'Home',
    label: 'Home',
    type: Icons.Ionicons,
    activeIcon: 'grid',
    inActiveIcon: 'grid-outline',
    component: HomeScreen,
  },
  {
    route: 'Network',
    label: 'Network',
    type: Icons.MaterialCommunityIcons,
    activeIcon: 'account-group',
    inActiveIcon: 'account-group-outline',
    component: NetworkScreen,
  },
  {
    route: 'Post',
    label: 'Post',
    type: Icons.AntDesign,
    activeIcon: 'pluscircle',
    inActiveIcon: 'pluscircleo',
    component: PostScreen,
  },
  {
    route: 'Notifications',
    label: 'Notifications',
    type: Icons.MaterialCommunityIcons,
    activeIcon: 'bell',
    inActiveIcon: 'bell-outline',
    component: NotificationsScreen,
  },
  {
    route: 'Profile',
    label: 'Profile',
    type: Icons.MaterialCommunityIcons,
    activeIcon: 'account-circle',
    inActiveIcon: 'account-circle-outline',
    component: ProfileScreen,
  },
];

const Tab = createBottomTabNavigator();

const TabButton = (props: any) => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef<any>(null);

  const numberNotification = useSelector(
    (state: RootState) => state.notifications.numberNoti,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (focused) {
      viewRef.current?.animate({
        0: {scale: 0.5},
        1: {scale: 1.5},
      });
    } else {
      viewRef.current?.animate({
        0: {scale: 1.5, rotate: '360deg'},
        1: {scale: 1, rotate: '0deg'},
      });
    }
  }, [focused]);

  const handleTabPress = () => {
    if (item.route === 'Post') {
      dispatch(setPostShow(true));
    } else {
      if (item.route === 'Notifications') dispatch(setNumberNoti());
      onPress();
    }
  };

  return (
    <TouchableOpacity
      onPress={handleTabPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <Icon
          type={item.type}
          name={focused ? item.activeIcon : item.inActiveIcon}
          color={focused ? Colors.primary : Colors.primaryLite}
        />
        {item.route === 'Notifications' && numberNotification > 0 && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{numberNotification}</Text>
          </View>
        )}
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default function AnimTab({navigation}: any) {
  return (
    <Tab.Navigator
      screenOptions={{
        // headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 60,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
      }}>
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
              header: () => <Header navigation={navigation} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeContainer: {
    position: 'absolute',
    top: 15,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 15,
    height: 15,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
