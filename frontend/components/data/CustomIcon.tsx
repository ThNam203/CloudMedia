import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';

export default function CustomIcon({size, color, name, ...props}: any) {
  return <Icon size={size} color={color} name={name} {...props} />;
}
