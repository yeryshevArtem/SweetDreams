import { useReducer, createContext } from 'react';

const initialState = {
    data: [],
    isLoading: false,
    error: null
};

export const TalesContext = createContext();

function talesReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_LOADING': {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case 'SET_SUCCESS': {
            return {
                ...state,
                isLoading: false,
                data: action.payload
            };
        }
        case 'SET_ERROR': {
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        }
        case 'UPDATE': {
            const id = action.payload.id;
            const isLiked = action.payload.liked;

            const tempTales = [...state.data];

            const taleIdx = tempTales.findIndex(tale => tale.id === id);
            const updatedTale = {
                ...tempTales[taleIdx],
                liked: isLiked
            };
            tempTales.splice(taleIdx, 1, updatedTale);
            return {
                ...state,
                data: tempTales
            };
        }
        default: {
            return state;
        }
    }
}

function TalesContextProvider({ children }) {
    const [talesState, dispatch] = useReducer(talesReducer, initialState);

    function setTales(tales) {
        dispatch({
            type: 'SET_SUCCESS',
            payload: tales
        });
    }

    function setLoading() {
        dispatch({
            type: 'SET_LOADING'
        });
    }

    function setError(err) {
        dispatch({
            type: 'SET_ERROR',
            payload: err
        });
    }

    function updateTale(updated) {
        dispatch({
            type: 'UPDATE',
            payload: updated
        });
    }

    const value = {
        talesState,
        setTales,
        updateTale,
        setLoading,
        setError
    };

    return (
        <TalesContext.Provider value={value}>
            {children}
        </TalesContext.Provider>
    );
}

export default TalesContextProvider;