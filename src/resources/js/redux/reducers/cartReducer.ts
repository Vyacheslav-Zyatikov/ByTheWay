import type {dishType} from "@/types/common"

type stateType = {
    count: number,
    cart: dishType[],
}

const initialState: stateType = {
    count: 0,
    cart: [],
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_CART_COUNT":
            return {
                ...state,
                count: action.payload,
            }
        case "SET_CART":
            return {
                ...state,
                cart: action.payload,
            }
        default:
            return state
    }
}

export const setCartCount = (count) => {
    return(dispatch) => {
        dispatch({
            type: "SET_CART_COUNT",
            payload: count,
        });
    }
}

export const setCart = (cart) => {
    return(dispatch) => {
        dispatch({
            type: "SET_CART",
            payload: cart
        })
    }
}