import React, {useContext, useReducer} from "react";
import {TodoContext} from "./todoContext";
import {todoReducer} from "./todoReducer";
import {
    ADD_TODO,
    CLEAR_ERROR,
    FETCH_TODOS,
    HIDE_LOADER,
    REMOVE_TODO,
    SHOW_ERROR,
    SHOW_LOADER,
    UPDATE_TODO
} from "../types";
import {ScreenContext} from "../screen/screenContext";
import {Alert} from "react-native";

export const TodoState = ({ children }) => {
    const initialState = {
        error: null,
        loading: false,
        todos: []
    };

    const {changeScreen} = useContext(ScreenContext);

    const [state, dispatch] = useReducer(todoReducer, initialState);

    const addTodo = async title => {
        const response = await fetch('https://rn-todo-app-5b2ce.firebaseio.com/todos.json', {
            method: 'POST',
            headers: {'Content-Type': 'application-json'},
            body: JSON.stringify({title})
        });
        const data = await response.json();

        dispatch({type: ADD_TODO, title, id: data.name});
    };

    const fetchTodos = async () => {
        showLoader();
        clearError();
        try {
            const response = await fetch('https://rn-todo-app-5b2ce.firebaseio.com/todos.jsn', {
                headers: {'Content-Type': 'application/json'}
            });
            const data = await response.json();
            const todos = Object.keys(data).map(key => ({...data[key], id: key}));
            dispatch({type: FETCH_TODOS, todos});
        } catch(e) {
            showError('Something go wrong...');
            console.log(e)
        } finally {
            hideLoader();
        }
    };

    const removeTodo = id => {
        const todo = state.todos.find(t => t.id === id);
        Alert.alert(
            'Remove element',
            `Are you sure want to remove ${todo.title}?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    style: 'destructive',
                    onPress: () => {
                        changeScreen(null);
                        dispatch({type: REMOVE_TODO, id})
                    }},
            ],
            {cancelable: false},
        );
    };

    const updateTodo = (id, title) => dispatch({type: UPDATE_TODO, id, title});

    const showLoader = () => dispatch({type: SHOW_LOADER});

    const hideLoader = () => dispatch({type: HIDE_LOADER});

    const showError = error => dispatch({type: SHOW_ERROR});

    const clearError = () => dispatch({type: CLEAR_ERROR});

    return (
        <TodoContext.Provider
            value={{
                todos: state.todos,
                error: state.error,
                loading: state.loading,
                addTodo,
                removeTodo,
                updateTodo,
                fetchTodos
            }}
        >
            { children }
        </TodoContext.Provider>
    )
};