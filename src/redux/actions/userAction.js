import axios from "axios"
import { ADD_USER_FAIL, ADD_USER_REQUEST, ADD_USER_SUCCESS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, EDIT_USER_FAIL, EDIT_USER_REQUEST, EDIT_USER_SUCCESS, FETCH_USER_FAIL, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from "../constants/userConstant"

export const successUser = (users, type) => {
    return {
        type,
        payload: users
    }
}

export const failUser = (error, type) => {
    return {
        type,
        payload: error
    }
}

export const updateUsers = (user) => {
    return {
        type: ADD_USER_SUCCESS,
        payload: user
    }
}

export const getUsers = () => async (dispatch) => {
    dispatch({ type: FETCH_USER_REQUEST });
    await axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            dispatch(successUser(response.data, FETCH_USER_SUCCESS))
        })
        .catch(e => {
            dispatch(failUser(e.message, FETCH_USER_FAIL));
        })
}

export const addUser = (user) => async (dispatch) => {
    dispatch({ type: ADD_USER_REQUEST });
    await axios.post('https://jsonplaceholder.typicode.com/users', user)
        .then(response => {
            dispatch(updateUsers(response.data))
        })
        .catch(e => {
            dispatch(failUser(e.message, ADD_USER_FAIL));
        })
}

export const editUser = (user) => async (dispatch, getState) => {
    dispatch({ type: EDIT_USER_REQUEST });
    const users = getState().user.users;
    const data = users.find(u => u.id === user.id);
    const updatedUsers = users.filter(u => u.id !== user.id);
    await axios.patch(`https://jsonplaceholder.typicode.com/users/${user.id}`, { ...data, name: user.name })
        .then(response => {
            dispatch(successUser([...updatedUsers, response.data].sort((a, b) => a.id - b.id), EDIT_USER_SUCCESS))
        })
        .catch(e => {
            dispatch(failUser(e.message, EDIT_USER_FAIL));
        })
}

export const destroyUser = (user) => async (dispatch, getState) => {
    dispatch({ type: DELETE_USER_REQUEST });
    const users = getState().user.users;
    const updatedUsers = users.filter(u => u.id !== user.id);
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${user.id}`)
        .then(response => {
            dispatch(successUser(updatedUsers, DELETE_USER_SUCCESS));
        })
        .catch(e => {
            dispatch(failUser(e.message, DELETE_USER_FAIL));
        })
}