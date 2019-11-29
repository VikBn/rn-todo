import React, {useCallback, useContext, useEffect, useState} from "react";
import {Dimensions, FlatList, StyleSheet, View} from "react-native";
import {Todo} from "../components/Todo";
import {AddTodo} from "../components/AddTodo";
import {THEME} from "../theme";
import {TodoContext} from "../context/todo/todoContext";
import {ScreenContext} from "../context/screen/screenContext";
import {AppLoader} from "../components/ui/AppLoader";
import {AppText} from "../components/ui/AppText";

export const MainScreen = () => {
    const {addTodo, todos, removeTodo, fetchTodos, loading, error} = useContext(TodoContext);
    const {changeScreen} = useContext(ScreenContext);
    const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2);

    const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])
    useEffect(() => {
        loadTodos();
    }, []);

    useEffect(() => {
        const update = () => {
            const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
            setDeviceWidth(width);
        };

        Dimensions.addEventListener('change', update);

        return () => {
            Dimensions.addEventListener('change', update);
        }
    });

    if(loading) {
        return <AppLoader/>
    }

    if(error) {
        return (
            <View style={styles.center}>
                <AppText style={styles.error}>{error}</AppText>
            </View>
        )
    }

    return (
        <View>
            <AddTodo onSubmit={addTodo}/>
            <View style={{deviceWidth}}>
                <FlatList
                    keyExtractor={item => item.id.toString()}
                    data={todos}
                    renderItem={({item}) => (
                        <Todo
                            onOpen={changeScreen}
                            onRemove={removeTodo}
                            todo={item}
                        />
                    )}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    error: {
        fontSize: 20,
        color: THEME.DANGER_COLOR
    }

});