import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { composeWithDevTools } from "redux-devtools-extension"
import {authReducer} from "./reducers/authReducer";
import {cartReducer} from "./reducers/cartReducer";

const reducer = combineReducers({
    authReducer,
    cartReducer,
})

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
// export const store = createStore(reducer, applyMiddleware(thunk, handleMessage))

type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;