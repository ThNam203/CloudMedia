/* eslint-disable react/no-unstable-nested-components */
import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Icon, {Icons} from '../components/ui/Icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import NetworkScreen from '../Screens/NetworkScreen';
import PostScreen from '../Screens/PostScreen';
import JobsScreen from '../Screens/JobsScreen';
import NotificationsScreen from '../Screens/NotificationsScreen';
import Colors from '../constants/Colors';
import * as Animatable from 'react-native-animatable';

import Header from '../components/ui/Header';
import {useDispatch, useSelector} from 'react-redux';
import {setPostShow} from '../reducers/Post_reducer';
import {RootState} from '../reducers/Store';

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
    bellBadge: 'bell-badge-outline',
    component: NotificationsScreen,
  },
  {
    route: 'Jobs',
    label: 'Jobs',
    type: Icons.MaterialCommunityIcons,
    activeIcon: 'briefcase-variant',
    inActiveIcon: 'briefcase-variant-outline',
    component: JobsScreen,
  },
];

const Tab = createBottomTabNavigator();

const TabButton = (props: any) => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);

  const numberNotification = useSelector(
    (state: RootState) => state.notifications.numberNoti,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: {scale: 0.5, rotate: '0deg'},
        1: {scale: 1.5, rotate: '360deg'},
      });
    } else {
      viewRef.current.animate({
        0: {scale: 1.5, rotate: '360deg'},
        1: {scale: 1, rotate: '0deg'},
      });
    }
  }, [focused]);

  const showPost = () => {
    dispatch(setPostShow(true));
  };

  return (
    <TouchableOpacity
      onPress={item.route === 'Post' ? showPost : onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <Icon
          type={item.type}
          name={
            focused
              ? item.activeIcon
              : numberNotification && item.route === 'Notifications'
              ? item.bellBadge
              : item.inActiveIcon
          }
          color={focused ? Colors.primary : Colors.primaryLite}
        />
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
});
