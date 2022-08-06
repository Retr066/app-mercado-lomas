import React, {FC, useState} from "react";
import {FormControl, Icon, Input} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";
import {useField} from "formik";

interface Props {
    name: string;
    label: string;
    placeholder?: string;
    secureTextEntry?: boolean;

    [x: string]: any;
}

export const InputPassword: FC<Props> = ({label, name, ...props}) => {
    const [show, setShow] = useState(false);
    const [field] = useField(name);
    const {onBlur, onChange, value} = field;

    return (
        <FormControl>
            <FormControl.Label>{label}</FormControl.Label>

            <Input
                type={show ? "text" : "password"}
                InputRightElement={
                    <Icon
                        as={<MaterialIcons name={show ? "visibility" : "visibility-off"}/>}
                        size={5}
                        mr="2"
                        color="muted.400"
                        onPress={() => setShow(!show)}
                    />
                }
                onBlur={onBlur(name)}
                onChangeText={onChange(name)}
                value={value}
                {...props}
            />
        </FormControl>
    );
};
