import React, { useCallback, useRef, useState } from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  VStack,
  Box,
  Image,
  Button,
  View,
  Container,
  Flex,
  Spacer,
  CheckIcon,
  useTheme,
} from "native-base";
import { Ionicons, Foundation, MaterialIcons } from "@expo/vector-icons";
import { Dimensions, ImageBackground } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationProp } from "@react-navigation/native";
import { ToggleDarkMode } from "../../components";

// const logo = require("../assets/logo.png");

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

type CarruselItem = { title: string; text: any; uri?: any; Icon?: any };

interface ItemsCarruselProps {
  activeIndex: number;
  carruselItems: CarruselItem[];
}
// const INITIAL_STATE: ItemsCarruselProps = {
//   activeIndex: 0,
//   carruselItems: [
//     {
//       title: "Todo siempre en la mano",
//       text: " Conoce tu monto a pagar y los últimos pagos realizados",
//       uri: require("../assets/mercado.png"),
//       Icon: () => <Image alt="logo-mercado-lomas" source={logo} style={{ width: 150, height: 150 }} />,
//     },
//     {
//       title: "Recibe Notificaciones",
//       text: "Recibe notificaciones de los pagos realizados y pagos que están pendientes",
//       uri: require("../assets/mercado.png"),
//       Icon: () => <Ionicons name="notifications-outline" size={150} color="white" />,
//     },
//     {
//       title: "Historial de Pagos",
//       text: "Podrás ver tu historial de pagos",
//       uri: require("../assets/mercado.png"),
//       Icon: () => <Foundation name="dollar-bill" size={150} color="white" />,
//     },
//     {
//       title: "Boleta Pagos",
//       text: "Podras descargar tu boleta de pagos",
//       uri: require("../assets/mercado.png"),
//       Icon: () => <MaterialIcons name="history" size={150} color="white" />,
//     },
//   ],
// };

export const WelcomeScreen = ({ navigation }: RouterProps) => {
  const { colors } = useTheme();

  return (
    <>
      <Flex position="absolute" h={"100%"} w={"100%"} justifyContent={"flex-end"} alignItems={"center"}>
        <Box paddingX={10} w={"100%"} alignSelf="center">
          <Center>
            <ToggleDarkMode />
            <Button
              marginBottom={3}
              colorScheme="dark"
              onPress={() => {
                navigation.navigate("Login");
              }}
              variant="solid"
              size="lg"
              padding={2}
              width="100%"
            >
              <Text color="black" bold>
                INICIAR SESIÓN
              </Text>
            </Button>
          </Center>

          <Center>
            <Button
              marginBottom={3}
              colorScheme="primary"
              onPress={() => {
                navigation.navigate("Register");
              }}
              variant="solid"
              size="lg"
              padding={2}
              width="100%"
            >
              <Text color="white" bold>
                REGISTRARSE
              </Text>
            </Button>
          </Center>
        </Box>
      </Flex>
    </>
  );
};
