import { useReducer, createContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    token: '',
    isAuthenticated: false,
    isLoading: false,
    error: null
};

export const AuthContext = createContext();

function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'AUTH_LOADING': {
            return {
                ...state,
                isLoading: true
            }
        }
        case 'AUTH_SUCCESS': {
            AsyncStorage.setItem('token', action.payload);
            return {
                ...state,
                isLoading: false,
                token: action.payload,
                isAuthenticated: true
            }
        }
        case 'AUTH_ERROR': {
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        }
        case 'AUTH_LOADING_STOP': {
            return {
                ...state,
                isLoading: false
            }
        }
        case 'LOGOUT': {
            AsyncStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false
            }
        }
        default: {
            return state;
        }
    }
}

export default function AuthContextProvider({ children }) {
    const [authState, dispatch] = useReducer(authReducer, initialState);

    function authenticateLoading() {
        dispatch({
            type: 'AUTH_LOADING'
        });
    }

    function authenticateError(error) {
        dispatch({
            type: 'AUTH_ERROR',
            payload: error
        });
    }

    function authenticateSuccess(token) {
        dispatch({
            type: 'AUTH_SUCCESS',
            payload: token
        });
    }


    function authenticateStopLoading() {
        dispatch({
            type: 'AUTH_LOADING_STOP'
        });
    }

    function logout() {
        dispatch({
            type: 'LOGOUT'
        });
    }

    const value = {
        authState,
        authenticateSuccess,
        authenticateError,
        authenticateLoading,
        logout,
        authenticateStopLoading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}