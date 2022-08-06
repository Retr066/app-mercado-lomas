import { View, Animated, StyleSheet } from "react-native";
import React, { useState, useRef } from "react";
import { carruselData } from "../data";
import { CarruselItem } from "./CarruselItem";
import { Box, FlatList } from "native-base";
import { Paginator } from "./Paginator";
import { NextButton } from "./NextButton";
import { useNavigation } from "@react-navigation/native";

export const Carrusel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef<any>(null);
  const navigation = useNavigation<any>();

  const scrollX = useRef(new Animated.Value(0)).current;
  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const scrollTo = () => {
    if (currentIndex < carruselData.length - 1) {
      slidesRef.current.scrollToIndex({
        index: currentIndex + 1,
      });
    } else {
      //mover a Home screen y limpiar el stack
      navigation.navigate("Welcome");
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: "Welcome" }],
      // });
    }
  };

  return (
    <Box
      _dark={{
        backgroundColor: "dimBlack",
        color: "white",
      }}
      _light={{
        backgroundColor: "whiteReal",
        color: "black",
      }}
      style={styles.container}
    >
      <View style={{ flex: 3 }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal={true}
          bounces={false}
          keyExtractor={(item) => item.id.toString()}
          data={carruselData}
          renderItem={({ item }) => <CarruselItem key={item.id} {...item} />}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator data={carruselData} scrollX={scrollX} />
      <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / carruselData.length)} />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
