import type {cartType} from "@/types/common"

type stateType = {
    count: number,
    cart: cartType[],
}

const getCart = () => {
    let storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
        return JSON.parse(storedCart);
    } else {
        return [];
    }
}

const initialState: stateType = {
    count: Number(sessionStorage.getItem('count')),
    cart: getCart(),
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