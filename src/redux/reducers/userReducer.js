import { ADD_USER_FAIL, ADD_USER_REQUEST, ADD_USER_SUCCESS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, EDIT_USER_FAIL, EDIT_USER_REQUEST, EDIT_USER_SUCCESS, FETCH_USER_FAIL, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from "../constants/userConstant";

const initialState = {
    loading: false,
    users: [],
    error: '',
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
        case ADD_USER_REQUEST:
        case EDIT_USER_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_USER_SUCCESS:
        case EDIT_USER_SUCCESS:
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            };
        case FETCH_USER_FAIL:
        case ADD_USER_FAIL:
        case EDIT_USER_FAIL:
        case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ADD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: [...state.users, action.payload]
            };
        default:
            return state;
    }
};