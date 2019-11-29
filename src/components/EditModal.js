import React, {useState} from 'react';
import {View,TextInput, Button, StyleSheet, Alert, Modal} from "react-native";
import {THEME} from "../theme";
import {AppButton} from "./ui/AppButton";

export const EditModal = ({visible, onCancel, onSave, value}) => {
    const [title, setTitle] = useState(value);
    const saveHandler = () => {
        if(title.trim().length < 3) {
            Alert.alert('Error',`Minimum 3 symbols length. Now is ${title.trim().length} symbols`)
        } else {
            onSave(title);
        }
    };

    const cancelHandler = () => {
        setTitle(value);
        onCancel()
    };

    return (
        <Modal visible={visible} animationType='slide' transparent={false}>
            <View style={styles.wrap}>
                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={setTitle}
                    maxLength={64}
                    style={styles.input}
                    placeholder='Insert Title'
                    value={title}
                />
                <View style={styles.buttons}>
                    <AppButton color={THEME.DANGER_COLOR} onPress={cancelHandler}>Cancel</AppButton>
                    <AppButton onPress={saveHandler}>Save</AppButton>
                </View>
            </View>
        </Modal>

    )
};

const styles = StyleSheet.create({
    wrap: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    input: {
        padding: 10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: '80%'
    },
    buttons: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});