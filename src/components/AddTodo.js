import React, {useState} from "react";
import {Button, StyleSheet, TextInput, View, Alert, Keyboard} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {THEME} from "../theme";

export const AddTodo = ({onSubmit}) => {
    const [value, setValue] = useState('');

    const pressHandler = () => {
        if(value.trim()) {
            onSubmit(value);
            setValue('');
            Keyboard.dismiss();
        } else {
            Alert.alert('Name of todo could not be empty')
        }
    };

    return (
        <View style={styles.block}>
            <TextInput
                autoCapitalize='none'
                autoCorrect={false}
                value={value}
                onChangeText={setValue}
                placeholder='Insert Todo Name...'
                style={styles.input}
            />
            <AntDesign.Button onPress={pressHandler} name='pluscircleo'>Add</AntDesign.Button>
        </View>
    )
};

const styles = StyleSheet.create({
    block: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    input: {
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: THEME.MAIN_COLOR,
        padding: 10,
        width: '70%'
    }
});