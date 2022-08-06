import React, { useState } from "react";
import { Button, Center, FormControl, Heading, Icon, Input, VStack, WarningOutlineIcon } from "native-base";
import { InputCustom, ToggleDarkMode } from "../../components";
import { Formik, FormikErrors, FormikProps } from "formik";
import { RegisterFormProps } from "../../interfaces/register.interface";
import * as Yup from "yup";
import validator from "validator";
export const RegisterScreen = () => {
  const [show, setShow] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const INITIAL_STATE: RegisterFormProps = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  const validate = ({ name, lastName, email, password, passwordConfirmation }: RegisterFormProps) => {
    let errors: FormikErrors<RegisterFormProps> = {};

    if (name.trim().length < 3) {
      errors.name = "El nombre debe tener al menos 3 caracteres como mínimo";
    } else if (lastName.trim().length < 3) {
      errors.lastName = "El apellido debe tener al menos 3 caracteres como mínimo";
    } else if (!validator.isEmail(email)) {
      errors.email = "Debe ser un email valido";
    } else if (password.trim().length < 6) {
      errors.password = "La contraseña es muy corta";
    } else if (password !== passwordConfirmation) {
      errors.passwordConfirmation = "Las contraseñas no coinciden";
    }

    return errors;
  };

  const onSubmit = (data: RegisterFormProps) => {
    console.log("submiting with ", data);
  };
  return (
    <Center w="100%" justifyContent="flex-start" paddingY={5} flex={1} _dark={{ bg: "blueGray.900" }} _light={{ bg: "blueGray.50" }}>
      <Heading
        size="lg"
        color="indigo.700"
        _dark={{
          color: "warmGray.50",
        }}
        fontWeight="semibold"
      >
        Bienvenido
      </Heading>
      <Heading
        mt="1"
        color="coolGray.600"
        _dark={{
          color: "warmGray.200",
        }}
        fontWeight="medium"
        size="xs"
      >
        Regístrate para continuar!
      </Heading>
      <Formik
        initialValues={INITIAL_STATE}
        onSubmit={onSubmit}
        validationSchema={Yup.object({
          name: Yup.string().required("El nombre es requerido"),
          lastName: Yup.string().required("El apellido es requerido"),
          email: Yup.string().email("Email no válido").required("El email es requerido"),
          password: Yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("La contraseña es requerida"),
          passwordConfirmation: Yup.string()
            .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
            .required("La confirmación de la contraseña es requerida"),
        })}
      >
        {({ handleSubmit, errors }: FormikProps<RegisterFormProps>) => (
          <VStack width="90%" mx="3" maxW="370px">
            <InputCustom
              isRequired={true}
              isInvalid={"name" in errors}
              placeholder="Escriba sus nombres"
              type="text"
              name="name"
              label="Nombres Completos"
              propsLabel={{
                _text: {
                  bold: true,
                },
              }}
            />

            <InputCustom
              isRequired={true}
              isInvalid={"lastName" in errors}
              placeholder="Escriba sus apellidos"
              type="text"
              name="lastName"
              label="Apellidos Completos"
              propsLabel={{
                _text: {
                  bold: true,
                },
              }}
            />
            <InputCustom
              isRequired={true}
              isInvalid={"email" in errors}
              placeholder="Escriba su correo electrónico"
              type="text"
              name="email"
              label="Correo Electrónico"
              propsLabel={{
                _text: {
                  bold: true,
                },
              }}
            />
            <InputCustom
              isRequired={true}
              isInvalid={"password" in errors}
              placeholder="Escriba su contraseña"
              type="password"
              name="password"
              label="Contraseña"
              propsLabel={{
                _text: {
                  bold: true,
                },
              }}
            />
            <InputCustom
              isRequired={true}
              isInvalid={"passwordConfirmation" in errors}
              placeholder="Escriba su contraseña"
              type="password"
              name="passwordConfirmation"
              label="Confirmar Contraseña"
              propsLabel={{
                _text: {
                  bold: true,
                },
              }}
              ComponentComplement={<FormControl.HelperText>Escriba la misma contraseña que anteriormente</FormControl.HelperText>}
            />

            {/* <FormControl isRequired isInvalid={"email" in errors}>
              <FormControl.Label
                _text={{
                  bold: true,
                }}
              >
                Correo Electrónico
              </FormControl.Label>
              <Input
                type="text"
                onBlur={handleBlur("email")}
                placeholder="Escriba sus correo electrónico"
                onChangeText={handleChange("email")}
                value={values.email}
              />
              <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>
            </FormControl> */}

            <Button onPress={() => handleSubmit()} mt="5" colorScheme="indigo">
              Registrar
            </Button>
          </VStack>
        )}
      </Formik>
    </Center>
  );
};
