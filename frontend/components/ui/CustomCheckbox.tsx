/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

function CustomCheckBox() {
  const [isSelected, setSelection] = useState(false);

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={() => setSelection(!isSelected)}>
      <View
        style={{
          width: 20,
          height: 20,
          borderWidth: 1,
          borderRadius: 5,
          marginRight: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {isSelected ? (
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 3,
              backgroundColor: 'blue',
            }}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

export default CustomCheckBox;