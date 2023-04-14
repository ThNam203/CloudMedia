import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const SaveButton = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handlePress = () => {
    setIsChecked(!isChecked);
  };

  return (
    <TouchableOpacity style={styles.checkbox} onPress={handlePress}>
      {isChecked ? (
        <Icon name="bookmark" size={30} color="#8f8f8f" />
      ) : (
        <Icon name="bookmark-outline" size={30} color="#8f8f8f" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    padding: 5,
  },
});

export default SaveButton;
