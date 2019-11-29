import React, {useContext, useState} from "react";
import {Navbar} from "./components/Navbar";
import { StyleSheet, View} from "react-native";
import {THEME} from "./theme";
import {MainScreen} from "./screens/MainScreen";
import {TodoScreen} from "./screens/TodoScreen";
import {TodoContext} from "./context/todo/todoContext";
import {ScreenContext} from "./context/screen/screenContext";

export const MainLayout = () => {
    const {todoId} = useContext(ScreenContext);

    return (
        <View style={styles.wrapper}>
            <Navbar title='Todo app'/>
            <View style={styles.container}>
                { todoId ? <TodoScreen /> : <MainScreen /> }
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: THEME.PADDING_HORIZONTAL
    },
    wrapper: {
        flex: 1
    }
});