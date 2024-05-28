import { useReducer, createContext } from 'react';

export const TalesContext = createContext({
    tales: [],
    setTales: (tales) => { }
});

function talesReducer(state, action) {
    switch (action.type) {
        case 'SET': {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}

function TalesContextProvider({ children }) {
    const [talesState, dispatch] = useReducer(talesReducer, []);

    function setTales(tales) {
        dispatch({
            type: 'SET',
            payload: tales
        });
    }

    const value = {
        tales: talesState,
        setTales
    };

    return (
        <TalesContext.Provider value={value}>
            {children}
        </TalesContext.Provider>
    );
}

export default TalesContextProvider;