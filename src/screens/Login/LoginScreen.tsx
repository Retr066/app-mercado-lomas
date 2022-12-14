import React, { useState } from "react";
import { Box, Button, Center, FormControl, Heading, HStack, Input, Link, VStack, Text, IconButton, Icon } from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import app from "../../config/firebaseConfig";
import { getAuth, FacebookAuthProvider, signInWithCredential } from "firebase/auth";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import { Formik } from "formik";
import * as Yup from "yup";
import { InputCustom } from "../../components";

export const LoginScreen = () => {
  const [show, setShow] = useState(false);

  const SignInWithFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(["public_profile", "email"]);
      if (result.isCancelled) {
        throw new Error("User cancelled");
      }
      const token = await AccessToken.getCurrentAccessToken();
      if (!token) {
        throw new Error("No token");
      }
      const auth = getAuth(app);
      const credential = FacebookAuthProvider.credential(token.accessToken);
      const user = await signInWithCredential(auth, credential);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  // async function logIn() {
  //   try {
  //     await Facebook.initializeAsync({
  //       appId: '517540939968886'
  //     })
  //     const responseFb = await Facebook.logInWithReadPermissionsAsync({
  //       permissions: ['public_profile', 'email']
  //     })
  //     if (responseFb.type === 'success') {
  //       // Get the user's name using Facebook's Graph API

  //       const response = await fetch(
  //         `https://graph.facebook.com/me?access_token=${responseFb.token}`
  //       )
  //       Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`)
  //     } else {
  //       // type === 'cancel'
  //     }
  //   } catch ({ message }) {
  //     alert(`Facebook Login Error: ${message}`)
  //   }
  // }
  return (
    <Center w="100%">
      <Box safeArea py="5" w="90%" maxW="370px">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Bienvenido
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Inicia Sesi??n para continuar!
        </Heading>

        <VStack space={3} mt="5">
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
              console.log(values);
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email("Email no v??lido").required("El email es requerido"),
              password: Yup.string().min(6, "La contrasena debe tener al menos 6 caracteres").required("La contrase??a es requerida"),
            })}
          >
            {({ handleSubmit }) => (
              <>
                <InputCustom type="text" label="Correo Electr??nico" name="email" placeholder="Escriba sus nombres" />
                <InputCustom type="password" label="Contrase??a" name="password" placeholder="Escribe tu contrase??a" />
                <Link
                  _text={{
                    fontSize: "xs",
                    fontWeight: "500",
                    color: "indigo.500",
                  }}
                  alignSelf="flex-end"
                  mt="2"
                >
                  Olvidaste tu Contrase??a?
                </Link>

                <Button onPress={() => handleSubmit()} mt="2" colorScheme="indigo">
                  Iniciar Sesi??n
                </Button>
              </>
            )}
          </Formik>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              ??No tienes una cuenta?.{" "}
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              href="#"
            >
              Reg??strate
            </Link>
          </HStack>
          <HStack justifyContent="center" alignItems="center">
            <IconButton
              onPress={SignInWithFacebook}
              variant="unstyled"
              icon={<Icon as={<MaterialCommunityIcons name="facebook" />} color="blue.700" size="5xl" />}
            />
            <IconButton variant="unstyled" icon={<Icon as={<MaterialCommunityIcons name="google" />} color="red.700" size="5xl" />} />
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};
