/* eslint-disable react-native/no-inline-styles */
import {CheckBox} from '@rneui/themed';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

function CustomCheckBox(props: any) {
  return (
    <CheckBox
      checked={props.isSelected}
      onPress={() => props.setSelection(!props.isSelected)}
      iconType="material-community"
      checkedIcon="checkbox-marked"
      uncheckedIcon="checkbox-blank-outline"
      checkedColor="blue"
      title={props.title}
      containerStyle={{
        padding: 0,
      }}
      textStyle={{
        fontWeight: '400',
        color: '#808080',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontSize: 16,
        lineHeight: 19,
      }}
    />
  );
}

export default CustomCheckBox;
