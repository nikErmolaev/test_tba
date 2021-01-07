import {
    SETTING_FETCH,
    SETTING_SUCCESS,
    SETTING_FAILURE
} from '../types'

const initialState = {
    name: '',
    isLoading: false,
    isError: false
}

export const settingsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SETTING_FETCH: {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }
        case SETTING_SUCCESS: {
            return {
                ...state,
                name: action.payload,
                isLoading: false,
                isError: false
            }
        }
        case SETTING_FAILURE: {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }
        default: return state
    }
}