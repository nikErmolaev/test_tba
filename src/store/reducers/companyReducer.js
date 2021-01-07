import {
    COMPANY_FETCH,
    COMPANY_SUCCESS,
    COMPANY_FAILURE
} from '../types'

const initialState = {
    items: [],
    optionTable: {},
    isLoading: false,
    isError: false
}

export const companyReducer = (state = initialState, action) => {
    switch(action.type) {
        case COMPANY_FETCH: {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }
        case COMPANY_SUCCESS: {
            return {
                ...state,
                items: [...action.payload.items],
                optionTable: {...action.payload.optionTable},
                isLoading: false,
                isError: false
            }
        }
        case COMPANY_FAILURE: {
            return {
                ...state,
                items: [],
                optionTable: {},
                isLoading: false,
                isError: true
            }
        }
        default: return state
    }
}