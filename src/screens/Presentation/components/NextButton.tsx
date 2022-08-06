import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import Svg, { G, Circle } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "native-base";
export const NextButton = ({ percentage, scrollTo }: { percentage: number; scrollTo: () => void }) => {
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const { colors } = useTheme();
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef<any>(null);

  const animation = (toValue: number) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener((value: any) => {
      const strokeDashoffset = circumference - (circumference * value.value) / 100;
      if (progressRef?.current) {
        progressRef.current.setNativeProps({ strokeDashoffset });
      }
    });

    return () => {
      progressAnimation.removeAllListeners();
    };
  }, [percentage]);
  console.log(colors.whiteBlue);
  return (
    <View style={style.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          <Circle ref={progressRef} stroke="#ccc" cx={center} cy={center} r={radius} strokeWidth={strokeWidth} />
          <Circle
            ref={progressRef}
            stroke={colors.whiteBlue}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
          />
        </G>
      </Svg>
      <TouchableOpacity onPress={scrollTo} style={[style.button, { backgroundColor: colors.whiteBlue }]} activeOpacity={0.6}>
        <AntDesign name="arrowright" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    borderRadius: 100,
    padding: 20,
  },
});
