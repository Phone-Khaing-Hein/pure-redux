import { DECREMENT, INCREMENT } from "../constants/countConstant";

export const increment = () => {
    return {
        type: INCREMENT
    };
};

export const decrement = () => {
    return {
        type: DECREMENT
    };
};