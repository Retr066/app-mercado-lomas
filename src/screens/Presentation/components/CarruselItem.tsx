import { useWindowDimensions } from "react-native";
import React, { FC } from "react";
import { CarruselItemProps } from "../interfaces";
import { Box, Text, Heading } from "native-base";
import { SvgCssUri } from "react-native-svg";
export const CarruselItem: FC<CarruselItemProps> = ({ text, title, uri }) => {
  const { width } = useWindowDimensions();
  return (
    <Box
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      width={width}
    >
      <Box flex={0.7} justifyContent="center" alignItems="center">
        <SvgCssUri width={width - 10} height={250} uri={uri} />
      </Box>

      <Box flex={0.3}>
        <Heading color="whiteBlue" textAlign="center" size="xl" mb="4">
          {title}
        </Heading>
        <Text textAlign="center" fontSize="sm">
          {text}
        </Text>
      </Box>
    </Box>
  );
};
