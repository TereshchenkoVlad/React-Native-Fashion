import React from "react";
import { Animated } from "react-native";

interface DotProps {
  index: number;
  animationValue: Animated.Value;
}

const Dot = ({ animationValue, index }: DotProps) => {
  const opacity = animationValue.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.5, 1, 0.5],
    extrapolate: "clamp",
  });

  const scale = animationValue.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [1, 1.25, 1.25],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={{
        transform: [{ scale }],
        opacity,
        backgroundColor: "#2CB9B0",
        width: 8,
        height: 8,
        borderRadius: 50,
        margin: 4,
      }}
    />
  );
};

export default Dot;
