import { useReducer, createContext } from "react";

const initialState = {
	data: [],
	isLoading: false,
	error: null,
};

export const TalesContext = createContext();

function talesReducer(state = initialState, action) {
	switch (action.type) {
		case "FETCH_TALES_LOADING": {
			return {
				...state,
				isLoading: true,
				error: null,
			};
		}
		case "FETCH_TALES_SUCCESS": {
			return {
				...state,
				isLoading: false,
				data: action.payload,
			};
		}
		case "FETCH_TALES_ERROR": {
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		}
		case "UPDATE_TALE_LOADING": {
			return {
				...state,
				isLoading: true,
				error: null,
			};
		}
		case "UPDATE_TALE_SUCCESS": {
			const id = action.payload.id;
			const isLiked = action.payload.liked;

			const tempTales = [...state.data];

			const taleIdx = tempTales.findIndex((tale) => tale.id === id);
			const updatedTale = {
				...tempTales[taleIdx],
				liked: isLiked,
			};
			tempTales.splice(taleIdx, 1, updatedTale);
			return {
				...state,
				isLoading: false,
				data: tempTales,
			};
		}
		case "UPDATE_TALE_ERROR": {
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		}
		default: {
			return state;
		}
	}
}

function TalesContextProvider({ children }) {
	const [talesState, dispatch] = useReducer(talesReducer, initialState);

	function fetchTalesSuccess(tales) {
		dispatch({
			type: "FETCH_TALES_SUCCESS",
			payload: tales,
		});
	}

	function fetchTalesRequest() {
		dispatch({
			type: "FETCH_TALES_LOADING",
		});
	}

	function fetchTalesError(err) {
		dispatch({
			type: "FETCH_TALES_ERROR",
			payload: err,
		});
	}

	function updateTaleRequest() {
		dispatch({
			type: "UPDATE_TALE_LOADING",
		});
	}

	function updateTaleSuccess(updated) {
		dispatch({
			type: "UPDATE_TALE_SUCCESS",
			payload: updated,
		});
	}

	function updateTaleError(err) {
		dispatch({
			type: "UPDATE_TALE_ERROR",
			payload: err,
		});
	}

	const value = {
		talesState,
		fetchTalesSuccess,
		fetchTalesRequest,
		fetchTalesError,
		updateTaleError,
		updateTaleSuccess,
		updateTaleRequest,
	};

	return (
		<TalesContext.Provider value={value}>{children}</TalesContext.Provider>
	);
}

export default TalesContextProvider;
