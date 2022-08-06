import React, { FC, useState } from "react";
import { FormControl, Icon, Input, WarningOutlineIcon } from "native-base";
import { useField } from "formik";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  type: "text" | "password" | "email" | "number" | "tel" | "url";
  propsLabel?: {
    [x: string]: any;
  };
  isRequired?: boolean;
  isInvalid?: boolean;
  [x: string]: any;
  ComponentComplement?: JSX.Element | JSX.Element[];
}

export const InputCustom: FC<Props> = ({ label, isInvalid, isRequired, name, propsLabel, type, ComponentComplement, ...props }) => {
  const [field, meta] = useField(name);
  const [show, setShow] = useState(false);
  const { error, touched } = meta;
  const { onChange, onBlur, value } = field;


  return (
    <FormControl isRequired={isRequired} isInvalid={!!error}>
      <FormControl.Label {...propsLabel}>{label}</FormControl.Label>
      <Input
        type={type === "password" ? (show ? "text" : "password") : type}
        InputRightElement={
          type === "password" ? (
            <Icon
              as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
              size={5}
              mr="2"
              color="muted.400"
              onPress={() => setShow(!show)}
            />
          ) : (
            <></>
          )
        }
        onChangeText={onChange(name)}
        onBlur={onBlur(name)}
        value={value}
        {...props}
      />
      {ComponentComplement}
      {touched && error ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{error}</FormControl.ErrorMessage> : <></>}
      {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{error.email}</FormControl.ErrorMessage> */}
    </FormControl>
  );
};
