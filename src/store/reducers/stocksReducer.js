import {
    STOCKS_FETCH,
    STOCKS_SUCCESS,
    STOCKS_FAILURE
} from '../types'

const initialState = {
    items: [],
    numbers: [],
    optionTable: {},
    isLoading: false,
    isError: false
}

export const stocksReducer = (state = initialState, action) => {
    switch(action.type) {
        case STOCKS_FETCH: {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }
        case STOCKS_SUCCESS: {
            return {
                ...state,
                items: [...action.payload.items],
                numbers: [...action.payload.numbers],
                optionTable: {...action.payload.optionTable},
                isLoading: false,
                isError: false
            }
        }
        case STOCKS_FAILURE: {
            return {
                ...state,
                items: [],
                numbers: [],
                optionTable: {},
                isLoading: false,
                isError: true
            }
        }
        default: return state
    }
}