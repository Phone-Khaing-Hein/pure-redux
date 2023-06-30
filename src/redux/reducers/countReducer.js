import { DECREMENT, INCREMENT } from "../constants/countConstant";

const initialState = {
    number: 0
};

export const countReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                number: state.number + 1
            };
        case DECREMENT:
            return {
                ...state,
                number: state.number - 1
            };
        default:
            return state;
    }
};