import React from "react";
import {View, StyleSheet, TouchableOpacity} from "react-native";
import {AppText} from "./ui/AppText";

export const Todo = ({todo, onRemove, onOpen}) => {
    const longPressHandler = () => {
        onRemove(todo.id)
    };
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => onOpen(todo.id)}
        >
            <View style={styles.todo}>
                <AppText>{todo.title}</AppText>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    todo: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5,
        color: 'red',
        flexDirection: 'row',
        marginBottom: 10,
        padding: 15
    }
});