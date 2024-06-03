import { useReducer, createContext } from 'react';

export const TalesContext = createContext({
    tales: [],
    setTales: (tales) => { },
    updateTale: (tale) => { }
});

function talesReducer(state, action) {
    switch (action.type) {
        case 'SET': {
            return action.payload;
        }
        case 'UPDATE': {
            const id = action.payload.id;
            const isLiked = action.payload.liked;
            const tempTales = [...state];
            const taleIdx = tempTales.findIndex(tale => tale.id === id);
            const updatedTale = {
                ...tempTales[taleIdx],
                liked: isLiked
            };
            tempTales.splice(taleIdx, 1, updatedTale);
            return tempTales;
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

    function updateTale(updated) {
        dispatch({
            type: 'UPDATE',
            payload: updated
        });
    }

    const value = {
        tales: talesState,
        setTales,
        updateTale
    };

    return (
        <TalesContext.Provider value={value}>
            {children}
        </TalesContext.Provider>
    );
}

export default TalesContextProvider;