import { SET_USER, LOGOUT } from "../actions"

const initialState = {
    user: null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
            }
        case "LOGOUT":
            return {
                ...state,
                user: null,
            }
        default:
            return state
    }
}

export const login = (user) => {
    return(dispatch) => {
        dispatch(SET_USER(user));
    }
}

export const logout = () => {
    return(dispatch) => {
        dispatch(LOGOUT());
    }
}