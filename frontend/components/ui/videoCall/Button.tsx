import React from "react";
import { TouchableOpacity, Text } from "react-native";
import colors from "./colors";

const Button = ({
  text,
  backgroundColor,
  onPress,
  style = {},
  textStyle = {},
}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: backgroundColor ? backgroundColor : "#5568FE",
        borderRadius: 12,
        marginVertical: 12,
        ...style,
      }}
    >
      <Text
        style={{
          color: colors.primary["100"],
          fontSize: 16,
          ...textStyle,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
export default Button;